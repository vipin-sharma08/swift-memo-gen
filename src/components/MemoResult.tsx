interface MemoResultProps {
  company: string;
}

const MemoResult = ({ company }: MemoResultProps) => {
  const metrics = [
    { label: "Market Cap", value: "$3.45T" },
    { label: "P/E Ratio", value: "33.2x" },
    { label: "Revenue (TTM)", value: "$394.3B" },
    { label: "Net Income", value: "$100.9B" },
    { label: "Gross Margin", value: "46.2%" },
    { label: "Debt/Equity", value: "1.87" },
  ];

  return (
    <div className="mt-16 animate-[fade-in_0.5s_ease-out]">
      <div
        className="card-memo mx-auto max-w-[800px] p-8 md:p-12 text-left"
        style={{ boxShadow: "var(--shadow-float)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
          <div>
            <p className="text-caption mb-1">Investment Memo</p>
            <p className="text-[13px] text-muted-foreground">Generated March 9, 2026</p>
          </div>
          <span className="text-[13px] font-semibold text-muted-foreground">MemoAI</span>
        </div>

        {/* Company */}
        <h2 className="text-[28px] font-semibold text-foreground tracking-tight mb-1">
          {company} {company.toLowerCase().includes("apple") && "(AAPL)"}
          {company.toLowerCase().includes("nvidia") && "(NVDA)"}
          {company.toLowerCase().includes("reliance") && "(RELIANCE.NS)"}
        </h2>
        <p className="text-[14px] text-muted-foreground mb-8">
          Technology · Large Cap · NASDAQ
        </p>

        {/* Executive Summary */}
        <div className="mb-8">
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-primary mb-3">
            Executive Summary
          </h3>
          <p className="text-[15px] text-foreground leading-relaxed">
            {company} demonstrates exceptional market positioning with sustained competitive advantages in hardware, software, and services ecosystems. The company's transition to services-driven revenue provides margin expansion tailwinds. Current valuation appears fair relative to growth trajectory, supporting a <strong>Buy</strong> recommendation with a 12-month price target representing 15-20% upside. Capital return program remains best-in-class among mega-cap technology companies.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="mb-8">
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-primary mb-3">
            Key Metrics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {metrics.map((m) => (
              <div key={m.label} className="rounded-lg bg-secondary p-3">
                <p className="text-[12px] text-muted-foreground mb-0.5">{m.label}</p>
                <p className="text-[18px] font-semibold text-foreground">{m.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Market Sentiment */}
        <div className="mb-8">
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-primary mb-3">
            Market Sentiment
          </h3>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-success px-3 py-1 text-[13px] font-semibold text-success-foreground">
              Bullish
            </span>
            <span className="text-[14px] text-muted-foreground">
              Based on 47 recent news articles
            </span>
          </div>
        </div>

        {/* Risk Factors */}
        <div className="mb-8">
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-primary mb-3">
            Risk Factors
          </h3>
          <ul className="space-y-2 text-[15px] text-foreground">
            <li className="flex gap-2">
              <span className="text-destructive mt-0.5">●</span>
              Regulatory headwinds across EU and US antitrust actions could impact App Store economics
            </li>
            <li className="flex gap-2">
              <span className="text-warning mt-0.5">●</span>
              China revenue concentration exposes the company to geopolitical and macro risks
            </li>
            <li className="flex gap-2">
              <span className="text-warning mt-0.5">●</span>
              Hardware upgrade cycle deceleration may pressure near-term revenue growth
            </li>
          </ul>
        </div>

        {/* Investment Thesis */}
        <div>
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-primary mb-3">
            Investment Thesis
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-success/30 bg-success/5 p-4">
              <p className="text-[13px] font-semibold text-success mb-2">Bull Case</p>
              <p className="text-[14px] text-foreground leading-relaxed">
                Services revenue accelerates past 30% of total revenue, driving margin expansion to 50%+. AI integration across product lines creates a new super-cycle driving hardware upgrades globally.
              </p>
            </div>
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
              <p className="text-[13px] font-semibold text-destructive mb-2">Bear Case</p>
              <p className="text-[14px] text-foreground leading-relaxed">
                Regulatory forced sideloading erodes App Store margins significantly. China tensions escalate leading to supply chain disruption and demand destruction in the world's second-largest market.
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-caption mt-6">Generated in 42 seconds</p>
    </div>
  );
};

export default MemoResult;
