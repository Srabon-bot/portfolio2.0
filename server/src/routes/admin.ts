import { Router, Request, Response } from "express";
import { z } from "zod";
import { Profile } from "../models/Profile";
import { Skill } from "../models/Skill";
import { Project } from "../models/Project";
import { Message } from "../models/Message";
import { requireAdmin, AuthenticatedRequest } from "../middleware/auth";

const router = Router();

// Protect all admin routes with requireAdmin
router.use(requireAdmin);

/* ──────────────────────────────────────────────────────────────────────────
 * 1. Profile Management
 * ────────────────────────────────────────────────────────────────────────── */
router.put("/profile", async (req: Request, res: Response) => {
  try {
    const updated = await Profile.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" });
  }
});

/* ──────────────────────────────────────────────────────────────────────────
 * 2. Skills Management (CRUD + Reordering)
 * ────────────────────────────────────────────────────────────────────────── */
router.get("/skills", async (_req: Request, res: Response) => {
  try {
    const skills = await Skill.find().sort({ order: 1, name: 1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch skills" });
  }
});

router.post("/skills", async (req: Request, res: Response) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (error) {
    res.status(400).json({ error: "Failed to create skill" });
  }
});

router.put("/skills/:id", async (req: Request, res: Response) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!skill) {
      res.status(404).json({ error: "Skill not found" });
      return;
    }
    res.json(skill);
  } catch (error) {
    res.status(400).json({ error: "Failed to update skill" });
  }
});

router.delete("/skills/:id", async (req: Request, res: Response) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      res.status(404).json({ error: "Skill not found" });
      return;
    }
    res.json({ success: true, message: "Skill deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete skill" });
  }
});

router.patch("/skills/reorder", async (req: Request, res: Response) => {
  try {
    const { items } = req.body as { items: { id: string; order: number }[] };
    if (!Array.isArray(items)) {
      res.status(400).json({ error: "Invalid items array" });
      return;
    }

    const updates = items.map((item) =>
      Skill.findByIdAndUpdate(item.id, { order: item.order })
    );
    await Promise.all(updates);

    res.json({ success: true, message: "Skills reordered" });
  } catch (error) {
    res.status(500).json({ error: "Failed to reorder skills" });
  }
});

/* ──────────────────────────────────────────────────────────────────────────
 * 3. Projects Management (with PRD §9 Publish Validation & Featured Cap)
 * ────────────────────────────────────────────────────────────────────────── */
function validateProjectPublish(data: any): string[] {
  const errors: string[] = [];

  // Check for forbidden placeholder text
  const jsonStr = JSON.stringify(data).toLowerCase();
  if (jsonStr.includes("placeholder") || jsonStr.includes("lorem ipsum")) {
    errors.push("Published project cannot contain 'PLACEHOLDER' or 'Lorem ipsum' text.");
  }

  if (data.type === "ml-research") {
    if (!data.title?.trim()) errors.push("Title is required.");
    if (!data.tagline?.trim()) errors.push("Tagline is required.");
    if (!data.repoUrl?.trim()) errors.push("Repository URL is required.");
    if (data.featured) errors.push("ML & Research projects cannot be featured in main grid.");
    return errors;
  }

  // Full-stack and Frontend publish requirements (PRD §9)
  if (!data.title?.trim()) errors.push("Title is required.");
  if (!data.tagline?.trim()) errors.push("Tagline (value statement) is required.");
  if (!data.liveUrl?.trim()) errors.push("Live demo URL is required.");
  if (!data.repoUrl?.trim()) errors.push("Repository URL is required.");
  if (!data.coverImage && (!data.screenshots || data.screenshots.length === 0)) {
    errors.push("At least one cover image or screenshot is required to publish.");
  }
  if (!data.setupInstructions?.trim()) {
    errors.push("Setup instructions are required to publish.");
  }
  if (!data.improvements?.trim()) {
    errors.push("'What I would improve' section is required to publish.");
  }

  return errors;
}

router.get("/projects", async (_req: Request, res: Response) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

router.post("/projects", async (req: Request, res: Response) => {
  try {
    const data = req.body;

    // Check featured limit (max 4 allowed per PRD §9)
    if (data.featured) {
      const currentFeaturedCount = await Project.countDocuments({ featured: true });
      if (currentFeaturedCount >= 4) {
        res.status(400).json({
          error: "Maximum of 4 featured projects allowed. Please unfeature another project first.",
        });
        return;
      }
    }

    // If publishing, run publish validation
    if (data.status === "published") {
      const validationErrors = validateProjectPublish(data);
      if (validationErrors.length > 0) {
        res.status(400).json({ error: "Publish validation failed", details: validationErrors });
        return;
      }
    }

    const project = await Project.create(data);
    res.status(201).json(project);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Failed to create project" });
  }
});

router.put("/projects/:id", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const current = await Project.findById(req.params.id);
    if (!current) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    // Check featured limit if toggling to true
    if (data.featured && !current.featured) {
      const currentFeaturedCount = await Project.countDocuments({ featured: true });
      if (currentFeaturedCount >= 4) {
        res.status(400).json({
          error: "Maximum of 4 featured projects allowed. Please unfeature another project first.",
        });
        return;
      }
    }

    // If publishing or updating a published project
    if (data.status === "published") {
      const merged = { ...current.toObject(), ...data };
      const validationErrors = validateProjectPublish(merged);
      if (validationErrors.length > 0) {
        res.status(400).json({ error: "Publish validation failed", details: validationErrors });
        return;
      }
    }

    const updated = await Project.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Failed to update project" });
  }
});

