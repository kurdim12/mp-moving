import VideoCanvasScrub from "@/components/VideoCanvasScrub";

const ScrollStory = () => {
  return (
    <div style={{ background: "#0B0D10" }}>
      {/* Scroll-scrub video scene */}
      <VideoCanvasScrub />

      {/* CTA section */}
      <section
        className="relative w-full py-32 md:py-48 px-8 md:px-16"
        style={{ background: "#0B0D10" }}
      >
        <div className="max-w-2xl">
          <span
            className="text-xs font-medium tracking-[0.25em] uppercase"
            style={{ color: "rgba(244,246,248,0.4)" }}
          >
            What's next
          </span>
          <h2
            className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.0] tracking-[-0.03em]"
            style={{ color: "#F4F6F8", fontFamily: "var(--font-display)" }}
          >
            Build with MP
          </h2>
          <p
            className="mt-6 text-lg leading-relaxed max-w-md"
            style={{ color: "rgba(244,246,248,0.6)" }}
          >
            If you're building something real, we should talk.
          </p>
          <a
            href="mailto:inmotion@movingp.com"
            className="inline-flex items-center gap-2 mt-10 text-base font-bold rounded-full px-10 py-4 transition-all duration-300 hover:scale-[1.02]"
            style={{
              color: "#0B0D10",
              background: "#F4F6F8",
              fontFamily: "var(--font-display)",
            }}
          >
            inmotion@movingp.com
          </a>
        </div>

        {/* Minimal footer */}
        <div
          className="mt-32 pt-8 border-t flex items-center justify-between"
          style={{ borderColor: "rgba(244,246,248,0.1)" }}
        >
          <span
            className="text-xs tracking-[0.15em] uppercase"
            style={{ color: "rgba(244,246,248,0.3)" }}
          >
            MP — Moving People
          </span>
          <span
            className="text-xs"
            style={{ color: "rgba(244,246,248,0.2)" }}
          >
            © {new Date().getFullYear()}
          </span>
        </div>
      </section>
    </div>
  );
};

export default ScrollStory;
