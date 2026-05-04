import { useState, useEffect } from "react";

const LOADING_MESSAGES = [
  "Searching financial databases",
  "Pulling real-time market data",
  "Analyzing news sentiment",
  "Generating investment memo",
];

const LoadingState = () => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 3500);
    return () => clearInterval(msgInterval);
  }, []);

  useEffect(() => {
    const progInterval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 1.5));
    }, 80);
    return () => clearInterval(progInterval);
  }, []);

  return (
    <div className="mt-12 max-w-[640px]">
      <div className="flex items-center gap-4">
        <span className="label-eyebrow whitespace-nowrap">Generating</span>
        <div className="flex-1 h-px bg-rule relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <p
        key={msgIndex}
        className="mt-4 font-sans text-[14px] text-ink-muted fade-up"
      >
        {LOADING_MESSAGES[msgIndex]}…
      </p>
      <p className="mt-2 font-sans text-[12px] text-ink-faint">
        This usually takes 30–60 seconds.
      </p>
    </div>
  );
};

export default LoadingState;
