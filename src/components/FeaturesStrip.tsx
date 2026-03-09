import { useScrollReveal } from "@/hooks/useScrollReveal";

const features = [
  {
    title: "Executive Summary",
    desc: "A concise thesis with clear buy/hold/watch recommendation",
  },
  {
    title: "Financial Deep-Dive",
    desc: "Key metrics, margins, valuations, and peer comparisons",
  },
  {
    title: "Risk Analysis",
    desc: "Company-specific and macro risks ranked by likelihood and impact",
  },
  {
    title: "Sentiment Signal",
    desc: "AI-analyzed news sentiment with bullish/bearish indicators",
  },
];

const FeaturesStrip = () => {
  const ref = useScrollReveal();

  return (
    <section className="surface-dark section-padding" ref={ref}>
      <div className="content-max">
        <p className="text-caption mb-3 text-surface-dark-muted reveal stagger-1">
          What's Inside Every Memo
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`border-t-2 border-primary pt-5 reveal stagger-${i + 1}`}
            >
              <h3 className="text-[17px] font-semibold text-surface-dark-foreground mb-2">
                {f.title}
              </h3>
              <p className="text-[15px] text-surface-dark-muted leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesStrip;
