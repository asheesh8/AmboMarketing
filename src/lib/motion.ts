"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

let registered = false;

/**
 * Register GSAP plugins exactly once, on the client only.
 * Calling this from module scope would break SSR, so every animated
 * component calls it from inside its effect.
 */
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  registered = true;
}

/**
 * Single source of truth for "is motion allowed".
 *
 * Returns false on the server and on the first client render so that
 * markup matches during hydration; animations then opt in on the next
 * frame. Live-updates if the user flips the OS setting mid-session.
 */
export function useMotionOK(): boolean {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setOk(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return ok;
}

export { gsap, ScrollTrigger, SplitText };
