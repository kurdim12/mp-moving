import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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

/* Section statement with clip reveal */
const SectionStatement = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="section-padding">
      <div className="content-container">
        <div className="overflow-hidden">
          <motion.h2
            className="display-massive text-foreground"
            initial={{ y: "100%" }}
            animate={isInView ? { y: "0%" } : { y: "100%" }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            we build
          </motion.h2>
        </div>
        <div className="overflow-hidden">
          <motion.h2
            className="display-massive text-muted-foreground"
            initial={{ y: "100%" }}
            animate={isInView ? { y: "0%" } : { y: "100%" }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
          >
            momentum.
          </motion.h2>
        </div>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="w-full">
      <SectionStatement />

      <div className="content-container pb-24 md:pb-32">
        <motion.div
          ref={ref}
          className="border-t border-foreground/15"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ originX: 0 }}
        >
          {services.map((service, index) => (
            <ServiceAccordion key={index} service={service} index={index} staggerDelay={index * 0.1} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ServiceAccordion = ({
  service,
  index,
  staggerDelay,
}: {
  service: (typeof services)[0];
  index: number;
  staggerDelay: number;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      className="border-b border-foreground/15"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: staggerDelay }}
    >
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
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 md:pb-12 pl-10 md:pl-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                <motion.p
                  className="text-muted-foreground leading-[1.7] text-base md:text-lg max-w-md"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                >
                  {service.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                >
                  <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground mb-4">
                    Related Services
                  </p>
                  <ul className="space-y-2">
                    {service.related.map((item, i) => (
                      <motion.li
                        key={item}
                        className="text-foreground/70 text-sm md:text-base"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <a
                  href="mailto:inmotion@movingp.com"
                  className="inline-flex items-center gap-2 text-sm font-medium text-foreground border border-foreground/20 rounded-full px-5 py-2.5 hover:bg-foreground hover:text-background transition-all duration-300"
                >
                  Get in touch
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ServicesSection;
