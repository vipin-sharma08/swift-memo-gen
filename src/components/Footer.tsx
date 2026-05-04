const PRODUCT_LINKS = [
  { id: "how-it-works", label: "How It Works" },
  { id: "features", label: "Features" },
  { id: "sample", label: "Sample Memo" },
];

const COMPANY_LINKS = [
  { href: "#about", label: "About" },
  { href: "https://www.linkedin.com/in/vipin", label: "Built by Vipin", external: true },
  { href: "https://github.com", label: "GitHub", external: true },
];

const LEGAL_LINKS = [
  { href: "#", label: "Disclaimer" },
  { href: "#", label: "Privacy" },
  { href: "#", label: "Terms" },
];

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const Footer = () => (
  <footer className="pt-20 md:pt-24 pb-12">
    <div className="max-w-page mx-auto px-6 sm:px-12 md:px-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-12">
        <div>
          <p className="label-eyebrow">Product</p>
          <ul className="mt-5 space-y-2.5 font-sans text-[13px] text-ink-muted">
            {PRODUCT_LINKS.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollTo(link.id)}
                  className="text-left hover:text-ink transition-colors duration-150"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label-eyebrow">Company</p>
          <ul className="mt-5 space-y-2.5 font-sans text-[13px] text-ink-muted">
            {COMPANY_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="hover:text-ink transition-colors duration-150"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label-eyebrow">Legal</p>
          <ul className="mt-5 space-y-2.5 font-sans text-[13px] text-ink-muted">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="hover:text-ink transition-colors duration-150"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label-eyebrow">Colophon</p>
          <ul className="mt-5 space-y-2.5 font-sans text-[13px] text-ink-muted leading-[1.55]">
            <li>
              Set in <span className="text-ink">Fraunces</span> &amp;{" "}
              <span className="text-ink">Inter Tight</span>
            </li>
            <li>
              Data in <span className="text-ink">JetBrains Mono</span>
            </li>
            <li>Build May 2026</li>
            <li>Powered by Claude AI</li>
          </ul>
        </div>
      </div>

      <hr className="border-0 border-t border-rule mt-16 mb-8" />

      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4">
        <p className="font-sans text-[12px] text-ink-faint leading-[1.6] max-w-[68ch]">
          MemoAI generates research for informational purposes only. Not
          investment advice. Verify all figures independently.
        </p>
        <p className="font-sans text-[12px] text-ink-faint whitespace-nowrap">
          © 2026 MemoAI
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
