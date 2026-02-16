import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import mpLogo from "@/assets/mp-logo.png";
import CinematicOverlay from "@/components/CinematicOverlay";

gsap.registerPlugin(ScrollTrigger);

const textClusters = [
  { text: "Moving People.", className: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight" },
  { text: "We exist to move people forward.", className: "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-tight opacity-80" },
  { text: "People create possibilities.", className: "text-lg sm:text-xl md:text-2xl lg:text-3xl font-light tracking-tight opacity-60" },
  { text: "We exist to align people around what truly matters.", className: "text-base sm:text-lg md:text-xl lg:text-2xl font-light opacity-50" },
  { text: "When alignment is clear, momentum becomes natural.", className: "text-base sm:text-lg md:text-xl lg:text-2xl font-light opacity-40" },
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Logo fade in
      tl.fromTo(
        logoRef.current,
        { opacity: 0, y: 20 },
        { opacity: 0.7, y: 0, duration: 0.1 },
        0
      );

      // Stagger text clusters
      textRefs.current.forEach((el, i) => {
        if (!el) return;
        const start = i * 0.18;
        tl.fromTo(
          el,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" },
          start
        );
      });

      // Fade everything out at the end
      tl.to(
        [logoRef.current, ...textRefs.current.filter(Boolean)],
        { opacity: 0, y: -30, duration: 0.15, stagger: 0.02 },
        0.85
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#0B0B0D" }}
    >
      <CinematicOverlay />

      <div className="relative z-10 flex flex-col justify-end h-full pb-16 md:pb-24 lg:pb-32">
        <div className="content-container">
          {/* Logo */}
          <img
            ref={logoRef}
            src={mpLogo}
            alt="MP — Moving People"
            className="h-10 md:h-14 lg:h-16 w-auto mb-10 md:mb-14 opacity-0 invert"
          />

          {/* Text clusters */}
          <div className="max-w-4xl space-y-4 md:space-y-6">
            {textClusters.map((cluster, i) => (
              <div
                key={i}
                ref={(el) => { textRefs.current[i] = el; }}
                className="opacity-0"
              >
                <p
                  className={`${cluster.className} leading-[1.1]`}
                  style={{ color: "hsl(40, 20%, 96%)" }}
                >
                  {cluster.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
