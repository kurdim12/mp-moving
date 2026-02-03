import mpLogo from "@/assets/mp-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 md:py-16 border-t border-border">
      <div className="content-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src={mpLogo} 
              alt="MP" 
              className="h-6 w-auto opacity-60"
            />
            <span className="text-sm text-muted-foreground">
              Moving People
            </span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {currentYear} MP Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
