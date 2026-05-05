import MemoSearchForm from "./MemoSearchForm";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative pt-20 md:pt-40 pb-24 md:pb-40 border-b border-rule"
    >
      <div className="max-w-page mx-auto px-6 sm:px-12 md:px-16">
        <div className="max-w-[1000px]">
          <p
            className="label-eyebrow fade-up"
            style={{ animationDelay: "0ms" }}
          >
            Issue 01 · Investment Research, Automated
          </p>

          <h1
            className="display-hero mt-8 md:mt-10 fade-up"
            style={{ animationDelay: "80ms" }}
          >
            Company name in.
            <br />
            Investment memo out<span className="text-accent">.</span>
          </h1>

          <p
            className="font-serif italic text-[17px] md:text-[20px] leading-[1.5] text-ink-muted mt-8 md:mt-10 max-w-[52ch] fade-up"
            style={{ animationDelay: "160ms" }}
          >
            Generate institutional-quality investment memos for public
            companies, private startups, and pre-IPO targets. Powered by Claude
            AI.
          </p>

          <div
            className="mt-10 md:mt-14 fade-up"
            style={{ animationDelay: "240ms" }}
          >
            <MemoSearchForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
