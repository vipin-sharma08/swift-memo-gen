import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  onRetry: () => void;
}

const ErrorState = ({ onRetry }: ErrorStateProps) => (
  <div className="mt-10 mx-auto max-w-[560px] animate-[fade-in_0.4s_ease-out]">
    <div
      className="card-glass p-6 rounded-2xl text-center"
      style={{ background: "rgba(18,18,26,0.9)" }}
    >
      <AlertCircle
        className="mx-auto mb-3 text-[hsl(var(--text-tertiary))]"
        size={28}
        strokeWidth={1.5}
      />
      <p className="text-[15px] text-[hsl(var(--text-primary))] font-medium mb-1">
        Something went wrong. Please try again.
      </p>
      <p className="text-[13px] text-[hsl(var(--text-tertiary))] mb-5">
        If the issue persists, try a different company name.
      </p>
      <button
        onClick={onRetry}
        className="rounded-lg bg-primary px-5 py-2 text-[14px] font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/85"
      >
        Try Again
      </button>
    </div>
  </div>
);

export default ErrorState;
