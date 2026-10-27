/*
 * ExperienceSection — professional experience and internships.
 *
 * TODO: Replace with real work experience data when ready.
 */

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  techStack: string[];
}

/* Placeholder experience items — flagged with TODO */
const EXPERIENCES: ExperienceItem[] = [
  {
    role: "Full-Stack Developer Intern",
    company: "KAIST Global AI/SW Training",
    period: "2024 - Present",
    location: "Daejeon, South Korea / Remote",
    description: [
      "Engineered offline-first digital ledger PWA (Haal Khata) with voice transaction entry in 3 languages, winning the Grand Prize.",
      "Architected rule-based local NLP parser achieving 100% on-device extraction with zero external API latency.",
      "Implemented multi-device background synchronization with soft-delete reconciliation using Neon Postgres.",
    ],
    techStack: ["React 19", "TypeScript", "IndexedDB", "PostgreSQL", "Tailwind CSS"],
  },
  {
    role: "Junior Web Developer (Freelance / Contract)",
    company: "Self-Employed",
    period: "2023 - 2024",
    location: "Dhaka, Bangladesh",
    description: [
      "Built and deployed custom full-stack web applications for local clients with responsive Next.js frontends and Node.js REST APIs.",
      "Optimized Core Web Vitals, achieving 95+ PageSpeed scores and fast interactive render speeds.",
    ],
    techStack: ["Next.js", "Express", "MongoDB", "Node.js", "REST APIs"],
  },
];

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-label="Work experience"
      className="py-16 md:py-24"
    >
      <Container>
        <SectionHeading
          title="Experience"
          subtitle="Work experience and software engineering internships"
          id="experience-heading"
        />

        <div className="flex flex-col gap-6">
          {EXPERIENCES.map((exp, index) => (
            <div
              key={`${exp.company}-${index}`}
              className="rounded-2xl p-6 md:p-8 flex flex-col gap-4 transition-all duration-300 hover:border-accent/40"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-text">
                    {exp.role}
                  </h3>
                  <p className="text-sm font-medium text-accent-soft">
                    {exp.company}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-muted">
                  <span>{exp.period}</span>
                  <span>•</span>
                  <span>{exp.location}</span>
                </div>
              </div>

              <ul className="list-disc list-inside space-y-2 text-sm text-muted leading-relaxed">
                {exp.description.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 pt-2 border-t" style={{ borderColor: "var(--color-border)" }}>
                {exp.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded-full text-xs font-mono text-muted"
                    style={{
                      background: "var(--color-surface-2)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
