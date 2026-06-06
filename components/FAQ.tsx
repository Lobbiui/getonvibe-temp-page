import { Section } from "@/components/Section";

const faqs = [
  {
    question: "When and where is ONVIBE Festival?",
    answer:
      "Nashville Area. Target Date: October 10, 2026. Venue announcement and timing updates will be sent first to registered subscribers.",
  },
  {
    question: "Is this a 21 plus event?",
    answer:
      "Yes. You must be 21 or older and have a valid government-issued ID ready for entry.",
  },
  {
    question: "What is GetOnVibe?",
    answer:
      "GetOnVibe is a platform built for social discovery, local commerce, brand visibility, events, and industry intelligence in the alternative products space.",
  },
  {
    question: "Can brands apply to vend?",
    answer:
      "Yes, limited spots are available. Brand vendors must operate in the legal hemp space and carry active, verifiable COAs for applicable products.",
  },
  {
    question: "Can food vendors apply?",
    answer: "Yes, limited food vendor spots are available.",
  },
  {
    question: "Are the competition details final?",
    answer:
      "Prize amounts are announced. Full rules, judging details, and special guest judges will be announced to registered subscribers.",
  },
];

export function FAQ() {
  return (
    <Section id="faq" eyebrow="FAQ" title="The details people ask for first.">
      <div className="grid gap-4 lg:grid-cols-2">
        {faqs.map((faq) => (
          <details key={faq.question} className="glass-panel group rounded-lg p-5">
            <summary className="cursor-pointer list-none text-lg font-black text-white focus:outline-none focus:ring-2 focus:ring-cyan-300">
              {faq.question}
            </summary>
            <p className="mt-4 leading-7 text-slate-300">{faq.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
