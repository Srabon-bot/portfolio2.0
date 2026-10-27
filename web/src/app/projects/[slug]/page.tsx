import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/api";
import { Chip } from "@/components/ui/Chip";
import { TechIcon } from "@/components/ui/TechIcon";

/*
 * generateStaticParams — pre-render every published project at build time.
 *
 * This converts /projects/[slug] from dynamic (ƒ) to static (○), meaning:
 *  - Case study pages load instantly from the CDN edge — no cold-start wait.
 *  - If the API is down, Vercel serves the last cached build.
 *  - New projects added via the API are still reachable (dynamicParams = true)
 *    and get generated on first request, then cached for 60 s (revalidate).
 *
 * PRD §11: "Public pages server-rendered or ISR (revalidate ~60s)."
 */
export const revalidate = 60;          /* ISR: rebuild stale pages every 60 s */
export const dynamicParams = true;     /* allow slugs not in the static list   */

export async function generateStaticParams() {
  try {
    const { all } = await getProjects();
    return all
      .filter((p) => p.status === "published" && p.slug)
      .map((p) => ({ slug: p.slug }));
  } catch {
    /* Build-time API unavailable — fall back to seed slugs so the build
       still produces all known case-study pages. */
    const { seedProjects, seedMlProjects } = await import("@/lib/seed-data");
    return [...seedProjects, ...seedMlProjects]
      .filter((p) => p.status === "published")
      .map((p) => ({ slug: p.slug }));
  }
}

