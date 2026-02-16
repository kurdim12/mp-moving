import { useState, useEffect } from "react";
import mpLogo from "@/assets/mp-logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="content-container">
        <nav className="flex items-center justify-between h-16 md:h-24">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <img 
              src={mpLogo} 
              alt="MP Logo" 
              className="h-7 md:h-10 w-auto transition-opacity duration-300 group-hover:opacity-70"
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="/what-we-build"
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-300"
            >
              WWB
            </a>
            <a
              href="/portfolio"
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-300"
            >
              Portfolio
            </a>
            <a
              href="/contact"
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-300"
            >
              Contact
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-[1.5px] bg-foreground transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-foreground transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-foreground transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-sm border-b border-border animate-fade-in">
          <div className="content-container py-6 flex flex-col gap-5">
            <a
              href="/what-we-build"
              className="text-base font-medium text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              WWB
            </a>
            <a
              href="/portfolio"
              className="text-base font-medium text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Portfolio
            </a>
            <a
              href="/contact"
              className="text-base font-medium text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
