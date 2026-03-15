import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { id: "how-it-works", label: "How It Works" },
  { id: "features", label: "Features" },
  { id: "built-with", label: "About" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
      style={{
        height: 56,
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        background: scrolled ? "rgba(10, 10, 15, 0.8)" : "transparent",
        borderBottom: scrolled
          ? "1px solid rgba(255, 255, 255, 0.06)"
          : "1px solid transparent",
      }}
    >
      <div className="content-max flex h-[56px] items-center justify-between">
        <button
          onClick={() => scrollTo("hero")}
          className="text-[18px] font-semibold text-text-primary tracking-[-0.02em]"
        >
          MemoAI
        </button>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-[14px] text-text-secondary transition-colors duration-200 hover:text-text-primary"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("hero")}
            className="rounded-lg bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/85"
          >
            Try MemoAI
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden px-6 py-4 flex flex-col gap-4"
          style={{
            background: "rgba(10, 10, 15, 0.95)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {NAV_LINKS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-left text-[14px] text-text-secondary hover:text-text-primary"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("hero")}
            className="rounded-lg bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground w-fit"
          >
            Try MemoAI
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
