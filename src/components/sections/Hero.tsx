"use client";

import { hero, site } from "@/lib/content";
import SplitHeading from "@/components/ui/SplitHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-10 pt-28 md:justify-end md:pb-14 md:pt-32"
    >
      {/* Ground: a single soft moss bloom plus a hairline grid.
          Two cheap layers instead of a canvas — nothing to load, nothing to
          dispose, and it still reads as depth. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-18%] h-[70vh] w-[110vw] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,var(--color-moss),transparent)] opacity-55 blur-[80px]" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,var(--color-paper)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-paper)_1px,transparent_1px)] [background-size:88px_88px] [mask-image:radial-gradient(ellipse_at_50%_35%,black,transparent_72%)]" />
      </div>

      <div className="shell relative">
        <Reveal delay={80}>
          <p className="eyebrow mb-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-paper/50 md:mb-12">
            <span className="inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {hero.eyebrow}
            {/* Second clause is desktop-only — at 375px the full string
                wraps to two lines and the separator dangles. */}
            <span className="hidden text-paper/25 sm:inline">/</span>
            <span className="hidden sm:inline">
              Digital marketing for local business
            </span>
          </p>
        </Reveal>

        <h1 className="max-w-[16ch] font-sans text-display font-medium leading-[0.86] tracking-[-0.045em]">
          <SplitHeading as="p" immediate delay={0.15} className="block">
            {hero.headlineLead}
          </SplitHeading>
          <SplitHeading
            as="p"
            immediate
            delay={0.32}
            className="block font-display font-normal italic tracking-[-0.02em] text-accent"
          >
            {hero.headlineAccent}
          </SplitHeading>
        </h1>

        <div className="mt-12 flex flex-col gap-10 border-t border-paper/12 pt-8 md:mt-20 md:flex-row md:items-end md:justify-between md:gap-16">
          <Reveal delay={520} className="max-w-[52ch]">
            <p className="text-lead leading-[1.5] text-paper/70">{hero.sub}</p>
          </Reveal>

          <Reveal delay={620} className="flex shrink-0 flex-wrap items-center gap-3">
            <Button href={hero.primaryCta.href} data-cursor="Free">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="outline">
              {hero.secondaryCta.label}
            </Button>
          </Reveal>
        </div>

        <Reveal delay={760}>
          <div className="mt-12 flex items-center justify-between gap-6 md:mt-16">
            <span className="eyebrow text-paper/35">Scroll</span>
            <span
              aria-hidden
              className="h-px flex-1 bg-gradient-to-r from-paper/25 to-transparent"
            />
            <a
              href={site.socials[0].href}
              target="_blank"
              rel="noreferrer"
              className="eyebrow text-paper/35 transition-colors hover:text-accent"
            >
              {site.socials[0].label} ↗
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
