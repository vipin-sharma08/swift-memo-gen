import { useState, useCallback } from "react";
import MemoResult from "./MemoResult";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

export interface MemoData {
  company: string;
  ticker: string;
  sector: string;
  price: string;
  market_cap_formatted: string;
  sentiment: string;
  recommendation: string;
  content: string;
}

const EXAMPLE_CHIPS = ["Apple", "Reliance Industries", "Stripe", "Zerodha"];

const WEBHOOK_URL = "https://vipinnn.app.n8n.cloud/webhook/generate-memo";

const extractRecommendation = (memo: string): string => {
  const patterns = [
    /RECOMMENDATION[:\s]+[🟡🟢🔴]?\s*([A-Z][A-Z\s]+?)(?:\n|$)/m,
    /Rating[:\s]+[🟡🟢🔴]?\s*([A-Z][A-Z\s]+?)(?:\n|$)/m,
    /We\s+(?:initiate|rate|recommend)\s+(?:coverage\s+at\s+)?([A-Z][A-Z\s]+?)(?:\.|,|\n)/m,
  ];
  for (const pattern of patterns) {
    const match = memo.match(pattern);
    if (match) {
      const rec = match[1].trim().replace(/[*🟡🟢🔴]+/g, "").trim();
      const known = ["CONVICTION BUY", "ACCUMULATE", "HOLD", "MONITOR", "REDUCE"];
      const found = known.find((k) => rec.toUpperCase().includes(k));
      if (found) return found;
    }
  }
  return "ACCUMULATE";
};

const MemoSearchForm = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [memoData, setMemoData] = useState<MemoData | null>(null);

  const generate = useCallback(async (company: string) => {
    if (!company.trim()) return;
    setMemoData(null);
    setError(false);
    setLoading(true);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company: company.trim() }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const raw = await res.json();
      const data = Array.isArray(raw) ? raw[0] : raw;

      if (!data || !data.memo) throw new Error("No memo in response");

      const recommendation = extractRecommendation(data.memo);

      setMemoData({
        company: data.companyName || company.trim(),
        ticker: data.ticker || "",
        sector: data.profile?.sector
          ? `${data.profile.sector} · ${data.exchange || ""}`
          : "",
        price: data.quote?.price ? `$${data.quote.price}` : "",
        market_cap_formatted: data.quote?.marketCap || "",
        sentiment: data.sentiment?.label || "Neutral",
        recommendation,
        content: data.memo,
      });

      setTimeout(() => {
        document
          .getElementById("memo-result")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
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

      {!loading && !error && (
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

      {!loading && !error && (
        <p className="mt-10 label-eyebrow text-[10px] text-ink-muted">
          Free to use · No signup · Covers public and private companies
        </p>
      )}

      {loading && <LoadingState />}
      {error && !loading && <ErrorState onRetry={handleRetry} />}
      {memoData && !loading && !error && (
        <div id="memo-result">
          <MemoResult data={memoData} />
        </div>
      )}
    </div>
  );
};

export default MemoSearchForm;
