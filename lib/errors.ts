export class AppError extends Error {
  constructor(
    public status: number,
    public code: string,
    public userMessage: string,
    cause?: unknown,
  ) {
    super(userMessage);
    if (cause) this.cause = cause;
  }
}

export class ValidationError extends AppError {
  constructor(details: unknown) {
    super(400, "INVALID_INPUT", "Please enter a valid company name.", details);
  }
}

export class NotFoundError extends AppError {
  constructor(company: string) {
    super(404, "COMPANY_NOT_FOUND", `Could not find data for "${company}".`);
  }
}

export class UpstreamError extends AppError {
  constructor(provider: "market" | "claude", cause?: unknown) {
    super(
      502,
      `${provider.toUpperCase()}_UNAVAILABLE`,
      provider === "market"
        ? "Market data is temporarily unavailable. Please try again."
        : "Memo generation is temporarily unavailable. Please try again.",
      cause,
    );
  }
}

export class TimeoutError extends AppError {
  constructor() {
    super(504, "TIMEOUT", "The memo took too long to generate. Try again.");
  }
}

export class RateLimitError extends AppError {
  retryAfter: number;
  constructor(retryAfterSeconds: number) {
    super(
      429,
      "RATE_LIMITED",
      `Too many requests. Try again in ${retryAfterSeconds}s.`,
    );
    this.retryAfter = retryAfterSeconds;
  }
}

export interface ErrorPayload {
  error: string;
  code: string;
  retryAfter?: number;
}

export function toErrorPayload(e: unknown): { status: number; body: ErrorPayload } {
  if (e instanceof AppError) {
    return {
      status: e.status,
      body: {
        error: e.userMessage,
        code: e.code,
        ...(e instanceof RateLimitError ? { retryAfter: e.retryAfter } : {}),
      },
    };
  }
  console.error("[unhandled error]", e);
  return {
    status: 500,
    body: { error: "An unexpected error occurred.", code: "INTERNAL_ERROR" },
  };
}
