"use client";

/*
 * MobileActionBar — sticky bottom navigation bar on mobile only (md:hidden).
 *
 * Provides instant access to "Resume" and "Contact" for hiring managers
 * browsing on mobile devices.
 * Uses a solid background and no blur per style guidelines.
 */

import Link from "next/link";
import type { Profile } from "@/types";

interface MobileActionBarProps {
  profile: Pick<Profile, "resumeUrl">;
}

export function MobileActionBar({ profile }: MobileActionBarProps) {
  const resumeHref = profile.resumeUrl || "/resume.pdf";

  return (
    <aside
      aria-label="Quick mobile actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 py-3 flex items-center gap-3"
      style={{
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <a
        href={resumeHref}
        download
        className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-mono font-semibold text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
        style={{ background: "var(--color-accent)" }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        <span>Resume</span>
      </a>

      <Link
        href="#contact"
        className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-mono font-semibold text-text transition-colors hover:border-accent active:scale-[0.98]"
        style={{
          background: "var(--color-surface-2)",
          border: "1px solid var(--color-border)",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
        <span>Contact</span>
      </Link>
    </aside>
  );
}
