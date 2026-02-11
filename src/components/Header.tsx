import { useState, useEffect } from "react";
import mpLogo from "@/assets/mp-logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
        <nav className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <img 
              src={mpLogo} 
              alt="MP Logo" 
              className="h-8 md:h-10 w-auto transition-opacity duration-300 group-hover:opacity-70"
            />
          </a>

          {/* Right nav */}
          <div className="flex items-center gap-6 md:gap-8">
            <a
              href="/portfolio"
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-300"
            >
              Portfolio
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-300"
            >
              Get in Touch
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
