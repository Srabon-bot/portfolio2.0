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
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      value: "Connect on LinkedIn",
      href: profile.linkedin,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      label: "GitHub",
      value: "Srabon-bot",
      href: profile.github,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
    },
    {
      label: "Location",
      value: profile.location,
      href: undefined,   /* not clickable */
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.314-2.686-6-6-6z"/>
          <circle cx="12" cy="8" r="2.5"/>
        </svg>
      ),
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
              className="rounded-xl p-4 flex items-center gap-4 transition-all duration-300 hover:border-accent/40"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <span
                className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg"
                style={{ background: "var(--color-surface-2)", color: "var(--color-accent-soft)" }}
                aria-hidden="true"
              >
                {link.icon}
              </span>
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
