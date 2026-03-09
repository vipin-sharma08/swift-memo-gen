import { useState, useCallback } from "react";
import { Search } from "lucide-react";
import MemoResult from "./MemoResult";

const LOADING_MESSAGES = [
  "Pulling financial data...",
  "Analyzing market position...",
  "Generating investment thesis...",
  "Formatting memo...",
];

const EXAMPLE_CHIPS = ["Apple", "Reliance Industries", "Nvidia"];

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const generate = useCallback((company: string) => {
    if (!company.trim()) return;
    setResult(null);
    setLoading(true);
    setLoadingMsg(`Analyzing ${company}...`);

    let i = 0;
    const interval = setInterval(() => {
      if (i < LOADING_MESSAGES.length) {
        setLoadingMsg(LOADING_MESSAGES[i]);
        i++;
      } else {
        clearInterval(interval);
        setLoading(false);
        setResult(company.trim());
      }
    }, 800);
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
    <section id="hero" className="pt-[140px] pb-[80px]">
      <div className="content-max text-center">
        <p className="text-caption reveal visible stagger-1 mb-4">AI-Powered Investment Research</p>
        <h1 className="text-headline-hero reveal visible stagger-2 mb-5">
          Company name in.
          <br />
          Investment memo out.
        </h1>
        <p className="text-subheadline reveal visible stagger-3 mx-auto max-w-[640px] mb-10">
          MemoAI generates institutional-quality investment memos in under 60 seconds. Powered by AI. Built for serious investors.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSubmit} className="reveal visible stagger-4 mx-auto max-w-[600px]">
          <div
            className="relative flex items-center rounded-[14px] border-[1.5px] border-border bg-card transition-all duration-200 focus-within:border-primary"
            style={{
              boxShadow: "var(--shadow-subtle)",
            }}
          >
            <Search className="absolute left-4 text-muted-foreground" size={20} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search any public company... e.g. Apple, Reliance Industries, Tesla"
              className="h-[56px] w-full bg-transparent pl-11 pr-[160px] text-[16px] text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-2 rounded-[10px] bg-primary px-5 py-2.5 text-[15px] font-medium text-primary-foreground transition-all duration-200 hover:brightness-110"
              style={{ height: 42 }}
            >
              Generate Memo
            </button>
          </div>
        </form>

        {/* Chips */}
        <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
          {EXAMPLE_CHIPS.map((name) => (
            <button
              key={name}
              onClick={() => handleChip(name)}
              className="rounded-full bg-secondary px-4 py-1.5 text-[13px] font-medium text-foreground transition-colors duration-200 hover:bg-border"
            >
              Try: {name}
            </button>
          ))}
        </div>

        <p className="text-caption mt-4">Free to use · No signup required · 60-second generation</p>

        {/* Loading */}
        {loading && (
          <div className="mt-16 flex flex-col items-center gap-4">
            <div className="flex gap-1.5">
              <span className="loading-dot" />
              <span className="loading-dot" />
              <span className="loading-dot" />
            </div>
            <p className="text-[15px] text-muted-foreground transition-opacity duration-300">
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
