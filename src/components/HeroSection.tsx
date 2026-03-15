import { useState, useCallback } from "react";
import { Search } from "lucide-react";
import MemoResult from "./MemoResult";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

const EXAMPLE_CHIPS = ["Apple", "Reliance Industries", "Stripe", "Zerodha"];

export interface MemoData {
  company: string;
  ticker: string;
  sector: string;
  price: string;
  market_cap_formatted: string;
  sentiment: string;
  recommendation: string;
  content: string;
}

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [memoData, setMemoData] = useState<MemoData | null>(null);

  const generate = useCallback(async (company: string) => {
    if (!company.trim()) return;
    setMemoData(null);
    setError(false);
    setLoading(true);

    try {
      const res = await fetch(
        "https://vipinnn.app.n8n.cloud/webhook/generate-memo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ company: company.trim() }),
        }
      );
      const data = await res.json();

      if (data.success) {
        setMemoData({
          company: data.memo.company || company.trim(),
          ticker: data.memo.ticker || "",
          sector: data.memo.sector || "",
          price: data.memo.price || "",
          market_cap_formatted: data.memo.market_cap_formatted || "",
          sentiment: data.memo.sentiment || "",
          recommendation: data.memo.recommendation || "",
          content: data.memo.content || "",
        });
        // Scroll to result after a tick
        setTimeout(() => {
          document.getElementById("memo-result")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generate(query);
  };

  const handleChip = (name: string) => {
    setQuery(name);
    generate(name);
  };

  const handleRetry = () => {
    if (query.trim()) generate(query);
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
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <Search className="absolute left-4 text-[hsl(var(--text-tertiary))]" size={18} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search any company... e.g. Apple, Flipkart, Stripe"
              className="h-[52px] w-full bg-transparent pl-11 pr-[130px] text-[15px] text-[hsl(var(--text-primary))] placeholder:text-[hsl(var(--text-tertiary))] focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-1.5 rounded-lg bg-primary px-5 py-2 text-[14px] font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/85 disabled:opacity-60"
              style={{ height: 40 }}
            >
              Generate
            </button>
          </div>
        </form>

        {/* Chips */}
        {!loading && !error && (
          <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
            {EXAMPLE_CHIPS.map((name) => (
              <button
                key={name}
                onClick={() => handleChip(name)}
                className="rounded-lg px-4 py-1.5 text-[13px] font-medium text-[hsl(var(--text-secondary))] transition-all duration-200 hover:text-[hsl(var(--text-primary))] hover:border-primary/40"
                style={{
                  background: "hsl(var(--surface-higher))",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {name}
              </button>
            ))}
          </div>
        )}

        {!loading && !error && (
          <p className="text-caption mt-5">
            Free to use · No signup · Covers public and private companies
          </p>
        )}

        {/* Loading */}
        {loading && <LoadingState />}

        {/* Error */}
        {error && !loading && <ErrorState onRetry={handleRetry} />}

        {/* Result */}
        {memoData && !loading && !error && (
          <div id="memo-result">
            <MemoResult data={memoData} />
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
