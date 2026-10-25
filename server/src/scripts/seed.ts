import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { Admin } from "../models/Admin";
import { Profile } from "../models/Profile";
import { Skill } from "../models/Skill";
import { Project } from "../models/Project";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/srabon_portfolio";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "srabon361@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "AdminSrabon2026!";

async function seed() {
  console.log("[Seed] Connecting to MongoDB at:", MONGO_URI);
  await mongoose.connect(MONGO_URI);

  console.log("[Seed] Clearing existing collections...");
  await Promise.all([
    Admin.deleteMany({}),
    Profile.deleteMany({}),
    Skill.deleteMany({}),
    Project.deleteMany({}),
  ]);

  // 1. Seed Admin
  console.log("[Seed] Creating Admin account...");
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, salt);
  await Admin.create({
    email: ADMIN_EMAIL.toLowerCase(),
    passwordHash,
  });
  console.log(`[Seed] Admin created: ${ADMIN_EMAIL}`);

  // 2. Seed Profile (PRD §17.1)
  console.log("[Seed] Creating Profile document...");
  await Profile.create({
    name: "Shahriar Srabon",
    displayName: "Srabon",
    role: "Full-Stack Developer (MERN)",
    tagline:
      "I build full-stack web apps with the MERN stack, with a focus on tools that solve real problems for people in Bangladesh.",
    avatarUrl: "/avatar-placeholder.jpg",
    photoUrl: "/avatar-placeholder.jpg",
    location: "Dhaka, Bangladesh",
    email: "srabon361@gmail.com",
    linkedin: "https://www.linkedin.com/in/shahriar-hossain-b0589a402/",
    github: "https://github.com/Srabon-bot",
    instagram: "https://www.instagram.com/its_srabon_here_/",
    aboutParagraphs: [
      "I am a final-semester Computer Science student at the University of Information Technology and Sciences (UITS) in Dhaka. I build full-stack web applications with React, Next.js, Node.js, Express, and MongoDB — the kind of apps that solve real, everyday problems.",
      "My standout project is Haal Khata, a voice-first digital ledger for Bangladesh's neighborhood shopkeepers that speaks Bangla, English, and Korean. It won the grand prize at the KAIST training program. That project taught me how good engineering and local cultural context can produce something people genuinely need.",
      "I believe the best technology is grounded in the lives of the people who use it. I am especially interested in building tools with a direct Bangladeshi impact — and I also research deep learning models for flood forecasting in Bangladesh, though that is a secondary pursuit.",
    ],
    currently: {
      building: "This portfolio and its MERN admin CMS",
      learning: "Next.js App Router and modern full-stack patterns",
      funFact: "Won grand prize at KAIST building voice tech for local mudi dokans",
    },
    resumeUrl: "/resume",
    resumeUpdatedAt: new Date(),
    seoTitle: "Shahriar Srabon — Full-Stack Developer (MERN)",
    seoDescription:
      "Portfolio of Shahriar Srabon, full-stack developer in Dhaka building MERN & Next.js applications.",
  });

  // 3. Seed Skills (PRD §17.2 — MERN first)
  console.log("[Seed] Creating Skills...");
  const skillsData = [
    // Frontend
    { name: "React", category: "frontend", order: 1 },
    { name: "Next.js", category: "frontend", order: 2 },
    { name: "TypeScript", category: "frontend", order: 3 },
    { name: "JavaScript", category: "frontend", order: 4 },
    { name: "Tailwind CSS", category: "frontend", order: 5 },
    { name: "HTML5", category: "frontend", order: 6 },
    { name: "CSS3", category: "frontend", order: 7 },

    // Backend (MERN first)
    { name: "Node.js", category: "backend", order: 1 },
    { name: "Express", category: "backend", order: 2 },
    { name: "MongoDB", category: "backend", order: 3 },
    { name: "REST APIs", category: "backend", order: 4 },
    { name: "JWT auth", category: "backend", order: 5 },

    // Tools
    { name: "Git", category: "tools", order: 1 },
    { name: "GitHub", category: "tools", order: 2 },
    { name: "VS Code", category: "tools", order: 3 },
    { name: "Vercel", category: "tools", order: 4 },
    { name: "Render", category: "tools", order: 5 },
    { name: "Linux", category: "tools", order: 6 },
    { name: "Firebase", category: "tools", order: 7 },

    // ml-data (Secondary row)
    { name: "Python", category: "ml-data", order: 1 },
    { name: "TensorFlow", category: "ml-data", order: 2 },
    { name: "PyTorch", category: "ml-data", order: 3 },
    { name: "scikit-learn", category: "ml-data", order: 4 },
    { name: "Pandas", category: "ml-data", order: 5 },
    { name: "NumPy", category: "ml-data", order: 6 },
    { name: "Jupyter", category: "ml-data", order: 7 },
    { name: "SQL", category: "ml-data", order: 8 },
    { name: "C", category: "ml-data", order: 9 },
    { name: "C++", category: "ml-data", order: 10 },
  ];

  await Skill.insertMany(skillsData);

  // 4. Seed Projects (PRD §17.3)
  console.log("[Seed] Creating Projects...");
  const projectsData = [
    {
      slug: "haal-khata",
      title: "Haal Khata (হাল খাতা)",
      tagline: "Voice-first digital ledger for Bangladesh's neighborhood shopkeepers.",
      problem:
        "Neighborhood shopkeepers in Bangladesh manage daily credit (baki) in paper notebooks, which get lost, damaged, or disputed. Existing bookkeeping apps require cumbersome typing that shopkeepers do not have time for during busy shop hours.",
      description:
        "Haal Khata is an offline-first, voice-enabled credit ledger that lets shopkeepers record transactions by speaking naturally in Bangla, English, or Korean. Won the grand prize at the KAIST global training program.",
      role: "Lead Full-Stack Developer",
      features: [
        "Rule-based Bangla voice extraction with zero cloud AI API latency",
        "Offline-first sync using IndexedDB (Dexie) and Neon Postgres",
        "Multi-language voice interface (Bangla, English, Korean)",
        "Automated customer balance SMS alerts and PDF statement exports",
      ],
      stack: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Neon Postgres", "Dexie IndexedDB", "Vercel Edge"],
      liveUrl: "https://haal-khata.vercel.app",
      repoUrl: "https://github.com/Srabon-bot/kaist-haalkhata",
      coverImage: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=800&auto=format&fit=crop&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=800&auto=format&fit=crop&q=80",
      ],
      setupInstructions:
        "1. Clone repo: `git clone https://github.com/Srabon-bot/kaist-haalkhata.git`\n2. Install: `npm install`\n3. Configure `.env` with Neon connection string\n4. Run dev: `npm run dev`",
      improvements:
        "Add dialect-adaptive acoustic model for regional Bangla accents and native Bluetooth thermal receipt printer support.",
      type: "full-stack",
      featured: true,
      order: 1,
      status: "published",
      source: { type: "github", owner: "Srabon-bot", repo: "kaist-haalkhata" },
    },
    {
      slug: "portfolio-cms",
      title: "MERN Developer Portfolio & CMS",
      tagline: "Full-stack portfolio with headless admin CMS, GitHub importer, and analytics.",
      problem:
        "Static developer portfolios become outdated because updating code, case studies, and live links requires manual commits and redeployments each time.",
      description:
        "A full-stack portfolio platform built with Next.js App Router and an Express/MongoDB backend, featuring JWT-protected admin dashboard, one-click GitHub repo import, link health checking, and Cloudinary uploads.",
      role: "Sole Creator",
      features: [
        "Headless Express REST API with MongoDB Atlas and Mongoose",
        "Protected admin CMS with publish validation and featured caps",
        "Automated GitHub repo importer and one-click sync",
        "Honeypot-protected contact form and real-time link health verification",
      ],
      stack: ["MongoDB", "Express", "React", "Next.js 16", "Node.js", "TypeScript", "Tailwind CSS", "Cloudinary"],
      liveUrl: "http://localhost:3000",
      repoUrl: "https://github.com/Srabon-bot",
      coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
      ],
      setupInstructions:
        "1. Install root dependencies: `npm install`\n2. Run frontend & backend: `npm run dev:web` and `npm run dev:server`",
      improvements:
        "Add Webhook integration for automatic GitHub push sync and blog markdown article editor.",
      type: "full-stack",
      featured: true,
      order: 2,
      status: "published",
      source: { type: "manual" },
    },
    {
      slug: "yutnori-3d",
      title: "3D Korean Yutnori Game",
      tagline: "Traditional Korean board game rendered in real-time 3D with AI opponent.",
      problem:
        "Traditional board games lose cultural connection when digitized as flat 2D sprites without physical board weight and tactile dice dynamics.",
      description:
        "An interactive 3D board game built with React Three Fiber, physics simulation for stick throws, complete rule engine tested with unit tests, and multi-language commentary.",
      role: "Frontend & 3D Graphics Engineer",
      features: [
        "Physics-based 3D stick throwing with real collision dynamics",
        "Minimax AI opponent with selectable difficulty",
        "Trilingual audio narration (Bangla, Korean, English)",
        "Zero-backend client architecture with instant load time",
      ],
      stack: ["React", "React Three Fiber", "Three.js", "TypeScript", "Vite", "Tailwind CSS"],
      liveUrl: "https://yutnori-ten.vercel.app",
      repoUrl: "https://github.com/Srabon-bot/Vibe-coding-project-Korean-game-Yutnori-",
      coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
      ],
      setupInstructions:
        "1. Clone: `git clone https://github.com/Srabon-bot/Vibe-coding-project-Korean-game-Yutnori-.git`\n2. Run: `npm install && npm run dev`",
      improvements:
        "Implement WebRTC peer-to-peer multiplayer mode and customizable 3D token skins.",
      type: "frontend",
      featured: true,
      order: 3,
      status: "published",
      source: { type: "github", owner: "Srabon-bot", repo: "Vibe-coding-project-Korean-game-Yutnori-" },
    },
    {
      slug: "sholo-guti",
      title: "Sholo Guti (১৬ গুটি)",
      tagline: "Traditional 16-bead strategic board game native to South Asia.",
      problem:
        "Traditional village games in Bangladesh lack modern accessible web editions for newer generations.",
      description:
        "Digital strategic board game implementing full bead capture logic, move validation, turn timers, and local two-player support.",
      role: "Frontend Engineer",
      features: [
        "Accurate grid path traversal and multi-jump capture logic",
        "Custom SVG board rendering with haptic-inspired feedback",
        "Move history and undo tree",
      ],
      stack: ["React", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://github.com/Srabon-bot",
      repoUrl: "https://github.com/Srabon-bot/Sholo-Guti_6_U222_U224_U202",
      coverImage: "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?w=800&auto=format&fit=crop&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?w=800&auto=format&fit=crop&q=80",
      ],
      setupInstructions: "Clone and run `npm run dev`.",
      improvements: "Add online socket matchmaking.",
      type: "frontend",
      featured: true,
      order: 4,
      status: "published",
      source: { type: "github", owner: "Srabon-bot", repo: "Sholo-Guti_6_U222_U224_U202" },
    },
    // Research / ML Strip Projects (PRD §17.3)
    {
      slug: "bangladesh-flood-discharge",
      title: "Discharge Forecaster for Bangladesh River Basins",
      tagline: "LSTM and GRU deep learning models predicting water discharge across Brahmaputra basins.",
      problem: "Seasonal flooding causes massive loss of life and crops across northern Bangladesh.",
      description: "Hydrological time-series forecasting model using remote sensing and river gauge metrics.",
      role: "Machine Learning Researcher",
      features: ["Sequence-to-sequence LSTM architecture", "7-day advance water surge prediction"],
      stack: ["Python", "TensorFlow", "Pandas", "NumPy"],
      repoUrl: "https://github.com/Srabon-bot/Discharge-forecaster-model-for-Bangladesh",
      screenshots: [],
      type: "ml-research",
      featured: false,
      order: 10,
      status: "published",
      source: { type: "github", owner: "Srabon-bot", repo: "Discharge-forecaster-model-for-Bangladesh" },
    },
    {
      slug: "bangladesh-flood-risk",
      title: "Bangladesh Flood Risk Classifier",
      tagline: "Geospatial machine learning classifier mapping district vulnerability indices.",
      problem: "Disaster management agencies need granular risk classification maps.",
      description: "Random Forest and XGBoost classification on precipitation and elevation datasets.",
      role: "Machine Learning Researcher",
      features: ["Multi-class flood risk indexing", "ROC-AUC 0.93 accuracy"],
      stack: ["Python", "scikit-learn", "GeoPandas", "Matplotlib"],
      repoUrl: "https://github.com/Srabon-bot/Bangladesh-flood-risk-classifier-model",
      screenshots: [],
      type: "ml-research",
      featured: false,
      order: 11,
      status: "published",
      source: { type: "github", owner: "Srabon-bot", repo: "Bangladesh-flood-risk-classifier-model" },
    },
  ];

  await Project.insertMany(projectsData);

  console.log("[Seed] Completed successfully! Seeded Admin, Profile, Skills, and Projects.");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("[Seed Error]", err);
  process.exit(1);
});
