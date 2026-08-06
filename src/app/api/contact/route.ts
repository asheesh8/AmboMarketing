import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 *
 * ⚠️ DELIVERY IS NOT WIRED UP YET. Right now this validates the submission
 * and logs it server-side — nothing is emailed to Ambo. Before launch, pick
 * a provider and fill in `deliver()` below, then set the env vars in
 * .env.local. See README "Wiring up the contact form".
 */

type Payload = {
  name?: string;
  business?: string;
  email?: string;
  phone?: string;
  budget?: string;
  message?: string;
  interests?: string[];
  company_website?: string; // honeypot
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Naive in-memory rate limit — fine for a single instance, swap for
 *  Upstash/Vercel KV if this ever runs on more than one node. */
const hits = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

async function deliver(payload: Payload) {
  // TODO(ambo): replace with a real transport before launch, e.g. Resend:
  //
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({
  //     from: "site@ambomarketing.com",
  //     to: process.env.CONTACT_TO!,
  //     replyTo: payload.email,
  //     subject: `New enquiry — ${payload.business}`,
  //     text: JSON.stringify(payload, null, 2),
  //   });
  //
  console.info("[contact] submission received (not yet delivered):", payload);
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again in a minute." },
      { status: 429 }
    );
  }

  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: pretend success so bots don't learn anything.
  if (body.company_website) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim() ?? "";
  const business = body.business?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !business || !message) {
    return NextResponse.json(
      { error: "Please fill in your name, business, and message." },
      { status: 400 }
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "That email address doesn't look right." },
      { status: 400 }
    );
  }

  if (message.length > 5000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  try {
    await deliver({
      name,
      business,
      email,
      phone: body.phone?.trim(),
      budget: body.budget,
      interests: Array.isArray(body.interests) ? body.interests : [],
      message,
    });
  } catch (err) {
    console.error("[contact] delivery failed:", err);
    return NextResponse.json(
      { error: "We couldn't send that. Please email us directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
