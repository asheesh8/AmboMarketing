"use client";

import { testimonials } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";

/**
 * Client quotes.
 *
 * The entries in content.ts are explicit placeholders — nothing here asserts
 * a real endorsement. In development a banner makes that impossible to miss;
 * delete this section entirely if Ambo has no quotes to publish yet.
 */
export default function Testimonials() {
  return (
    <section className="rule py-24 md:py-36">
      <div className="shell">
        <div className="mb-12 flex flex-wrap items-baseline justify-between gap-5">
          <p className="eyebrow text-accent">In their words</p>
          {process.env.NODE_ENV !== "production" && (
            <p className="rounded-md border border-accent/40 bg-accent/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
              Dev notice — placeholder quotes, replace or delete before launch
            </p>
          )}
        </div>

        <ul className="grid gap-px overflow-hidden rounded-xl bg-paper/12 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={i} delay={i * 90}>
              <figure className="flex h-full flex-col justify-between gap-8 bg-ink p-7 md:p-9">
                <blockquote className="text-lead leading-[1.5] tracking-tight text-paper/85">
                  <span aria-hidden className="mr-1 text-accent">
                    &ldquo;
                  </span>
                  {t.quote}
                </blockquote>
                <figcaption>
                  <p className="text-sm font-medium tracking-tight">{t.name}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/40">
                    {t.company}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
