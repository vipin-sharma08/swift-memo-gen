import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GenerateMemoRequestSchema } from "../lib/validation.js";
import { searchCompany, getCompanyData, MarketDataError } from "../lib/market/client.js";
import { buildPublicCompanyPrompt, buildStartupPrompt } from "../lib/ai/prompts.js";
import { streamMemo } from "../lib/ai/client.js";
import { buildCacheKey, getCachedMemo, setCachedMemo } from "../lib/cache.js";
import { ValidationError, UpstreamError, toErrorPayload } from "../lib/errors.js";

export const config = { maxDuration: 300 };

function writeStreamError(res: VercelResponse, e: unknown) {
  const { body } = toErrorPayload(e);
  res.write(`data: ${JSON.stringify({ _error: body.error, _code: body.code })}\n\n`);
  res.end();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed", code: "METHOD_NOT_ALLOWED" });
  }

  const startedAt = Date.now();

  // 1. Validate request
  const parsed = GenerateMemoRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    const { status, body } = toErrorPayload(new ValidationError(parsed.error.flatten()));
    return res.status(status).json(body);
  }
  const { company } = parsed.data;
  console.log(`[generate-memo] company="${company}"`);

  const cacheKey = buildCacheKey(company);
  const cached = await getCachedMemo(cacheKey);
  if (cached) {
    console.log(`[generate-memo] cache HIT ${cacheKey}`);
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.write(`data: ${JSON.stringify({ ...cached, _done: true, _cached: true })}\n\n`);
    return res.end();
  }
  console.log(`[generate-memo] cache MISS ${cacheKey}`);

  // 2. Market data lookup → classify public vs. startup
  let userPrompt: string;
  let pathTaken: "public" | "startup" = "public";
  try {
    const search = await searchCompany(company);
    if (!search) {
      console.log(`[generate-memo] Yahoo no match → startup path`);
      pathTaken = "startup";
      userPrompt = buildStartupPrompt(company);
    } else {
      try {
        const companyData = await getCompanyData(search);
        console.log(
          `[generate-memo] Yahoo hit ${search.symbol} (${search.exchange}, ${search.currency}), news=${companyData.news.length}`,
        );
        userPrompt = buildPublicCompanyPrompt(companyData);
      } catch (e) {
        if (e instanceof MarketDataError && e.status === 404) {
          console.log(`[generate-memo] Yahoo partial miss → startup path`);
          pathTaken = "startup";
          userPrompt = buildStartupPrompt(company);
        } else {
          throw e;
        }
      }
    }
  } catch (e) {
    console.error("[generate-memo] market data fatal error", e);
    const wrapped =
      e instanceof MarketDataError ? new UpstreamError("market", e) : e;
    const { status, body } = toErrorPayload(wrapped);
    return res.status(status).json(body);
  }

  // 3. Stream from Claude
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");

  try {
    const stream = streamMemo({ userPrompt });

    for await (const partial of stream.partialObjectStream) {
      res.write(`data: ${JSON.stringify(partial)}\n\n`);
    }

    const final = await stream.object;
    final.generatedAt = new Date().toISOString();
    res.write(`data: ${JSON.stringify({ ...final, _done: true })}\n\n`);
    res.end();

    await setCachedMemo(cacheKey, final);

    const usage = await stream.usage;
    console.log(
      `[generate-memo] done path=${pathTaken} ms=${Date.now() - startedAt} tokens=${usage?.totalTokens ?? "?"}`,
    );
  } catch (e) {
    console.error("[generate-memo] streaming error", e);
    writeStreamError(res, new UpstreamError("claude", e));
  }
}