router.delete("/projects/:id", async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }
    res.json({ success: true, message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete project" });
  }
});

/* ──────────────────────────────────────────────────────────────────────────
 * 4. GitHub Import & Sync Endpoints (PRD §10)
 * ────────────────────────────────────────────────────────────────────────── */
router.post("/projects/import-github", async (req: Request, res: Response) => {
  try {
    const { repoUrl } = req.body;
    if (!repoUrl) {
      res.status(400).json({ error: "Repository URL is required" });
      return;
    }

    // Parse owner and repo from URL (e.g. https://github.com/Srabon-bot/kaist-haalkhata)
    const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) {
      res.status(400).json({ error: "Invalid GitHub repository URL" });
      return;
    }

    const [, owner, rawRepo] = match;
    const repo = rawRepo.replace(/\.git$/, "");

    const token = process.env.GITHUB_TOKEN;
    const headers: Record<string, string> = {
      "User-Agent": "Srabon-Portfolio-Importer",
      Accept: "application/vnd.github.v3+json",
    };
    if (token) {
      headers.Authorization = `token ${token}`;
    }

    const ghRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
    if (!ghRes.ok) {
      res.status(ghRes.status).json({ error: `GitHub API error: ${ghRes.statusText}` });
      return;
    }

    const ghData: any = await ghRes.json();

    // Fetch README if possible
    let readmeContent = "";
    try {
      const readmeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
        headers: { ...headers, Accept: "application/vnd.github.v3.raw" },
      });
      if (readmeRes.ok) {
        readmeContent = await readmeRes.text();
      }
    } catch (_) {}

    const slug = repo.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const draftProject = {
      slug,
      title: ghData.name.replace(/[-_]/g, " "),
      tagline: ghData.description || "Draft project imported from GitHub",
      problem: "Draft problem statement based on repository goals.",
      description: ghData.description || "",
      role: "Full-Stack Developer",
      stack: ghData.topics && ghData.topics.length > 0 ? ghData.topics : [ghData.language || "TypeScript"],
      features: ["Main feature highlights from repo."],
      liveUrl: ghData.homepage || "",
      repoUrl: ghData.html_url,
      setupInstructions: "Run `npm install` and `npm run dev`.",
      improvements: "Planned enhancements and architecture optimizations.",
      type: "full-stack",
      featured: false,
      status: "draft",
      source: {
        type: "github",
        owner,
        repo,
        lastSyncedAt: new Date(),
      },
    };

    const created = await Project.create(draftProject);
    res.status(201).json(created);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to import from GitHub" });
  }
});

router.post("/projects/:id/sync-github", async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project || project.source?.type !== "github" || !project.source.owner || !project.source.repo) {
      res.status(400).json({ error: "Project is not linked to a GitHub repository" });
      return;
    }

    const { owner, repo } = project.source;
    const token = process.env.GITHUB_TOKEN;
    const headers: Record<string, string> = { "User-Agent": "Srabon-Portfolio-Sync" };
    if (token) headers.Authorization = `token ${token}`;

    const ghRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
    if (!ghRes.ok) {
      res.status(ghRes.status).json({ error: `GitHub API error: ${ghRes.statusText}` });
      return;
    }

    const ghData: any = await ghRes.json();
    if (ghData.description) project.description = ghData.description;
    if (ghData.homepage) project.liveUrl = ghData.homepage;
    if (ghData.topics?.length) project.stack = ghData.topics;
    project.source.lastSyncedAt = new Date();

    await project.save();
    res.json(project);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to sync GitHub repository" });
  }
});

/* ──────────────────────────────────────────────────────────────────────────
 * 5. Link Checker (PRD §9)
 * ────────────────────────────────────────────────────────────────────────── */
router.post("/check-links", async (_req: Request, res: Response) => {
  try {
    const projects = await Project.find();
    const results = [];

    for (const p of projects) {
      let liveStatus: "ok" | "broken" | "unknown" = "unknown";
      let repoStatus: "ok" | "broken" | "unknown" = "unknown";

      if (p.liveUrl && !p.liveUrl.startsWith("PLACEHOLDER")) {
        try {
          const resp = await fetch(p.liveUrl, { method: "HEAD", signal: AbortSignal.timeout(5000) });
          liveStatus = resp.status < 400 ? "ok" : "broken";
        } catch {
          liveStatus = "broken";
        }
      }

      if (p.repoUrl) {
        try {
          const resp = await fetch(p.repoUrl, { method: "HEAD", signal: AbortSignal.timeout(5000) });
          repoStatus = resp.status < 400 ? "ok" : "broken";
        } catch {
          repoStatus = "broken";
        }
      }

      p.linkStatus = { live: liveStatus, repo: repoStatus, checkedAt: new Date() };
      await p.save();
      results.push({ id: p._id, title: p.title, liveStatus, repoStatus });
    }

    res.json({ success: true, results });
  } catch (error) {
    res.status(500).json({ error: "Link checker failed" });
  }
});

/* ──────────────────────────────────────────────────────────────────────────
 * 6. Messages Management (Contact Inbox)
 * ────────────────────────────────────────────────────────────────────────── */
router.get("/messages", async (_req: Request, res: Response) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

router.patch("/messages/:id", async (req: Request, res: Response) => {
  try {
    const { read } = req.body;
    const msg = await Message.findByIdAndUpdate(req.params.id, { read }, { new: true });
    res.json(msg);
  } catch (error) {
    res.status(400).json({ error: "Failed to update message" });
  }
});

router.delete("/messages/:id", async (req: Request, res: Response) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete message" });
  }
});

export default router;
