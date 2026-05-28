import { FileCheck2, IdCard, ShieldAlert, ShieldCheck } from "lucide-react";
import { Section } from "@/components/Section";

const points = [
  "21 plus event",
  "Valid ID required",
  "No entry without valid ID",
  "Brand vendors must be able to provide current COAs",
  "This page is for event registration, vendor inquiries, and platform launch updates only",
  "Do not make medical claims anywhere on the page",
  "Do not imply illegal products, illegal sales, or unlawful consumption",
];

export function ComplianceNotice() {
  return (
    <Section
      id="compliance"
      eyebrow="Legal and compliance"
      title="Premium energy. Serious operating standards."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel glow-border rounded-lg p-6 sm:p-8">
          <ShieldCheck className="mb-5 h-9 w-9 text-cyan-300" aria-hidden="true" />
          <p className="text-xl font-bold leading-9 text-white">
            All onsite brand partners and product exhibitors must operate within the legal hemp space and are required to carry active, verifiable Certificates of Analysis for all applicable products.
          </p>
        </div>
        <div className="glass-panel rounded-lg p-6">
          <div className="mb-5 flex items-center gap-3 text-fuchsia-200">
            <ShieldAlert className="h-6 w-6" aria-hidden="true" />
            <h3 className="text-xl font-black text-white">Required standards</h3>
          </div>
          <ul className="space-y-3">
            {points.map((point) => (
              <li key={point} className="flex gap-3 text-slate-300">
                {point.includes("ID") ? (
                  <IdCard className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
                ) : (
                  <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
                )}
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
