import YahooFinance from "yahoo-finance2";
import type {
  Exchange,
  MarketSearchResult,
  CompanyProfile,
  Quote,
  KeyStatistics,
  NewsItem,
  CompanyData,
} from "./types.js";

// v3: suppressNotices is a constructor option, not a method
const yahooFinance = new YahooFinance({ suppressNotices: ["yahooSurvey"] });

export class MarketDataError extends Error {
  constructor(public status: number, public endpoint: string, message: string) {
    super(message);
  }
}

function classifyExchange(yahooExchange: string | undefined): Exchange {
  if (!yahooExchange) return "OTHER";
  const ex = yahooExchange.toUpperCase();
  if (ex === "NSI" || ex === "NSE") return "NSE";
  if (ex === "BSE" || ex === "BOM") return "BSE";
  if (["NMS", "NYQ", "NGM", "ASE", "PCX", "NCM"].includes(ex)) return "US";
  return "OTHER";
}

/**
 * India-first symbol resolution.
 * Returns null if no usable match exists.
 */
export async function searchCompany(query: string): Promise<MarketSearchResult | null> {
  const trimmed = query.trim();

  // If user already gave a Yahoo-style symbol, attempt direct quote first
  if (/\.(NS|BO)$/i.test(trimmed) || /^[A-Z]{1,5}$/.test(trimmed)) {
    try {
      const direct = await yahooFinance.quote(trimmed);
      if (direct && "symbol" in direct) {
        return {
          symbol: direct.symbol,
          shortname: direct.shortName ?? direct.longName ?? trimmed,
          longname: direct.longName ?? null,
          exchange: classifyExchange(direct.fullExchangeName ?? direct.exchange),
          quoteType: direct.quoteType ?? "EQUITY",
          currency: direct.currency ?? "USD",
        };
      }
    } catch {
      // fall through to search
    }
  }

  let results;
  try {
    results = await yahooFinance.search(trimmed, { quotesCount: 10, newsCount: 0 });
  } catch (e) {
    throw new MarketDataError(502, "search", `Yahoo search failed: ${(e as Error).message}`);
  }

  const quotes = (results.quotes ?? []).filter(
    (q): q is { symbol: string; quoteType: string; exchange: string; shortname?: string; longname?: string } =>
      "symbol" in q && q.quoteType === "EQUITY",
  );
  if (quotes.length === 0) return null;

  const indianMatch = quotes.find((q) => {
    const ex = classifyExchange(q.exchange);
    return ex === "NSE" || ex === "BSE";
  });
  const chosen = indianMatch ?? quotes[0];
  const exchange = classifyExchange(chosen.exchange);

  // Fetch quote to get currency
  let currency = exchange === "NSE" || exchange === "BSE" ? "INR" : "USD";
  try {
    const q = await yahooFinance.quote(chosen.symbol);
    if (q && "currency" in q && q.currency) currency = q.currency as string;
  } catch {
    /* keep default */
  }

  return {
    symbol: chosen.symbol,
    shortname: chosen.shortname ?? chosen.longname ?? chosen.symbol,
    longname: chosen.longname ?? null,
    exchange,
    quoteType: chosen.quoteType,
    currency,
  };
}

export async function getCompanyData(search: MarketSearchResult): Promise<CompanyData> {
  const { symbol } = search;

  const [summaryR, quoteR, newsR] = await Promise.allSettled([
    yahooFinance.quoteSummary(symbol, {
      modules: ["assetProfile", "summaryProfile", "defaultKeyStatistics", "financialData"],
    }),
    yahooFinance.quote(symbol),
    yahooFinance.search(symbol, { quotesCount: 0, newsCount: 8 }),
  ]);

  if (summaryR.status === "rejected") {
    throw new MarketDataError(404, `quoteSummary/${symbol}`, "No fundamentals data");
  }
  if (quoteR.status === "rejected") {
    throw new MarketDataError(404, `quote/${symbol}`, "No quote data");
  }

  const summary = summaryR.value;
  const q = quoteR.value;
  if (!q || !("regularMarketPrice" in q)) {
    throw new MarketDataError(404, `quote/${symbol}`, "Empty quote");
  }

  const assetProfile = summary.assetProfile;
  const summaryProfile = summary.summaryProfile;
  const keyStats = summary.defaultKeyStatistics;
  const financialData = summary.financialData;

  const profile: CompanyProfile = {
    symbol,
    longName: q.longName ?? q.shortName ?? search.shortname,
    industry: assetProfile?.industry ?? summaryProfile?.industry ?? null,
    sector: assetProfile?.sector ?? summaryProfile?.sector ?? null,
    longBusinessSummary:
      assetProfile?.longBusinessSummary ?? summaryProfile?.longBusinessSummary ?? null,
    country: assetProfile?.country ?? summaryProfile?.country ?? null,
    city: assetProfile?.city ?? summaryProfile?.city ?? null,
    website: assetProfile?.website ?? summaryProfile?.website ?? null,
    fullTimeEmployees: assetProfile?.fullTimeEmployees ?? null,
    exchange: search.exchange,
    currency: search.currency,
  };

  const quote: Quote = {
    symbol,
    regularMarketPrice: q.regularMarketPrice ?? 0,
    regularMarketChangePercent: q.regularMarketChangePercent ?? 0,
    marketCap: q.marketCap ?? null,
    trailingPE: q.trailingPE ?? null,
    forwardPE: q.forwardPE ?? null,
    epsTrailingTwelveMonths: q.epsTrailingTwelveMonths ?? null,
    fiftyTwoWeekHigh: q.fiftyTwoWeekHigh ?? 0,
    fiftyTwoWeekLow: q.fiftyTwoWeekLow ?? 0,
    regularMarketVolume: q.regularMarketVolume ?? 0,
    averageDailyVolume3Month: q.averageDailyVolume3Month ?? null,
    currency: q.currency ?? search.currency,
  };

  const stats: KeyStatistics | null =
    keyStats || financialData
      ? {
          priceToBook: keyStats?.priceToBook ?? null,
          enterpriseToEbitda: keyStats?.enterpriseToEbitda ?? null,
          profitMargins: keyStats?.profitMargins ?? financialData?.profitMargins ?? null,
          returnOnEquity: financialData?.returnOnEquity ?? null,
          returnOnAssets: financialData?.returnOnAssets ?? null,
          debtToEquity: financialData?.debtToEquity ?? null,
          currentRatio: financialData?.currentRatio ?? null,
          revenueGrowth: financialData?.revenueGrowth ?? null,
          earningsGrowth: financialData?.earningsGrowth ?? null,
          bookValue: keyStats?.bookValue ?? null,
        }
      : null;

  // v3: providerPublishTime is a Date object, not a Unix timestamp
  const news: NewsItem[] =
    newsR.status === "fulfilled" && newsR.value.news
      ? newsR.value.news.slice(0, 8).map((n) => ({
          title: n.title,
          publisher: n.publisher,
          link: n.link,
          publishedAt:
            n.providerPublishTime instanceof Date
              ? n.providerPublishTime.toISOString()
              : new Date((n.providerPublishTime as unknown as number) * 1000).toISOString(),
          summary: null,
        }))
      : [];

  return { search, profile, quote, stats, news };
}
