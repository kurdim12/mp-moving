import mpLogo from "@/assets/mp-logo.png";

const Footer = () => {
  return (
    <footer className="py-16 md:py-20">
      <div className="content-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <img 
              src={mpLogo} 
              alt="MP" 
              className="h-8 w-auto mb-4 opacity-80"
            />
            <p className="text-sm text-muted-foreground mb-2">
              Globally connected
            </p>
            <a 
              href="mailto:hello@movingpeople.studio" 
              className="text-sm text-foreground hover:text-muted-foreground transition-colors"
            >
              hello@movingpeople.studio
            </a>
          </div>

          <p className="text-sm text-muted-foreground">
            Moving People © 2026 MP Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
