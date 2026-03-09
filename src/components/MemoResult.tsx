interface MemoResultProps {
  company: string;
}

const MemoResult = ({ company }: MemoResultProps) => {
  const metrics = [
    { label: "Market Cap", value: "$3.45T" },
    { label: "P/E Ratio", value: "33.2x" },
    { label: "Revenue TTM", value: "$394.3B" },
    { label: "Net Margin", value: "26.2%" },
    { label: "ROE", value: "147.2%" },
    { label: "Debt/Equity", value: "1.87" },
  ];

  return (
    <div className="mt-16 animate-[fade-in_0.5s_ease-out]">
      <div
        className="card-glass mx-auto max-w-[800px] p-8 md:p-10 text-left"
        style={{
          borderRadius: 16,
          boxShadow: "var(--shadow-float)",
          background:
            "linear-gradient(180deg, rgba(91,108,240,0.03) 0%, rgba(18,18,26,0.8) 15%)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between mb-8 pb-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div>
            <p className="text-caption mb-1">Investment Memo</p>
            <p className="text-[13px] text-text-tertiary">
              Generated March 9, 2026
            </p>
          </div>
          <span className="text-[13px] font-medium text-text-tertiary">
            MemoAI
          </span>
        </div>

        {/* Company */}
        <h2 className="text-[28px] font-semibold text-text-primary tracking-tight mb-1">
          {company}{" "}
          {company.toLowerCase().includes("apple") && "(AAPL)"}
          {company.toLowerCase().includes("nvidia") && "(NVDA)"}
          {company.toLowerCase().includes("reliance") && "(RELIANCE.NS)"}
          {company.toLowerCase().includes("stripe") && "(Private)"}
        </h2>
        <p className="text-[14px] text-text-secondary mb-8">
          Technology · Large Cap · NASDAQ
        </p>

        {/* Executive Summary */}
        <div className="mb-8">
          <h3 className="text-caption text-primary mb-3">
            Executive Summary
          </h3>
          <p className="text-[15px] text-text-secondary leading-relaxed mb-3">
            {company} demonstrates exceptional market positioning with sustained
            competitive advantages in hardware, software, and services
            ecosystems. The company's transition to services-driven revenue
            provides margin expansion tailwinds. Current valuation appears fair
            relative to growth trajectory. Capital return program remains
            best-in-class among mega-cap technology companies.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-text-tertiary font-medium uppercase tracking-wider">
              Recommendation:
            </span>
            <span
              className="text-[13px] font-semibold uppercase tracking-wider px-3 py-1 rounded"
              style={{
                color: "hsl(var(--accent))",
                border: "1px solid rgba(91,108,240,0.3)",
                background: "rgba(91,108,240,0.08)",
              }}
            >
              Accumulate
            </span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="mb-8">
          <h3 className="text-caption text-primary mb-3">Key Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-lg p-3"
                style={{
                  background: "hsl(var(--surface-higher))",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <p className="text-[11px] text-text-tertiary mb-0.5 uppercase tracking-wider font-medium">
                  {m.label}
                </p>
                <p className="text-[24px] font-medium text-text-primary font-mono-data">
                  {m.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Market Sentiment */}
        <div className="mb-8">
          <h3 className="text-caption text-primary mb-3">Market Sentiment</h3>
          <div className="flex items-center gap-3">
            <span
              className="rounded-md px-3 py-1 text-[13px] font-semibold"
              style={{
                color: "hsl(var(--bullish))",
                background: "rgba(52, 211, 153, 0.08)",
                border: "1px solid rgba(52, 211, 153, 0.2)",
              }}
            >
              Moderately Bullish
            </span>
            <span className="text-[13px] text-text-tertiary">
              Based on 47 recent articles
            </span>
          </div>
        </div>

        {/* Risk Factors */}
        <div className="mb-8">
          <h3 className="text-caption text-primary mb-3">Risk Factors</h3>
          <ul className="space-y-2 text-[14px] text-text-secondary">
            <li className="flex gap-2">
              <span className="text-bearish mt-0.5 text-[8px]">●</span>
              Regulatory headwinds across EU and US antitrust actions could
              impact App Store economics
            </li>
            <li className="flex gap-2">
              <span className="text-neutral mt-0.5 text-[8px]">●</span>
              China revenue concentration exposes the company to geopolitical and
              macro risks
            </li>
            <li className="flex gap-2">
              <span className="text-neutral mt-0.5 text-[8px]">●</span>
              Hardware upgrade cycle deceleration may pressure near-term revenue
              growth
            </li>
          </ul>
        </div>

        {/* Investment Thesis */}
        <div>
          <h3 className="text-caption text-primary mb-3">Investment Thesis</h3>
          <div className="grid gap-3 md:grid-cols-2">
            <div
              className="rounded-lg p-4"
              style={{
                borderLeft: "2px solid hsl(var(--bullish))",
                background: "rgba(52, 211, 153, 0.04)",
              }}
            >
              <p
                className="text-[13px] font-semibold mb-2"
                style={{ color: "hsl(var(--bullish))" }}
              >
                Bull Case
              </p>
              <p className="text-[14px] text-text-secondary leading-relaxed">
                Services revenue accelerates past 30% of total revenue, driving
                margin expansion to 50%+. AI integration across product lines
                creates a new super-cycle driving hardware upgrades globally.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{
                borderLeft: "2px solid hsl(var(--bearish))",
                background: "rgba(248, 113, 113, 0.04)",
              }}
            >
              <p
                className="text-[13px] font-semibold mb-2"
                style={{ color: "hsl(var(--bearish))" }}
              >
                Bear Case
              </p>
              <p className="text-[14px] text-text-secondary leading-relaxed">
                Regulatory forced sideloading erodes App Store margins
                significantly. China tensions escalate leading to supply chain
                disruption and demand destruction in the world's second-largest
                market.
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-caption mt-6 text-center">Generated in 42 seconds</p>
    </div>
  );
};

export default MemoResult;
