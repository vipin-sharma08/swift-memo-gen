import MemoResult from "./MemoResult";

const SampleOutput = () => {
  return (
    <section
      id="sample"
      className="py-32 md:py-40 border-b border-rule"
    >
      <div className="max-w-page mx-auto px-6 sm:px-12 md:px-16">
        <p className="label-eyebrow">Sample Output</p>
        <h2 className="display-section mt-6">See a sample memo.</h2>
      </div>

      <div className="mt-16">
        <MemoResult company="Apple Inc." />
      </div>
    </section>
  );
};

export default SampleOutput;
