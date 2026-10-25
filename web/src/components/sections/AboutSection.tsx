/*
 * AboutSection — "README-style card" with photo, currently list, and paragraphs.
 *
 * PRD §6.3: "photo, short 'currently' list (Building, Learning, Fun fact),
 * 2-3 short paragraphs. Include a line about building culturally rooted
 * tech with local impact."
 *
 * This is a Server Component (no "use client") so the content is fully
 * rendered on the server and visible without JavaScript.
 */

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import type { Profile } from "@/types";

interface AboutSectionProps {
  profile: Profile;
}

export function AboutSection({ profile }: AboutSectionProps) {
  const { currently, aboutParagraphs } = profile;

  /* The "currently" list items */
  const currentlyItems = [
    { icon: "🔨", label: "Building", value: currently.building },
    { icon: "📚", label: "Learning", value: currently.learning },
    {
      icon: "⚡",
      label: "Fun fact",
      value: currently.funFact,
      /* Flag PLACEHOLDER values so they are never left in by accident */
      isPlaceholder: currently.funFact.startsWith("PLACEHOLDER"),
    },
  ];

  return (
    <section
      id="about"
      aria-label="About Srabon"
      className="py-16 md:py-24"
    >
      <Container>
        <SectionHeading
          title="About Me"
          subtitle="The story behind the code"
          id="about-heading"
        />

        {/* Card wrapper — README-style, matches PRD §5.4 Card spec */}
        <div
          className="rounded-2xl p-5 md:p-8 flex flex-col md:flex-row gap-8 md:gap-10"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        >
        {/* ── Left: currently status card ───────────────────────────── */}
        <div className="flex flex-col gap-6 md:w-72 flex-shrink-0">
          {/* Status badge card */}
          <div
            className="rounded-xl p-4 flex items-center gap-3"
            style={{
              background: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
            }}
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-semibold" style={{ color: "var(--color-text)" }}>
                Final-Semester CSE
              </span>
              <span className="text-[11px]" style={{ color: "var(--color-muted)" }}>
                UITS, Dhaka • Open to roles
              </span>
            </div>
          </div>

          {/* Currently list */}
          <div
            className="rounded-xl p-5 flex flex-col gap-4"
            style={{
              background: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
            }}
          >
            <h3 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-faint)" }}>
              Currently
            </h3>
            <ul className="flex flex-col gap-3.5">
              {currentlyItems.map((item) => (
                <li key={item.label} className="flex items-start gap-2.5">
                  <span className="text-base mt-0.5" aria-hidden="true">{item.icon}</span>
                  <div>
                    <span className="text-xs font-semibold block" style={{ color: "var(--color-muted)" }}>
                      {item.label}
                    </span>
                    <span
                      className="text-xs leading-relaxed"
                      style={{
                        color: item.isPlaceholder ? "var(--color-faint)" : "var(--color-text)",
                        fontStyle: item.isPlaceholder ? "italic" : "normal",
                      }}
                    >
                      {item.value}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Right: about paragraphs ───────────────────────────────── */}
        <div className="flex flex-col gap-4 flex-1">
          {aboutParagraphs.map((para, i) => (
            <p
              key={i}
              className="text-sm md:text-base leading-relaxed"
              style={{ color: "var(--color-muted)" }}
            >
              {para}
            </p>
          ))}

          {/* "How this site is built" panel — PRD §17.5 */}
          <div
            className="mt-4 rounded-xl p-4"
            style={{
              background: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
            }}
          >
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--color-faint)" }}>
              How this site is built
            </h3>
            <div className="flex flex-wrap gap-2 text-xs" style={{ color: "var(--color-muted)" }}>
              {[
                "Next.js (Vercel)",
                "Express REST API (Render)",
                "MongoDB Atlas",
                "JWT admin auth",
                "Cloudinary uploads",
                "GitHub import",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 rounded"
                  style={{ background: "var(--color-bg)", border: "1px solid var(--color-border)" }}
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-xs mt-3" style={{ color: "var(--color-faint)" }}>
              This portfolio is itself a MERN full-stack project. The admin dashboard,
              GitHub import, contact form, and resume upload are all live features.
            </p>
          </div>
        </div>
      </div>
      </Container>
    </section>
  );
}
