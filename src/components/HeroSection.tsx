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
          company: data.companyName || company.trim(),
          ticker: data.ticker || "",
          sector: data.profile?.sector || "",
          price: data.quote?.price || "",
          market_cap_formatted: data.quote?.marketCap || "",
          sentiment: data.sentiment?.label || "",
          recommendation: data.recommendation || "",
          content: data.memo || "",
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
    <section id="hero" className="hero-mesh relative min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[720px] mx-auto px-4 text-center relative z-10">
        <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-white/40 reveal visible stagger-1 mb-4">
          AI-Powered Investment Research
        </p>
        <h1 className="text-[clamp(36px,5vw,64px)] font-bold tracking-[-0.03em] leading-[1.1] text-white reveal visible stagger-2 mb-5">
          Company name in.
          <br />
          Investment memo out.
        </h1>
        <p className="text-[16px] leading-[1.6] text-white/50 mx-auto max-w-[520px] reveal visible stagger-3 mb-10">
          Generate institutional-quality investment memos for public companies,
          private startups, and pre-IPO targets. Powered by Claude AI.
        </p>

        {/* Search bar */}
        <form
          onSubmit={handleSubmit}
          className="reveal visible stagger-4 w-full"
        >
          <div
            className="relative flex items-center rounded-[14px] h-[56px] backdrop-blur-[20px] transition-all duration-200 focus-within:border-primary/40 focus-within:shadow-[0_0_0_3px_rgba(91,108,240,0.1)]"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Search className="absolute left-4 text-white/30" size={20} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search any company... e.g. Apple, Flipkart, Stripe"
              className="h-full w-full bg-transparent pl-12 pr-[140px] text-[15px] text-white placeholder:text-white/35 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 rounded-[10px] px-6 py-2.5 text-[14px] font-semibold text-white transition-all duration-200 hover:brightness-[1.15] hover:shadow-[0_0_16px_rgba(108,92,231,0.4)] disabled:opacity-60 cursor-pointer"
              style={{ background: "#6C5CE7", height: 40 }}
            >
              Generate
            </button>
          </div>
        </form>

        {/* Chips */}
        {!loading && !error && (
          <div className="mt-4 flex items-center justify-center gap-2.5 flex-wrap">
            {EXAMPLE_CHIPS.map((name) => (
              <button
                key={name}
                onClick={() => handleChip(name)}
                className="rounded-[20px] px-[18px] py-2 text-[13px] font-medium text-white/60 transition-all duration-200 hover:text-white hover:border-[rgba(108,92,231,0.5)] hover:bg-white/10 cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {name}
              </button>
            ))}
          </div>
        )}

        {!loading && !error && (
          <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/25 mt-8">
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
