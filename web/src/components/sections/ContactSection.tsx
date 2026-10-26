"use client"; /* contact form needs state for submission */

/*
 * ContactSection — "Keep in touch" with email, social links, and a contact form.
 *
 * PRD §6.6: "email, LinkedIn, GitHub, location, plus a working contact form
 * (name, email, message, honeypot field). Show success and error states.
 * Show a loading state because the free-tier API can be slow to wake."
 *
 * Phase 1: The form shows the UI but submission hits a placeholder handler.
 * In Phase 2, it will POST to /api/contact.
 *
 * Honeypot: a hidden field named "website" — bots fill it in, humans don't.
 * If it has a value when submitted, we silently drop the message.
 */

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import type { Profile } from "@/types";

interface ContactSectionProps {
  profile: Pick<Profile, "email" | "linkedin" | "github" | "instagram" | "location">;
}

/* Form state types */
type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactSection({ profile }: ContactSectionProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    /* Honeypot check — if the hidden "website" field is filled, it's a bot */
    if (data.get("website")) {
      /* Silently succeed — bots see a success message and stop retrying */
      setStatus("success");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const payload = {
        name: data.get("name"),
        email: data.get("email"),
        message: data.get("message"),
        website: data.get("website") || "",
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to send message. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to connect to contact service.");
      setStatus("error");
    }
  }

  /* Contact info links */
  const contactLinks = [
    {
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: "✉️",
    },
    {
      label: "LinkedIn",
      value: "Connect on LinkedIn",
      href: profile.linkedin,
      icon: "💼",
    },
    {
      label: "GitHub",
      value: "Srabon-bot",
      href: profile.github,
      icon: "⌨️",
    },
    {
      label: "Location",
      value: profile.location,
      href: undefined,   /* not clickable */
      icon: "📍",
    },
  ];

  return (
    <section
      id="contact"
      aria-label="Contact Srabon"
      className="py-16 md:py-24"
    >
      <Container>
        <SectionHeading
          title="Keep in Touch"
          subtitle="Open to opportunities, collaborations and questions"
          id="contact-heading"
        />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">

        {/* ── Left: contact info cards ──────────────────────────────── */}
        <div className="flex flex-col gap-4">
          {contactLinks.map((link) => (
            <div
              key={link.label}
              className="rounded-xl p-4 flex items-center gap-4 transition-all duration-300 hover:border-violet-500/40"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <span className="text-2xl flex-shrink-0" aria-hidden="true">{link.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: "var(--color-faint)" }}>
                  {link.label}
                </p>
                {link.href ? (
                  <a
                    href={link.href}
                    target={link.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="text-sm font-medium hover:text-accent-soft transition-colors truncate block"
                    style={{ color: "var(--color-text)" }}
                  >
                    {link.value}
                  </a>
                ) : (
                  <p className="text-sm font-medium truncate" style={{ color: "var(--color-text)" }}>{link.value}</p>
                )}
              </div>
              {link.href && (
                <span className="text-xs text-faint" aria-hidden="true">↗</span>
              )}
            </div>
          ))}
        </div>

        {/* ── Right: contact form card ──────────────────────────────── */}
        <div
          className="rounded-2xl p-6 md:p-8"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        >
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4"
            aria-label="Send a message"
          >
          {/* Honeypot field — hidden from humans, visible to bots */}
          <input
            type="text"
            name="website"
            autoComplete="off"
            tabIndex={-1}
            aria-hidden="true"
            style={{ display: "none" }}
          />

          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-name" className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-faint)" }}>
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              placeholder="Your name"
              className="rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
              style={{
                background: "var(--color-surface-2)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text)",
              }}
              disabled={status === "loading" || status === "success"}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-faint)" }}>
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              placeholder="your@email.com"
              className="rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
              style={{
                background: "var(--color-surface-2)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text)",
              }}
              disabled={status === "loading" || status === "success"}
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-faint)" }}>
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={4}
              placeholder="What's on your mind?"
              className="rounded-xl px-4 py-2.5 text-sm outline-none transition-colors resize-none"
              style={{
                background: "var(--color-surface-2)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text)",
              }}
              disabled={status === "loading" || status === "success"}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="rounded-xl px-6 py-3 text-sm font-semibold text-white transition-colors disabled:opacity-60"
            style={{ background: "var(--color-accent)" }}
          >
            {status === "loading" ? (
              /* Loading state — PRD §6.6 */
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.3"/>
                  <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
                </svg>
                Sending…
              </span>
            ) : "Send message"}
          </button>

          {/* Success state */}
          {status === "success" && (
            <p
              className="text-sm text-center rounded-xl px-4 py-3"
              role="alert"
              style={{ background: "rgba(139,92,246,0.1)", color: "var(--color-accent-soft)", border: "1px solid rgba(139,92,246,0.2)" }}
            >
              ✅ Message sent! I will get back to you soon.
            </p>
          )}

          {/* Error state */}
          {status === "error" && (
            <p
              className="text-sm text-center rounded-xl px-4 py-3"
              role="alert"
              style={{ background: "rgba(239,68,68,0.1)", color: "#F87171", border: "1px solid rgba(239,68,68,0.2)" }}
            >
              ❌ {errorMessage || "Something went wrong. Please try again."}
            </p>
          )}
        </form>
      </div>
    </div>
    </Container>
  </section>
);
}
