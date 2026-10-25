import {
  seedProfile,
  seedSkills,
  seedProjects,
  seedMlProjects,
} from "./seed-data";
import type { Profile, Skill, Project } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function getProfile(): Promise<Profile> {
  try {
    const res = await fetch(`${API_BASE}/profile`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (_) {
    // Cold start or offline fallback (PRD §15)
  }
  return seedProfile;
}

export async function getSkills(): Promise<Skill[]> {
  try {
    const res = await fetch(`${API_BASE}/skills`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (_) {
    // Fallback
  }
  return seedSkills;
}

export async function getProjects(): Promise<{
  featured: Project[];
  mlProjects: Project[];
  all: Project[];
}> {
  try {
    const res = await fetch(`${API_BASE}/projects`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const projects: Project[] = await res.json();
      const published = projects.filter(
        (p) => p.status === "published" && !p.title.startsWith("PLACEHOLDER")
      );
      const featured = published.filter(
        (p) => p.featured && (p.type === "full-stack" || p.type === "frontend")
      );
      const mlProjects = published.filter((p) => p.type === "ml-research");
      return { featured, mlProjects, all: published };
    }
  } catch (_) {
    // Fallback
  }
  const publishedSeed = seedProjects.filter(
    (p) => p.status === "published" && !p.title.startsWith("PLACEHOLDER")
  );
  const featured = publishedSeed.filter(
    (p) => p.featured && (p.type === "full-stack" || p.type === "frontend")
  );
  const mlProjects = seedMlProjects.filter((p) => p.status === "published");
  return {
    featured,
    mlProjects,
    all: [...publishedSeed, ...mlProjects],
  };
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(`${API_BASE}/projects/${slug}`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (_) {}

  // Fallback to seed
  const found = [...seedProjects, ...seedMlProjects].find((p) => p.slug === slug);
  return found || null;
}
