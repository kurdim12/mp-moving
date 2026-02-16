import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import mpLogo from "@/assets/mp-logo.png";

/* ─── Intersection hook ─── */
function useOnScreen(ref: React.RefObject<HTMLElement>, threshold = 0.2) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function useSceneVisibility(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useOnScreen(ref as React.RefObject<HTMLElement>, threshold);
  return { ref, visible };
}

const Reveal = ({
  children, delay = 0, visible, className,
}: {
  children: React.ReactNode; delay?: number; visible: boolean; className?: string;
}) => (
  <div
    className={cn(
      "transition-all duration-[300ms] ease-out",
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[8px]",
      className
    )}
    style={{ transitionDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

const Divider = ({ visible, delay = 0 }: { visible: boolean; delay?: number }) => (
  <div
    className={cn(
      "h-px bg-black origin-left transition-transform duration-[300ms] ease-out",
      visible ? "scale-x-100" : "scale-x-0"
    )}
    style={{ transitionDelay: `${delay}ms` }}
  />
);

/* ── SCENE 1 ── */
const Scene1 = () => {
  const { ref, visible } = useSceneVisibility(0.3);
  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center max-w-3xl mx-auto px-6">
        <Reveal visible={visible} delay={100}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black leading-[1.08]">
            Let's build something
            <br />
            that matters.
          </h1>
        </Reveal>
        <Reveal visible={visible} delay={250}>
          <p className="text-lg md:text-xl text-neutral-500 font-normal leading-relaxed max-w-xl mx-auto mt-8">
            We partner with founders and teams building long-term systems.
          </p>
        </Reveal>
        <Reveal visible={visible} delay={350}>
          <div className="mt-10 max-w-md mx-auto">
            <Divider visible={visible} delay={450} />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ── SCENE 2 — Qualification ── */
const qualificationOptions = [
  "I am a founder building something new",
  "We are scaling an existing product",
  "We are exploring a long-term partnership",
];

const Scene2 = ({ selected, onSelect }: { selected: number | null; onSelect: (i: number) => void }) => {
  const { ref, visible } = useSceneVisibility();
  return (
    <section className="min-h-screen flex items-center bg-white">
      <div ref={ref} className="w-full max-w-2xl mx-auto px-6 py-24">
        <Reveal visible={visible} delay={0}>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black mb-12">
            Before we begin.
          </h2>
        </Reveal>
        <div className="space-y-4">
          {qualificationOptions.map((option, i) => (
            <Reveal key={i} visible={visible} delay={150 + i * 80}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                className={cn(
                  "w-full text-left border px-6 py-5 md:px-8 md:py-6 transition-colors duration-200 ease-out",
                  selected === i
                    ? "border-black bg-neutral-50"
                    : "border-neutral-200 bg-white hover:bg-neutral-50"
                )}
              >
                <div className="flex items-center gap-4">
                  <span className={cn(
                    "w-4 h-4 border flex-shrink-0 transition-colors duration-200",
                    selected === i ? "border-black bg-black" : "border-neutral-300"
                  )} />
                  <span className="text-base md:text-lg font-medium text-black">{option}</span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── SCENE 3 — Form ── */
const stages = ["Idea", "Pre-seed", "Seed", "Growth", "Established"];

const Scene3 = () => {
  const { ref, visible } = useSceneVisibility();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="min-h-screen flex items-center bg-white">
      <div ref={ref} className="w-full max-w-6xl mx-auto px-6 md:px-12 py-24">
        <div className="grid md:grid-cols-[1fr_340px] gap-16 md:gap-20">
          <div>
            <Reveal visible={visible} delay={0}>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black mb-10">
                Tell us about your project.
              </h2>
            </Reveal>

            {submitted ? (
              <Reveal visible={true} delay={0}>
                <div className="py-16 text-center">
                  <p className="text-xl font-medium text-black mb-3">Received.</p>
                  <p className="text-neutral-500">If alignment exists, we'll respond within 48 hours.</p>
                </div>
              </Reveal>
            ) : (
              <Reveal visible={visible} delay={100}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-medium tracking-[0.1em] uppercase text-neutral-400 mb-2">Full Name</label>
                      <input type="text" required maxLength={100} className="w-full border-b border-neutral-300 bg-transparent py-3 text-base text-black placeholder-neutral-300 focus:outline-none focus:border-black transition-colors duration-200" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium tracking-[0.1em] uppercase text-neutral-400 mb-2">Company</label>
                      <input type="text" required maxLength={100} className="w-full border-b border-neutral-300 bg-transparent py-3 text-base text-black placeholder-neutral-300 focus:outline-none focus:border-black transition-colors duration-200" placeholder="Company name" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-medium tracking-[0.1em] uppercase text-neutral-400 mb-2">Email</label>
                      <input type="email" required maxLength={255} className="w-full border-b border-neutral-300 bg-transparent py-3 text-base text-black placeholder-neutral-300 focus:outline-none focus:border-black transition-colors duration-200" placeholder="you@company.com" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium tracking-[0.1em] uppercase text-neutral-400 mb-2">
                        Website <span className="text-neutral-300 ml-1 normal-case tracking-normal">(optional)</span>
                      </label>
                      <input type="url" maxLength={255} className="w-full border-b border-neutral-300 bg-transparent py-3 text-base text-black placeholder-neutral-300 focus:outline-none focus:border-black transition-colors duration-200" placeholder="https://" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium tracking-[0.1em] uppercase text-neutral-400 mb-2">Stage</label>
                    <select required className="w-full border-b border-neutral-300 bg-transparent py-3 text-base text-black focus:outline-none focus:border-black transition-colors duration-200 appearance-none cursor-pointer" defaultValue="">
                      <option value="" disabled className="text-neutral-300">Select stage</option>
                      {stages.map((s) => (<option key={s} value={s}>{s}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium tracking-[0.1em] uppercase text-neutral-400 mb-2">Message</label>
                    <textarea required maxLength={2000} rows={5} className="w-full border-b border-neutral-300 bg-transparent py-3 text-base text-black placeholder-neutral-300 focus:outline-none focus:border-black transition-colors duration-200 resize-none" placeholder="Tell us what you're building and where you need help." />
                  </div>
                  <div className="pt-4">
                    <button type="submit" className="bg-black text-white text-sm font-medium tracking-[0.05em] uppercase px-10 py-4 hover:bg-neutral-800 transition-colors duration-200">
                      Submit Inquiry
                    </button>
                  </div>
                </form>
              </Reveal>
            )}
          </div>

          <div className="hidden md:block">
            <Reveal visible={visible} delay={200}>
              <div className="pt-[52px]">
                <div className="space-y-6 text-sm text-neutral-400 leading-relaxed">
                  <p>MP engages selectively.</p>
                  <p>We focus on long-term partnerships where ownership and momentum are shared.</p>
                  <p>If alignment exists, we respond within 48 hours.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── SCENE 4 — Direct Contact ── */
const Scene4 = () => {
  const { ref, visible } = useSceneVisibility();
  return (
    <section className="bg-white pb-24">
      <div ref={ref} className="w-full max-w-6xl mx-auto px-6 md:px-12">
        <Reveal visible={visible} delay={0}>
          <Divider visible={visible} delay={100} />
        </Reveal>
        <div className="pt-16 grid sm:grid-cols-3 gap-12">
          <Reveal visible={visible} delay={150}>
            <div>
              <p className="text-xs font-medium tracking-[0.15em] uppercase text-neutral-400 mb-3">Email</p>
              <a href="mailto:hello@movingpeople.studio" className="text-base text-black hover:text-neutral-600 transition-colors duration-200">
                hello@movingpeople.studio
              </a>
            </div>
          </Reveal>
          <Reveal visible={visible} delay={250}>
            <div>
              <p className="text-xs font-medium tracking-[0.15em] uppercase text-neutral-400 mb-3">Location</p>
              <p className="text-base text-black">Globally connected</p>
            </div>
          </Reveal>
          <Reveal visible={visible} delay={350}>
            <div>
              <p className="text-xs font-medium tracking-[0.15em] uppercase text-neutral-400 mb-3">LinkedIn</p>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-base text-black hover:text-neutral-600 transition-colors duration-200">
                Connect on LinkedIn →
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

/* ── PAGE ── */
const ContactPage = () => {
  const [selectedQualification, setSelectedQualification] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={mpLogo} alt="MP Logo" className="h-6 md:h-8 w-auto" />
          </Link>
          <span className="text-xs font-medium tracking-[0.15em] uppercase text-neutral-300">Contact</span>
        </div>
      </nav>

      <main className="pt-14">
        <Scene1 />
        <Scene2 selected={selectedQualification} onSelect={setSelectedQualification} />
        <Scene3 />
        <Scene4 />
      </main>
    </div>
  );
};

export default ContactPage;
