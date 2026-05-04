import { ReactNode } from "react";

interface MemoViewProps {
  children: ReactNode;
}

const MemoView = ({ children }: MemoViewProps) => {
  return (
    <article
      className="mx-auto max-w-memo px-6 sm:px-12 md:px-16 pt-24 pb-[120px]"
      style={{ backgroundColor: "hsl(var(--bg-elevated))" }}
    >
      {children}
    </article>
  );
};

export default MemoView;
