import { useState } from "react";
import { RevealGroup, Reveal } from "@/components/RevealOnScroll";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const services = [
  {
    title: "Brand & Positioning",
    description:
      "Clarity before aesthetics. We define what matters. We remove what does not. We shape language teams can build with. A brand is not a logo — it is shared understanding made visible.",
    related: [
      "Positioning & Narrative",
      "Visual Identity Systems",
      "Naming & Language",
      "Brand Architecture",
      "Guidelines & Codification",
    ],
  },
  {
    title: "Products, Platforms & Systems",
    description:
      "Architecture before interface. We design and build digital products, internal tools, and workflows as connected systems. Speed without structure creates fragility. Systems create stability.",
    related: [
      "Web Design & Development",
      "Product Strategy",
      "Internal Tools & Dashboards",
      "Design Systems",
      "Workflow Architecture",
    ],
  },
  {
    title: "AI & Automation",
    description:
      "Applied selectively. We use AI where it removes friction, increases leverage, or fundamentally changes how work gets done. No automation without direction.",
    related: [
      "Process Automation",
      "AI Integration & Strategy",
      "Custom AI Tools",
      "Data Workflows",
      "Intelligent Interfaces",
    ],
  },
  {
    title: "Partnership & Co-Building",
    description:
      "Ownership over output. We don't operate as a transactional vendor. We operate as a long-term partner. Momentum requires shared responsibility. Alignment requires trust.",
    related: [
      "Equity Partnerships",
      "Venture Co-Building",
      "Strategic Advisory",
      "Ongoing Collaboration",
      "Shared Ownership Models",
    ],
  },
];

const ServicesSection = () => {
  return (
    <section className="w-full">
      {/* Section statement */}
      <RevealGroup className="section-padding">
        <div className="content-container">
          <Reveal>
            <h2 className="display-massive text-foreground">
              we build
              <span className="inline-block mx-[0.4em] text-muted-foreground">momentum.</span>
            </h2>
          </Reveal>
        </div>
      </RevealGroup>

      {/* Services accordion */}
      <div className="content-container pb-24 md:pb-32">
        <RevealGroup>
          <Reveal>
            <div className="border-t border-foreground/15">
              {services.map((service, index) => (
                <ServiceAccordion key={index} service={service} index={index} />
              ))}
            </div>
          </Reveal>
        </RevealGroup>
      </div>
    </section>
  );
};

const ServiceAccordion = ({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-foreground/15">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 md:py-8 text-left group"
      >
        <div className="flex items-center gap-6 md:gap-10">
          <span className="text-sm text-muted-foreground font-medium tabular-nums">
            0{index + 1}
          </span>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground group-hover:text-muted-foreground transition-colors duration-300">
            {service.title}
          </h3>
        </div>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-muted-foreground transition-transform duration-500",
            open && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "grid transition-all duration-500 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="pb-8 md:pb-12 pl-10 md:pl-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              <p className="text-muted-foreground leading-[1.7] text-base md:text-lg max-w-md">
                {service.description}
              </p>
              <div>
                <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground mb-4">
                  Related Services
                </p>
                <ul className="space-y-2">
                  {service.related.map((item) => (
                    <li key={item} className="text-foreground/70 text-sm md:text-base">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-8">
              <a
                href="mailto:inmotion@movingp.com"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground border border-foreground/20 rounded-full px-5 py-2.5 hover:bg-foreground hover:text-background transition-all duration-300"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
