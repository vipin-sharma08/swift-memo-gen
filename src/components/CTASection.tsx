const CTASection = () => {
  const scrollToHero = () => {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="about"
      className="py-32 md:py-[200px] border-b border-rule"
    >
      <div className="max-w-page mx-auto px-6 sm:px-12 md:px-16">
        <h2 className="font-serif text-[clamp(36px,5vw,48px)] font-normal leading-[1.05] tracking-[-0.015em] text-ink">
          Generate your first memo<span className="text-accent">.</span>
        </h2>
        <button
          onClick={scrollToHero}
          className="ui-link mt-6 font-sans text-[15px] font-medium tracking-wide"
        >
          Start now →
        </button>
      </div>
    </section>
  );
};

export default CTASection;
