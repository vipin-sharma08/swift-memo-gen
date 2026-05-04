import { ReactNode } from "react";

interface MemoSectionProps {
  number: string;
  label: string;
  children: ReactNode;
}

const MemoSection = ({ number, label, children }: MemoSectionProps) => {
  return (
    <section className="mt-16">
      <header className="flex items-center gap-4 mb-6">
        <span className="font-mono text-[14px] text-ink-faint tracking-wider">
          {number}
        </span>
        <span className="label-eyebrow text-ink whitespace-nowrap">
          {label}
        </span>
        <div className="flex-1 border-t border-rule" aria-hidden="true" />
      </header>
      {children}
    </section>
  );
};

export default MemoSection;
