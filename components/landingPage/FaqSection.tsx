import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FaqSection() {
  const faqs = [
    {
      question: "How does Meeting Co-pilot work?",
      answer:
        "Meeting Co-pilot uses advanced natural language processing to understand your documents. When you upload a document, our system analyzes the content, structure, and key points. It then creates an Meeting Co-pilot that can explain the document and answer questions about it, just like you would.",
    },
    {
      question: "What types of documents can I upload?",
      answer:
        "Currently, Meeting Co-pilot supports PDF files and PowerPoint presentations (PPT and PPTX). We're working on adding support for more document types in the future.",
    },
    {
      question: "How accurate is the Meeting Co-pilot?",
      answer:
        "Our Meeting Co-pilot is highly accurate for explaining the content that's in your document. It sticks to the information provided and doesn't make things up. However, it's always a good idea to review the AI's understanding of complex or nuanced content before sharing with clients.",
    },
    {
      question: "Can I customize how the Meeting Co-pilot presents my document?",
      answer:
        "Yes! You can add notes to guide the Co-pilot's explanations, emphasize certain points, and even set the tone of the presentation. Our Professional and Enterprise plans offer more advanced customization options.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We take data security very seriously. All documents are encrypted both in transit and at rest. We never share your documents with third parties, and you can delete your data at any time.",
    },
    {
      question: "How many clients can access my Co-pilot's presentations?",
      answer:
        "There's no limit to how many clients can access your presentations. Each plan has a limit on the number of documents you can upload, but not on the number of people who can view them.",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-muted/50 w-full mx-auto">
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground">Everything you need to know about Meeting Co-pilot</p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-medium">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

