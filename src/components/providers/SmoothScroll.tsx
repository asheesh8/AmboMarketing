"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, registerGsap, useMotionOK } from "@/lib/motion";

/**
 * Lenis smooth scroll, driven by GSAP's ticker.
 *
 * The two libraries must not each run their own RAF loop: ScrollTrigger has
 * to read Lenis's virtual scroll position, not window.scrollY, or pinned
 * sections drift by a frame. So we:
 *   1. push Lenis's raf into gsap.ticker
 *   2. call ScrollTrigger.update on every Lenis scroll event
 *   3. turn off lagSmoothing so a dropped frame doesn't desync the two
 *
 * Everything is torn down on unmount — leaving a Lenis instance or a
 * ScrollTrigger behind is the usual cause of scroll jank after navigation.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const motionOK = useMotionOK();

  useEffect(() => {
    if (!motionOK) return;
    registerGsap();

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Touch devices keep native scrolling — smoothing it costs frames
      // on mid-tier phones and fights the browser's own overscroll.
      syncTouch: false,
    });

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Anchor links must go through Lenis, otherwise the native jump
    // desyncs its virtual position from the real scroll offset.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.2 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, [motionOK]);

  return <>{children}</>;
}
