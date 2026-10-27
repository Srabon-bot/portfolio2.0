/*
 * SkillsSection — grouped into Frontend, Backend, Database, Tooling.
 *
 * Hiring-ready features:
 * - 4 clean categories: Frontend, Backend, Database, Tooling
 * - No percentage bars (recruiter preference: stack chips only)
 * - Server component: zero client JavaScript required, SSR ready
 */

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Chip } from "@/components/ui/Chip";
import type { Skill } from "@/types";

interface SkillsSectionProps {
  skills: Skill[];
}

const DATABASE_TECH = ["mongodb", "sql", "postgres", "dexie", "neon", "redis", "prisma", "mongoose"];

function groupSkills(skills: Skill[]) {
  const sorted = [...skills].sort((a, b) => a.order - b.order);

  const frontend: Skill[] = [];
  const backend: Skill[] = [];
  const database: Skill[] = [];
  const tooling: Skill[] = [];

  sorted.forEach((skill) => {
    const nameLower = skill.name.toLowerCase();
    const isDb = DATABASE_TECH.some((db) => nameLower.includes(db));

    if (isDb || (skill.category as string) === "database") {
      database.push(skill);
    } else if (skill.category === "frontend") {
      frontend.push(skill);
    } else if (skill.category === "backend") {
      backend.push(skill);
    } else if (skill.category === "tools") {
      tooling.push(skill);
    } else if (skill.category === "ml-data") {
      tooling.push(skill);
    } else {
      tooling.push(skill);
    }
  });

  return [
    { title: "Frontend", skills: frontend },
    { title: "Backend",  skills: backend },
    { title: "Database", skills: database },
    { title: "Tooling",  skills: tooling },
  ];
}

function SkillCard({ title, skills }: { title: string; skills: Skill[] }) {
  return (
    <div
      className="rounded-2xl p-5 md:p-6 flex flex-col gap-4 h-full transition-all duration-300 hover:border-accent/40"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
      }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xs md:text-sm font-mono font-semibold uppercase tracking-wider" style={{ color: "var(--color-muted)" }}>
          {title}
        </h3>
        <span className="text-xs font-mono text-faint">
          {skills.length} skills
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Chip key={skill._id} label={skill.name} />
        ))}
        {skills.length === 0 && (
          <span className="text-faint text-xs italic">No skills listed</span>
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
          subtitle="Technologies and tools I use to build scalable web applications"
          id="skills-heading"
        />

        {/* 4 grouped cards — 1 col on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {groups.map((group) => (
            <SkillCard
              key={group.title}
              title={group.title}
              skills={group.skills}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
