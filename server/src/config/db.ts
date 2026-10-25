import mongoose from "mongoose";

export async function connectDB(): Promise<void> {
  const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/srabon_portfolio";

  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(mongoUri);
    console.log(`[Database] MongoDB connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.warn("[Database] MongoDB connection failed or not configured. Running with fallback/offline mode.");
  }
}
