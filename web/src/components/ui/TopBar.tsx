"use client"; /* needs useState for the mobile menu */

/*
 * TopBar — the sticky navigation bar at the top of every page.
 *
 * Layout (left to right):
 *   Logo/initials | email | nav links (About Skills Works Contact) | Resume (highlighted)
 *
 * On mobile: logo + hamburger menu, nav links collapse into a drawer.
 * Sticky on scroll with a solid background (no blur — PRD §6.1 "blur-free solid background").
 */

import Link from "next/link";
import { useState } from "react";
import { Container } from "./Container";
import type { Profile } from "@/types";

interface TopBarProps {
  profile: Profile;
}

/* Navigation links in order — their hrefs are section anchors on the home page */
const navLinks = [
  { label: "About",   href: "#about"   },
  { label: "Skills",  href: "#skills"  },
  { label: "Works",   href: "#works"   },
  { label: "Contact", href: "#contact" },
];

export function TopBar({ profile }: TopBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ background: "var(--color-bg, #0B0714)", borderBottom: "1px solid var(--color-border, #2A1F45)" }}
    >
      <nav aria-label="Main navigation">
        <Container className="h-14 flex items-center justify-between">
        {/* Logo — initials or short name */}
        <Link
          href="/"
          className="text-text font-bold text-lg tracking-widest hover:text-accent-soft transition-colors"
          aria-label="Go to home"
        >
          S<span className="text-accent">.</span>
        </Link>

        {/* Email — visible on desktop */}
        <a
          href={`mailto:${profile.email}`}
          className="hidden md:block text-muted text-sm hover:text-accent-soft transition-colors"
        >
          {profile.email}
        </a>

        {/* Desktop navigation links */}
        <ul className="hidden md:flex items-center gap-6 list-none">
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
          {/* Resume link — highlighted with accent color */}
          <li>
            <Link
              href="/resume"
              className="text-sm font-semibold text-accent-soft hover:text-accent border border-accent/40 px-3 py-1 rounded-full transition-colors"
            >
              Resume
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {/* Three bars that animate to an X — pure CSS, no library */}
          <span
            className={`block w-5 h-0.5 bg-text transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-text transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-text transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </Container>
    </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div
          className="md:hidden px-4 pb-4 flex flex-col gap-3"
          style={{ background: "var(--color-surface, #140E22)", borderTop: "1px solid var(--color-border)" }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted hover:text-text transition-colors py-1"
              onClick={() => setMenuOpen(false)}   /* close menu on click */
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/resume"
            className="text-sm font-semibold text-accent-soft py-1"
            onClick={() => setMenuOpen(false)}
          >
            Resume ↗
          </Link>
        </div>
      )}
    </header>
  );
}
