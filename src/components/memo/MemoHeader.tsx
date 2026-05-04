export type Recommendation =
  | "CONVICTION BUY"
  | "ACCUMULATE"
  | "HOLD"
  | "MONITOR"
  | "REDUCE";

interface MetadataField {
  label: string;
  value: string;
}

interface MemoHeaderProps {
  company: string;
  ticker: string;
  sector: string;
  recommendation: Recommendation;
  metadata: MetadataField[];
}

const verdictColor: Record<Recommendation, string> = {
  "CONVICTION BUY": "text-success",
  ACCUMULATE: "text-accent",
  HOLD: "text-ink",
  MONITOR: "text-ink",
  REDUCE: "text-warn",
};

const MemoHeader = ({
  company,
  ticker,
  sector,
  recommendation,
  metadata,
}: MemoHeaderProps) => {
  return (
    <header>
      <div className="grid grid-cols-2 gap-x-12 gap-y-5 pb-8 border-b border-rule">
        {metadata.map((field) => (
          <div key={field.label}>
            <p className="label-eyebrow text-[10px]">{field.label}</p>
            <p className="font-mono text-[13px] mt-1.5 text-ink">
              {field.value}
            </p>
          </div>
        ))}
      </div>

      <h1 className="font-serif font-normal text-ink mt-12 leading-[1.05] tracking-[-0.015em] text-[clamp(40px,6vw,56px)]">
        {company}
      </h1>
      <p className="font-mono text-[14px] text-ink-muted mt-3">{ticker}</p>
      <p className="font-sans italic text-[14px] text-ink-muted mt-1">
        {sector}
      </p>

      <div className="flex items-center gap-4 mt-10">
        <span className="label-eyebrow whitespace-nowrap">Recommendation</span>
        <div className="flex-1 border-t border-rule" aria-hidden="true" />
        <span
          className={`font-sans text-[14px] font-medium uppercase tracking-[0.12em] whitespace-nowrap ${verdictColor[recommendation]}`}
        >
          {recommendation}
        </span>
      </div>
    </header>
  );
};

export default MemoHeader;
