"use client";

/*
 * HeroSection — the first thing a visitor sees.
 *
 * Layout (PRD §6.2):
 *   Left side: speech-bubble badge "It's me", name (large, tracked),
 *               role label (small caps, accent-soft),
 *               one-line tagline,
 *               Download Resume BlobButton with blob behind it.
 *   Right side: large circular avatar image.
 *
 * On mobile: avatar stacks above the text (flex-col-reverse so avatar
 * appears at the top on small screens — PRD §5.6).
 *
 * PRD NON-NEGOTIABLE: There is exactly ONE CTA button — "Download Resume".
 * There is NO "Let's talk" button. The Contact section is reached via nav.
 */

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { BlobButton } from "@/components/ui/BlobButton";
import { Container } from "@/components/ui/Container";
import type { Profile } from "@/types";

interface HeroSectionProps {
  profile: Profile;
}

/* Animation variants for fade-and-rise on mount (subtle, respects reduced-motion) */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: "easeOut" },
  }),
};

export function HeroSection({ profile }: HeroSectionProps) {

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative py-16 md:py-24"
    >
      <Container>
        <div className="flex flex-col-reverse md:grid md:grid-cols-2 md:items-center gap-12 md:gap-10">

        {/* ── Left / Bottom: text content ───────────────────────────── */}
        <div className="flex flex-col gap-5">

          {/* Speech-bubble badge "It's me" */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="self-start"
          >
            <span
              className="inline-flex items-center gap-2 text-sm font-medium px-4 py-1.5 rounded-full"
              style={{
                background: "var(--color-surface-2)",
                border: "1px solid var(--color-border)",
                color: "var(--color-muted)",
              }}
            >
              {/* Waving hand emoji — visible without JS thanks to SSR */}
              <span aria-hidden="true">👋</span> It&apos;s me
            </span>
          </motion.div>

          {/* Name — large, tracked, weight 700 per PRD §5.3 */}
          <motion.h1
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            style={{
              letterSpacing: "0.05em",
              color: "var(--color-text)",
            }}
          >
            {profile.displayName}
          </motion.h1>

          {/* Role label — small-caps style, accent-soft, tracked (PRD §5.3) */}
          <motion.p
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-sm font-semibold"
            style={{ color: "var(--color-accent-soft)", letterSpacing: "0.18em" }}
            aria-label={`Role: ${profile.role}`}
          >
            {/* Show role in upper-case for visual weight; screen reader uses aria-label */}
            {profile.role.toUpperCase()}
          </motion.p>

          {/* Tagline — one-line value statement */}
          <motion.p
            custom={0.3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-base md:text-lg leading-relaxed max-w-md"
            style={{ color: "var(--color-muted)" }}
          >
            {profile.tagline}
          </motion.p>

          {/* Download Resume button — THE ONLY CTA (PRD: no "Let's talk" button) */}
          <motion.div
            custom={0.4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-2"
          >
            {profile.resumeUrl ? (
              /*
               * When a real resume URL exists, link directly to it with the
               * `download` attribute so the browser saves the file.
               * In Phase 1 we fall back to the /resume page.
               */
              <BlobButton
                href={profile.resumeUrl}
                download
                className="bg-accent hover:bg-accent/90 text-sm md:text-base"
              >
                <svg
                  width="16" height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download Resume
              </BlobButton>
            ) : (
              /* Fallback: link to /resume page while no PDF is uploaded yet */
              <BlobButton
                href="/resume"
                className="bg-accent hover:bg-accent/90 text-sm md:text-base"
              >
                <svg
                  width="16" height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download Resume
              </BlobButton>
            )}
          </motion.div>
        </div>

        {/* ── Right / Top: Squared Animated Hero Image ───────────────── */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex justify-center md:justify-end"
        >
          {/* Outer floating wrapper with smooth infinite levitation animation */}
          <motion.div
            className="relative group cursor-pointer"
            animate={{
              y: [-7, 7, -7],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.025,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
          >
            {/* Pulsing ambient aura glow behind the square */}
            <motion.div
              aria-hidden="true"
              className="absolute -inset-4 sm:-inset-6 rounded-3xl opacity-60 blur-2xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(108,71,255,0.45) 0%, rgba(58,42,138,0.3) 50%, transparent 75%)",
              }}
              animate={{
                scale: [0.95, 1.08, 0.95],
                opacity: [0.45, 0.75, 0.45],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />

            {/* Gradient border frame — squared with sleek modern rounded corners */}
            <div
              className="relative p-[3px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300"
              style={{
                background:
                  "linear-gradient(135deg, rgba(108,71,255,0.7) 0%, rgba(58,42,138,0.3) 50%, rgba(201,190,255,0.5) 100%)",
                boxShadow: "0 20px 40px -15px rgba(10,10,15,0.8)",
              }}
            >
              {/* Inner container holding the squared image */}
              <div
                className="relative rounded-[14px] overflow-hidden"
                style={{
                  width: "clamp(240px, 32vw, 340px)",
                  height: "clamp(240px, 32vw, 340px)",
                  background: "var(--color-surface)",
                }}
              >
                <Image
                  src={profile.avatarUrl ?? "/avatar-placeholder.jpg"}
                  alt={`${profile.displayName}'s photo`}
                  fill
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  priority   /* above-the-fold image — load it eagerly */
                  sizes="(max-width: 768px) 240px, 340px"
                />

                {/* Subtle dark gradient overlay at bottom edge for contrast */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                {/* Tech corner accents */}
                <div
                  aria-hidden="true"
                  className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-accent/50 rounded-tl-sm pointer-events-none"
                />
                <div
                  aria-hidden="true"
                  className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-accent/50 rounded-br-sm pointer-events-none"
                />
              </div>
            </div>

            {/* Top-left code pill badge */}
            <motion.div
              aria-hidden="true"
              className="absolute -top-3 -left-3 md:-top-3.5 md:-left-3.5 px-2.5 py-1 rounded-lg backdrop-blur-md flex items-center gap-1.5 shadow-lg pointer-events-none"
              style={{
                background: "color-mix(in srgb, var(--color-surface-2) 90%, transparent)",
                border: "1px solid color-mix(in srgb, var(--color-accent) 35%, transparent)",
              }}
              animate={{
                y: [0, 3, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.8,
              }}
            >
              <span className="text-xs font-mono font-medium text-accent-soft">
                &lt;dev /&gt;
              </span>
            </motion.div>

            {/* Bottom-right live status badge */}
            <motion.div
              className="absolute -bottom-3 -right-3 md:-bottom-3.5 md:-right-3.5 px-3 py-1.5 rounded-xl backdrop-blur-md flex items-center gap-2 shadow-xl pointer-events-none"
              style={{
                background: "color-mix(in srgb, var(--color-surface-2) 90%, transparent)",
                border: "1px solid color-mix(in srgb, var(--color-accent) 40%, transparent)",
              }}
              animate={{
                y: [0, -3, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.3,
              }}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: "var(--color-success)" }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ background: "var(--color-success)" }}
                />
              </span>
              <span className="text-xs font-medium text-white tracking-wide">
                Open to work
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        </div>
      </Container>
    </section>
  );
}
