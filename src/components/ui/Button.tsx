"use client";

import { useRef } from "react";
import { useMotionOK } from "@/lib/motion";

type Variant = "solid" | "outline" | "ghost";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-medium tracking-tight transition-colors duration-300 will-change-transform disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  solid: "bg-accent text-ink hover:bg-paper",
  outline:
    "border border-paper/25 text-paper hover:border-accent hover:text-accent",
  ghost: "text-paper/70 hover:text-paper",
};

/**
 * Magnetic button — the element leans toward the pointer within its bounds.
 *
 * Transform is written imperatively so hover never triggers a React render.
 * Disabled for coarse pointers and reduced motion, where it degrades to a
 * perfectly ordinary button.
 */
export default function Button({
  children,
  href,
  variant = "solid",
  className = "",
  strength = 0.28,
  ...rest
}: {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  strength?: number;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ref = useRef<HTMLElement>(null);
  const motionOK = useMotionOK();

  const magnetic = motionOK
    ? {
        onPointerMove: (e: React.PointerEvent) => {
          if (e.pointerType !== "mouse") return;
          const el = ref.current;
          if (!el) return;
          const r = el.getBoundingClientRect();
          const x = (e.clientX - (r.left + r.width / 2)) * strength;
          const y = (e.clientY - (r.top + r.height / 2)) * strength;
          el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        },
        onPointerLeave: () => {
          const el = ref.current;
          if (el) el.style.transform = "translate3d(0,0,0)";
        },
      }
    : {};

  const cls = `${base} ${variants[variant]} ${className}`;
  const style = motionOK
    ? { transition: "transform 500ms var(--ease-out-expo), color 300ms, background-color 300ms, border-color 300ms" }
    : undefined;

  if (href) {
    return (
      <a
        // @ts-expect-error -- shared ref across anchor/button
        ref={ref}
        href={href}
        className={cls}
        style={style}
        {...magnetic}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      // @ts-expect-error -- shared ref across anchor/button
      ref={ref}
      className={cls}
      style={style}
      {...magnetic}
      {...rest}
    >
      {children}
    </button>
  );
}
