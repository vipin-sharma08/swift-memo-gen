import type { MemoData } from "./HeroSection";
import MemoMarkdown from "./MemoMarkdown";

interface MemoResultProps {
  company?: string;
  data?: MemoData;
}

const RECOMMENDATION_COLORS: Record<string, string> = {
  // Public company tiers
  "conviction buy": "hsl(var(--bullish))",
  accumulate: "hsl(var(--accent))",
  hold: "hsl(var(--neutral))",
  monitor: "hsl(var(--monitor))",
  reduce: "hsl(var(--bearish))",
  // Startup / VC tiers
  "strong interest": "hsl(var(--bullish))",
  interested: "hsl(var(--accent))",
  neutral: "hsl(var(--neutral))",
  cautious: "hsl(var(--monitor))",
  pass: "hsl(var(--bearish))",
};

const SENTIMENT_COLORS: Record<string, string> = {
  bullish: "hsl(var(--bullish))",
  "moderately bullish": "hsl(var(--bullish))",
  positive: "hsl(var(--bullish))",
  neutral: "hsl(var(--neutral))",
  negative: "hsl(var(--bearish))",
  bearish: "hsl(var(--bearish))",
  "moderately bearish": "hsl(var(--bearish))",
};

const DEFAULT_METRICS = [
  { label: "Market Cap", value: "$3.45T" },
  { label: "P/E Ratio", value: "33.2x" },
  { label: "Revenue TTM", value: "$394.3B" },
  { label: "Net Margin", value: "26.2%" },
  { label: "ROE", value: "147.2%" },
  { label: "Debt/Equity", value: "1.87" },
];

