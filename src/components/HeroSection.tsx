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
          body: JSON.stringify({ company: company.trim() })
        }
      );
      const raw = await res.json();
      const data = Array.isArray(raw) ? raw[0] : raw;

      if (data.success) {
        setMemoData({
          company: data.companyName || company.trim(),
          ticker: data.ticker || "",
          sector: data.profile?.sector || "",
          price: data.quote?.price || "",
          market_cap_formatted: data.quote?.marketCap || "",
          sentiment: data.sentiment?.label || "",
          recommendation: data.recommendation || "",
          content: data.memo || ""
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
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-x-hidden"
      style={{ background: "#080B14", paddingTop: 80 }}>
      
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
          "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(108,95,252,0.12) 0%, transparent 70%)"
        }} />

      <div className="w-full max-w-[720px] mx-auto px-4 text-center relative z-10">
        <h1
          className="text-[clamp(28px,4.8vw,68px)] tracking-[-0.03em] leading-[1.1] reveal visible stagger-2"
          style={{ marginBottom: 16 }}>
          <span className="font-bold text-white block">Company name in.</span>
          <span
            className="font-extrabold block"
            style={{
              background: "linear-gradient(90deg, #ffffff 30%, #a89dff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
            Investment memo out.
          </span>
        </h1>

        {/* Centered narrow column */}
        <div className="flex flex-col items-center w-full" style={{ maxWidth: 560, margin: "0 auto" }}>
          <p
            className="text-[12px] font-medium uppercase reveal visible stagger-1"
            style={{ letterSpacing: "0.05em", color: "#5B6EFF", marginBottom: 12, order: -1 }}>
            AI-Powered Investment Research
          </p>

          <p
            className="reveal visible stagger-3 font-normal text-center"
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              color: "#8B93A7",
              marginBottom: 44,
              maxWidth: 500
            }}>
            Generate institutional-quality investment memos for public companies, private startups, and pre-IPO targets. Powered by Claude AI.
          </p>

          {/* Search bar */}
          <form
            onSubmit={handleSubmit}
            className="reveal visible stagger-4 w-full"
            style={{ marginBottom: 20 }}>
            <div
              className="relative flex items-center rounded-[12px] h-[56px] transition-all duration-200 focus-within:shadow-[0_0_0_3px_rgba(108,95,252,0.15)]"
              style={{
                background: "#12162A",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "12px 8px 12px 18px"
              }}>
              <Search className="shrink-0 mr-3" size={20} style={{ color: "rgba(255,255,255,0.3)" }} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search any company... e.g. Apple, Flipkart, Stripe"
                className="h-full w-full bg-transparent text-[15px] text-white placeholder:text-white/35 focus:outline-none" />
              <button
                type="submit"
                disabled={loading}
                className="shrink-0 rounded-[9px] text-[14px] font-medium text-white transition-all duration-150 hover:-translate-y-px active:scale-[0.97] disabled:opacity-60 cursor-pointer"
                style={{
                  background: "#6C5FFC",
                  padding: "10px 24px"
                }}>
                Generate
              </button>
            </div>
          </form>

          {/* Chips */}
          {!loading && !error &&
            <div className="flex items-center justify-center gap-2 flex-wrap" style={{ marginBottom: 16 }}>
              {EXAMPLE_CHIPS.map((name) =>
                <button
                  key={name}
                  onClick={() => handleChip(name)}
                  className="rounded-full text-[13px] font-normal transition-all duration-150 cursor-pointer hover:text-white flex items-center justify-center"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    padding: "6px 16px",
                    color: "#9CA3AF",
                    minWidth: 88
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(108,95,252,0.45)";
                    e.currentTarget.style.background = "rgba(108,95,252,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  }}>
                  {name}
                </button>
              )}
            </div>
          }

          {!loading && !error &&
            <p style={{ fontSize: 12, color: "#4B5563" }}>
              Free to use / No signup / Public &amp; private companies
            </p>
          }

          {/* Loading */}
          {loading && <LoadingState />}

          {/* Error */}
          {error && !loading && <ErrorState onRetry={handleRetry} />}
        </div>

        {/* Result */}
        {memoData && !loading && !error &&
          <div id="memo-result">
            <MemoResult data={memoData} />
          </div>
        }
      </div>
    </section>);

};

export default HeroSection;