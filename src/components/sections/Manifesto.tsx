"use client";

import { manifesto, ticker } from "@/lib/content";
import Marquee from "@/components/ui/Marquee";
import SplitHeading from "@/components/ui/SplitHeading";
import Reveal from "@/components/ui/Reveal";

export default function Manifesto() {
  return (
    <>
      <div className="rule border-b border-paper/12 py-7 md:py-9">
        <Marquee items={ticker} />
      </div>

      <section className="shell py-24 md:py-40">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-3">
            <p className="eyebrow text-accent">{manifesto.eyebrow}</p>
          </Reveal>

          <div className="md:col-span-9">
            <SplitHeading
              as="h2"
              className="max-w-[18ch] font-sans text-h1 font-medium leading-[0.95] tracking-[-0.04em]"
            >
              {manifesto.body[0]}
            </SplitHeading>

            <SplitHeading
              as="h3"
              delay={0.1}
              className="mt-3 max-w-[18ch] font-display text-h1 font-normal italic leading-[0.95] tracking-[-0.02em] text-accent"
            >
              {manifesto.body[1]}
            </SplitHeading>

            <Reveal delay={180}>
              <p className="mt-10 max-w-[58ch] text-lead leading-[1.6] text-paper/60 md:mt-14">
                {manifesto.detail}
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
