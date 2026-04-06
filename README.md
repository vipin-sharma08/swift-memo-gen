# ⚡ Swift Memo Gen — Investment Memos in Under 60 Seconds

> Type a company name. Get a full investment memo — financials, valuation, risk analysis, competitive positioning, recent news. All pulled live.

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript) ![React](https://img.shields.io/badge/React-18-61DAFB?logo=react) ![Status](https://img.shields.io/badge/status-live-brightgreen)

---

## ✨ What It Does

- **Live Financials** — Revenue, earnings, margins pulled in real-time via FMP API
- **Valuation** — P/E, EV/EBITDA, DCF fair value estimate
- **Risk Analysis** — Key risks flagged from recent news and financial data
- **Competitive Positioning** — Market share, moat, peer comparison
- **Recent News** — Latest headlines summarised and contextualised
- **Full Memo Output** — Structured investment memo, ready to share

**Demo:** Apple, NVIDIA, Tesla, Walmart — four memos, back to back.

---

## 🚀 Quickstart

```bash
git clone https://github.com/vipin-sharma08/swift-memo-gen.git
cd swift-memo-gen
npm install
npm run dev
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, shadcn-ui |
| AI Layer | Claude API (Anthropic) |
| Automation | N8N workflows |
| Financial Data | Financial Modelling Prep (FMP) API |
| Builder | Lovable |

---

## 📁 Project Structure

```
swift-memo-gen/
├── src/
│   ├── components/      # Memo UI components
│   ├── hooks/           # Data fetching hooks
│   ├── lib/             # FMP API client & Claude integration
│   └── pages/           # App routes
└── package.json
```

---

## 📝 License

MIT © [Vipin Sharma](https://github.com/vipin-sharma08)
