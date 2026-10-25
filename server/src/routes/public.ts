import { Router, Request, Response } from "express";
import { z } from "zod";
import crypto from "crypto";
import { Profile } from "../models/Profile";
import { Skill } from "../models/Skill";
import { Project } from "../models/Project";
import { Message } from "../models/Message";
import { contactLimiter, publicLimiter } from "../middleware/rateLimit";

const router = Router();

// Apply public rate limiting
router.use(publicLimiter);

/* GET /api/profile */
router.get("/profile", async (_req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      res.status(404).json({ error: "Profile not found" });
      return;
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

/* GET /api/skills */
router.get("/skills", async (_req: Request, res: Response) => {
  try {
    const skills = await Skill.find().sort({ order: 1, name: 1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch skills" });
  }
});

/* GET /api/projects — published only, sorted by order */
router.get("/projects", async (_req: Request, res: Response) => {
  try {
    const projects = await Project.find({ status: "published" }).sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

/* GET /api/projects/:slug */
router.get("/projects/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const project = await Project.findOne({ slug });
    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

/* GET /api/resume — redirects to current resume PDF */
router.get("/resume", async (_req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne();
    if (profile && profile.resumeUrl) {
      res.redirect(302, profile.resumeUrl);
      return;
    }
    res.status(404).json({ error: "No resume PDF currently uploaded" });
  } catch (error) {
    res.status(500).json({ error: "Failed to redirect to resume" });
  }
});

/* POST /api/contact — with honeypot, zod validation, ip hashing */
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
  website: z.string().optional(), // Honeypot field
});

router.post("/contact", contactLimiter, async (req: Request, res: Response) => {
  try {
    const parseResult = contactSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({ error: parseResult.error.errors[0].message });
      return;
    }

    const { name, email, message, website } = parseResult.data;

    // Honeypot check: silently accept if bot filled the hidden field
    if (website && website.trim().length > 0) {
      res.status(200).json({ success: true, message: "Message received" });
      return;
    }

    // Hash IP address for privacy
    const rawIp = req.ip || req.socket.remoteAddress || "unknown";
    const ipHash = crypto.createHash("sha256").update(rawIp).digest("hex").slice(0, 16);

    const newMessage = await Message.create({
      name,
      email,
      message,
      read: false,
      ipHash,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully!",
      id: newMessage._id,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to process message" });
  }
});

export default router;
