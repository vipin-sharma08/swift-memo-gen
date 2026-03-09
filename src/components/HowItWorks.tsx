import { Search, Sparkles, FileText } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Enter a company name",
    desc: "Type any publicly traded company. We support US, Indian, and global markets.",
  },
  {
    num: "02",
    icon: Sparkles,
    title: "AI analyzes everything",
    desc: "Our AI pulls real-time financials, news sentiment, competitive data, and market positioning in seconds.",
  },
  {
    num: "03",
    icon: FileText,
    title: "Get your investment memo",
    desc: "Receive a structured, institutional-quality memo with executive summary, financial analysis, risk factors, and investment thesis.",
  },
];

const HowItWorks = () => {
  const ref = useScrollReveal();

  return (
    <section id="how-it-works" className="section-padding">
      <div className="content-max text-center" ref={ref}>
        <p className="text-caption mb-3 reveal stagger-1">How It Works</p>
        <h2 className="text-headline-section mb-16 reveal stagger-2">Three steps. Sixty seconds.</h2>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className={`card-memo p-6 text-left transition-all duration-300 reveal stagger-${i + 2}`}
            >
              <span className="text-[48px] font-bold text-border leading-none">{s.num}</span>
              <div className="mt-4 mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <s.icon size={20} className="text-foreground" />
              </div>
              <h3 className="text-[17px] font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
