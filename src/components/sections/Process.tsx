"use client";

import { useEffect, useRef, useState } from "react";
import { process } from "@/lib/content";
import { gsap, ScrollTrigger, registerGsap, useMotionOK } from "@/lib/motion";
import SplitHeading from "@/components/ui/SplitHeading";
import Reveal from "@/components/ui/Reveal";

const steps = process.steps;

/**
 * The one pinned scroll sequence on the page.
 *
 * Desktop: the section pins for four viewport-heights and the active step
 * advances as you scroll. Mobile: no pin at all — the steps are a plain
 * stacked list. Pinning on phones is where this pattern usually falls apart
 * (address-bar resize re-measures the trigger mid-scroll), so we don't.
 *
 * gsap.matchMedia() owns the desktop-only branch and reverts it cleanly on
 * resize or unmount, which is what keeps ScrollTriggers from piling up.
 *
 * The active index is React state (it drives four elements), but the
 * progress rail is written straight to the DOM — that updates every frame
 * and must not re-render.
 */
export default function Process() {
  const rootRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const motionOK = useMotionOK();

  useEffect(() => {
    if (!motionOK) return;
    registerGsap();

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const st = ScrollTrigger.create({
          trigger: rootRef.current,
          start: "top top",
          end: `+=${steps.length * 100}%`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const i = Math.min(
              steps.length - 1,
              Math.floor(self.progress * steps.length)
            );
            setActive(i);
            if (railRef.current) {
              railRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        });

        return () => st.kill();
      });
    }, rootRef);

    return () => ctx.revert();
  }, [motionOK]);

  return (
    <section id="process" className="rule">
      {/* Desktop: pinned sequence */}
      <div
        ref={rootRef}
        className="hidden min-h-[100svh] flex-col justify-center py-24 md:flex"
      >
        <div className="shell w-full">
          <div className="mb-14 flex items-end justify-between gap-8">
            <div>
              <p className="eyebrow mb-5 text-accent">{process.eyebrow}</p>
              <SplitHeading
                as="h2"
                className="font-sans text-h2 font-medium leading-[1.0] tracking-[-0.035em]"
              >
                {process.title}
              </SplitHeading>
            </div>
            <p className="hidden shrink-0 font-mono text-xs tracking-[0.18em] text-paper/40 lg:block">
              {String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
            </p>
          </div>

          {/* Progress rail */}
          <div className="relative mb-14 h-px w-full bg-paper/12">
            <span
              ref={railRef}
              className="absolute inset-y-0 left-0 block w-full origin-left scale-x-0 bg-accent"
            />
          </div>

          <div className="grid grid-cols-12 items-start gap-8">
            {/* Oversized numeral for the active step */}
            <div className="relative col-span-4 h-[9rem]">
              {steps.map((s, i) => (
                <span
                  key={s.n}
                  aria-hidden
                  className="absolute inset-0 font-display text-[9rem] leading-none tracking-tight transition-all duration-700 ease-[var(--ease-out-expo)]"
                  style={{
                    opacity: i === active ? 1 : 0,
                    transform: `translateY(${(i - active) * 26}px)`,
                    color: i === active ? "var(--color-accent)" : "transparent",
                  }}
                >
                  {s.n}
                </span>
              ))}
            </div>

            <ol className="col-span-8 flex flex-col gap-1">
              {steps.map((s, i) => (
                <li
                  key={s.n}
                  className="border-t border-paper/10 py-5 transition-all duration-500 ease-[var(--ease-out-expo)]"
                  style={{ opacity: i === active ? 1 : 0.28 }}
                  aria-current={i === active ? "step" : undefined}
                >
                  <div className="flex items-baseline gap-5">
                    <span className="font-mono text-xs tracking-[0.18em] text-paper/40">
                      {s.n}
                    </span>
                    <h3 className="font-sans text-h3 font-medium tracking-[-0.03em]">
                      {s.title}
                    </h3>
                  </div>
                  <p
                    className="max-w-[62ch] overflow-hidden pl-[3.1rem] text-[0.9375rem] leading-[1.6] text-paper/60 transition-all duration-500 ease-[var(--ease-out-expo)]"
                    style={{
                      maxHeight: i === active ? "8rem" : "0rem",
                      opacity: i === active ? 1 : 0,
                      marginTop: i === active ? "0.6rem" : "0rem",
                    }}
                  >
                    {s.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Mobile: plain stacked list, no pin */}
      <div className="shell py-24 md:hidden">
        <p className="eyebrow mb-5 text-accent">{process.eyebrow}</p>
        <h2 className="mb-12 font-sans text-h2 font-medium leading-[1.0] tracking-[-0.035em]">
          {process.title}
        </h2>
        <ol className="flex flex-col">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 70}>
              <div className="border-t border-paper/12 py-7">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-3xl text-accent">{s.n}</span>
                  <h3 className="font-sans text-h3 font-medium tracking-[-0.03em]">
                    {s.title}
                  </h3>
                </div>
                <p className="mt-3 text-[0.9375rem] leading-[1.6] text-paper/60">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
