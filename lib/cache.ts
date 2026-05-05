import type { Memo } from "./ai/schemas.js";
import { MemoSchema } from "./ai/schemas.js";
import { PROMPT_VERSION } from "./ai/prompts.js";

const TTL_PUBLIC_SECONDS = 60 * 60 * 24; // 24h
const TTL_STARTUP_SECONDS = 60 * 60 * 6; // 6h

function normalizeCompany(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9.-]/g, ""); // keep dots so RELIANCE.NS and RELIANCE.BO stay distinct
}

function todayUTC(): string {
  return new Date().toISOString().slice(0, 10);
}

export function buildCacheKey(company: string): string {
  return `memo:${PROMPT_VERSION}:${normalizeCompany(company)}:${todayUTC()}`;
}

let _store: Map<string, { value: Memo; expiresAt: number }> | null = null;
function devStore() {
  if (!_store) _store = new Map();
  return _store;
}

export async function getCachedMemo(key: string): Promise<Memo | null> {
  // TODO(implementer): swap for Vercel Runtime Cache in production
  const entry = devStore().get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    devStore().delete(key);
    return null;
  }
  const parsed = MemoSchema.safeParse(entry.value);
  return parsed.success ? parsed.data : null;
}

export async function setCachedMemo(key: string, memo: Memo): Promise<void> {
  const ttl = memo.type === "public" ? TTL_PUBLIC_SECONDS : TTL_STARTUP_SECONDS;
  devStore().set(key, {
    value: memo,
    expiresAt: Date.now() + ttl * 1000,
  });
}
