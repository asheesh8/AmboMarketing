# Ambo Marketing — website

Marketing site for **Ambo Marketing**, Essex Junction, Vermont.
Next.js 16 (App Router) · React 19 · Tailwind v4 · GSAP · Lenis.

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build
pnpm lint
```

---

**Live:** https://ambo-marketing-orpin.vercel.app — hosted on Vercel; pushes to `main` deploy to production.

### Environment variables

None are read today. The contact form (`src/app/api/contact/route.ts`) validates and rate-limits submissions but does not deliver them yet; once the Resend transport described below is wired in it will need `RESEND_API_KEY` and `CONTACT_TO` (names only — set values in `.env.local` or Vercel, never in the repo).

## ⚠️ Before this goes live

Four things in here are **placeholders**, not facts. They're all in
[`src/lib/content.ts`](src/lib/content.ts) and marked `PLACEHOLDER`.

| What | Where | Status |
|---|---|---|
| **Email + phone + address** | `site.email`, `site.phone`, `site.phoneHref`, `site.address` | Invented. Replace with Ambo's real details. |
| **Results metrics** | `results.metrics` | All values are `—`. Replace with figures Ambo can substantiate, or delete the section from `src/app/page.tsx`. |
| **Testimonials** | `testimonials` | Dummy text, no real client is quoted. Replace with attributable quotes (with permission) or delete the section. |
| **LinkedIn / Instagram URLs** | `site.socials` | Point at `#`. Add real profiles or remove the entries. |
| **Contact form delivery** | `src/app/api/contact/route.ts` | Validates and logs, but **does not email anyone yet.** See below. |

While `NODE_ENV !== "production"` the Results and Testimonials sections show
an on-page dev banner so these can't be forgotten. Those banners disappear in
a production build — they are a reminder, not a safety net.

### What *is* real

Sourced from Ambo's public Facebook page and business listings:

- Business name, Essex Junction VT location, and the "No Games, Just Results!" tagline
- The six services (SEO, SEM/PPC, social, reputation, web design, email)
- Team: Boet Neethling (Owner), Patrick Lugtu (Sales & Operations Manager)

Service *descriptions* were written for this site in Ambo's voice — worth a
read-through with the client before launch.

> Note: `ambomarketing.com` did not resolve at the time this was built. Worth
> confirming who holds the domain before pointing DNS anywhere.

---

## Wiring up the contact form

`src/app/api/contact/route.ts` already handles validation, a honeypot, and
basic rate limiting. Only delivery is missing — fill in `deliver()`:

```bash
pnpm add resend
```

```ts
// src/app/api/contact/route.ts
import { Resend } from "resend";

async function deliver(payload: Payload) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: "site@ambomarketing.com",     // must be a verified domain
    to: process.env.CONTACT_TO!,
    replyTo: payload.email,
    subject: `New enquiry — ${payload.business}`,
    text: JSON.stringify(payload, null, 2),
  });
}
```

```bash
# .env.local
RESEND_API_KEY=re_...
CONTACT_TO=boet@ambomarketing.com
```

The in-memory rate limiter is per-instance. On serverless (Vercel) it resets
per cold start — swap for Upstash or Vercel KV if abuse becomes a problem.

---

## How it's put together

```
src/
  app/
    layout.tsx          fonts, metadata, LocalBusiness JSON-LD, chrome
    page.tsx            section order
    globals.css         design tokens (@theme), base styles, reduced-motion kill-switch
    api/contact/        form endpoint
  lib/
    content.ts          ALL copy — edit here, not in components
    motion.ts           GSAP plugin registration + useMotionOK()
  components/
    providers/SmoothScroll.tsx   Lenis ↔ GSAP ticker bridge
    ui/                 Reveal, SplitHeading, Marquee, Button, Cursor, Grain
    layout/             Nav, Footer
    sections/           Hero, Manifesto, Services, Process, Results, About,
                        Testimonials, Contact
```

**Copy changes go in `src/lib/content.ts`.** Every section reads from it, so
the client can be handed that one file.

### Design tokens

Defined once in `globals.css` under `@theme`:

- **Colour** — `ink` `#0a0a0b`, `paper` `#f4f1ea`, `accent` `#c6f24e` (lime),
  `moss` `#1e3a2a` (the Vermont note in the hero bloom)
- **Type** — Instrument Serif (display/italic accents), Inter Tight (UI/body),
  JetBrains Mono (eyebrows, numerals). Fluid `clamp()` scale.

### Motion budget

Deliberately three patterns, not thirty:

1. **SplitText character reveals** on headlines
2. **One pinned scroll sequence** — the Process section, desktop only
3. **Scroll reveals** — plain IntersectionObserver + a CSS transition

Plus the always-on texture: Lenis smooth scroll, film grain, custom cursor,
magnetic buttons.

### Things that will break if you change them carelessly

- **Lenis must stay on `gsap.ticker`** (`SmoothScroll.tsx`). Two RAF loops
  desync ScrollTrigger from the real scroll position and pinned sections drift.
- **Anchor links go through `lenis.scrollTo`**, not native jumps — a native
  jump leaves Lenis's virtual position stale.
- **`SplitHeading` waits on `document.fonts.ready`** before splitting.
  Splitting early measures the fallback font and lines break wrong.
- **The Process pin is desktop-only** via `gsap.matchMedia()`. Pinning on
  phones re-measures mid-scroll when the address bar collapses.
- **Don't put `hidden` on `<Button>`'s className** to hide it responsively —
  the `inline-flex` in its base class wins on stylesheet order. Wrap it in a
  `<div className="hidden sm:block">` instead (see `Nav.tsx`).

### Accessibility

- `prefers-reduced-motion` is handled in two places: `useMotionOK()` disables
  Lenis, GSAP, SplitText, the cursor and the marquee in JS; `globals.css`
  force-resets `[data-reveal]` and `.split-char` to their visible state so
  nothing can be left stranded at `opacity: 0`.
- Skip link, visible `:focus-visible` rings, `aria-expanded`/`aria-controls`
  on the mobile menu, Esc to close, focus moved to the form confirmation.
- The custom cursor never replaces the native one and is off for coarse
  pointers.

### SEO

`layout.tsx` emits full Open Graph/Twitter metadata plus `ProfessionalService`
JSON-LD (address, area served, service catalogue) — that's the structured data
that feeds the local map pack, which matters for a local agency.

**Still to add:** an OG share image (`src/app/opengraph-image.tsx` or a static
`public/og.png`), a favicon, and `sitemap.ts` / `robots.ts`.
