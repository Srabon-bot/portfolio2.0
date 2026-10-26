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
    name: "Shahriar Hossain Srabon",
    displayName: "Srabon",
    role: "Full-Stack Developer (MERN)",
    tagline:
      "I build full-stack web apps with the MERN stack, with a focus on tools that solve real problems for people in Bangladesh.",
    avatarUrl: "/avatar.jpg",
    photoUrl: "/avatar.jpg",
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
      funFact: "Developer by day, Madridista by heart. ⚽",
    },
    resumeUrl: "/Shahriar_Hossain_Srabon_Resume.pdf",
    resumeUpdatedAt: new Date(),
    seoTitle: "Shahriar Hossain Srabon — Full-Stack Developer (MERN)",
    seoDescription:
      "Portfolio of Shahriar Hossain Srabon, full-stack developer in Dhaka building MERN & Next.js applications.",
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
      tagline: "Voice-first digital ledger for Bangladesh's neighborhood shopkeepers — speaks Bangla, English, and Korean.",
      problem:
        "Over 4.5 million neighborhood mudi dokans in Bangladesh conduct 73%+ of sales on credit (baki), manually tracked in paper notebooks that are prone to loss, alteration, and disputes. Existing digital ledger apps require tedious typing that busy shopkeepers cannot do during fast-paced counter transactions.",
      description:
        "Haal Khata is an offline-first, voice-enabled credit ledger that lets shopkeepers record transactions by speaking naturally in Bangla, English, or Korean. It runs a 100% on-device rule-based extraction engine with zero external AI API latency or quotas. Won the grand prize at the KAIST global training program.",
      role: "Lead Full-Stack Developer",
      features: [
        "Voice-first transaction entry in Bangla, English, and Korean turning natural speech into structured ledger entries",
        "100% local on-device rule-based extraction engine with zero external AI API dependency, working fully offline",
        "Per-customer credit (baki) tracking, repayments ledger, and today / 7-day financial summaries",
        "Multi-device account sync powered by Neon Postgres and Vercel Edge Functions with soft-delete reconciliation",
        "Rooted in the 430-year-old Bengali Pohela Boishakh red-book debt reconciliation ritual ('Why Haal Khata?')",
      ],
      stack: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Dexie (IndexedDB)", "Neon Postgres", "Vercel Edge Functions", "Gemini API"],
      liveUrl: "https://haal-khata.vercel.app",
      repoUrl: "https://github.com/Srabon-bot/kaist-haalkhata",
      coverImage: "/projects/haalkhata/landing.png",
      screenshots: [
        "/projects/haalkhata/landing.png",
        "/projects/haalkhata/today-ledger.png",
        "/projects/haalkhata/voice-entry.png",
        "/projects/haalkhata/customers.png",
        "/projects/haalkhata/summary.png",
        "/projects/haalkhata/history.png",
        "/projects/haalkhata/haal-khata-ritual.png",
      ],
      setupInstructions:
        "1. Clone repo: `git clone https://github.com/Srabon-bot/kaist-haalkhata.git`\n2. Install: `npm install`\n3. Configure `.env` with `DATABASE_URL` (Neon Postgres) and `SESSION_SECRET`\n4. Initialize database schema: `psql $DATABASE_URL -f db/schema.sql`\n5. Run dev: `npm run dev` (voice entry works fully offline with zero API needed)",
      improvements:
        "Add dialect-adaptive acoustic model for regional Chittagonian and Sylheti accents, and integrate native Bluetooth thermal receipt printer support.",
      type: "full-stack",
      featured: true,
      order: 1,
      status: "published",
      source: { type: "github", owner: "Srabon-bot", repo: "kaist-haalkhata" },
    },
    {
      slug: "fitlog",
      title: "FitLog 🏋️",
      tagline: "A dark, no-nonsense workout library and daily session planner with real-time session metrics.",
      problem:
        "Fitness enthusiasts and lifters often struggle with cluttered workout apps filled with intrusive ads, complex signups, and bloated menus. They need a fast, responsive interface to explore exercises across muscle groups, curate a focused daily workout, and track combined duration and calories in real time.",
      description:
        "FitLog is an exercise library and daily session planning application built with Next.js 16, React 19, and Tailwind CSS. It empowers users to explore muscle-specific movements, review step-by-step form cues, construct capped daily workout routines, and track live duration and calorie metrics with local persistence.",
      role: "Frontend / Full-Stack Engineer",
      features: [
        "Curated exercise library covering all major muscle groups with difficulty ratings, equipment tags, and step-by-step instructions",
        "Interactive 'Today's Plan' session builder capped at 5 lifts with instant progress check-offs and state management",
        "Live session analytics calculating total planned exercises, combined minutes, and estimated calories burned in real time",
        "Dedicated 'Saved' list allowing lifters to bookmark upcoming lifts to swap into future training sessions",
        "Instant muscle group search, numeric sorting by duration and calories, and zero-loss local storage persistence",
      ],
      stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "DaisyUI", "Lucide React"],
      liveUrl: "https://assignment-6-fit-log-weld.vercel.app",
      repoUrl: "https://github.com/Srabon-bot/FitLog",
      coverImage: "/projects/fitlog/home.png",
      screenshots: [
        "/projects/fitlog/home.png",
        "/projects/fitlog/library.png",
        "/projects/fitlog/workout-details.png",
        "/projects/fitlog/my-plan.png",
        "/projects/fitlog/saved.png",
      ],
      setupInstructions:
        "1. Clone the repository: `git clone https://github.com/Srabon-bot/FitLog.git`\n2. Install dependencies: `npm install`\n3. Start the Next.js development server: `npm run dev`\n4. Open http://localhost:3000 in your browser",
      improvements:
        "Integrate RESTful workout history logging to MongoDB Atlas, add custom exercise creator forms with video demos, and build automated superset pairing suggestions.",
      type: "frontend",
      featured: true,
      order: 2,
      status: "published",
      source: { type: "github", owner: "Srabon-bot", repo: "FitLog" },
    },
    {
      slug: "yutnori-3d",
      title: "Yutnori (윷놀이) 3D",
      tagline: "A 3D, browser-based version of the traditional Korean board game with physics, AI, and multi-language support.",
      problem:
        "Traditional cultural board games like Yutnori (윷놀이) are rarely available digitally with tactile 3D physics, authentic Korean rule completeness, or accessible multi-language support (English, 한국어, and বাংলা) for international players.",
      description:
        "A browser-based 3D implementation of the traditional Korean board game Yutnori built with React, React Three Fiber, Three.js, Zustand, and Vitest. Features a pure, isolated TypeScript rules engine, 3-difficulty heuristic AI opponent, pass-and-play local multiplayer, animated yut stick throws, synthesized Web Audio sound effects, and multilingual support.",
      role: "3D Graphics & Frontend Engineer",
      features: [
        "Complete traditional rules engine: Do/Gae/Geol/Yut/Mo, Back-do, bonus throws, capturing, stacking, and center shortcuts",
        "3D board and animated yut sticks toss with physics flip animation and hover-to-preview landing path indicators",
        "Intelligent heuristic AI opponent with 3 difficulty modes (Easy, Medium, Hard) plus local pass-and-play on one device",
        "Full trilingual localization across all screens and tutorials in English, Korean (한국어), and Bangla (বাংলা)",
        "Zero-backend architecture with synthesized Web Audio sound effects, custom character creator, and 100% test coverage via Vitest",
      ],
      stack: ["React", "TypeScript", "React Three Fiber", "Three.js", "Zustand", "Vite", "Vitest"],
      liveUrl: "https://yutnori-ten.vercel.app",
      repoUrl: "https://github.com/Srabon-bot/yutnori-game",
      coverImage: "/projects/yutnori/home.png",
      screenshots: [
        "/projects/yutnori/home.png",
        "/projects/yutnori/how-to-play.png",
        "/projects/yutnori/gameplay.png",
        "/projects/yutnori/yut-throw.png",
      ],
      setupInstructions:
        "1. Clone: `git clone https://github.com/Srabon-bot/yutnori-game.git`\n2. Run: `npm install && npm run dev`\n3. Run tests: `npm test`",
      improvements:
        "Add WebRTC peer-to-peer multiplayer mode, customizable 3D board textures, and ranked online leaderboards.",
      type: "frontend",
      featured: true,
      order: 3,
      status: "published",
      source: { type: "github", owner: "Srabon-bot", repo: "yutnori-game" },
    },
    {
      slug: "bazardor",
      title: "BazarDor (বাজার দর)",
      tagline: "A modern commodity and grocery price tracking web application for Bangladesh.",
      problem:
        "Commodity and grocery prices in Bangladesh fluctuate frequently across various wholesale and retail markets. Everyday consumers lack transparent, centralized access to daily market rates and trends, making household budgeting difficult and leaving them susceptible to arbitrary retail markups.",
      description:
        "BazarDor (বাজার দর) empowers consumers across Bangladesh with transparent daily commodity pricing, dynamic native Bangla calendar date, category-wise price trackers, and market-by-market comparison tables across wholesale and retail hubs.",
      role: "Lead Full-Stack Developer",
      features: [
        "Real-time commodity price marquee ticker & dynamic Bangla calendar date formatted natively for Bangladesh Standard Time",
        "Daily price risers and fallers breakdown ('আজ দাম বেড়েছে ▲' / 'দাম কমেছে ▼') highlighting top market movements",
        "Category-wise product catalog (Rice, Oil, Vegetables, Meat, Fish) with multi-criteria price sorting (Low to High, High to Low)",
        "Protected product deep-dive with minimum, maximum, and average rates plus market-wise price comparison table",
        "Secure multi-provider authentication via Better Auth supporting email/password, Google, and GitHub OAuth",
      ],
      stack: ["Next.js", "React 19", "TypeScript", "MongoDB", "Better Auth", "Tailwind CSS", "DaisyUI"],
      liveUrl: "https://assignment-7-kw2m.vercel.app",
      repoUrl: "https://github.com/Srabon-bot/BazarDor",
      coverImage: "/projects/bazardor/home.png",
      screenshots: [
        "/projects/bazardor/home.png",
        "/projects/bazardor/category.png",
        "/projects/bazardor/product-details.png",
        "/projects/bazardor/signin.png",
      ],
      setupInstructions:
        "1. Clone repo: `git clone https://github.com/Srabon-bot/BazarDor.git`\n2. Install: `npm install`\n3. Configure `.env.local` with `MONGODB_URI`, `BETTER_AUTH_SECRET`, and OAuth keys\n4. Start dev server: `npm run dev`",
      improvements:
        "Implement crowdsourced verified community price reports, automated SMS alerts for essential staples when prices spike beyond threshold, and predictive trend charts using historical seasonal market data.",
      type: "full-stack",
      featured: true,
      order: 4,
      status: "published",
      source: { type: "github", owner: "Srabon-bot", repo: "BazarDor" },
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
