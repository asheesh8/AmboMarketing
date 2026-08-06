"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText, ScrollTrigger, registerGsap, useMotionOK } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  /** Animate on mount instead of on scroll — for the hero. */
  immediate?: boolean;
  delay?: number;
};

/**
 * Per-character headline reveal using GSAP SplitText.
 *
 * Two things matter here and both are easy to get wrong:
 *
 * 1. Fonts. Splitting before the webfont loads measures the fallback, so
 *    lines break in the wrong places and never recover. We await
 *    document.fonts.ready first.
 * 2. Cleanup. SplitText rewrites the DOM; without revert() a re-render
 *    (or a resize re-split) leaves orphaned spans and duplicated text.
 *
 * Under reduced motion the component renders plain, un-split text.
 */
export default function SplitHeading({
  children,
  className = "",
  as: Tag = "h2",
  immediate = false,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const motionOK = useMotionOK();

  useEffect(() => {
    if (!motionOK) return;
    const el = ref.current;
    if (!el) return;

    registerGsap();

    let split: InstanceType<typeof SplitText> | null = null;
    let tween: gsap.core.Tween | null = null;
    let trigger: ScrollTrigger | null = null;
    let cancelled = false;

    const run = () => {
      if (cancelled || !ref.current) return;

      split = new SplitText(ref.current, {
        type: "lines,chars",
        linesClass: "split-line",
        charsClass: "split-char",
        // Keeps screen readers reading the sentence, not 40 loose spans.
        aria: "auto",
      });

      gsap.set(split.chars, { yPercent: 115 });

      const animate = () =>
        gsap.to(split!.chars, {
          yPercent: 0,
          duration: 1.1,
          stagger: 0.014,
          ease: "expo.out",
          delay,
        });

      if (immediate) {
        tween = animate();
      } else {
        trigger = ScrollTrigger.create({
          trigger: ref.current,
          start: "top 82%",
          once: true,
          onEnter: () => {
            tween = animate();
          },
        });
      }
    };

    document.fonts.ready.then(run);

    return () => {
      cancelled = true;
      tween?.kill();
      trigger?.kill();
      split?.revert();
    };
  }, [motionOK, immediate, delay]);

  return (
    // @ts-expect-error -- one ref type across the small union of tags
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
