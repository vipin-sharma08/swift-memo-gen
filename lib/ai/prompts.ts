import type { CompanyData } from "../market/types.js";

export const PROMPT_VERSION = "v2.1.0"; // bumped from v2.0.0 — length discipline + token ceiling

export const SYSTEM_PROMPT = `You are a senior equity research analyst writing institutional-grade investment memos. You cover both Indian (NSE, BSE) and global equities.

CORE RULES:
- Base every quantitative claim on the provided market data context. Never invent numbers.
- When data is missing, state "Data unavailable" rather than guessing.
- Use markdown formatting in section bodies: tables for financials, bullet points for risks.
- Maintain a measured, analytical tone. No hype, no marketing language.
- Distinguish facts (from data) from analysis (your reasoning) in every section.
- Risk matrix must include at least: market risk, execution risk, regulatory/geopolitical risk. For Indian stocks, also include relevant sector-specific regulatory risk (RBI, SEBI, sector regulators).
- Investment thesis must include both bull and bear cases before the recommendation.
- For Indian stocks, contextualise valuation against Indian peers and Nifty/Sensex sector benchmarks where you can do so credibly.
- Currency in all numerical claims must match the currency provided in the data context. Do not convert.

LENGTH DISCIPLINE (mandatory):
- executiveSummary: 150-250 words. Lead with recommendation rationale.
- companyOverview: 250-400 words. Business segments and strategic context only.
- financialDeepDive: 400-550 words INCLUDING the markdown ratios table. Table is required; prose around it must be tight.
- competitiveLandscape: 250-400 words. One paragraph per major segment.
- riskMatrix: 400-550 words. Cover all required risk categories but be punchy — bullet points, not essays.
- newsSentiment: 100-200 words. If news is sparse or off-topic, say so briefly and move on.
- investmentThesis: 400-550 words. Bull case, bear case, recommendation rationale — each tight.

This is an institutional memo, not a research report. Analysts have 30 seconds to skim. Quality and precision over volume. If a sentence isn't earning its place, cut it.

OUTPUT: Conform exactly to the provided JSON schema. Section bodies are markdown strings.`;

// ----- Currency formatting helpers -----

