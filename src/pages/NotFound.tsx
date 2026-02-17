import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const NotFound = () => {
  const location = useLocation();
  useDocumentTitle("Not Found — MP");

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl md:text-8xl font-display tracking-tight text-foreground mb-6">404</h1>
        <p className="text-muted-foreground mb-10">This page doesn't exist.</p>
        <Link
          to="/"
          className="text-sm font-medium tracking-[0.05em] uppercase text-foreground hover:text-muted-foreground transition-colors duration-300"
        >
          Return home →
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
