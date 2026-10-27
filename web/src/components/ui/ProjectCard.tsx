"use client"; /* hover animation requires client-side JS */

/*
 * ProjectCard — displays one project in the "My works" grid.
 *
 * PRD §5.4: "ProjectCard: cover image, title, one-line problem,
 * stack chips, Live demo and Code links, links to the case-study page."
 *
 * If the project is still a PLACEHOLDER (status === 'draft' and
 * title starts with PLACEHOLDER), we render a faded ghost card so the
 * owner can see the slot but it never looks like real content.
 */

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Chip } from "./Chip";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  /* Check if this is a placeholder card that needs special treatment */
  const isPlaceholder =
    project.title.startsWith("PLACEHOLDER") ||
    project.status === "draft";

  return (
    <motion.article
      /* Hover: lift 2px and brighten border — PRD §5.4 */
      whileHover={isPlaceholder ? {} : { y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="flex flex-col h-full rounded-2xl overflow-hidden transition-colors"
      style={{
        background: "var(--color-surface)",
        border: `1px solid ${isPlaceholder ? "rgba(42,31,69,0.5)" : "var(--color-border)"}`,
        opacity: isPlaceholder ? 0.55 : 1,
      }}
    >
      {/* Cover image area */}
      <div
        className="relative w-full"
        style={{
          aspectRatio: "16/9",
          background: "var(--color-surface-2)",
        }}
      >
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={`${project.title} screenshot`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          /* Image placeholder — never a blank section (PRD §5.5) */
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-faint text-sm font-medium">
              {isPlaceholder ? "PLACEHOLDER" : "No screenshot yet"}
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Title */}
        <h3 className="text-base font-bold text-text leading-snug">
          {project.title}
        </h3>

        {/* One-line tagline (the "problem" or value statement) */}
        <p className="text-muted text-sm line-clamp-2 leading-relaxed">
          {project.tagline}
        </p>

        {/* Stack chips — show first 4 to keep the card tidy */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {project.stack.slice(0, 4).map((tech) => (
            <Chip key={tech} label={tech} />
          ))}
          {project.stack.length > 4 && (
            <Chip label={`+${project.stack.length - 4}`} />
          )}
        </div>

        {/* Links row */}
        {!isPlaceholder && (
          <div className="flex items-center gap-4 pt-2 border-t mt-1" style={{ borderColor: "var(--color-border)" }}>
            {project.liveUrl && !project.liveUrl.startsWith("PLACEHOLDER") && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-accent-soft hover:text-accent transition-colors"
              >
                Live demo ↗
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-muted hover:text-text transition-colors"
              >
                Code ↗
              </a>
            )}
            {/* Link to case-study page */}
            <Link
              href={`/projects/${project.slug}`}
              className="text-xs font-medium text-muted hover:text-accent-soft transition-colors ml-auto"
            >
              Case study →
            </Link>
          </div>
        )}
      </div>
    </motion.article>
  );
}
