import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  copy?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, eyebrow, title, copy, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("relative px-4 py-20 sm:px-6 lg:px-8", className)}>
      <div className="mx-auto max-w-7xl">
        {(eyebrow || title || copy) && (
          <div className="mb-10 max-w-3xl">
            {eyebrow && (
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-cyan-300">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl">{title}</h2>
            )}
            {copy && <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">{copy}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
