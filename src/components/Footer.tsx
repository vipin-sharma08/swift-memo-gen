const Footer = () => (
  <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
    <div className="content-max flex h-[48px] items-center justify-between text-[13px]">
      <span className="text-text-tertiary">MemoAI &middot; &copy; 2026</span>
      <div className="flex items-center gap-6">
        <a
          href="https://www.linkedin.com/in/vipin"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-tertiary transition-colors duration-200 hover:text-text-primary"
        >
          Built by Vipin
        </a>
        <a
          href="#"
          className="text-text-tertiary transition-colors duration-200 hover:text-text-primary"
        >
          GitHub
        </a>
        <button
          onClick={() =>
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="text-text-tertiary transition-colors duration-200 hover:text-text-primary"
        >
          About
        </button>
      </div>
    </div>
  </footer>
);

export default Footer;
