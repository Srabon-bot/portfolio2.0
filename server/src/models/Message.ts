import mongoose, { Schema, Document } from "mongoose";
import type { IMessage } from "../types";

export interface MessageDocument extends IMessage, Document {}

const MessageSchema = new Schema<MessageDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    ipHash: { type: String },
  },
  { timestamps: true }
);

export const Message = mongoose.models.Message || mongoose.model<MessageDocument>("Message", MessageSchema);
