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
          Replace 4 hours of research
          <br />
          with 60 seconds.
        </h2>
        <p className="text-subheadline mb-10 reveal stagger-2">
          Built for analysts, fund managers, and MBA students.
        </p>
        <div className="reveal stagger-3">
          <button
            onClick={scrollToHero}
            className="rounded-xl bg-primary px-8 py-4 text-[15px] font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/85"
          >
            Generate Your First Memo
          </button>
        </div>
        <p className="text-caption mt-5 reveal stagger-4">
          No signup · No credit card · Public and private companies
        </p>
      </div>
    </section>
  );
};

export default CTASection;
