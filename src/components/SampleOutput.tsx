import MemoResult from "./MemoResult";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const SampleOutput = () => {
  const ref = useScrollReveal();

  return (
    <section id="sample" className="section-padding" ref={ref}>
      <div className="content-max text-center">
        <p className="text-caption mb-3 reveal stagger-1">Sample Output</p>
        <h2 className="text-headline-section mb-12 reveal stagger-2">
          See a sample memo.
        </h2>
        <div className="reveal stagger-3">
          <MemoResult company="Apple Inc." />
        </div>
      </div>
    </section>
  );
};

export default SampleOutput;
