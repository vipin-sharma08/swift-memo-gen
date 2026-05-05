interface Metric {
  label: string;
  value: string;
}

interface KeyMetricsProps {
  metrics: Metric[];
}

const KeyMetrics = ({ metrics }: KeyMetricsProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-0 lg:gap-y-0 lg:divide-x lg:divide-rule">
      {metrics.map((m, i) => {
        // Mobile (cols-2): items 0,1 in row 1 (no top border); 2+ get a top hairline.
        // Tablet (cols-3): items 0,1,2 in row 1; 3+ get a top hairline.
        // Desktop (cols-6): all in one row, top borders removed.
        const mobileRowBorder = i >= 2;
        const tabletRowBorder = i >= 3;
        return (
          <div
            key={m.label}
            className={[
              "py-6",
              mobileRowBorder ? "border-t border-rule" : "",
              tabletRowBorder
                ? "sm:border-t sm:border-rule"
                : "sm:border-t-0",
              "lg:border-t-0 lg:py-0 lg:px-4 lg:first:pl-0 lg:last:pr-0",
            ].join(" ")}
          >
            <p className="label-eyebrow text-[10px] mb-2">{m.label}</p>
            <p className="font-mono text-[26px] sm:text-[28px] lg:text-[26px] xl:text-[32px] font-medium text-ink leading-none">
              {m.value}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default KeyMetrics;
