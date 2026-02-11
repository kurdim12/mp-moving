import { useEffect } from "react";
import type { Project } from "./PortfolioSection";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-background overflow-y-auto"
      style={{ animation: "fadeIn 0.3s ease-out" }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 md:top-8 md:right-10 z-[110] text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        Close
      </button>

      {/* Hero image */}
      <div className="w-full">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-[50vh] md:h-[60vh] object-cover"
        />
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
          {project.name}
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          {project.descriptor}
        </p>

        <p className="text-base text-foreground/80 leading-relaxed mb-16">
          {project.intro}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase mb-3">
              Role
            </p>
            <p className="text-sm text-foreground">{project.role}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase mb-3">
              Tools
            </p>
            <p className="text-sm text-foreground">{project.tools.join(", ")}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase mb-3">
              Outcome
            </p>
            <p className="text-sm text-foreground">{project.outcome}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-sm font-medium text-foreground border border-foreground px-8 py-3 hover:bg-foreground hover:text-background transition-all duration-300"
        >
          Back to Portfolio
        </button>
      </div>
    </div>
  );
};

export default ProjectModal;
