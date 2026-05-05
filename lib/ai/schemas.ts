import { z } from "zod";

export const RecommendationEnum = z.enum([
  "Conviction Buy",
  "Accumulate",
  "Hold",
  "Monitor",
  "Reduce",
]);

export const SentimentEnum = z.enum(["bullish", "bearish", "neutral"]);

export const KeyMetricSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const MarketDataSchema = z.object({
  price: z.number(),
  marketCap: z.number(),
  peRatio: z.number().nullable(),
  yearHigh: z.number(),
  yearLow: z.number(),
  changesPercentage: z.number(),
}).nullable();

export const MemoSectionsSchema = z.object({
  executiveSummary: z.string().min(100).max(2000),
  companyOverview: z.string().min(100).max(3500),
  financialDeepDive: z.string().min(100).max(4500),
  competitiveLandscape: z.string().min(100).max(3500),
  riskMatrix: z.string().min(100).max(4500),
  newsSentiment: z.string().min(50).max(2000),
  investmentThesis: z.string().min(100).max(4500),
  keyMetrics: z.array(KeyMetricSchema).min(3).max(12),
});

export const MemoSchema = z.object({
  type: z.enum(["public", "startup"]),
  company: z.string(),
  ticker: z.string().nullable(),
  sector: z.string().nullable(),
  marketData: MarketDataSchema,
  recommendation: RecommendationEnum,
  sentiment: SentimentEnum,
  sections: MemoSectionsSchema,
  generatedAt: z.string().datetime(),
});

export type Memo = z.infer<typeof MemoSchema>;
