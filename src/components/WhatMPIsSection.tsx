import { useGsapSplitText, useGsapReveal } from "@/hooks/useGsap";

const WhatMPIsSection = () => {
  const splitRef = useGsapSplitText({ type: "words", stagger: 0.05, y: 50, ease: "back.out(1.3)" });
  const bodyRef = useGsapReveal({ stagger: 0.15 });

  return (
    <section className="section-padding">
      <div className="content-container">
        <div className="max-w-3xl">
          <div ref={splitRef} style={{ perspective: "600px" }}>
            <p data-split className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-8">
              Moving People
            </p>
            <p data-split className="text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.2] text-foreground mb-8 tracking-tight">
              People create possibilities. We exist to align people around what truly matters.
            </p>
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
