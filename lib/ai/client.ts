import { streamObject } from "ai";
import { anthropic, createAnthropic } from "@ai-sdk/anthropic";
import { MemoSchema } from "./schemas.js";
import { SYSTEM_PROMPT } from "./prompts.js";

function getModel() {
  const modelId = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-6";

  if (process.env.AI_GATEWAY_API_KEY) {
    const gatewayAnthropic = createAnthropic({
      baseURL: "https://gateway.ai.vercel.app/v1/anthropic",
      headers: {
        Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
      },
    });
    return gatewayAnthropic(modelId);
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("Neither AI_GATEWAY_API_KEY nor ANTHROPIC_API_KEY is set");
  }
  return anthropic(modelId);
}

export interface GenerateMemoOptions {
  userPrompt: string;
  signal?: AbortSignal;
}

export function streamMemo({ userPrompt, signal }: GenerateMemoOptions) {
  return streamObject({
    model: getModel(),
    schema: MemoSchema,
    system: SYSTEM_PROMPT,
    prompt: userPrompt,
    temperature: 0.3,
    maxOutputTokens: 12000,
    abortSignal: signal,
  });
}
