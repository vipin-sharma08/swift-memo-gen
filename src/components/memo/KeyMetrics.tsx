interface Metric {
  label: string;
  value: string;
}

interface KeyMetricsProps {
  metrics: Metric[];
}

const KeyMetrics = ({ metrics }: KeyMetricsProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-8 lg:gap-y-0 lg:divide-x lg:divide-rule">
      {metrics.map((m) => (
        <div key={m.label} className="lg:px-4 lg:first:pl-0 lg:last:pr-0">
          <p className="label-eyebrow text-[10px] mb-2">{m.label}</p>
          <p className="font-mono text-[28px] lg:text-[26px] xl:text-[32px] font-medium text-ink leading-none">
            {m.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default KeyMetrics;
