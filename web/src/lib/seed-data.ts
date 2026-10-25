/*
 * Phase 1 seed data — static mock content used while the API is not yet built.
 *
 * In Phase 2 these will be replaced by real API calls to the Express backend.
 * Every value here comes directly from PRD §17 or is clearly marked PLACEHOLDER.
 *
 * RULE: Never invent details, project claims, or contact info.
 * Use only what is in the PRD; mark unknown fields PLACEHOLDER.
 */

import type { Profile, Skill, Project } from "@/types";

/* ─── Profile ──────────────────────────────────────────────────────── */
export const seedProfile: Profile = {
  _id: "seed-profile",
  name: "Shahriar Srabon",
  displayName: "Srabon",
  role: "Full-Stack Developer (MERN)",
  tagline:
    "I build full-stack web apps with the MERN stack, with a focus on tools that solve real problems for people in Bangladesh.",
  /* avatarUrl is served from /public — will be replaced by Cloudinary URL in Phase 3 */
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
    funFact: "PLACEHOLDER — add your fun fact in the admin dashboard",
  },
  /* resumeUrl will point to Cloudinary once uploaded in Phase 3 */
  resumeUrl: undefined,
  resumeUpdatedAt: undefined,
  seoTitle: "Srabon — Full-Stack Developer (MERN)",
  seoDescription:
    "Full-stack developer (MERN · Next.js · TypeScript) building web apps that solve real problems for people in Bangladesh. Available for internships and junior roles.",
};

/* ─── Skills ───────────────────────────────────────────────────────── */
/* PRD §17.2 — MERN technologies lead each category */
export const seedSkills: Skill[] = [
  /* Frontend */
  { _id: "sk-react",      name: "React",       category: "frontend", order: 1 },
  { _id: "sk-nextjs",     name: "Next.js",      category: "frontend", order: 2 },
  { _id: "sk-ts",         name: "TypeScript",   category: "frontend", order: 3 },
  { _id: "sk-js",         name: "JavaScript",   category: "frontend", order: 4 },
  { _id: "sk-tailwind",   name: "Tailwind CSS", category: "frontend", order: 5 },
  { _id: "sk-html",       name: "HTML5",        category: "frontend", order: 6 },
  { _id: "sk-css",        name: "CSS3",         category: "frontend", order: 7 },

  /* Backend — MERN first */
  { _id: "sk-node",       name: "Node.js",      category: "backend",  order: 1 },
  { _id: "sk-express",    name: "Express",      category: "backend",  order: 2 },
  { _id: "sk-mongodb",    name: "MongoDB",      category: "backend",  order: 3 },
  { _id: "sk-rest",       name: "REST APIs",    category: "backend",  order: 4 },
  { _id: "sk-jwt",        name: "JWT auth",     category: "backend",  order: 5 },

  /* Tools */
  { _id: "sk-git",        name: "Git",          category: "tools",    order: 1 },
  { _id: "sk-github",     name: "GitHub",       category: "tools",    order: 2 },
  { _id: "sk-vscode",     name: "VS Code",      category: "tools",    order: 3 },
  { _id: "sk-vercel",     name: "Vercel",       category: "tools",    order: 4 },
  { _id: "sk-render",     name: "Render",       category: "tools",    order: 5 },
  { _id: "sk-linux",      name: "Linux",        category: "tools",    order: 6 },
  { _id: "sk-firebase",   name: "Firebase",     category: "tools",    order: 7 },

  /* ml-data — secondary row, shown smaller */
  { _id: "sk-python",     name: "Python",       category: "ml-data",  order: 1 },
  { _id: "sk-tf",         name: "TensorFlow",   category: "ml-data",  order: 2 },
  { _id: "sk-pytorch",    name: "PyTorch",      category: "ml-data",  order: 3 },
  { _id: "sk-sklearn",    name: "scikit-learn", category: "ml-data",  order: 4 },
  { _id: "sk-pandas",     name: "Pandas",       category: "ml-data",  order: 5 },
  { _id: "sk-numpy",      name: "NumPy",        category: "ml-data",  order: 6 },
  { _id: "sk-jupyter",    name: "Jupyter",      category: "ml-data",  order: 7 },
  { _id: "sk-sql",        name: "SQL",          category: "ml-data",  order: 8 },
  { _id: "sk-c",          name: "C",            category: "ml-data",  order: 9 },
  { _id: "sk-cpp",        name: "C++",          category: "ml-data",  order: 10 },
];

