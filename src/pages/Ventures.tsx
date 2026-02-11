import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Ventures = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="pt-32 md:pt-40 pb-16">
          <div className="content-container">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              Ventures
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              MP doesn't just build for others. We build with them — and sometimes, we build our own.
            </p>
          </div>
        </section>

        {/* Build vs Co-Build */}
        <section className="border-t border-border py-16 md:py-24">
          <div className="content-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
              {/* MP Build */}
              <div className="bg-background p-8 md:p-12">
                <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase mb-4">
                  MP Build
                </p>
                <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">
                  Internal Ventures
                </h2>
                <p className="text-sm text-foreground/80 leading-relaxed mb-6">
                  Products and platforms conceived, designed, and built entirely within MP. 
                  We identify problems worth solving, validate the opportunity, and build from zero.
                </p>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <span className="text-foreground mt-0.5">—</span>
                    <span>Full ownership and decision authority</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-foreground mt-0.5">—</span>
                    <span>Built on conviction, not client briefs</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-foreground mt-0.5">—</span>
                    <span>Long-term horizon, no artificial timelines</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-foreground mt-0.5">—</span>
                    <span>Revenue-generating or strategically foundational</span>
                  </div>
                </div>
              </div>

              {/* MP Co-Build */}
              <div className="bg-background p-8 md:p-12">
                <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase mb-4">
                  MP Co-Build
                </p>
                <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">
                  Shared Ventures
                </h2>
                <p className="text-sm text-foreground/80 leading-relaxed mb-6">
                  Partnerships that evolve beyond service work. When alignment is deep and the opportunity 
                  is right, we commit as co-owners — sharing risk, equity, and long-term responsibility.
                </p>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <span className="text-foreground mt-0.5">—</span>
                    <span>Equity-based partnership model</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-foreground mt-0.5">—</span>
                    <span>Shared decision-making with founders</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-foreground mt-0.5">—</span>
                    <span>Starts as build work, evolves through trust</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-foreground mt-0.5">—</span>
                    <span>Selective — fewer partnerships, deeper commitment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="border-t border-border py-16 md:py-24">
          <div className="content-container">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase mb-6">
                Our Approach
              </p>
              <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed mb-6">
                We don't chase deal flow. We build where we see conviction.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                Every venture — internal or shared — follows the same principle: build something 
                that creates real value, with people who think long-term, using systems that scale.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                We're not a fund. We're not an accelerator. We're builders who put our own work, 
                time, and capital behind the things we believe in.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Ventures;
