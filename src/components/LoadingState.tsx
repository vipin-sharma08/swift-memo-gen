import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

const LOADING_MESSAGES = [
  "Searching financial databases...",
  "Pulling real-time market data...",
  "Analyzing news sentiment...",
  "Generating investment memo...",
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
    <div className="mt-10 mx-auto max-w-[560px] animate-[fade-in_0.4s_ease-out]">
      <div
        className="card-glass p-6 rounded-2xl"
        style={{ background: "rgba(18,18,26,0.9)" }}
      >
        {/* Skeleton rows */}
        <div className="space-y-3 mb-5">
          <div className="h-3 w-3/4 rounded bg-[hsl(var(--surface-higher))] animate-pulse" />
          <div className="h-3 w-full rounded bg-[hsl(var(--surface-higher))] animate-pulse" />
          <div className="h-3 w-5/6 rounded bg-[hsl(var(--surface-higher))] animate-pulse" />
          <div className="h-3 w-2/3 rounded bg-[hsl(var(--surface-higher))] animate-pulse" />
        </div>

        {/* Progress bar */}
        <Progress value={progress} className="h-1 bg-[hsl(var(--surface-higher))]" />

        {/* Status message */}
        <p
          key={msgIndex}
          className="mt-4 text-[14px] text-[hsl(var(--text-secondary))] text-center animate-[fade-in_0.3s_ease-out]"
        >
          {LOADING_MESSAGES[msgIndex]}
        </p>
        <p className="mt-1.5 text-[12px] text-[hsl(var(--text-tertiary))] text-center">
          This usually takes 30–60 seconds
        </p>
      </div>
    </div>
  );
};

export default LoadingState;
