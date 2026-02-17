import mpLogo from "@/assets/mp-logo.png";

const Footer = () => {
  return (
    <footer className="py-12 md:py-16">
      <div className="content-container">
        <div className="border-t border-foreground/15 pt-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <img
              src={mpLogo}
              alt="MP"
              className="h-6 w-auto mb-4 opacity-60"
            />
            <p className="text-sm text-muted-foreground mb-2">
              Globally connected
            </p>
            <a
              href="mailto:inmotion@movingp.com"
              className="text-sm text-foreground hover:text-muted-foreground transition-colors"
            >
              inmotion@movingp.com
            </a>
          </div>

          <p className="text-xs text-muted-foreground">
            © 2026 Moving People. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
