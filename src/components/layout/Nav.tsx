"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/lib/content";
import Button from "@/components/ui/Button";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page while the mobile sheet is open, and allow Esc to close.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-ink"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-paper/10 bg-ink/80 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="shell flex h-[72px] items-center justify-between gap-8">
          <a
            href="#top"
            className="flex items-baseline gap-2.5"
            aria-label={`${site.name} — home`}
          >
            <span className="font-display text-2xl leading-none tracking-tight">
              Ambo
            </span>
            <span className="hidden h-1.5 w-1.5 rounded-full bg-accent sm:block" />
            <span className="eyebrow hidden text-paper/45 sm:block">
              {site.stateAbbr}
            </span>
          </a>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Main">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative text-sm text-paper/65 transition-colors hover:text-paper"
              >
                {item.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-[width] duration-400 ease-[var(--ease-out-expo)] group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Wrapper owns the responsive hide: putting `hidden` on the
                Button itself loses to the `inline-flex` in its base class,
                since utility order in the stylesheet decides, not the order
                they appear in the class attribute. */}
            <div className="hidden sm:block">
              <Button
                href="#contact"
                variant="solid"
                className="!px-6 !py-3"
                data-cursor="Let's talk"
              >
                Get a free audit
              </Button>
            </div>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-[60] flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-paper/20 md:hidden"
            >
              <span
                className={`block h-px w-4 bg-paper transition-transform duration-300 ${
                  open ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-4 bg-paper transition-transform duration-300 ${
                  open ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-40 flex flex-col justify-center bg-ink px-8 md:hidden"
      >
        <nav className="flex flex-col gap-2" aria-label="Mobile">
          {[...nav, { label: "Contact", href: "#contact" }].map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-paper/10 py-5 font-display text-4xl transition-colors hover:text-accent"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(14px)",
                transition: `opacity 500ms var(--ease-out-expo) ${i * 60}ms, transform 500ms var(--ease-out-expo) ${i * 60}ms, color 250ms`,
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <p className="mt-10 font-mono text-xs uppercase tracking-[0.18em] text-paper/40">
          {site.city}, {site.state}
        </p>
      </div>
    </>
  );
}
