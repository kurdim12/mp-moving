import { useGsapReveal, useGsapClipReveal } from "@/hooks/useGsap";

const WhatMPIsSection = () => {
  const clipRef = useGsapClipReveal();
  const bodyRef = useGsapReveal({ stagger: 0.15 });

  return (
    <section className="section-padding">
      <div className="content-container">
        <div className="max-w-3xl">
          <div ref={clipRef}>
            <div className="overflow-hidden">
              <p data-clip className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-8">
                Moving People
              </p>
            </div>
            <div className="overflow-hidden">
              <p data-clip className="text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.2] text-foreground mb-8 tracking-tight">
                People create possibilities.
                <br />
                We exist to align people around what truly matters.
              </p>
            </div>
          </div>
          <div ref={bodyRef}>
            <p data-gsap className="body-large max-w-lg">
              When alignment is clear, momentum becomes natural. We move people — and people move possibilities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatMPIsSection;
