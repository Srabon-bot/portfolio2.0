/*
 * SkillsSection — three grouped cards (Frontend, Backend, Tools) + secondary ML row.
 *
 * PRD §6.4: "three grouped cards with chips. Grouping must be clear.
 * MERN technologies lead each card. A slim, lower-emphasis row labelled
 * 'Also: ML and data' shows the ml-data skills."
 *
 * PRD §5.5 (critical): "content must be visible without JavaScript and
 * must never render as a blank area." This is a Server Component — no JS needed.
 */

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Chip } from "@/components/ui/Chip";
import type { Skill, SkillGroups } from "@/types";

interface SkillsSectionProps {
  skills: Skill[];
}

/* Helper: group a flat skills array into the four categories */
function groupSkills(skills: Skill[]): SkillGroups {
  const sorted = [...skills].sort((a, b) => a.order - b.order);
  return {
    frontend: sorted.filter((s) => s.category === "frontend"),
    backend:  sorted.filter((s) => s.category === "backend"),
    tools:    sorted.filter((s) => s.category === "tools"),
    mlData:   sorted.filter((s) => s.category === "ml-data"),
  };
}

/* A single skill group card */
function SkillCard({ title, skills }: { title: string; skills: Skill[] }) {
  return (
    <div
      className="rounded-2xl p-5 md:p-6 flex flex-col gap-4 h-full transition-all duration-300 hover:border-violet-500/40"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
      }}
    >
      <h3 className="text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--color-muted)" }}>
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Chip key={skill._id} label={skill.name} />
        ))}
        {/* If empty, show a fallback so the card is never blank */}
        {skills.length === 0 && (
          <span className="text-faint text-xs italic">No skills added yet</span>
        )}
      </div>
    </div>
  );
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const groups = groupSkills(skills);

  return (
    <section
      id="skills"
      aria-label="Skills and technologies"
      className="py-16 md:py-24"
    >
      <Container>
        <SectionHeading
          title="Skills"
          subtitle="Technologies I work with every day"
          id="skills-heading"
        />

      {/* Three main skill cards — 1 column on mobile, 3 on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <SkillCard title="Frontend" skills={groups.frontend} />
        <SkillCard title="Backend"  skills={groups.backend}  />
        <SkillCard title="Tools"    skills={groups.tools}    />
      </div>

      {/* Secondary "Also: ML and data" strip — lower emphasis */}
      {groups.mlData.length > 0 && (
        <div
          className="mt-5 rounded-xl px-5 py-4 flex flex-wrap items-center gap-2"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        >
          {/* Label — clearly secondary, faint color */}
          <span
            className="text-xs font-semibold uppercase tracking-widest mr-2 flex-shrink-0"
            style={{ color: "var(--color-faint)" }}
          >
            Also: ML &amp; data
          </span>
          {groups.mlData.map((skill) => (
            /* Smaller chips for the secondary row */
            <span
              key={skill._id}
              className="inline-block px-2.5 py-0.5 text-xs rounded-full"
              style={{
                background: "var(--color-surface-2)",
                border: "1px solid var(--color-border)",
                color: "var(--color-faint)",
              }}
            >
              {skill.name}
            </span>
          ))}
        </div>
      )}
      </Container>
    </section>
  );
}
