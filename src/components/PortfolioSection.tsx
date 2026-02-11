import { Link } from "react-router-dom";
import { projects } from "@/data/projects";

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="section-padding">
      <div className="content-container">
        <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-16">
          Selected Work
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project) => {
            const isLarge = project.size === "large";
            return (
              <Link
                key={project.id}
                to={`/project/${project.id}`}
                className={`group ${isLarge ? "md:col-span-2" : ""}`}
              >
                <div className="overflow-hidden mb-4">
                  <img
                    src={project.image}
                    alt={project.name}
                    className={`w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] ${
                      isLarge ? "h-[28rem] md:h-[36rem]" : "h-[20rem] md:h-[26rem]"
                    }`}
                    loading="lazy"
                  />
                </div>
                <div className="flex items-baseline justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground inline-block relative after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-0 after:h-[1px] after:bg-foreground after:transition-all after:duration-300 group-hover:after:w-full">
                      {project.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {project.descriptor}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Project
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
