import { useRef, useEffect } from "react";
import { useGsapClipReveal, useGsapReveal, useGsapParallax, useGsapLineReveal } from "@/hooks/useGsap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import visualPartnership from "@/assets/wwb-partnerships.jpg";

gsap.registerPlugin(ScrollTrigger);

const SectionStatement = () => {
  const ref = useGsapClipReveal();
  return (
    <div ref={ref} className="section-padding">
      <div className="content-container">
        <div className="overflow-hidden">
          <h2 data-clip className="display-massive text-foreground">we grow</h2>
        </div>
        <div className="overflow-hidden">
          <h2 data-clip className="display-massive text-muted-foreground">together.</h2>
        </div>
      </div>
    </div>
  );
};

const AboutMPSection = () => {
  const imgRef = useGsapParallax(0.12);
  const textRef = useGsapReveal({ stagger: 0.12 });
  const lineRef = useGsapLineReveal();
  const venturesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!venturesRef.current) return;
    const els = venturesRef.current.querySelectorAll("[data-venture]");

    gsap.set(els, { opacity: 0, y: 40, scale: 0.92 });

    gsap.to(els, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.3)",
      stagger: 0.15,
      scrollTrigger: {
        trigger: venturesRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === venturesRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section className="w-full">
      <SectionStatement />

      <div className="content-container pb-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div ref={imgRef} className="overflow-hidden rounded-lg aspect-[4/3]">
            <img
              src={visualPartnership}
              alt="Partnership"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

          <div ref={textRef} className="flex flex-col justify-center py-4 space-y-8">
            <p data-gsap className="text-xl md:text-2xl font-bold text-foreground leading-snug tracking-tight">
              Moving People is a globally connected, remote-first build group.
            </p>
            <p data-gsap className="text-muted-foreground leading-[1.7] text-base md:text-lg max-w-md">
              We were founded on a simple belief: partnership drives lasting impact. Our team operates across disciplines and geographies, but is united by one ethos.
            </p>
            <div data-gsap className="space-y-3 pt-4">
              <p className="text-lg font-bold text-foreground">Clarity before scale.</p>
              <p className="text-lg font-bold text-foreground">Structure before speed.</p>
              <p className="text-lg font-bold text-foreground">Ownership before optics.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ventures */}
      <div className="content-container pb-24 md:pb-32">
        <div ref={lineRef} className="h-px bg-foreground/15" />
        <div ref={venturesRef} className="pt-16">
          <p data-venture className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-8">
            Ventures
          </p>
          <h3 data-venture className="section-headline text-foreground mb-8 max-w-xl">
            We build and co-own what we believe in.
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/10 mt-12">
            <div data-venture className="bg-background p-8 md:p-12">
              <h4 className="text-xl font-bold text-foreground mb-4">MP Build</h4>
              <p className="text-muted-foreground leading-relaxed">
                We originate and fully own these projects. We generate the idea and use MP's resources to develop it from scratch.
              </p>
            </div>
            <div data-venture className="bg-background p-8 md:p-12">
              <h4 className="text-xl font-bold text-foreground mb-4">MP Co-Build</h4>
              <p className="text-muted-foreground leading-relaxed">
                Co-founded projects with external partners. We collaborate from the ground up — shaping the concept, sharing equity, and executing jointly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMPSection;
