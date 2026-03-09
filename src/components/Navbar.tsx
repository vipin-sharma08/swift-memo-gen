import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
      style={{
        height: 52,
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        background: scrolled ? "hsla(0,0%,98%,0.85)" : "transparent",
        borderBottom: scrolled ? "1px solid hsl(var(--border))" : "1px solid transparent",
      }}
    >
      <div className="content-max flex h-[52px] items-center justify-between">
        <button onClick={() => scrollTo("hero")} className="text-xl font-semibold text-foreground">
          MemoAI
        </button>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {["how-it-works", "sample", "about"].map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-[15px] text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {id === "how-it-works" ? "How It Works" : id === "sample" ? "Sample" : "About"}
            </button>
          ))}
          <button
            onClick={() => scrollTo("hero")}
            className="rounded-[10px] bg-primary px-4 py-2 text-[15px] font-medium text-primary-foreground transition-all duration-200 hover:brightness-110"
          >
            Try MemoAI
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border px-6 py-4 flex flex-col gap-4">
          {["how-it-works", "sample", "about"].map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-left text-[15px] text-muted-foreground"
            >
              {id === "how-it-works" ? "How It Works" : id === "sample" ? "Sample" : "About"}
            </button>
          ))}
          <button
            onClick={() => scrollTo("hero")}
            className="rounded-[10px] bg-primary px-4 py-2 text-[15px] font-medium text-primary-foreground w-fit"
          >
            Try MemoAI
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
