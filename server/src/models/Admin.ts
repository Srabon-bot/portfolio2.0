import mongoose, { Schema, Document } from "mongoose";
import type { IAdmin } from "../types";

export interface AdminDocument extends IAdmin, Document {}

const AdminSchema = new Schema<AdminDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

export const Admin = mongoose.models.Admin || mongoose.model<AdminDocument>("Admin", AdminSchema);
