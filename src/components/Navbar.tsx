import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { id: "how-it-works", label: "How It Works" },
  { id: "features", label: "Features" },
  { id: "about", label: "About" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="border-b border-rule" aria-label="Main navigation" style={{ backgroundColor: "hsl(var(--bg))" }}>
      <div className="max-w-page mx-auto px-6 sm:px-12 md:px-16 flex h-16 items-center justify-between">
        <button
          onClick={() => scrollTo("hero")}
          className="font-sans text-[18px] font-medium text-ink tracking-tight"
        >
          MemoAI
        </button>

        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="font-sans text-[14px] text-ink-muted hover:text-ink transition-colors duration-150"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("hero")}
            className="ui-link font-sans text-[14px] font-medium"
          >
            Try MemoAI
          </button>
        </div>

        <button
          className="md:hidden text-ink"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-rule px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-left font-sans text-[14px] text-ink-muted hover:text-ink transition-colors"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("hero")}
            className="ui-link self-start font-sans text-[14px] font-medium"
          >
            Try MemoAI
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
