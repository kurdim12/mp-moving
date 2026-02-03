import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Are you an agency?",
    answer: "No. Agencies deliver work. We build partnerships. The distinction matters because it changes how we think, how we're structured, and how we measure success. We're invested in your outcome, not just our output.",
  },
  {
    question: "Do you take equity?",
    answer: "Sometimes. When alignment is strong and the opportunity is right, we work on shared-ownership models. But equity is never a requirement — it's an option when it makes sense for both sides.",
  },
  {
    question: "What kind of projects do you work on?",
    answer: "We work on systems, not isolated projects. That might mean building a brand from scratch, designing a platform, creating internal tools, or establishing the strategic foundation for growth. The common thread: everything connects to momentum.",
  },
  {
    question: "How long do engagements last?",
    answer: "It varies. Some partnerships are intense and focused — a few months to build something specific. Others are ongoing, evolving as the business grows. We don't force timelines. We follow momentum.",
  },
];

const FAQSection = () => {
  return (
    <section className="section-padding bg-card">
      <div className="content-container">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 md:mb-16">
            <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
              Questions
            </p>
            <h2 className="section-headline text-foreground">
              Common questions.
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-0">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-b border-border py-2"
              >
                <AccordionTrigger className="text-left text-lg font-medium text-foreground hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
