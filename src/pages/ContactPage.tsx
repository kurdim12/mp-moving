import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useSceneVisibility, SceneReveal, SceneDivider } from "@/components/SceneReveal";
import { cn } from "@/lib/utils";

const Scene1 = () => {
  const { ref, visible } = useSceneVisibility(0.3);
  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-3xl mx-auto px-6">
        <SceneReveal visible={visible} delay={100}>
          <h1 className="display-headline">
            Let's build something
            <br />
            that matters.
          </h1>
        </SceneReveal>
        <SceneReveal visible={visible} delay={250}>
          <p className="body-large max-w-xl mx-auto mt-8">
            We partner with founders and teams building long-term systems.
          </p>
        </SceneReveal>
        <SceneReveal visible={visible} delay={350}>
          <div className="mt-10 max-w-md mx-auto">
            <SceneDivider visible={visible} delay={450} />
          </div>
        </SceneReveal>
      </div>
    </section>
  );
};

const qualificationOptions = [
  "I am a founder building something new",
  "We are scaling an existing product",
  "We are exploring a long-term partnership",
];

const Scene2 = ({ selected, onSelect }: { selected: number | null; onSelect: (i: number) => void }) => {
  const { ref, visible } = useSceneVisibility();
  return (
    <section className="min-h-screen flex items-center bg-background">
      <div ref={ref} className="w-full max-w-2xl mx-auto px-6 py-24">
        <SceneReveal visible={visible} delay={0}>
          <h2 className="section-headline mb-12">Before we begin.</h2>
        </SceneReveal>
        <div className="space-y-4">
          {qualificationOptions.map((option, i) => (
            <SceneReveal key={i} visible={visible} delay={150 + i * 80}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                className={cn(
                  "w-full text-left border px-6 py-5 md:px-8 md:py-6 transition-colors duration-200 ease-out",
                  selected === i
                    ? "border-foreground bg-secondary"
                    : "border-border bg-background hover:bg-secondary"
                )}
              >
                <div className="flex items-center gap-4">
                  <span className={cn(
                    "w-4 h-4 border flex-shrink-0 transition-colors duration-200",
                    selected === i ? "border-foreground bg-foreground" : "border-border"
                  )} />
                  <span className="text-base md:text-lg font-medium text-foreground font-body">{option}</span>
                </div>
              </button>
            </SceneReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const stages = ["Idea", "Pre-seed", "Seed", "Growth", "Established"];

const Scene3 = () => {
  const { ref, visible } = useSceneVisibility();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const company = data.get("company") as string;
    const email = data.get("email") as string;
    const website = data.get("website") as string;
    const stage = data.get("stage") as string;
    const message = data.get("message") as string;

    const subject = encodeURIComponent(`New inquiry from ${name} — ${company}`);
    const body = encodeURIComponent(
      `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nWebsite: ${website || "N/A"}\nStage: ${stage}\n\n${message}`
    );
    window.location.href = `mailto:inmotion@movingp.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section className="min-h-screen flex items-center bg-background">
      <div ref={ref} className="w-full max-w-6xl mx-auto px-6 md:px-12 py-24">
        <div className="grid md:grid-cols-[1fr_340px] gap-16 md:gap-20">
          <div>
            <SceneReveal visible={visible} delay={0}>
              <h2 className="section-headline mb-10">Tell us about your project.</h2>
            </SceneReveal>

            {submitted ? (
              <SceneReveal visible={true} delay={0}>
                <div className="py-16 text-center">
                  <p className="text-xl font-medium text-foreground mb-3">Received.</p>
                  <p className="text-muted-foreground">If alignment exists, we'll respond within 48 hours.</p>
                </div>
              </SceneReveal>
            ) : (
              <SceneReveal visible={visible} delay={100}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-medium tracking-[0.1em] uppercase text-muted-foreground mb-2">Full Name</label>
                      <input name="name" type="text" required maxLength={100} className="w-full border-b border-border bg-transparent py-3 text-base text-foreground placeholder-muted-foreground/40 focus:outline-none focus:border-foreground transition-colors duration-200" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium tracking-[0.1em] uppercase text-muted-foreground mb-2">Company</label>
                      <input name="company" type="text" required maxLength={100} className="w-full border-b border-border bg-transparent py-3 text-base text-foreground placeholder-muted-foreground/40 focus:outline-none focus:border-foreground transition-colors duration-200" placeholder="Company name" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-medium tracking-[0.1em] uppercase text-muted-foreground mb-2">Email</label>
                      <input name="email" type="email" required maxLength={255} className="w-full border-b border-border bg-transparent py-3 text-base text-foreground placeholder-muted-foreground/40 focus:outline-none focus:border-foreground transition-colors duration-200" placeholder="you@company.com" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium tracking-[0.1em] uppercase text-muted-foreground mb-2">
                        Website <span className="text-muted-foreground/40 ml-1 normal-case tracking-normal">(optional)</span>
                      </label>
                      <input name="website" type="url" maxLength={255} className="w-full border-b border-border bg-transparent py-3 text-base text-foreground placeholder-muted-foreground/40 focus:outline-none focus:border-foreground transition-colors duration-200" placeholder="https://" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium tracking-[0.1em] uppercase text-muted-foreground mb-2">Stage</label>
                    <select name="stage" required className="w-full border-b border-border bg-transparent py-3 text-base text-foreground focus:outline-none focus:border-foreground transition-colors duration-200 appearance-none cursor-pointer" defaultValue="">
                      <option value="" disabled className="text-muted-foreground">Select stage</option>
                      {stages.map((s) => (<option key={s} value={s}>{s}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium tracking-[0.1em] uppercase text-muted-foreground mb-2">Message</label>
                    <textarea name="message" required maxLength={2000} rows={5} className="w-full border-b border-border bg-transparent py-3 text-base text-foreground placeholder-muted-foreground/40 focus:outline-none focus:border-foreground transition-colors duration-200 resize-none" placeholder="Tell us what you're building and where you need help." />
                  </div>
                  <div className="pt-4">
                    <button type="submit" className="bg-foreground text-background text-sm font-medium tracking-[0.05em] uppercase px-10 py-4 hover:opacity-80 transition-opacity duration-200">
                      Submit Inquiry
                    </button>
                  </div>
                </form>
              </SceneReveal>
            )}
          </div>

          <div className="hidden md:block">
            <SceneReveal visible={visible} delay={200}>
              <div className="pt-[52px]">
                <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
                  <p>MP engages selectively.</p>
                  <p>We focus on long-term partnerships where ownership and momentum are shared.</p>
                  <p>If alignment exists, we respond within 48 hours.</p>
                </div>
              </div>
            </SceneReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

const Scene4 = () => {
  const { ref, visible } = useSceneVisibility();
  return (
    <section className="bg-background pb-24">
      <div ref={ref} className="w-full max-w-6xl mx-auto px-6 md:px-12">
        <SceneReveal visible={visible} delay={0}>
          <SceneDivider visible={visible} delay={100} />
        </SceneReveal>
        <div className="pt-16 grid sm:grid-cols-2 gap-12">
          <SceneReveal visible={visible} delay={150}>
            <div>
              <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground mb-3">Email</p>
              <a href="mailto:inmotion@movingp.com" className="text-base text-foreground hover:text-muted-foreground transition-colors duration-200">
                inmotion@movingp.com
              </a>
            </div>
          </SceneReveal>
          <SceneReveal visible={visible} delay={250}>
            <div>
              <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground mb-3">Location</p>
              <p className="text-base text-foreground">Globally connected</p>
            </div>
          </SceneReveal>
        </div>
      </div>
    </section>
  );
};

const ContactPage = () => {
  const [selectedQualification, setSelectedQualification] = useState<number | null>(null);
  useDocumentTitle("Contact — MP");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 md:pt-20">
        <Scene1 />
        <Scene2 selected={selectedQualification} onSelect={setSelectedQualification} />
        <Scene3 />
        <Scene4 />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
