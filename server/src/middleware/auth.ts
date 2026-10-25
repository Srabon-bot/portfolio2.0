import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  adminEmail?: string;
}

export function requireAdmin(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  let token: string | undefined;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (req.headers.cookie) {
    // Parse auth_token cookie
    const cookies = req.headers.cookie.split(";").map((c) => c.trim());
    const authCookie = cookies.find((c) => c.startsWith("auth_token="));
    if (authCookie) {
      token = authCookie.split("=")[1];
    }
  }

  if (!token) {
    res.status(401).json({ error: "Unauthorized: Admin authentication required" });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET || "srabon-super-secret-jwt-key-2026";

  try {
    const decoded = jwt.verify(token, jwtSecret) as { email: string };
    req.adminEmail = decoded.email;
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
  }
}
