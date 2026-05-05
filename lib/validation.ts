import { z } from "zod";

export const GenerateMemoRequestSchema = z.object({
  company: z.string().trim().min(2).max(100),
});

export type GenerateMemoRequest = z.infer<typeof GenerateMemoRequestSchema>;

export const FMPProfileSchema = z.object({
  symbol: z.string(),
  companyName: z.string(),
  industry: z.string().nullable().default(""),
  sector: z.string().nullable().default(""),
  description: z.string().nullable().default(""),
  ceo: z.string().nullable().default(""),
  website: z.string().nullable().default(""),
  country: z.string().nullable().default(""),
  fullTimeEmployees: z.string().nullable().default(""),
  ipoDate: z.string().nullable().default(""),
  image: z.string().nullable().default(""),
});

export const FMPQuoteSchema = z.object({
  symbol: z.string(),
  price: z.number(),
  changesPercentage: z.number(),
  marketCap: z.number(),
  pe: z.number().nullable(),
  eps: z.number().nullable(),
  yearHigh: z.number(),
  yearLow: z.number(),
  volume: z.number(),
  avgVolume: z.number(),
});
