import { useState } from "react";
import ProjectModal from "./ProjectModal";

export interface Project {
  id: number;
  name: string;
  descriptor: string;
  image: string;
  size: "large" | "medium" | "small";
  intro: string;
  role: string;
  tools: string[];
  outcome: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: "UrbanFlow",
    descriptor: "Mobility Web Platform",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
    size: "large",
    intro: "A comprehensive mobility platform connecting urban commuters with real-time transit data across multiple networks.",
    role: "Strategy / Design / Development",
    tools: ["React", "Node.js", "PostgreSQL", "Mapbox"],
    outcome: "Reduced average commute planning time by 40% across three pilot cities.",
  },
  {
    id: 2,
    name: "Vaultline",
    descriptor: "Fintech Dashboard",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    size: "medium",
    intro: "Real-time financial analytics dashboard for institutional clients managing complex portfolios.",
    role: "Design / Development",
    tools: ["TypeScript", "D3.js", "WebSocket", "AWS"],
    outcome: "Processing 2M+ data points daily with sub-second visualization updates.",
  },
  {
    id: 3,
    name: "Terravox",
    descriptor: "Climate Intelligence",
    image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&q=80",
    size: "medium",
    intro: "Environmental monitoring system aggregating satellite and IoT sensor data for agricultural decision-making.",
    role: "Strategy / Design / Development",
    tools: ["Python", "React", "TensorFlow", "GCP"],
    outcome: "Enabled 200+ farms to reduce water usage by 25% through predictive insights.",
  },
  {
    id: 4,
    name: "Nomad",
    descriptor: "Travel Operations Platform",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80",
    size: "large",
    intro: "End-to-end operations platform for boutique travel companies managing custom itineraries at scale.",
    role: "Product Strategy / Development",
    tools: ["Next.js", "Prisma", "Stripe", "Vercel"],
    outcome: "Automated 60% of manual booking workflows, tripling operator capacity.",
  },
  {
    id: 5,
    name: "Pulseware",
    descriptor: "Health Tech Interface",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    size: "small",
    intro: "Patient monitoring interface for clinical teams requiring real-time vital sign tracking.",
    role: "Interface Design",
    tools: ["React", "WebSocket", "FHIR API"],
    outcome: "Deployed across 12 clinical sites with zero critical UI incidents.",
  },
  {
    id: 6,
    name: "ArcStudio",
    descriptor: "Creative Collaboration Tool",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
    size: "small",
    intro: "Real-time collaborative workspace for design teams working across distributed environments.",
    role: "Design / Development",
    tools: ["Canvas API", "WebRTC", "Redis", "React"],
    outcome: "Adopted by 50+ design teams with 4.8/5 satisfaction rating.",
  },
  {
    id: 7,
    name: "Meridian",
    descriptor: "Logistics Intelligence",
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?w=800&q=80",
    size: "medium",
    intro: "Supply chain visibility platform providing real-time tracking and predictive delay analysis.",
    role: "Strategy / Development",
    tools: ["Go", "React", "PostgreSQL", "Kubernetes"],
    outcome: "Reduced shipment delays by 35% through ML-powered route optimization.",
  },
  {
    id: 8,
    name: "Lumière",
    descriptor: "E-Commerce Experience",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    size: "medium",
    intro: "Premium e-commerce platform for a luxury goods brand requiring editorial-quality product experiences.",
    role: "Design / Development",
    tools: ["Shopify Plus", "React", "Three.js", "Contentful"],
    outcome: "Increased conversion rate by 28% and average session duration by 45%.",
  },
];

const PortfolioSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section id="portfolio" className="section-padding">
        <div className="content-container">
          <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-16">
            Selected Work
          </p>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {projects.map((project) => {
              const isLarge = project.size === "large";
              return (
                <div
                  key={project.id}
                  className={`group cursor-pointer ${isLarge ? "md:col-span-2" : ""}`}
                  onClick={() => setSelectedProject(project)}
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
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};

export default PortfolioSection;
