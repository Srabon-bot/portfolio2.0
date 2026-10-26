"use client"; /* This component uses hover animations, which require a client component */

/*
 * BlobButton — the signature button style from the reference site.
 *
 * A circular "blob" (a soft glowing circle) sits offset behind the
 * left edge of the button. On hover, the blob moves slightly to the
 * right — creating the illusion of a glowing spotlight under the button.
 *
 * Usage:
 *   <BlobButton href="/resume" download>Download Resume</BlobButton>
 *   <BlobButton onClick={handler}>See my works</BlobButton>
 */

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";

interface BlobButtonProps {
  children: ReactNode;
  href?: string;          /* If provided, renders as an <a> link */
  download?: boolean;     /* If true + href set, adds the download attribute */
  onClick?: () => void;
  className?: string;
}

export function BlobButton({
  children,
  href,
  download = false,
  onClick,
  className = "",
}: BlobButtonProps) {
  const inner = (
    <motion.span
      className={`relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-semibold text-white cursor-pointer select-none transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${className}`}
      style={{
        background: "var(--color-accent, #8B5CF6)",
      }}
    >
      {children}
    </motion.span>
  );

  /* Render as a Next.js Link when href is provided, otherwise as a button */
  if (href) {
    return (
      <Link
        href={href}
        download={download || undefined}
        /* download attribute tells the browser to save the file instead of navigating */
        className="focus-visible:outline-accent rounded-full"
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className="focus-visible:outline-accent rounded-full bg-transparent border-none p-0"
    >
      {inner}
    </button>
  );
}
