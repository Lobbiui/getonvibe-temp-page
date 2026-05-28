import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type NeonButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function NeonButton({ children, className, variant = "primary", ...props }: NeonButtonProps) {
  return (
    <a
      className={cn(
        "inline-flex min-h-12 items-center justify-center rounded-md px-5 py-3 text-center text-sm font-black uppercase tracking-[0.14em] transition focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950",
        variant === "primary"
          ? "bg-cyan-300 text-slate-950 shadow-[0_0_34px_rgba(6,182,212,0.36)] hover:bg-white"
          : "border border-fuchsia-300/50 bg-white/5 text-white hover:border-cyan-300 hover:bg-cyan-300/10",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
