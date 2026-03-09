import { useScrollReveal } from "@/hooks/useScrollReveal";

const CTASection = () => {
  const ref = useScrollReveal();

  const scrollToHero = () => {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="content-max text-center">
        <h2 className="text-headline-section mb-4 reveal stagger-1">
          Ready to save 4 hours per memo?
        </h2>
        <p className="text-subheadline mb-10 reveal stagger-2">
          Join hundreds of investors using AI to work smarter.
        </p>
        <div className="reveal stagger-3">
          <button
            onClick={scrollToHero}
            className="rounded-[10px] bg-primary px-8 py-3.5 text-[17px] font-medium text-primary-foreground transition-all duration-200 hover:brightness-110"
          >
            Generate Your First Memo — Free
          </button>
        </div>
        <p className="text-caption mt-5 reveal stagger-4">
          No signup · No credit card · Just results
        </p>
      </div>
    </section>
  );
};

export default CTASection;
