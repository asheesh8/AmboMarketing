"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  /** Stagger offset in ms — use for sibling items in a list. */
  delay?: number;
  /** How far the element travels in. */
  y?: number;
  as?: "div" | "li" | "section" | "article" | "span";
  className?: string;
};

/**
 * Scroll reveal via IntersectionObserver + a CSS transition.
 *
 * Deliberately not using a motion library: this fires on dozens of elements
 * per page and the whole effect is one opacity + translate, which the
 * compositor handles for free. Reduced motion is handled in globals.css,
 * which forces [data-reveal] to its final state.
 *
 * The observer disconnects after the first intersection — these never
 * animate back out.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 22,
  as: Tag = "div",
  className = "",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        io.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      // @ts-expect-error -- one ref type across the small union of tags
      ref={ref}
      data-reveal
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translate3d(0, ${y}px, 0)`,
        transition: `opacity 900ms var(--ease-out-expo) ${delay}ms, transform 900ms var(--ease-out-expo) ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}
