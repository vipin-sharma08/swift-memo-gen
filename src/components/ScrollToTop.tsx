import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-card text-foreground border border-border transition-all duration-200 hover:bg-secondary"
      style={{ boxShadow: "var(--shadow-subtle)" }}
      aria-label="Scroll to top"
    >
      <ArrowUp size={18} />
    </button>
  );
};

export default ScrollToTop;
