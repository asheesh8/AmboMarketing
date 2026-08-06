"use client";

import { useEffect, useRef } from "react";
import { useMotionOK } from "@/lib/motion";

/**
 * Custom cursor: a mix-blend-difference disc that grows over interactive
 * elements and can show a short label via `data-cursor="Label"`.
 *
 * Never rendered for touch/coarse pointers or under reduced motion, and it
 * never replaces the real cursor — the native one stays visible so the site
 * remains usable if this component fails.
 *
 * Position is written straight to the transform in a RAF loop rather than
 * through React state; re-rendering on mousemove would drop frames.
 */
export default function Cursor() {
  const motionOK = useMotionOK();
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!motionOK) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const dot = dotRef.current;
    const label = labelRef.current;
    if (!dot || !label) return;

    // Revealed only once we know this is a real mouse — the element ships
    // as display:none so touch devices never lay it out at all.
    dot.style.display = "flex";

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let scale = 1;
    let targetScale = 1;
    let raf = 0;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
      }

      const hit = (e.target as HTMLElement)?.closest?.(
        "a, button, input, textarea, select, [data-cursor]"
      ) as HTMLElement | null;

      const text = hit?.dataset?.cursor ?? "";
      if (label.textContent !== text) label.textContent = text;
      targetScale = hit ? (text ? 3.2 : 2.4) : 1;
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
    };

    const loop = () => {
      // Critically-damped-ish follow: fast enough to feel attached,
      // slow enough to read as deliberate.
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      scale += (targetScale - scale) * 0.14;
      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      label.style.transform = `scale(${1 / scale})`;
      label.style.opacity = scale > 2.6 ? "1" : "0";
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [motionOK]);

  if (!motionOK) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      style={{ display: "none" }}
      className="pointer-events-none fixed left-0 top-0 z-[70] h-8 w-8 items-center justify-center rounded-full bg-paper opacity-0 mix-blend-difference transition-opacity duration-300"
    >
      <span
        ref={labelRef}
        className="font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-ink opacity-0 transition-opacity duration-200"
      />
    </div>
  );
}