const MemoResult = ({ company, data }: MemoResultProps) => {
  const isLive = !!data;
  const displayCompany = data?.company || company || "Apple Inc.";
  const ticker = data?.ticker || (displayCompany.toLowerCase().includes("apple") ? "AAPL" : "");
  const sector = data?.sector || "Technology · Large Cap · NASDAQ";
  const recommendation = data?.recommendation || "Accumulate";
  const sentiment = data?.sentiment || "Moderately Bullish";
  const recColor = RECOMMENDATION_COLORS[recommendation.toLowerCase()] || "hsl(var(--accent))";
  const sentColor = SENTIMENT_COLORS[sentiment.toLowerCase()] || "hsl(var(--bullish))";

  return (
    <div className="mt-16 animate-[fade-in_0.5s_ease-out]">
      <div
        className="card-glass mx-auto max-w-[800px] p-8 md:p-10 text-left"
        style={{
          borderRadius: 16,
          boxShadow: "var(--shadow-float)",
          background: "linear-gradient(180deg, rgba(91,108,240,0.03) 0%, rgba(18,18,26,0.8) 15%)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between mb-8 pb-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div>
            <p className="text-caption mb-1">Investment Memo</p>
            <p className="text-[13px] text-[hsl(var(--text-tertiary))]">
              Generated {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>
          <span className="text-[13px] font-medium text-[hsl(var(--text-tertiary))]">MemoAI</span>
        </div>

        {/* Company */}
        <h2 className="text-[28px] font-semibold text-[hsl(var(--text-primary))] tracking-tight mb-1">
          {displayCompany} {ticker && `(${ticker})`}
        </h2>
        <p className="text-[14px] text-[hsl(var(--text-secondary))] mb-4">{sector}</p>

        {/* Recommendation badge */}
        <div className="flex items-center gap-2 mb-8">
          <span className="text-[11px] text-[hsl(var(--text-tertiary))] font-medium uppercase tracking-wider">
            Recommendation:
          </span>
          <span
            className="text-[13px] font-semibold uppercase tracking-wider px-3 py-1 rounded"
            style={{
              color: recColor,
              border: `1px solid ${recColor}33`,
              background: `${recColor}14`,
            }}
          >
            {recommendation}
          </span>
        </div>

        {/* Live memo content OR static fallback */}
        {isLive && data.content ? (
          <MemoMarkdown content={data.content} />
        ) : (
          <StaticMemoContent sentiment={sentiment} sentColor={sentColor} />
        )}
      </div>
      <p className="text-caption mt-6 text-center">Generated in 42 seconds</p>
    </div>
  );
};

/* ---------- Static fallback (for sample output) ---------- */

function StaticMemoContent({
  sentiment,
  sentColor,
}: {
  sentiment: string;
  sentColor: string;
}) {
  return (
    <>
      {/* Executive Summary */}
      <div className="mb-8">
        <h3 className="text-caption text-primary mb-3">Executive Summary</h3>
        <p className="text-[15px] text-[hsl(var(--text-secondary))] leading-relaxed">
          Apple Inc. demonstrates exceptional market positioning with sustained competitive advantages
          in hardware, software, and services ecosystems. The company's transition to services-driven
          revenue provides margin expansion tailwinds. Current valuation appears fair relative to
          growth trajectory. Capital return program remains best-in-class among mega-cap technology companies.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="mb-8">
        <h3 className="text-caption text-primary mb-3">Key Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {DEFAULT_METRICS.map((m) => (
            <div
              key={m.label}
              className="rounded-lg p-3"
              style={{
                background: "hsl(var(--surface-higher))",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p className="text-[11px] text-[hsl(var(--text-tertiary))] mb-0.5 uppercase tracking-wider font-medium">
                {m.label}
              </p>
              <p className="text-[24px] font-medium text-[hsl(var(--text-primary))] font-mono-data">
                {m.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Sentiment */}
      <div className="mb-8">
        <h3 className="text-caption text-primary mb-3">Market Sentiment</h3>
        <div className="flex items-center gap-3">
          <span
            className="rounded-md px-3 py-1 text-[13px] font-semibold"
            style={{
              color: sentColor,
              background: `${sentColor}14`,
              border: `1px solid ${sentColor}33`,
            }}
          >
            {sentiment}
          </span>
          <span className="text-[13px] text-[hsl(var(--text-tertiary))]">
            Based on 47 recent articles
          </span>
        </div>
      </div>

      {/* Risk Factors */}
      <div className="mb-8">
        <h3 className="text-caption text-primary mb-3">Risk Factors</h3>
        <ul className="space-y-2 text-[14px] text-[hsl(var(--text-secondary))]">
          <li className="flex gap-2">
            <span className="text-[hsl(var(--bearish))] mt-0.5 text-[8px]">●</span>
            Regulatory headwinds across EU and US antitrust actions could impact App Store economics
          </li>
          <li className="flex gap-2">
            <span className="text-[hsl(var(--neutral))] mt-0.5 text-[8px]">●</span>
            China revenue concentration exposes the company to geopolitical and macro risks
          </li>
          <li className="flex gap-2">
            <span className="text-[hsl(var(--neutral))] mt-0.5 text-[8px]">●</span>
            Hardware upgrade cycle deceleration may pressure near-term revenue growth
          </li>
        </ul>
      </div>

      {/* Investment Thesis */}
      <div>
        <h3 className="text-caption text-primary mb-3">Investment Thesis</h3>
        <div className="grid gap-3 md:grid-cols-2">
          <div
            className="rounded-lg p-4"
            style={{ borderLeft: "2px solid hsl(var(--bullish))", background: "rgba(52,211,153,0.04)" }}
          >
            <p className="text-[13px] font-semibold mb-2" style={{ color: "hsl(var(--bullish))" }}>
              Bull Case
            </p>
            <p className="text-[14px] text-[hsl(var(--text-secondary))] leading-relaxed">
              Services revenue accelerates past 30% of total revenue, driving margin expansion to 50%+.
              AI integration across product lines creates a new super-cycle driving hardware upgrades globally.
            </p>
          </div>
          <div
            className="rounded-lg p-4"
            style={{ borderLeft: "2px solid hsl(var(--bearish))", background: "rgba(248,113,113,0.04)" }}
          >
            <p className="text-[13px] font-semibold mb-2" style={{ color: "hsl(var(--bearish))" }}>
              Bear Case
            </p>
            <p className="text-[14px] text-[hsl(var(--text-secondary))] leading-relaxed">
              Regulatory forced sideloading erodes App Store margins significantly. China tensions
              escalate leading to supply chain disruption and demand destruction.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MemoResult;
