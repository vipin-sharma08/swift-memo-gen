import { useState, useCallback } from "react";
import MemoResult from "./MemoResult";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import type { PartialMemo } from "@/types/memo";

export interface MemoData {
  company: string;
  ticker: string;
  sector: string;
  price: string;
  market_cap_formatted: string;
  sentiment: string;
  recommendation: string;
  content: string;
  type: "public" | "startup";
}

const EXAMPLE_CHIPS = ["Apple", "Reliance Industries", "Stripe", "Zerodha"];

const API_URL = "/api/generate-memo";

// ── Convert streaming PartialMemo → MemoData for MemoResult ──────────────────

function buildContent(memo: PartialMemo): string {
  const s = (memo.sections ?? {}) as NonNullable<PartialMemo["sections"]>;
  return [
    s.executiveSummary && `## Executive Summary\n${s.executiveSummary}`,
    s.companyOverview && `## Company Overview\n${s.companyOverview}`,
    s.financialDeepDive && `## Financial Analysis\n${s.financialDeepDive}`,
    s.competitiveLandscape && `## Competitive Landscape\n${s.competitiveLandscape}`,
    s.riskMatrix && `## Risk Matrix\n${s.riskMatrix}`,
    s.newsSentiment && `## News Sentiment\n${s.newsSentiment}`,
    s.investmentThesis && `## Investment Thesis\n${s.investmentThesis}`,
  ]
    .filter(Boolean)
    .join("\n\n");
}

function memoToMemoData(memo: PartialMemo, fallbackQuery: string): MemoData {
  const md = memo.marketData;
  const ticker = memo.ticker ?? "";
  const isInr = ticker.endsWith(".NS") || ticker.endsWith(".BO");
  const curr = isInr ? "₹" : "$";

  const price =
    md?.price != null
      ? `${curr}${md.price.toLocaleString(isInr ? "en-IN" : "en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      : "";

  const market_cap_formatted =
    md?.marketCap != null
      ? isInr
        ? `₹${(md.marketCap / 1e7).toFixed(0)} Cr`
        : `$${(md.marketCap / 1e9).toFixed(1)}B`
      : "";

  return {
    company: memo.company ?? fallbackQuery,
    ticker,
    sector: memo.sector ?? "",
    price,
    market_cap_formatted,
    sentiment: memo.sentiment ?? "",
    recommendation: memo.recommendation ?? "",
    content: buildContent(memo),
    type: memo.type ?? "public",
  };
}

const MemoSearchForm = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [memo, setMemo] = useState<PartialMemo | null>(null);

  const generate = useCallback(async (company: string) => {
    if (!company.trim()) return;
    setMemo(null);
    setError(false);
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company: company.trim() }),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
        throw new Error(errBody.error ?? `HTTP ${res.status}`);
      }
      if (!res.body) throw new Error("No response stream");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // SSE events are separated by blank lines
        const events = buffer.split("\n\n");
        buffer = events.pop() ?? "";

        for (const event of events) {
          const line = event.trim();
          if (!line.startsWith("data:")) continue;
          const json = line.slice(5).trim();
          if (!json) continue;

          let partial: PartialMemo;
          try {
            partial = JSON.parse(json);
          } catch {
            continue;
          }

          if (partial._error) {
            throw new Error(partial._error);
          }

          setMemo(partial);

          if (partial._done) {
            setLoading(false);
            setTimeout(() => {
              document
                .getElementById("memo-result")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
          }
        }
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generate(query);
  };

  const handleChip = (name: string) => {
    setQuery(name);
    generate(name);
  };

  const handleRetry = () => {
    if (query.trim()) generate(query);
  };

  // Show the memo card as soon as the first section arrives
  const hasContent = !!memo?.sections?.executiveSummary;

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="max-w-[640px]">
        <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-6 border-b border-ink pb-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="A company name or ticker"
            disabled={loading}
            className="sm:flex-1 bg-transparent border-0 outline-none focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 font-serif text-[18px] sm:text-[20px] text-ink placeholder:text-ink-faint disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="ui-link self-start sm:self-auto font-sans text-[14px] font-medium tracking-wide whitespace-nowrap pb-1 disabled:opacity-40 disabled:pointer-events-none"
          >
            {loading ? "Generating…" : "Generate →"}
          </button>
        </div>
      </form>

      {!loading && !error && !hasContent && (
        <p className="mt-4 font-sans text-[14px] text-ink-muted">
          Try:{" "}
          {EXAMPLE_CHIPS.map((name, i) => (
            <span key={name}>
              <button
                type="button"
                onClick={() => handleChip(name)}
                className="ui-link"
              >
                {name}
              </button>
              {i < EXAMPLE_CHIPS.length - 1 && (
                <span className="text-ink-faint" aria-hidden="true">
                  {" · "}
                </span>
              )}
            </span>
          ))}
        </p>
      )}

      {!loading && !error && !hasContent && (
        <p className="mt-10 label-eyebrow text-[10px] text-ink-muted">
          Free to use · No signup · Covers public and private companies
        </p>
      )}

      {/* Loading — show until the first section text arrives */}
      {loading && !hasContent && <LoadingState />}

      {error && !loading && <ErrorState onRetry={handleRetry} />}

      {/* Result — renders progressively as sections fill in */}
      {hasContent && (
        <div id="memo-result">
          <MemoResult data={memoToMemoData(memo!, query)} />
        </div>
      )}
    </div>
  );
};

export default MemoSearchForm;
