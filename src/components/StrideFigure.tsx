import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Abstract human figure SVG that walks/strides forward as the user scrolls.
 * Fixed in background, large and faint, representing "moving people forward."
 */
const StrideFigure = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const head = svg.querySelector("#stride-head");
    const torso = svg.querySelector("#stride-torso");
    const armFront = svg.querySelector("#stride-arm-front");
    const armBack = svg.querySelector("#stride-arm-back");
    const legFront = svg.querySelector("#stride-leg-front");
    const legBack = svg.querySelector("#stride-leg-back");
    const footFront = svg.querySelector("#stride-foot-front");
    const footBack = svg.querySelector("#stride-foot-back");

    // Initial resting pose
    gsap.set(svg, { x: "-15vw", opacity: 0 });
    gsap.set(head, { y: 0 });
    gsap.set(armFront, { rotation: 0, transformOrigin: "50% 0%" });
    gsap.set(armBack, { rotation: 0, transformOrigin: "50% 0%" });
    gsap.set(legFront, { rotation: 0, transformOrigin: "50% 0%" });
    gsap.set(legBack, { rotation: 0, transformOrigin: "50% 0%" });

    // Main scroll-driven timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    // Fade in and walk across the screen
    tl.to(svg, { opacity: 1, duration: 0.1 }, 0);
    tl.to(svg, { x: "85vw", ease: "none", duration: 1 }, 0);

    // Head bob (subtle vertical bounce)
    tl.to(head, { y: -3, duration: 0.125, ease: "sine.inOut", yoyo: true, repeat: 7 }, 0);

    // Torso slight lean forward
    tl.fromTo(torso, { rotation: 0 }, { rotation: 3, duration: 0.5, ease: "sine.inOut" }, 0);
    tl.to(torso, { rotation: 0, duration: 0.5, ease: "sine.inOut" }, 0.5);

    // Walking cycle - arms swing opposite to legs
    const swingDur = 0.125;
    const swingAngle = 25;

    for (let i = 0; i < 4; i++) {
      const offset = i * 0.25;
      // Arms
      tl.to(armFront, { rotation: swingAngle, duration: swingDur, ease: "sine.inOut" }, offset);
      tl.to(armFront, { rotation: -swingAngle, duration: swingDur, ease: "sine.inOut" }, offset + swingDur);
      tl.to(armBack, { rotation: -swingAngle, duration: swingDur, ease: "sine.inOut" }, offset);
      tl.to(armBack, { rotation: swingAngle, duration: swingDur, ease: "sine.inOut" }, offset + swingDur);

      // Legs
      tl.to(legFront, { rotation: -swingAngle, duration: swingDur, ease: "sine.inOut" }, offset);
      tl.to(legFront, { rotation: swingAngle, duration: swingDur, ease: "sine.inOut" }, offset + swingDur);
      tl.to(legBack, { rotation: swingAngle, duration: swingDur, ease: "sine.inOut" }, offset);
      tl.to(legBack, { rotation: -swingAngle, duration: swingDur, ease: "sine.inOut" }, offset + swingDur);

      // Feet pivot
      tl.to(footFront, { rotation: 10, duration: swingDur, ease: "sine.inOut" }, offset);
      tl.to(footFront, { rotation: -5, duration: swingDur, ease: "sine.inOut" }, offset + swingDur);
      tl.to(footBack, { rotation: -5, duration: swingDur, ease: "sine.inOut" }, offset);
      tl.to(footBack, { rotation: 10, duration: swingDur, ease: "sine.inOut" }, offset + swingDur);
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars?.trigger === document.documentElement && st.animation === tl) st.kill();
      });
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="fixed top-1/2 left-0 -translate-y-1/2 z-[1] pointer-events-none"
      width="180"
      height="400"
      viewBox="0 0 180 400"
      fill="none"
      aria-hidden="true"
      style={{ opacity: 0 }}
    >
      {/* Head */}
      <circle
        id="stride-head"
        cx="90"
        cy="50"
        r="22"
        stroke="hsl(var(--foreground))"
        strokeWidth="2"
        fill="none"
        opacity="0.12"
      />

      {/* Torso */}
      <g id="stride-torso" style={{ transformOrigin: "90px 75px" }}>
        <line
          x1="90" y1="72" x2="90" y2="180"
          stroke="hsl(var(--foreground))"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.12"
        />
      </g>

      {/* Arm back */}
      <g id="stride-arm-back" style={{ transformOrigin: "90px 95px" }}>
        <path
          d="M90 95 L65 165"
          stroke="hsl(var(--foreground))"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.08"
        />
      </g>

      {/* Arm front */}
      <g id="stride-arm-front" style={{ transformOrigin: "90px 95px" }}>
        <path
          d="M90 95 L115 165"
          stroke="hsl(var(--foreground))"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.12"
        />
      </g>

      {/* Leg back */}
      <g id="stride-leg-back" style={{ transformOrigin: "90px 180px" }}>
        <path
          d="M90 180 L70 290"
          stroke="hsl(var(--foreground))"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.08"
        />
        {/* Foot back */}
        <g id="stride-foot-back" style={{ transformOrigin: "70px 290px" }}>
          <path
            d="M70 290 L55 295"
            stroke="hsl(var(--foreground))"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.08"
          />
        </g>
      </g>

      {/* Leg front */}
      <g id="stride-leg-front" style={{ transformOrigin: "90px 180px" }}>
        <path
          d="M90 180 L110 290"
          stroke="hsl(var(--foreground))"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.12"
        />
        {/* Foot front */}
        <g id="stride-foot-front" style={{ transformOrigin: "110px 290px" }}>
          <path
            d="M110 290 L125 295"
            stroke="hsl(var(--foreground))"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.12"
          />
        </g>
      </g>
    </svg>
  );
};

export default StrideFigure;
