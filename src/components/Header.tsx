import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "What We Build", href: "/what-we-build" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Ventures", href: "/ventures" },
  { label: "About", href: "/about" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-background transition-all duration-500 ${
        isScrolled ? "border-b border-border h-14" : "h-20"
      }`}
    >
      <div className="content-container h-full">
        <nav className="flex items-center justify-between h-full">
          <Link to="/" className="text-base font-bold tracking-tight text-foreground">
            MP
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`relative text-sm transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:bg-foreground after:transition-all after:duration-300 ${
                  location.pathname === link.href
                    ? "text-foreground after:w-full"
                    : "text-muted-foreground hover:text-foreground after:w-0 hover:after:w-full"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/about#contact"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Contact
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-sm text-foreground"
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border px-6 pb-6 pt-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`block py-3 text-sm ${
                location.pathname === link.href ? "text-foreground font-medium" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/about#contact" className="block py-3 text-sm text-muted-foreground">
            Contact
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
