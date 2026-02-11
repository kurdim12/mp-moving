import { useParams, Link } from "react-router-dom";
import { projects } from "@/data/projects";

const ProjectPage = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Project not found</h1>
          <Link to="/#portfolio" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Back to portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border h-14">
        <div className="content-container h-full">
          <nav className="flex items-center justify-between h-full">
            <Link to="/" className="text-base font-bold tracking-tight text-foreground">
              MP
            </Link>
            <Link
              to="/#portfolio"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Back
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero image */}
      <div className="pt-14">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-[50vh] md:h-[65vh] object-cover"
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

        <Link
          to="/#portfolio"
          className="inline-block text-sm font-medium text-foreground border border-foreground px-8 py-3 hover:bg-foreground hover:text-background transition-all duration-300"
        >
          Back to Portfolio
        </Link>
      </div>
    </div>
  );
};

export default ProjectPage;
