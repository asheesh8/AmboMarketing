"use client";

import { useEffect, useRef, useState } from "react";
import { results } from "@/lib/content";
import SplitHeading from "@/components/ui/SplitHeading";
import Reveal from "@/components/ui/Reveal";
import { useMotionOK } from "@/lib/motion";

/**
 * Counts up to a numeric value on first view. Any non-numeric value (the
 * current "—" placeholders) renders verbatim, so the section stays honest
 * until real figures are supplied.
 */
function Metric({ value, suffix }: { value: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionOK = useMotionOK();

  const numeric = Number(value.replace(/[^0-9.]/g, ""));
  const isNumeric =
    value.trim() !== "" && Number.isFinite(numeric) && /\d/.test(value);
  const animatable = isNumeric && motionOK;

  // Eased 0→1 progress. State is only ever written from a rAF callback, not
  // from the effect body, so there's no cascading render on mount.
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!animatable) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();

        const start = performance.now();
        const duration = 1400;

        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          setProgress(1 - Math.pow(1 - t, 4));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [animatable]);

  const decimals = (value.split(".")[1] ?? "").length;
  const prefix = value.startsWith("$") ? "$" : "";
  const display = animatable
    ? prefix + (numeric * progress).toFixed(decimals)
    : value;

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export default function Results() {
  return (
    <section id="results" className="rule py-24 md:py-40">
      <div className="shell">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-3">
            <p className="eyebrow text-accent">{results.eyebrow}</p>
          </Reveal>
          <div className="md:col-span-9">
            <SplitHeading
              as="h2"
              className="max-w-[18ch] font-sans text-h2 font-medium leading-[1.0] tracking-[-0.035em]"
            >
              {results.title}
            </SplitHeading>
          </div>
        </div>

        {process.env.NODE_ENV !== "production" && (
          <p className="mt-10 inline-block rounded-md border border-accent/40 bg-accent/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
            Dev notice — {results.note}
          </p>
        )}

        <dl className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-paper/12 sm:grid-cols-2 lg:grid-cols-4 md:mt-20">
          {results.metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 80}>
              <div className="flex h-full flex-col justify-between gap-8 bg-ink p-7 transition-colors duration-500 hover:bg-ink-2 md:p-9">
                <dd className="font-sans text-[clamp(2.75rem,5vw,4.25rem)] font-medium leading-none tracking-[-0.04em] text-accent">
                  <Metric value={m.value} suffix={m.suffix} />
                </dd>
                <div>
                  <dt className="text-[0.9375rem] font-medium leading-snug tracking-tight">
                    {m.label}
                  </dt>
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/40">
                    {m.sub}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
