import { useScrollReveal } from "@/hooks/useScrollReveal";

const features = [
  {
    title: "Executive Summary",
    desc: "Thesis, recommendation tier (Conviction Buy / Accumulate / Hold / Monitor / Reduce), and key catalysts",
  },
  {
    title: "Company Overview",
    desc: "Business model analysis, competitive moat, market positioning, and unit economics",
  },
  {
    title: "Financial Deep-Dive",
    desc: "Margins, valuations, peer benchmarks, and growth trajectory",
  },
  {
    title: "Competitive Landscape",
    desc: "2-3 key competitors with differentiation analysis",
  },
  {
    title: "Risk Matrix",
    desc: "Company, sector, and macro risks ranked by probability and impact",
  },
  {
    title: "News Sentiment",
    desc: "AI-scored sentiment from recent headlines with bullish/bearish signals",
  },
  {
    title: "Investment Thesis",
    desc: "Bull, base, and bear scenarios with indicative range",
  },
  {
    title: "Key Metrics Dashboard",
    desc: "6 critical metrics with Good/Neutral/Concerning assessment",
  },
];

const FeaturesStrip = () => {
  const ref = useScrollReveal();

  return (
    <section id="features" className="section-padding" ref={ref}>
      <div className="content-max">
        <p className="text-caption mb-3 reveal stagger-1">
          What's Inside Every Memo
        </p>
        <h2 className="text-headline-section mb-14 reveal stagger-2">
          Eight sections. Zero fluff.
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`border-t-2 border-primary pt-5 reveal stagger-${(i % 4) + 1}`}
            >
              <h3 className="text-[15px] font-semibold text-text-primary mb-2">
                {f.title}
              </h3>
              <p className="text-[13px] text-text-secondary leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesStrip;
