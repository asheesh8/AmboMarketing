import { nav, services, site } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="rule overflow-hidden pt-20 md:pt-28">
      <div className="shell">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="max-w-[18ch] font-sans text-h3 font-medium leading-tight tracking-[-0.03em]">
              Ready to stop guessing?
            </p>
            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 font-display text-3xl italic text-accent underline decoration-accent/30 underline-offset-[8px] transition-colors hover:decoration-accent md:text-4xl"
            >
              Get a free audit
              <span aria-hidden>↗</span>
            </a>
          </div>

          <nav className="md:col-span-3" aria-label="Services">
            <p className="eyebrow mb-5 text-paper/40">Services</p>
            <ul className="flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="text-sm text-paper/60 transition-colors hover:text-accent"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-2" aria-label="Site">
            <p className="eyebrow mb-5 text-paper/40">Site</p>
            <ul className="flex flex-col gap-2.5">
              {[...nav, { label: "Contact", href: "#contact" }].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-paper/60 transition-colors hover:text-accent"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <p className="eyebrow mb-5 text-paper/40">Elsewhere</p>
            <ul className="flex flex-col gap-2.5">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-paper/60 transition-colors hover:text-accent"
                  >
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>

            <address className="mt-8 not-italic">
              <a
                href={`mailto:${site.email}`}
                className="block text-sm text-paper/60 transition-colors hover:text-accent"
              >
                {site.email}
              </a>
              <a
                href={site.phoneHref}
                className="mt-1.5 block text-sm text-paper/60 transition-colors hover:text-accent"
              >
                {site.phone}
              </a>
            </address>
          </div>
        </div>

        {/* Oversized wordmark — clipped at the baseline. */}
        <div aria-hidden className="mt-20 select-none md:mt-28">
          <p className="-mb-[0.16em] translate-y-[0.06em] font-sans text-[clamp(4.5rem,19vw,17rem)] font-medium leading-[0.78] tracking-[-0.055em] text-paper/[0.07]">
            Ambo Marketing
          </p>
        </div>

        <div className="flex flex-col gap-3 border-t border-paper/12 py-7 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/35 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}
          </p>
          <p>
            {site.city}, {site.stateAbbr} — {site.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
