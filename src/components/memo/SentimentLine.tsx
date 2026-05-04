interface SentimentLineProps {
  label: string;
  articles: number;
}

const sentimentColor = (label: string) => {
  const norm = label.toLowerCase();
  if (norm.includes("bullish")) return "text-success";
  if (norm.includes("bearish")) return "text-warn";
  return "text-ink";
};

const SentimentLine = ({ label, articles }: SentimentLineProps) => {
  return (
    <div className="flex items-center gap-4">
      <span className="label-eyebrow whitespace-nowrap">Sentiment</span>
      <div className="flex-1 border-t border-rule" aria-hidden="true" />
      <span className="whitespace-nowrap">
        <span
          className={`font-sans text-[14px] font-medium uppercase tracking-[0.12em] ${sentimentColor(label)}`}
        >
          {label}
        </span>
        <span className="font-sans text-[13px] text-ink-muted ml-2">
          ({articles} articles)
        </span>
      </span>
    </div>
  );
};

export default SentimentLine;
