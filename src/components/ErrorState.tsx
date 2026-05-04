interface ErrorStateProps {
  onRetry: () => void;
}

const ErrorState = ({ onRetry }: ErrorStateProps) => (
  <div className="mt-12 max-w-[640px]">
    <p className="label-eyebrow text-warn">Error</p>
    <hr className="border-0 border-t border-rule mt-2 mb-4" />
    <p className="font-serif text-[17px] leading-[1.6] text-ink">
      Something went wrong generating that memo. If the issue persists, try a
      different company name.
    </p>
    <button
      type="button"
      onClick={onRetry}
      className="ui-link mt-4 font-sans text-[14px] font-medium tracking-wide"
    >
      Try again →
    </button>
  </div>
);

export default ErrorState;
