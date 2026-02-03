import mpLogo from "@/assets/mp-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 md:py-20">
      <div className="content-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <img 
              src={mpLogo} 
              alt="MP" 
              className="h-8 w-auto mb-3 opacity-80"
            />
            <p className="text-sm text-muted-foreground">
              Moving People
            </p>
          </div>

          <p className="text-sm text-muted-foreground">
            © {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
