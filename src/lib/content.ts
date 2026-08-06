/**
 * All site copy lives here so it can be edited without touching components.
 *
 * Items marked PLACEHOLDER are NOT verified facts about Ambo Marketing.
 * They must be replaced with real information before this site goes live.
 * Everything else was sourced from Ambo's public listings and Facebook page.
 */

export const site = {
  name: "Ambo Marketing",
  tagline: "No games. Just results.",
  // Sourced: Ambo's public tagline is "No Games, Just Results!"
  city: "Essex Junction",
  state: "Vermont",
  stateAbbr: "VT",
  domain: "ambomarketing.com",

  // PLACEHOLDER — confirm real contact details with the client.
  email: "hello@ambomarketing.com",
  phone: "(802) 000-0000",
  phoneHref: "tel:+18020000000",
  address: "Essex Junction, VT 05452",

  socials: [
    { label: "Facebook", href: "https://www.facebook.com/ambomarketing/" },
    // PLACEHOLDER — add real profiles if they exist.
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
  ],
} as const;

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Results", href: "#results" },
  { label: "About", href: "#about" },
] as const;

export const hero = {
  eyebrow: `${site.city}, ${site.state}`,
  headlineLead: "No games.",
  headlineAccent: "Just results.",
  sub: "We help local businesses get found, get chosen, and get called. Search, social, and the site that ties it together — run by people you can actually reach.",
  primaryCta: { label: "Get a free audit", href: "#contact" },
  secondaryCta: { label: "See what we do", href: "#services" },
} as const;

/** Scrolling trust bar under the hero. */
export const ticker = [
  "Search Engine Optimization",
  "Pay Per Click",
  "Social Media",
  "Reputation Management",
  "Website Design",
  "Email Marketing",
] as const;

export const manifesto = {
  eyebrow: "Why Ambo",
  body: [
    "Most agencies sell you a retainer and a dashboard nobody reads.",
    "We sell you the phone ringing.",
  ],
  detail:
    "Ambo is a small Vermont shop working with local businesses that need marketing to pay for itself. No jargon, no lock-in, no vanity metrics — just the handful of numbers that actually move your revenue, reported plainly every month.",
} as const;

export type Service = {
  id: string;
  index: string;
  title: string;
  blurb: string;
  points: readonly string[];
};

/** Service list sourced from Ambo's public description:
 *  "SEO, Reputation, Social Media, PPC, Website Designs and More." */
export const services: readonly Service[] = [
  {
    id: "seo",
    index: "01",
    title: "Search Engine Optimization",
    blurb:
      "Outrank the competition. We make it easier for everyone to find you online — and turn that visibility into customers walking through the door.",
    points: ["Local & map pack", "Technical fixes", "Content that ranks"],
  },
  {
    id: "sem",
    index: "02",
    title: "Search Engine Marketing",
    blurb:
      "Paid search that converts traffic into sales instead of burning budget. We start small, find what works, then scale only the winners.",
    points: ["Google & Bing Ads", "Landing pages", "Conversion tracking"],
  },
  {
    id: "social",
    index: "03",
    title: "Social Media",
    blurb:
      "A feed that looks like someone runs it. Consistent posting, real replies, and campaigns aimed at the people inside your service area.",
    points: ["Content calendar", "Paid social", "Community management"],
  },
  {
    id: "reputation",
    index: "04",
    title: "Reputation Management",
    blurb:
      "Your rating is your storefront. We build a steady flow of honest reviews and make sure nothing sits unanswered for long.",
    points: ["Review generation", "Response handling", "Listing accuracy"],
  },
  {
    id: "web",
    index: "05",
    title: "Website Design",
    blurb:
      "Fast, clear sites built to convert — not to win design awards. Loads quickly, reads well on a phone, and tells people exactly what to do next.",
    points: ["Design & build", "Mobile first", "Speed & accessibility"],
  },
  {
    id: "email",
    index: "06",
    title: "Email Marketing",
    blurb:
      "Launch campaigns that boost sales, remind past clients you exist, and bring new ones in with targeted, well-timed emails.",
    points: ["List growth", "Automated flows", "Promos & newsletters"],
  },
] as const;

export const process = {
  eyebrow: "How it works",
  title: "Four steps. No mystery.",
  steps: [
    {
      n: "01",
      title: "Audit",
      body: "We look at everything — rankings, ads, reviews, your site, and what your competitors are doing. You get the findings whether or not you hire us.",
    },
    {
      n: "02",
      title: "Plan",
      body: "One page. The three things that will move the needle fastest, what they cost, and what you should expect them to return.",
    },
    {
      n: "03",
      title: "Build",
      body: "We ship. Pages, campaigns, listings, automations — set up properly with tracking in place from day one, not bolted on later.",
    },
    {
      n: "04",
      title: "Report",
      body: "Every month, in plain English: what we did, what it cost, what came back. If something isn't working, we say so and change it.",
    },
  ],
} as const;

/**
 * PLACEHOLDER METRICS — do not publish these.
 * Replace `value` with figures you can substantiate, or delete the section.
 */
export const results = {
  eyebrow: "Accountability",
  title: "The only numbers that matter.",
  note: "Placeholder figures — replace with verified client results before launch.",
  metrics: [
    { value: "—", suffix: "", label: "Increase in organic traffic", sub: "Rolling 12 months" },
    { value: "—", suffix: "", label: "Qualified calls per month", sub: "Across active clients" },
    { value: "—", suffix: "", label: "Average cost per lead", sub: "Paid search" },
    { value: "—", suffix: "", label: "Average review rating", sub: "After 6 months" },
  ],
} as const;

/** Team sourced from Ambo's public company listing. */
export const team = [
  { name: "Boet Neethling", role: "Owner" },
  { name: "Patrick Lugtu", role: "Sales & Operations Manager" },
] as const;

export const about = {
  eyebrow: "About",
  title: "A Vermont shop, not a call center.",
  body: [
    "Ambo Marketing works with local businesses out of Essex Junction, Vermont. Small team, direct line — the person who builds your campaigns is the person who picks up the phone.",
    "We take on a limited number of clients at a time because that's the only way to do this properly. If we're not the right fit, we'll tell you who is.",
  ],
} as const;

/**
 * PLACEHOLDER TESTIMONIALS — do not publish these.
 * These are illustrative only. Replace with real, attributable client quotes
 * (with permission), or delete the section entirely.
 */
export const testimonials = [
  {
    quote: "Replace with a real client quote before launch.",
    name: "Client name",
    company: "Business name, VT",
  },
  {
    quote: "Replace with a real client quote before launch.",
    name: "Client name",
    company: "Business name, VT",
  },
  {
    quote: "Replace with a real client quote before launch.",
    name: "Client name",
    company: "Business name, VT",
  },
] as const;

export const contact = {
  eyebrow: "Start here",
  title: "Tell us what's not working.",
  body: "Send a note and we'll come back with a free audit of your search, social, and reviews — no pitch deck, no obligation.",
  budgets: [
    "Under $1k / month",
    "$1k – $2.5k / month",
    "$2.5k – $5k / month",
    "$5k+ / month",
    "Not sure yet",
  ],
  interests: services.map((s) => s.title),
} as const;