function formatINR(amount: number): string {
  // Indian convention: lakhs and crores
  if (amount >= 1e7) {
    const cr = amount / 1e7;
    return `₹${cr.toLocaleString("en-IN", { maximumFractionDigits: 2 })} Cr`;
  }
  if (amount >= 1e5) {
    const lakh = amount / 1e5;
    return `₹${lakh.toLocaleString("en-IN", { maximumFractionDigits: 2 })} L`;
  }
  return `₹${amount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

function formatUSD(amount: number): string {
  if (amount >= 1e9) return `$${(amount / 1e9).toFixed(2)}B`;
  if (amount >= 1e6) return `$${(amount / 1e6).toFixed(2)}M`;
  return `$${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

function formatMoney(amount: number | null | undefined, currency: string): string {
  if (amount == null) return "N/A";
  if (currency === "INR") return formatINR(amount);
  if (currency === "USD") return formatUSD(amount);
  return `${currency} ${amount.toLocaleString()}`;
}

function formatPrice(price: number | null | undefined, currency: string): string {
  if (price == null) return "N/A";
  const symbol = currency === "INR" ? "₹" : currency === "USD" ? "$" : `${currency} `;
  return `${symbol}${price.toLocaleString(currency === "INR" ? "en-IN" : "en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatPercent(value: number | null | undefined): string {
  if (value == null) return "N/A";
  // Yahoo returns ratios as decimals (0.21 = 21%); rates as already-percent (1.5 = 1.5%)
  // Caller is responsible for choosing the right one — this helper assumes decimal.
  return `${(value * 100).toFixed(2)}%`;
}

function formatRatio(value: number | null | undefined): string {
  return value == null ? "N/A" : value.toFixed(2);
}

// ----- Prompt builders -----

export function buildPublicCompanyPrompt(data: CompanyData): string {
  const { profile, quote, stats, news, search } = data;
  const isIndian = search.exchange === "NSE" || search.exchange === "BSE";
  const exchangeLabel =
    search.exchange === "NSE"
      ? "NSE"
      : search.exchange === "BSE"
        ? "BSE"
        : search.exchange === "US"
          ? "US"
          : "International";

  const newsContext = news.length
    ? news
        .slice(0, 8)
        .map((n, i) => `${i + 1}. [${n.publishedAt.slice(0, 10)}] ${n.title} (${n.publisher})`)
        .join("\n")
    : "No recent news available.";

  return `Generate an institutional investment memo for ${profile.longName} (${profile.symbol}) listed on ${exchangeLabel}.

=== COMPANY PROFILE ===
Name: ${profile.longName}
Symbol: ${profile.symbol}
Exchange: ${exchangeLabel}
Sector: ${profile.sector ?? "N/A"}
Industry: ${profile.industry ?? "N/A"}
Country: ${profile.country ?? "N/A"}
Headquarters: ${profile.city ?? "N/A"}
Employees: ${profile.fullTimeEmployees?.toLocaleString() ?? "N/A"}
Website: ${profile.website ?? "N/A"}

Business description:
${profile.longBusinessSummary ?? "Not available."}

=== MARKET DATA (live, currency: ${quote.currency}) ===
Price: ${formatPrice(quote.regularMarketPrice, quote.currency)}
Day change: ${quote.regularMarketChangePercent.toFixed(2)}%
Market cap: ${formatMoney(quote.marketCap, quote.currency)}
Trailing P/E: ${formatRatio(quote.trailingPE)}
Forward P/E: ${formatRatio(quote.forwardPE)}
EPS (TTM): ${formatRatio(quote.epsTrailingTwelveMonths)}
52-week high: ${formatPrice(quote.fiftyTwoWeekHigh, quote.currency)}
52-week low: ${formatPrice(quote.fiftyTwoWeekLow, quote.currency)}
Volume: ${quote.regularMarketVolume.toLocaleString()}
Avg volume (3mo): ${quote.averageDailyVolume3Month?.toLocaleString() ?? "N/A"}

=== KEY STATISTICS ===
${
  stats
    ? `
Price/Book: ${formatRatio(stats.priceToBook)}
EV/EBITDA: ${formatRatio(stats.enterpriseToEbitda)}
Profit margin: ${formatPercent(stats.profitMargins)}
Return on equity: ${formatPercent(stats.returnOnEquity)}
Return on assets: ${formatPercent(stats.returnOnAssets)}
Debt/Equity: ${formatRatio(stats.debtToEquity)}
Current ratio: ${formatRatio(stats.currentRatio)}
Revenue growth (YoY): ${formatPercent(stats.revenueGrowth)}
Earnings growth (YoY): ${formatPercent(stats.earningsGrowth)}
Book value/share: ${formatRatio(stats.bookValue)}`
    : "Detailed key statistics unavailable for this security."
}

=== RECENT NEWS HEADLINES ===
${newsContext}

=== INSTRUCTIONS ===
Use the data above as ground truth. Currency in all numerical claims must be ${quote.currency}.

The financialDeepDive section must include a markdown table summarising the key ratios listed above.
The newsSentiment section must reference at least three of the news headlines above by name when at least three are available.
The recommendation must logically follow from the financials, valuation, and news.
${
  isIndian
    ? `\nThis is an Indian-listed equity. Frame valuation in Indian context where appropriate (Nifty 50, Sensex, sector index comparisons). Note any India-specific regulatory considerations (SEBI, RBI, sector regulators) in the risk matrix.`
    : ""
}

Set type="public", ticker="${profile.symbol}", sector="${profile.sector ?? ""}". Populate marketData with: price=${quote.regularMarketPrice}, marketCap=${quote.marketCap ?? 0}, peRatio=${quote.trailingPE ?? "null (use JSON null)"}, yearHigh=${quote.fiftyTwoWeekHigh}, yearLow=${quote.fiftyTwoWeekLow}, changesPercentage=${quote.regularMarketChangePercent}.`;
}

export function buildStartupPrompt(companyName: string): string {
  return `Generate an institutional-grade memo for the private/startup company "${companyName}".

No public market data is available — this company was not found on NSE, BSE, or major US exchanges. Base your analysis on:
- General industry knowledge about the company's space, with attention to whether it operates primarily in India, US, or globally
- Known funding history if you have high confidence in it (otherwise state "Funding history unavailable")
- Competitive dynamics in the relevant sector (Indian or global as appropriate)
- Common risks for private companies at this stage

CRITICAL: If you cannot identify which company "${companyName}" refers to with high confidence, write the memo treating it as a generic early-stage company in the most likely sector and explicitly note this limitation in the executive summary. Do NOT fabricate funding rounds, valuations, or revenue figures.

Set type="startup", ticker=null, marketData=null. Sector should be your best inference. Recommendation should reflect that this is a private opportunity (likely "Monitor" or "Hold" unless there's strong public information).`;
}