/* ─── Projects ─────────────────────────────────────────────────────── */
/* PRD §17.3 — Haal Khata is the standout project, listed first */
export const seedProjects: Project[] = [
  {
    _id: "proj-haalkhata",
    slug: "haal-khata",
    title: "Haal Khata (হাল খাতা)",
    tagline:
      "A voice-first digital ledger for Bangladesh's neighborhood shopkeepers — speaks Bangla, English, and Korean.",
    problem:
      "Small shopkeepers in Bangladesh track credit sales by hand in paper ledgers. These are easily lost, hard to query, and only work in one language. Haal Khata solves this with a voice-first, offline-ready app that works in the shopkeeper's own language.",
    features: [
      "Local rule-based voice extraction in Bangla, English, and Korean — no AI API in the voice path, so it works offline",
      "Multi-device sync via Neon Postgres and Vercel Edge Functions",
      "Email and Google sign-in with secure session management",
      "Grand prize winner at the KAIST international training program",
    ],
    stack: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Dexie (IndexedDB)", "Neon Postgres", "Vercel Edge Functions"],
    liveUrl: "https://haal-khata.vercel.app",
    repoUrl: "https://github.com/Srabon-bot/kaist-haalkhata",
    coverImage: undefined,      /* owner uploads screenshot in Phase 3 */
    screenshots: [],
    type: "full-stack",
    featured: true,
    order: 1,
    status: "published",
  },
  {
    _id: "proj-yutnori",
    slug: "yutnori-3d",
    title: "Yutnori 3D",
    tagline:
      "A 3D Korean board game (윷놀이) with an AI opponent, built with React Three Fiber — supporting English, Korean, and Bangla.",
    problem:
      "Yutnori is a traditional Korean game rarely available in digital form, and never with multilingual support for Bangladeshi players who encountered it during the KAIST program.",
    features: [
      "Full 3D board rendered with React Three Fiber (three.js wrapper for React)",
      "AI opponent with a complete rules engine, unit-tested for correctness",
      "English / Korean / Bangla language switching in-game",
      "Pure frontend — no backend or accounts (honest about scope)",
    ],
    stack: ["React", "TypeScript", "React Three Fiber", "Three.js", "Vite", "Tailwind CSS"],
    liveUrl: "https://yutnori-ten.vercel.app",
    repoUrl: "https://github.com/Srabon-bot/Vibe-coding-project-Korean-game-Yutnori-",
    coverImage: undefined,
    screenshots: [],
    type: "frontend",
    featured: true,
    order: 2,
    status: "published",
  },
  {
    _id: "proj-portfolio",
    slug: "srabon-portfolio",
    title: "This Portfolio (MERN CMS)",
    tagline:
      "A full-stack MERN portfolio with a private admin dashboard, GitHub import, contact inbox, and resume management.",
    problem:
      "Most developer portfolios are static sites that must be redeployed every time content changes. This portfolio is a full CMS: everything from project cards to the resume PDF is editable from a browser-based admin panel.",
    features: [
      "Next.js frontend on Vercel, Express REST API on Render, MongoDB Atlas database",
      "Private admin dashboard with JWT auth, project CRUD, and publish validation",
      "One-click GitHub repo import that prefills project fields from the API",
      "Cloudinary image and resume PDF uploads with automatic CDN delivery",
    ],
    stack: ["Next.js", "TypeScript", "Express", "MongoDB", "Mongoose", "JWT", "Cloudinary", "Tailwind CSS", "Framer Motion"],
    liveUrl: "PLACEHOLDER — add after deployment",
    repoUrl: "https://github.com/Srabon-bot/srabon-portfolio",
    coverImage: undefined,
    screenshots: [],
    type: "full-stack",
    featured: true,
    order: 3,
    status: "published",
  },
  {
    /* Slot 4 — owner decides. Left as a visible PLACEHOLDER. */
    _id: "proj-slot4",
    slug: "slot-4-placeholder",
    title: "PLACEHOLDER — Your 4th Project",
    tagline:
      "PLACEHOLDER — Best candidate: a MERN project with auth and roles (e.g. AquaGuard capstone). Add it in the admin dashboard.",
    problem: "PLACEHOLDER",
    features: ["PLACEHOLDER"],
    stack: ["PLACEHOLDER"],
    liveUrl: undefined,
    repoUrl: undefined,
    coverImage: undefined,
    screenshots: [],
    type: "full-stack",
    featured: true,
    order: 4,
    status: "draft",              /* draft — not published; visible on home for now in Phase 1 */
  },
];

/* ─── ML/Research projects (shown in the "Research and ML" strip) ─── */
export const seedMlProjects: Project[] = [
  {
    _id: "proj-flood-dataset",
    slug: "bangladesh-flood-dataset",
    title: "Bangladesh Flood Dataset",
    tagline: "Curated dataset for Bangladesh flood risk research and model training.",
    features: [],
    stack: ["Python", "Pandas"],
    repoUrl: "https://github.com/Srabon-bot/Bangladesh-flood-data-set",
    coverImage: undefined,
    screenshots: [],
    type: "ml-research",
    featured: false,
    order: 1,
    status: "published",
  },
  {
    _id: "proj-discharge",
    slug: "discharge-forecaster",
    title: "Discharge Forecaster",
    tagline: "Deep learning model for river discharge forecasting in Bangladesh.",
    features: [],
    stack: ["Python", "TensorFlow"],
    repoUrl: "https://github.com/Srabon-bot/Discharge-forecaster-model-for-Bangladesh",
    coverImage: undefined,
    screenshots: [],
    type: "ml-research",
    featured: false,
    order: 2,
    status: "published",
  },
  {
    _id: "proj-flood-classifier",
    slug: "flood-risk-classifier",
    title: "Flood Risk Classifier",
    tagline: "Machine learning classifier for Bangladesh flood risk zones.",
    features: [],
    stack: ["Python", "scikit-learn"],
    repoUrl: "https://github.com/Srabon-bot/Bangladesh-flood-risk-classifier-model",
    coverImage: undefined,
    screenshots: [],
    type: "ml-research",
    featured: false,
    order: 3,
    status: "published",
  },
  {
    _id: "proj-susceptibility",
    slug: "flood-susceptibility",
    title: "Flood Susceptibility Mapping",
    tagline: "Spatial ML model for Bangladesh flood susceptibility analysis.",
    features: [],
    stack: ["Python", "PyTorch"],
    repoUrl: "https://github.com/Srabon-bot/Bangladesh-flood-susceptibility",
    coverImage: undefined,
    screenshots: [],
    type: "ml-research",
    featured: false,
    order: 4,
    status: "published",
  },
];
