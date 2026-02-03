import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Are you an agency?",
    answer: "No. Agencies deliver outputs. We build partnerships. We're invested in outcomes, not deliverables.",
  },
  {
    question: "Do you take equity?",
    answer: "Sometimes. When alignment is strong, shared ownership makes sense. Never required.",
  },
  {
    question: "What do you work on?",
    answer: "Systems — brands, platforms, tools, strategy. Everything connects to momentum.",
  },
];

const FAQSection = () => {
  return (
    <section className="section-padding">
      <div className="content-container">
        <div className="max-w-2xl">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-b border-border"
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
