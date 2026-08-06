"use client";

import { useEffect, useRef, useState } from "react";
import { contact, site } from "@/lib/content";
import SplitHeading from "@/components/ui/SplitHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-lg border border-paper/15 bg-ink-2 px-4 py-3.5 text-[0.9375rem] text-paper placeholder:text-paper/30 transition-colors duration-200 focus:border-accent focus:outline-none focus:ring-0";

const labelCls = "eyebrow mb-2.5 block text-paper/45";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const successRef = useRef<HTMLDivElement>(null);

  // Swapping the form for the confirmation throws keyboard focus back to
  // <body>. Move it onto the confirmation so screen-reader and keyboard
  // users land on the message instead of the top of the document.
  useEffect(() => {
    if (status === "sent") successRef.current?.focus();
  }, [status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    // Multi-select checkboxes need collecting separately.
    const interests = new FormData(form).getAll("interests");

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, interests }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong.");
      }

      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="rule py-24 md:py-40">
      <div className="shell grid gap-14 md:grid-cols-12 md:gap-12">
        {/* Left rail */}
        <div className="md:col-span-5">
          <p className="eyebrow mb-6 text-accent">{contact.eyebrow}</p>

          <SplitHeading
            as="h2"
            className="max-w-[14ch] font-sans text-h2 font-medium leading-[0.98] tracking-[-0.035em]"
          >
            {contact.title}
          </SplitHeading>

          <Reveal delay={160}>
            <p className="mt-8 max-w-[42ch] text-lead leading-[1.6] text-paper/60">
              {contact.body}
            </p>

            <dl className="mt-12 flex flex-col gap-5 border-t border-paper/12 pt-8">
              <div>
                <dt className={labelCls}>Email</dt>
                <dd>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-lead tracking-tight underline decoration-paper/25 underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className={labelCls}>Phone</dt>
                <dd>
                  <a
                    href={site.phoneHref}
                    className="text-lead tracking-tight underline decoration-paper/25 underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent"
                  >
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className={labelCls}>Studio</dt>
                <dd className="text-lead tracking-tight text-paper/75">
                  {site.address}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        {/* Form */}
        <div className="md:col-span-7">
          <Reveal delay={120}>
            {status === "sent" ? (
              <div
                ref={successRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                className="flex min-h-[26rem] flex-col items-start justify-center rounded-2xl border border-accent/30 bg-accent/[0.06] p-9 md:p-12"
              >
                <p className="eyebrow mb-5 text-accent">Received</p>
                <p className="max-w-[26ch] font-sans text-h3 font-medium leading-tight tracking-[-0.03em]">
                  Thanks — we&rsquo;ll come back to you within one business day.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-8 font-mono text-xs uppercase tracking-[0.14em] text-paper/50 underline underline-offset-4 transition-colors hover:text-accent"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="rounded-2xl border border-paper/12 bg-ink-2/50 p-6 md:p-9"
                noValidate
              >
                {/* Honeypot — bots fill this, humans never see it. */}
                <div aria-hidden className="absolute left-[-9999px]">
                  <label htmlFor="company_website">Leave this empty</label>
                  <input
                    id="company_website"
                    name="company_website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelCls}>
                      Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      className={field}
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="business" className={labelCls}>
                      Business *
                    </label>
                    <input
                      id="business"
                      name="business"
                      required
                      autoComplete="organization"
                      className={field}
                      placeholder="Green Mountain Co."
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelCls}>
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className={field}
                      placeholder="jane@business.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelCls}>
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className={field}
                      placeholder="(802) 555-0100"
                    />
                  </div>
                </div>

                <fieldset className="mt-7">
                  <legend className={labelCls}>What do you need?</legend>
                  <div className="flex flex-wrap gap-2">
                    {contact.interests.map((item) => (
                      <label
                        key={item}
                        className="cursor-pointer select-none rounded-full border border-paper/15 px-4 py-2 text-[0.8125rem] text-paper/65 transition-colors duration-200 has-[:checked]:border-accent has-[:checked]:bg-accent has-[:checked]:text-ink hover:border-paper/35"
                      >
                        <input
                          type="checkbox"
                          name="interests"
                          value={item}
                          className="sr-only"
                        />
                        {item}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-7">
                  <label htmlFor="budget" className={labelCls}>
                    Monthly budget
                  </label>
                  <select id="budget" name="budget" className={field} defaultValue="">
                    <option value="" disabled>
                      Select a range
                    </option>
                    {contact.budgets.map((b) => (
                      <option key={b} value={b} className="bg-ink-2">
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-7">
                  <label htmlFor="message" className={labelCls}>
                    What&rsquo;s not working? *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className={`${field} resize-y`}
                    placeholder="Tell us where you're stuck — rankings, leads, reviews, the site itself…"
                  />
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <Button
                    type="submit"
                    disabled={status === "sending"}
                    data-cursor="Send"
                  >
                    {status === "sending" ? "Sending…" : "Send it"}
                  </Button>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-paper/35">
                    Reply within 1 business day
                  </p>
                </div>

                <p
                  role="status"
                  aria-live="polite"
                  className="mt-4 min-h-[1.25rem] text-sm text-red-400"
                >
                  {status === "error" ? error : ""}
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
