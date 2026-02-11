const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="content-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <p className="text-xs text-muted-foreground">
            © MP Moving People 2026
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-300">
              Privacy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-300">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
