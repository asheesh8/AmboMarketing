"use client";

import { about, team, site } from "@/lib/content";
import SplitHeading from "@/components/ui/SplitHeading";
import Reveal from "@/components/ui/Reveal";

export default function About() {
  return (
    <section id="about" className="rule py-24 md:py-40">
      <div className="shell grid gap-14 md:grid-cols-12 md:gap-8">
        <Reveal className="md:col-span-3">
          <p className="eyebrow text-accent">{about.eyebrow}</p>
        </Reveal>

        <div className="md:col-span-6">
          <SplitHeading
            as="h2"
            className="max-w-[16ch] font-sans text-h2 font-medium leading-[1.0] tracking-[-0.035em]"
          >
            {about.title}
          </SplitHeading>

          <div className="mt-9 flex flex-col gap-5 md:mt-12">
            {about.body.map((p, i) => (
              <Reveal key={p} delay={140 + i * 90}>
                <p className="max-w-[56ch] text-lead leading-[1.6] text-paper/60">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="md:col-span-3">
          <Reveal delay={200}>
            <p className="eyebrow mb-6 text-paper/40">The team</p>
            <ul className="flex flex-col">
              {team.map((m) => (
                <li key={m.name} className="border-t border-paper/12 py-5">
                  <p className="text-base font-medium tracking-tight">{m.name}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/40">
                    {m.role}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t border-paper/12 pt-5">
              <p className="eyebrow mb-2.5 text-paper/40">Based in</p>
              <p className="font-display text-2xl leading-tight">
                {site.city},
                <br />
                {site.state}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