interface PageProps {
  params: Promise<{ slug: string }>;
}


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} — Case Study | Srabon`,
    description: project.tagline,
    openGraph: {
      title: `${project.title} — Srabon's Case Study`,
      description: project.tagline,
      images: project.coverImage ? [project.coverImage] : [],
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      {/* Top sticky navigation bar */}
      <header
        className="sticky top-0 z-50 w-full"
        style={{
          background: "var(--color-bg)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          <Link
            href="/#works"
            className="text-sm font-medium hover:text-accent-soft transition-colors flex items-center gap-2"
            style={{ color: "var(--color-muted)" }}
          >
            ← Back to My Works
          </Link>
          <div className="flex items-center gap-3">
            {project.liveUrl && !project.liveUrl.startsWith("PLACEHOLDER") && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold px-3 py-1.5 rounded-full text-white transition-opacity hover:opacity-90"
                style={{ background: "var(--color-accent)" }}
              >
                Live Demo ↗
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium px-3 py-1.5 rounded-full border transition-colors hover:text-white"
                style={{
                  borderColor: "var(--color-border)",
                  color: "var(--color-muted)",
                }}
              >
                GitHub Code ↗
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Case Study Article */}
      <article className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-16 flex flex-col gap-12">
        {/* Title, Badge & Tagline */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{
                background: "var(--color-surface-2)",
                color: "var(--color-accent-soft)",
                border: "1px solid var(--color-border)",
              }}
            >
              {project.type.toUpperCase()}
            </span>
            <span className="text-xs text-faint">Role: {project.role}</span>
          </div>

          <h1
            className="text-3xl md:text-5xl font-bold tracking-tight leading-tight"
            style={{ color: "var(--color-text)" }}
          >
            {project.title}
          </h1>

          <p
            className="text-lg md:text-xl leading-relaxed"
            style={{ color: "var(--color-muted)" }}
          >
            {project.tagline}
          </p>

          {/* Quick tech stack tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.stack.map((tech) => (
              <Chip key={tech} label={tech} />
            ))}
          </div>
        </div>

        {/* Cover image */}
        {project.coverImage && (
          <div
            className="relative w-full rounded-2xl overflow-hidden shadow-2xl border"
            style={{
              aspectRatio: "16/9",
              borderColor: "var(--color-border)",
              background: "var(--color-surface)",
            }}
          >
            <Image
              src={project.coverImage}
              alt={`${project.title} preview`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
        )}

        {/* ── Section 1: Problem Statement ──────────────────────────── */}
        <section
          className="rounded-2xl p-6 md:p-8"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        >
          <h2
            className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2"
            style={{ color: "var(--color-text)" }}
          >
            <span aria-hidden="true">🎯</span> 1. The Problem
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--color-muted)" }}
          >
            {project.problem}
          </p>
          <div
            className="mt-6 p-4 rounded-xl text-sm"
            style={{
              background: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
            }}
          >
            <strong>Core insight:</strong> {project.description}
          </div>
        </section>

        {/* ── Section 2: Architecture & Tech Stack ──────────────────── */}
        <section
          className="rounded-2xl p-6 md:p-8"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        >
          <h2
            className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2"
            style={{ color: "var(--color-text)" }}
          >
            <span aria-hidden="true">🏛️</span> 2. Architecture &amp; Technology Stack
          </h2>
          <p
            className="text-sm md:text-base leading-relaxed mb-6"
            style={{ color: "var(--color-muted)" }}
          >
            Every technology in this project was selected to solve specific constraints:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.stack.map((tech) => (
              <div
                key={tech}
                className="p-4 rounded-xl flex items-start gap-3.5 transition-all duration-200 hover:border-accent/40"
                style={{
                  background: "var(--color-surface-2)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <TechIcon name={tech} size={20} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-bold text-white">{tech}</span>
                  <span className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>
                    Selected for optimal production reliability, developer velocity, and responsiveness.
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 3: Key Features & Engineering Highlights ───────── */}
        <section
          className="rounded-2xl p-6 md:p-8"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        >
          <h2
            className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2"
            style={{ color: "var(--color-text)" }}
          >
            <span aria-hidden="true">⚡</span> 3. Key Features &amp; Engineering Highlights
          </h2>
          <ul className="flex flex-col gap-3.5">
            {project.features.map((feat, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-sm md:text-base leading-relaxed"
                style={{ color: "var(--color-muted)" }}
              >
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                  style={{
                    background: "rgba(139,92,246,0.2)",
                    color: "var(--color-accent-soft)",
                  }}
                >
                  {index + 1}
                </span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Visual Gallery / Key Screens ──────────────────────────── */}
        {project.screenshots && project.screenshots.length > 0 && (
          <section
            className="rounded-2xl p-6 md:p-8"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
          >
            <h2
              className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2"
              style={{ color: "var(--color-text)" }}
            >
              <span aria-hidden="true">🖼️</span> Visual Showcase &amp; Key Screens
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.screenshots.map((img, index) => (
                <div
                  key={index}
                  className="group relative aspect-video rounded-xl overflow-hidden border transition-all duration-300 hover:border-accent-soft"
                  style={{
                    borderColor: "var(--color-border)",
                    background: "var(--color-surface-2)",
                  }}
                >
                  <Image
                    src={img}
                    alt={`${project.title} interface preview ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Section 4: Setup & How to Run ─────────────────────────── */}
        <section
          className="rounded-2xl p-6 md:p-8"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        >
          <h2
            className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2"
            style={{ color: "var(--color-text)" }}
          >
            <span aria-hidden="true">🛠️</span> 4. Local Setup &amp; Installation
          </h2>
          <pre
            className="rounded-xl p-5 overflow-x-auto text-xs md:text-sm font-mono leading-relaxed"
            style={{
              background: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
            }}
          >
            <code>{project.setupInstructions || "npm install\nnpm run dev"}</code>
          </pre>
        </section>

        {/* ── Section 5: What I Would Improve / Lessons Learned ──────── */}
        <section
          className="rounded-2xl p-6 md:p-8"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        >
          <h2
            className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2"
            style={{ color: "var(--color-text)" }}
          >
            <span aria-hidden="true">💡</span> 5. What I Would Improve &amp; Lessons Learned
          </h2>
          <p
            className="text-sm md:text-base leading-relaxed"
            style={{ color: "var(--color-muted)" }}
          >
            {project.improvements ||
              "Continued optimization of data synchronization, comprehensive end-to-end testing coverage, and expanded multi-lingual support."}
          </p>
        </section>

        {/* Bottom actions footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t" style={{ borderColor: "var(--color-border)" }}>
          <Link
            href="/#works"
            className="text-sm font-medium hover:text-accent-soft transition-colors"
            style={{ color: "var(--color-muted)" }}
          >
            ← Back to all works
          </Link>
          <div className="flex items-center gap-4">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold hover:text-accent-soft transition-colors"
                style={{ color: "var(--color-accent-soft)" }}
              >
                View on GitHub ↗
              </a>
            )}
            {project.liveUrl && !project.liveUrl.startsWith("PLACEHOLDER") && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold px-5 py-2.5 rounded-full text-white transition-opacity hover:opacity-90"
                style={{ background: "var(--color-accent)" }}
              >
                Launch Live App ↗
              </a>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
