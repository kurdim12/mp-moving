import { useState, useRef, useEffect } from "react";
import { useGsapClipReveal, useGsapReveal, useGsapLineReveal } from "@/hooks/useGsap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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

const SectionStatement = () => {
  const ref = useGsapClipReveal();
  return (
    <div ref={ref} className="section-padding">
      <div className="content-container">
        <div className="overflow-hidden">
          <h2 data-clip className="display-massive text-foreground">we build</h2>
        </div>
        <div className="overflow-hidden">
          <h2 data-clip className="display-massive text-muted-foreground">momentum.</h2>
        </div>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const lineRef = useGsapLineReveal();

  useEffect(() => {
    if (!listRef.current) return;
    const items = listRef.current.querySelectorAll("[data-service]");

    gsap.set(items, { opacity: 0, y: 50, scale: 0.95 });

    gsap.to(items, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.3)",
      stagger: 0.1,
      scrollTrigger: {
        trigger: listRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === listRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section className="w-full">
      <SectionStatement />
      <div className="content-container pb-24 md:pb-32">
        <div ref={lineRef} className="h-px bg-foreground/15 mb-0" />
        <div ref={listRef}>
          {services.map((service, index) => (
            <ServiceAccordion key={index} service={service} index={index} />
          ))}
        </div>
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
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    if (open) {
      const inner = contentRef.current.querySelector("[data-inner]") as HTMLElement;
      if (!inner) return;
      const h = inner.scrollHeight;
      gsap.fromTo(
        contentRef.current,
        { height: 0, opacity: 0 },
        { height: h, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
      // Pop in inner content
      const children = inner.querySelectorAll("[data-pop]");
      gsap.fromTo(
        children,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.2)", stagger: 0.06, delay: 0.15 }
      );
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power2.inOut",
      });
    }
  }, [open]);

  return (
    <div data-service className="border-b border-foreground/15">
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
            "w-5 h-5 text-muted-foreground transition-transform duration-400",
            open && "rotate-180"
          )}
        />
      </button>

      <div ref={contentRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <div data-inner className="pb-8 md:pb-12 pl-10 md:pl-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <p data-pop className="text-muted-foreground leading-[1.7] text-base md:text-lg max-w-md">
              {service.description}
            </p>
            <div data-pop>
              <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground mb-4">
                Related Services
              </p>
              <ul className="space-y-2">
                {service.related.map((item) => (
                  <li key={item} data-pop className="text-foreground/70 text-sm md:text-base">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div data-pop className="mt-8">
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
  );
};

export default ServicesSection;
