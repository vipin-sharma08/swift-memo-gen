import { useScrollReveal } from "@/hooks/useScrollReveal";

const CARDS = [
  { title: "Claude AI", subtitle: "Anthropic's most capable model for institutional-quality analysis" },
  { title: "Financial Modeling Prep", subtitle: "Real-time market data, financials, and news for 50,000+ tickers" },
  { title: "N8N", subtitle: "Workflow orchestration with parallel API calls and error handling" },
  { title: "React + TypeScript", subtitle: "Modern frontend with dark mode and responsive design" },
];

const TechStack = () => {
  const ref = useScrollReveal();

  return (
    <section id="built-with" className="section-padding" ref={ref}>
      <div className="content-max text-center">
        <p className="text-caption mb-3 reveal stagger-1">Built With</p>
        <h2 className="text-headline-section mb-12 reveal stagger-2">
          Production-grade infrastructure.
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 reveal stagger-3">
          {CARDS.map((c) => (
            <div
              key={c.title}
              className="card-glass p-6 text-left rounded-xl"
            >
              <p className="text-[15px] font-semibold text-[hsl(var(--text-primary))] mb-1.5">
                {c.title}
              </p>
              <p className="text-[13px] text-[hsl(var(--text-secondary))] leading-relaxed">
                {c.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
