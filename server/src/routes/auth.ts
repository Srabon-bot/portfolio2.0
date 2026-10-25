import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { Admin } from "../models/Admin";
import { loginLimiter } from "../middleware/rateLimit";
import { requireAdmin, AuthenticatedRequest } from "../middleware/auth";

const router = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

/* POST /api/auth/login */
router.post("/login", loginLimiter, async (req: Request, res: Response) => {
  try {
    const parseResult = loginSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({ error: "Invalid email or password format" });
      return;
    }

    const { email, password } = parseResult.data;
    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET || "srabon-super-secret-jwt-key-2026";
    const token = jwt.sign({ email: admin.email }, jwtSecret, { expiresIn: "7d" });

    // Set secure httpOnly cookie
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      token,
      admin: { email: admin.email },
    });
  } catch (error) {
    res.status(500).json({ error: "Authentication failed" });
  }
});

/* POST /api/auth/logout */
router.post("/logout", (_req: Request, res: Response) => {
  res.clearCookie("auth_token");
  res.json({ success: true, message: "Logged out successfully" });
});

/* GET /api/auth/me */
router.get("/me", requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  res.json({
    authenticated: true,
    email: req.adminEmail,
  });
});

export default router;
