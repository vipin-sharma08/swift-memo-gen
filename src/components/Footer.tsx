const Footer = () => (
  <footer className="surface-dark">
    <div className="content-max flex h-[60px] items-center justify-between text-[13px]">
      <span className="text-surface-dark-muted">
        MemoAI &middot; &copy; 2026
      </span>
      <div className="flex items-center gap-6">
        <a
          href="https://www.linkedin.com/in/vipin"
          target="_blank"
          rel="noopener noreferrer"
          className="text-surface-dark-muted transition-colors duration-200 hover:text-surface-dark-foreground"
        >
          Built by Vipin
        </a>
        <a
          href="#"
          className="text-surface-dark-muted transition-colors duration-200 hover:text-surface-dark-foreground"
        >
          GitHub
        </a>
        <button
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          className="text-surface-dark-muted transition-colors duration-200 hover:text-surface-dark-foreground"
        >
          About
        </button>
      </div>
    </div>
  </footer>
);

export default Footer;
