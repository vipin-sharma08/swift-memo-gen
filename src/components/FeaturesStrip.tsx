const features = [
  {
    title: "Executive Summary",
    desc: "Thesis, recommendation tier (Conviction Buy / Accumulate / Hold / Monitor / Reduce), and key catalysts.",
  },
  {
    title: "Company Overview",
    desc: "Business model analysis, competitive moat, market positioning, and unit economics.",
  },
  {
    title: "Financial Deep-Dive",
    desc: "Margins, valuations, peer benchmarks, and growth trajectory.",
  },
  {
    title: "Competitive Landscape",
    desc: "Two to three key competitors with differentiation analysis.",
  },
  {
    title: "Risk Matrix",
    desc: "Company, sector, and macro risks ranked by probability and impact.",
  },
  {
    title: "News Sentiment",
    desc: "AI-scored sentiment from recent headlines with bullish and bearish signals.",
  },
  {
    title: "Investment Thesis",
    desc: "Bull, base, and bear scenarios with indicative range.",
  },
  {
    title: "Key Metrics Dashboard",
    desc: "Six critical metrics with Good / Neutral / Concerning assessment.",
  },
];

const FeaturesStrip = () => {
  return (
    <section
      id="features"
      className="py-32 md:py-40 border-b border-rule"
    >
      <div className="max-w-page mx-auto px-6 sm:px-12 md:px-16">
        <p className="label-eyebrow">What's Inside Every Memo</p>
        <h2 className="display-section mt-6">Eight sections. Zero fluff.</h2>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`${i >= 4 ? "lg:pt-14 lg:border-t lg:border-rule" : ""}`}
            >
              <p className="font-mono text-[14px] tracking-[0.1em] text-ink-faint">
                {String(i + 1).padStart(2, "0")}
              </p>
              <hr className="border-0 border-t border-rule mt-3 mb-5" />
              <h3 className="font-serif text-[22px] leading-[1.2] text-ink">
                {f.title}
              </h3>
              <p className="font-sans text-[15px] leading-[1.55] text-ink-muted mt-3 max-w-[32ch]">
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
