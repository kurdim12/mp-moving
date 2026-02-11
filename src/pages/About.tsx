import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 md:pt-40 pb-16">
          <div className="content-container">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              Ownership is the foundation.
            </h1>
          </div>
        </section>

        {/* Philosophy */}
        <section className="border-t border-border py-16 md:py-24">
          <div className="content-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
              <div>
                <p className="text-base text-foreground/80 leading-relaxed mb-6">
                  MP exists because most ideas don't fail — they stall. They stall in planning cycles, 
                  agency handoffs, disconnected systems, and relationships where nobody has real skin in the game.
                </p>
                <p className="text-base text-foreground/80 leading-relaxed">
                  We built MP to be the opposite. A studio where every engagement starts with alignment 
                  and operates with ownership. We think like founders because we are founders — of our 
                  own ventures, and of the partnerships we commit to.
                </p>
              </div>

              <div>
                <p className="text-base text-foreground/80 leading-relaxed mb-6">
                  We're globally connected but selectively engaged. We don't scale through volume. 
                  We scale through depth — fewer projects, more commitment, better outcomes.
                </p>
                <p className="text-base text-foreground/80 leading-relaxed">
                  Long-term thinking isn't a positioning statement for us. It's how we evaluate 
                  every decision — from the partnerships we enter to the systems we build to the 
                  ventures we invest in.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="border-t border-border py-16 md:py-24">
          <div className="content-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
              {[
                {
                  title: "Precision",
                  text: "Every decision is intentional. We remove what doesn't serve the outcome and commit fully to what does.",
                },
                {
                  title: "Clarity",
                  text: "Before we build, we make sure the problem is understood. Clear thinking leads to clear systems.",
                },
                {
                  title: "Momentum",
                  text: "We don't just deliver — we create movement. Products, teams, and companies that keep going after we step back.",
                },
              ].map((v, i) => (
                <div key={i} className="bg-background p-8 md:p-12">
                  <h3 className="text-base font-semibold text-foreground mb-3">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="border-t border-border py-16 md:py-24">
          <div className="content-container">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
                Let's build something meaningful.
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-10">
                We work selectively. If there's alignment, the conversation starts naturally.
              </p>
              <a
                href="mailto:hello@movingpeople.studio"
                className="inline-block text-sm font-medium text-foreground border border-foreground px-8 py-3 hover:bg-foreground hover:text-background transition-all duration-300"
              >
                hello@movingpeople.studio
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
