import { useState, useCallback } from "react";
import { Search } from "lucide-react";
import MemoResult from "./MemoResult";

const LOADING_MESSAGES = [
  "Searching for company...",
  "Pulling financial data...",
  "Analyzing competitive position...",
  "Scoring news sentiment...",
  "Generating investment thesis...",
  "Formatting your memo...",
];

const EXAMPLE_CHIPS = ["Apple", "Reliance Industries", "Stripe"];

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const generate = useCallback((company: string) => {
    if (!company.trim()) return;
    setResult(null);
    setLoading(true);
    setLoadingMsg(LOADING_MESSAGES[0]);

    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < LOADING_MESSAGES.length) {
        setLoadingMsg(LOADING_MESSAGES[i]);
      } else {
        clearInterval(interval);
        setLoading(false);
        setResult(company.trim());
      }
    }, 1500);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generate(query);
  };

  const handleChip = (name: string) => {
    setQuery(name);
    generate(name);
  };

  return (
    <section id="hero" className="hero-mesh pt-[140px] pb-[80px] relative">
      <div className="content-max text-center relative z-10">
        <p className="text-caption reveal visible stagger-1 mb-5">
          AI-Powered Investment Research
        </p>
        <h1 className="text-headline-hero reveal visible stagger-2 mb-5">
          Company name in.
          <br />
          Investment memo out.
        </h1>
        <p className="text-subheadline reveal visible stagger-3 mx-auto max-w-[540px] mb-10">
          Generate institutional-quality investment memos for public companies,
          private startups, and pre-IPO targets. Powered by Claude AI.
        </p>

        {/* Search bar */}
        <form
          onSubmit={handleSubmit}
          className="reveal visible stagger-4 mx-auto max-w-[560px]"
        >
          <div
            className="relative flex items-center rounded-xl bg-card transition-all duration-200 focus-within:ring-[3px] focus-within:ring-primary/10"
            style={{
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Search
              className="absolute left-4 text-text-tertiary"
              size={18}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search any company... e.g. Apple, Flipkart, Stripe"
              className="h-[52px] w-full bg-transparent pl-11 pr-[130px] text-[15px] text-text-primary placeholder:text-text-tertiary focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-1.5 rounded-lg bg-primary px-5 py-2 text-[14px] font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/85"
              style={{ height: 40 }}
            >
              Generate
            </button>
          </div>
        </form>

        {/* Chips */}
        <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
          {EXAMPLE_CHIPS.map((name) => (
            <button
              key={name}
              onClick={() => handleChip(name)}
              className="rounded-lg px-4 py-1.5 text-[13px] font-medium text-text-secondary transition-all duration-200 hover:text-text-primary hover:border-primary/40"
              style={{
                background: "hsl(var(--surface-higher))",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {name}
            </button>
          ))}
        </div>

        <p className="text-caption mt-5">
          Free to use · No signup · Covers public and private companies
        </p>

        {/* Loading */}
        {loading && (
          <div className="mt-16 flex flex-col items-center gap-4">
            <div className="flex gap-1.5">
              <span className="loading-dot" />
              <span className="loading-dot" />
              <span className="loading-dot" />
            </div>
            <p className="text-[14px] text-text-secondary transition-opacity duration-300">
              {loadingMsg}
            </p>
          </div>
        )}

        {/* Result */}
        {result && !loading && <MemoResult company={result} />}
      </div>
    </section>
  );
};

export default HeroSection;
