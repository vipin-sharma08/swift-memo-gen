export type Recommendation =
  | "Conviction Buy"
  | "Accumulate"
  | "Hold"
  | "Monitor"
  | "Reduce";

export type Sentiment = "bullish" | "bearish" | "neutral";

export type MemoType = "public" | "startup";

export interface KeyMetric {
  label: string;
  value: string;
}

export interface MarketData {
  price: number;
  marketCap: number;
  peRatio: number | null;
  yearHigh: number;
  yearLow: number;
  changesPercentage: number;
}

export interface MemoSections {
  executiveSummary: string;
  companyOverview: string;
  financialDeepDive: string;
  competitiveLandscape: string;
  riskMatrix: string;
  newsSentiment: string;
  investmentThesis: string;
  keyMetrics: KeyMetric[];
}

export interface Memo {
  type: MemoType;
  company: string;
  ticker: string | null;
  sector: string | null;
  marketData: MarketData | null;
  recommendation: Recommendation;
  sentiment: Sentiment;
  sections: MemoSections;
  generatedAt: string;
}

/**
 * Streaming variant — every field is optional because partial objects
 * arrive incrementally. Plus three transport-only flags.
 */
export type PartialMemo = Partial<Memo> & {
  sections?: Partial<MemoSections>;
  _done?: boolean;
  _cached?: boolean;
  _error?: string;
  _code?: string;
};
