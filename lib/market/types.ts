export type Exchange = "NSE" | "BSE" | "US" | "OTHER";

export interface MarketSearchResult {
  symbol: string;          // "RELIANCE.NS"
  shortname: string;       // "Reliance Industries Limited"
  longname: string | null;
  exchange: Exchange;
  quoteType: string;       // "EQUITY", "ETF", etc.
  currency: string;        // "INR", "USD"
}

export interface CompanyProfile {
  symbol: string;
  longName: string;
  industry: string | null;
  sector: string | null;
  longBusinessSummary: string | null;
  country: string | null;
  city: string | null;
  website: string | null;
  fullTimeEmployees: number | null;
  exchange: Exchange;
  currency: string;
}

export interface Quote {
  symbol: string;
  regularMarketPrice: number;
  regularMarketChangePercent: number;
  marketCap: number | null;
  trailingPE: number | null;
  forwardPE: number | null;
  epsTrailingTwelveMonths: number | null;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  regularMarketVolume: number;
  averageDailyVolume3Month: number | null;
  currency: string;
}

export interface KeyStatistics {
  priceToBook: number | null;
  enterpriseToEbitda: number | null;
  profitMargins: number | null;
  returnOnEquity: number | null;
  returnOnAssets: number | null;
  debtToEquity: number | null;
  currentRatio: number | null;
  revenueGrowth: number | null;
  earningsGrowth: number | null;
  bookValue: number | null;
}

export interface NewsItem {
  title: string;
  publisher: string;
  link: string;
  publishedAt: string; // ISO date
  summary: string | null;
}

export interface CompanyData {
  search: MarketSearchResult;
  profile: CompanyProfile;
  quote: Quote;
  stats: KeyStatistics | null;
  news: NewsItem[];
}
