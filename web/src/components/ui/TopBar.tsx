"use client"; /* needs useState / useEffect for mobile menu */

/*
 * TopBar — the sticky navigation bar at the top of every page.
 *
 * Layout (3-column CSS grid):
 *   [SRABON wordmark]  |  [email — truly centred]  |  [Resume pill]
 *
 * Breakpoint behaviour
 * ─────────────────────────────────────────────────────────────
 * ≥ 1280px  : 3-column grid only (right SectionRail carries section links)
 * 768–1279px: 3-column grid + 5 section links visible inline in nav
 * < 768px   : logo + hamburger; full-width drawer with everything inside
 */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Profile } from "@/types";

interface TopBarProps {
  profile: Profile;
}

const navLinks = [
  { label: "About",     href: "#about"     },
  { label: "Education", href: "#education" },
  { label: "Skills",    href: "#skills"    },
  { label: "Works",     href: "#works"     },
  { label: "Contact",   href: "#contact"   },
];

/* ─── Hamburger icon ─────────────────────────────────────────────────── */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="flex flex-col gap-[5px] w-5" aria-hidden="true">
      <span
        className="block h-px bg-text transition-transform duration-200 origin-center"
        style={{ transform: open ? "translateY(6px) rotate(45deg)" : "none" }}
      />
      <span
        className="block h-px bg-text transition-opacity duration-200"
        style={{ opacity: open ? 0 : 1 }}
      />
      <span
        className="block h-px bg-text transition-transform duration-200 origin-center"
        style={{ transform: open ? "translateY(-6px) rotate(-45deg)" : "none" }}
      />
    </span>
  );
}

/* ─── Main component ─────────────────────────────────────────────────── */
export function TopBar({ profile }: TopBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef  = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  /* Lock body scroll while drawer is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* Close on Escape */
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  /* Basic focus trap — cycle Tab/Shift+Tab inside drawer */
  useEffect(() => {
    if (!menuOpen || !drawerRef.current) return;
    const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    const trap  = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", trap);
    first?.focus();
    return () => document.removeEventListener("keydown", trap);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background:   "var(--color-bg)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      {/* ── Desktop / tablet bar ─────────────────────────────────────── */}
      <nav aria-label="Main navigation">
        <div
          className="mx-auto px-6 h-14 items-center"
          style={{
            maxWidth: "1280px",
            /* 3-column grid: wordmark | email | resume */
            display:             "grid",
            gridTemplateColumns: "1fr auto 1fr",
          }}
        >
          {/* Left — SRABON wordmark */}
          <Link
            href="/"
            aria-label="Go to home"
            className="flex items-center justify-self-start"
            style={{
              fontFamily:    "var(--font-syne), system-ui, sans-serif",
              fontWeight:    800,
              fontSize:      "1.15rem",
              letterSpacing: "0.18em",
              color:         "var(--color-text)",
              transition:    "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent-soft)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text)")}
          >
            SRABON
          </Link>

          {/* Centre — email (hidden on mobile, shown md+) */}
          <a
            href={`mailto:${profile.email}`}
            className="hidden md:block text-muted text-sm hover:text-accent-soft transition-colors text-center"
          >
            {profile.email}
          </a>

          {/* Right — mid-range nav links (md → xl) + Resume pill */}
          <div className="flex items-center gap-5 justify-self-end">
            {/* Section links: hidden at xl (SectionRail takes over), shown md–xl */}
            <ul className="hidden md:flex xl:hidden items-center gap-5 list-none">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-muted hover:text-text transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Resume pill — always visible on md+ */}
            <Link
              href="/resume"
              className="hidden md:inline-flex items-center text-sm font-semibold text-accent-soft hover:text-accent border px-3 py-1 rounded-full transition-colors"
              style={{ borderColor: "color-mix(in srgb, var(--color-accent) 40%, transparent)" }}
            >
              Resume
            </Link>

            {/* Hamburger — mobile only */}
            <button
              ref={triggerRef}
              id="mobile-menu-trigger"
              className="md:hidden flex items-center justify-center p-2 -mr-2"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu-panel"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile full-width drawer ──────────────────────────────────── */}
      {menuOpen && (
        <div
          id="mobile-menu-panel"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="md:hidden flex flex-col px-6 py-5 gap-4"
          style={{
            background:   "var(--color-surface)",
            borderTop:    "1px solid var(--color-border)",
          }}
        >
          {/* Section links */}
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted hover:text-text transition-colors py-1"
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--color-border)" }} aria-hidden="true" />

          {/* Resume */}
          <Link
            href="/resume"
            className="text-sm font-semibold text-accent-soft py-1 hover:text-accent transition-colors"
            onClick={closeMenu}
          >
            Resume ↗
          </Link>

          {/* Email */}
          <a
            href={`mailto:${profile.email}`}
            className="text-sm text-muted hover:text-accent-soft transition-colors py-1"
            onClick={closeMenu}
          >
            {profile.email}
          </a>

          {/* Social icons row */}
          <div className="flex items-center gap-5 pt-1">
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-faint hover:text-accent-soft transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            )}
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-faint hover:text-accent-soft transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              </a>
            )}
            <a href={`mailto:${profile.email}`} aria-label="Email" className="text-faint hover:text-accent-soft transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
            {profile.instagram && (
              <a href={profile.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-faint hover:text-accent-soft transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
