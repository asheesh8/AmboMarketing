"use client";

import { services } from "@/lib/content";
import SplitHeading from "@/components/ui/SplitHeading";
import Reveal from "@/components/ui/Reveal";

/**
 * Services as an editorial index rather than a card grid.
 *
 * Each row is a full-width hairline-separated entry; hovering sweeps an
 * accent fill up from the baseline and inverts the text. One motion idea,
 * applied consistently — cheaper to read than six animated cards.
 */
export default function Services() {
  return (
    <section id="services" className="rule py-24 md:py-40">
      <div className="shell">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-3">
            <p className="eyebrow text-accent">What we do</p>
          </Reveal>
          <div className="md:col-span-9">
            <SplitHeading
              as="h2"
              className="max-w-[20ch] font-sans text-h2 font-medium leading-[1.0] tracking-[-0.035em]"
            >
              Six services. Every one of them measured.
            </SplitHeading>
          </div>
        </div>

        <ul className="mt-16 md:mt-24">
          {services.map((s, i) => (
            <Reveal as="li" key={s.id} delay={i * 60}>
              <div className="group relative isolate overflow-hidden border-t border-paper/12 last:border-b">
                {/* Accent sweep */}
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-accent transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100 motion-reduce:transition-none"
                />

                <div
                  className="grid grid-cols-1 items-start gap-4 py-8 transition-colors duration-300 group-hover:text-ink md:grid-cols-12 md:gap-8 md:py-11"
                  data-cursor={s.index}
                >
                  <span className="font-mono text-xs tracking-[0.18em] text-paper/40 transition-colors duration-300 group-hover:text-ink/55 md:col-span-1">
                    {s.index}
                  </span>

                  <h3 className="font-sans text-h3 font-medium leading-tight tracking-[-0.03em] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5 motion-reduce:group-hover:translate-x-0 md:col-span-4">
                    {s.title}
                  </h3>

                  <p className="max-w-[46ch] text-[0.9375rem] leading-[1.6] text-paper/60 transition-colors duration-300 group-hover:text-ink/75 md:col-span-5">
                    {s.blurb}
                  </p>

                  <ul className="flex flex-wrap gap-x-4 gap-y-1.5 md:col-span-2 md:justify-end">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="font-mono text-[10px] uppercase tracking-[0.14em] text-paper/40 transition-colors duration-300 group-hover:text-ink/55"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
