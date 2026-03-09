import { Search, Sparkles, FileText } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Enter any company",
    desc: "Public or private. US, Indian, or global. Type a name or ticker.",
  },
  {
    num: "02",
    icon: Sparkles,
    title: "AI analyzes everything",
    desc: "Real-time financials, news sentiment, competitive positioning, and market data — assembled in seconds.",
  },
  {
    num: "03",
    icon: FileText,
    title: "Get your memo",
    desc: "A structured, analyst-grade memo with thesis, risks, financials, and sentiment — ready for your investment committee.",
  },
];

const HowItWorks = () => {
  const ref = useScrollReveal();

  return (
    <section id="how-it-works" className="section-padding">
      <div className="content-max text-center" ref={ref}>
        <p className="text-caption mb-3 reveal stagger-1">How It Works</p>
        <h2 className="text-headline-section mb-16 reveal stagger-2">
          Three steps. Sixty seconds.
        </h2>

        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className={`card-glass p-7 text-left transition-all duration-200 reveal stagger-${i + 2}`}
            >
              <span
                className="text-[40px] font-semibold leading-none"
                style={{ color: "hsl(var(--surface-higher))" }}
              >
                {s.num}
              </span>
              <div className="mt-4 mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-surface-higher">
                <s.icon size={18} className="text-text-tertiary" />
              </div>
              <h3 className="text-[16px] font-semibold text-text-primary mb-2">
                {s.title}
              </h3>
              <p className="text-[14px] text-text-secondary leading-relaxed">
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
