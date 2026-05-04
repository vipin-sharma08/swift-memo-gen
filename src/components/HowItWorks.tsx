const steps = [
  {
    num: "01",
    title: "Enter any company",
    desc: "Public or private. US, Indian, or global. Type a name or ticker.",
  },
  {
    num: "02",
    title: "AI analyses everything",
    desc: "Real-time financials, news sentiment, competitive positioning, and market data — assembled in seconds.",
  },
  {
    num: "03",
    title: "Get your memo",
    desc: "A structured, analyst-grade memo with thesis, risks, financials, and sentiment — ready for your investment committee.",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="py-32 md:py-40 border-b border-rule"
    >
      <div className="max-w-page mx-auto px-6 sm:px-12 md:px-16">
        <p className="label-eyebrow">How It Works</p>
        <h2 className="display-section mt-6">Three steps. Sixty seconds.</h2>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-y-14 md:gap-y-0 md:divide-x md:divide-rule">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className={`md:px-10 ${i === 0 ? "md:pl-0" : ""} ${
                i === steps.length - 1 ? "md:pr-0" : ""
              }`}
            >
              <p className="font-mono text-[14px] tracking-[0.1em] text-ink-faint">
                {s.num}
              </p>
              <hr className="border-0 border-t border-rule mt-3 mb-6" />
              <h3 className="font-serif text-[28px] leading-[1.15] text-ink">
                {s.title}
              </h3>
              <p className="font-sans text-[16px] leading-[1.55] text-ink-muted mt-4 max-w-[32ch]">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
