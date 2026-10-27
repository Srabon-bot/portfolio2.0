"use client";

/*
 * SectionRail — fixed right-side vertical navigation rail.
 *
 * Mirrors the left SocialRail. Visible only at ≥ 1280px (xl breakpoint).
 * Links scroll to section anchors and the active section is highlighted
 * via IntersectionObserver.
 *
 * Writing direction: top-to-bottom (writing-mode: vertical-rl + rotate 180°).
 * pointer-events: none on wrapper so dead space doesn't block clicks.
 */

import { useEffect, useState } from "react";

const sectionLinks = [
  { label: "About",     href: "#about"     },
  { label: "Education", href: "#education" },
  { label: "Skills",    href: "#skills"    },
  { label: "Works",     href: "#works"     },
  { label: "Contact",   href: "#contact"   },
];

const sectionIds = sectionLinks.map((l) => l.href.slice(1)); /* strip # */

export function SectionRail() {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        {
          rootMargin: "-40% 0px -50% 0px", /* trigger when section is roughly centred */
          threshold:  0,
        }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    /* Hidden below xl — pointer-events:none on container so dead space is click-through */
    <aside
      className="hidden xl:flex flex-col items-center gap-5 fixed right-6 top-1/2 -translate-y-1/2 z-40"
      style={{ pointerEvents: "none" }}
      aria-label="Page sections"
    >
      {/* Vertical line above links */}
      <div
        aria-hidden="true"
        className="w-px mb-2"
        style={{ height: "60px", background: "var(--color-border)" }}
      />

      <nav
        aria-label="Page sections"
        style={{ pointerEvents: "auto" }}
      >
        <ul className="flex flex-col items-center gap-4 list-none">
          {sectionLinks.map((link) => {
            const id     = link.href.slice(1);
            const active = activeId === id;
            return (
              <li key={link.href} className="flex items-center gap-1.5">
                {/* Active dot/tick marker */}
                <span
                  aria-hidden="true"
                  style={{
                    display:         "block",
                    width:           "4px",
                    height:          "4px",
                    borderRadius:    "50%",
                    background:      active
                      ? "var(--color-accent-soft)"
                      : "var(--color-border)",
                    transition:      "background 0.25s",
                    /* The text is rotated so flip marker to the text's visual left */
                    writingMode:     "horizontal-tb",
                    transform:       "none",
                  }}
                />
                <a
                  href={link.href}
                  style={{
                    writingMode: "vertical-rl",
                    transform:   "rotate(180deg)", /* makes text read top-to-bottom */
                    fontSize:    "0.65rem",
                    fontWeight:  600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: active
                      ? "var(--color-accent-soft)"
                      : "var(--color-faint)",
                    transition:  "color 0.25s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-muted)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = active
                      ? "var(--color-accent-soft)"
                      : "var(--color-faint)")
                  }
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Vertical line below links */}
      <div
        aria-hidden="true"
        className="w-px mt-2"
        style={{ height: "60px", background: "var(--color-border)" }}
      />
    </aside>
  );
}
