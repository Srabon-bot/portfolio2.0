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
  /* The blob is positioned absolutely, centered behind the left part of the button */
  const blobVariants = {
    rest: { x: -12, scale: 1, opacity: 0.75 },
    hover: { x: -4, scale: 1.1, opacity: 0.9 },
  };

  const inner = (
    <motion.span
      className={`relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-semibold text-white cursor-pointer select-none overflow-visible shadow-lg shadow-purple-900/30 transition-all ${className}`}
      initial="rest"
      whileHover="hover"
      style={{
        background: "var(--color-accent, #8B5CF6)",
        isolation: "isolate",
      }} /* create a new stacking context */
    >
      {/* The blob circle — sits behind the button text */}
      <motion.span
        aria-hidden="true"          /* decorative; screen readers skip it */
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3"
        variants={blobVariants}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          /* blob color: #5B2FC9 at 75% opacity (PRD §5.2) */
          background: "rgba(91, 47, 201, 0.75)",
          filter: "blur(10px)",
          zIndex: -1,
        }}
      />
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
