import type { Metadata } from "next";
import Link from "next/link";
import { getProfile } from "@/lib/api";

export const metadata: Metadata = {
  title: "Resume — Shahriar Srabon | Full-Stack Developer",
  description:
    "Curriculum Vitae and background of Shahriar Srabon, final-semester CSE student and MERN developer in Dhaka.",
};

export default async function ResumePage() {
  const profile = await getProfile();
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  const downloadUrl = profile.resumeUrl && profile.resumeUrl !== "/resume" ? profile.resumeUrl : `${apiBase}/resume`;

  return (
    <div className="min-h-screen py-12 px-4 md:px-8" style={{ background: "var(--color-bg)" }}>
      {/* Header bar */}
      <div className="max-w-4xl mx-auto flex items-center justify-between mb-8 pb-4 border-b" style={{ borderColor: "var(--color-border)" }}>
        <Link
          href="/"
          className="text-sm font-medium hover:text-accent-soft transition-colors"
          style={{ color: "var(--color-muted)" }}
        >
          ← Back to Portfolio
        </Link>
        <a
          href={downloadUrl}
          download="Shahriar_Srabon_Resume.pdf"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm text-white shadow-lg transition-transform hover:scale-105"
          style={{ background: "var(--color-accent)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download PDF
        </a>
      </div>

      {/* CV Paper Card Container */}
      <main
        className="max-w-4xl mx-auto rounded-2xl p-8 md:p-14 shadow-2xl border flex flex-col gap-10"
        style={{
          background: "var(--color-surface)",
          borderColor: "var(--color-border)",
        }}
      >
        {/* CV Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b" style={{ borderColor: "var(--color-border)" }}>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              Shahriar Srabon
            </h1>
            <p className="text-lg font-semibold" style={{ color: "var(--color-accent-soft)" }}>
              Full-Stack Developer (MERN)
            </p>
            <p className="text-sm max-w-md leading-relaxed" style={{ color: "var(--color-muted)" }}>
              {profile.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-2 text-xs md:text-sm md:text-right" style={{ color: "var(--color-muted)" }}>
            <p>📍 {profile.location}</p>
            <p>
              ✉️{" "}
              <a href={`mailto:${profile.email}`} className="hover:text-accent-soft transition-colors underline">
                {profile.email}
              </a>
            </p>
            <p>
              💻{" "}
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent-soft transition-colors underline">
                github.com/Srabon-bot
              </a>
            </p>
            <p>
              🔗{" "}
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent-soft transition-colors underline">
                LinkedIn Profile
              </a>
            </p>
          </div>
        </div>

        {/* 1. Education */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-accent-soft flex items-center gap-2">
            <span>🎓</span> Education
          </h2>
          <div className="flex flex-col gap-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <h3 className="text-base font-bold text-white">
                B.Sc. in Computer Science &amp; Engineering
              </h3>
              <span className="text-xs text-faint">March 2023 — January 2027 (Expected · Final Semester)</span>
            </div>
            <p className="text-sm" style={{ color: "var(--color-muted)" }}>
              University of Information Technology &amp; Sciences (UITS), Dhaka
            </p>
          </div>
        </section>

        {/* 2. Honors & Awards */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-accent-soft flex items-center gap-2">
            <span>🏆</span> Honors &amp; Awards
          </h2>
          <div className="p-4 rounded-xl flex flex-col gap-1.5" style={{ background: "var(--color-surface-2)", border: "1px solid var(--color-border)" }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <h3 className="text-base font-bold text-white">
                Grand Prize Winner — KAIST Global Training Program
              </h3>
              <span className="text-xs text-accent-soft font-semibold">First Place</span>
            </div>
            <p className="text-xs md:text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
              Awarded grand prize for developing <strong>Haal Khata</strong>, a voice-first credit ledger for local Bangladeshi shopkeepers supporting Bangla, English, and Korean voice inputs with local rule-based processing.
            </p>
          </div>
        </section>

        {/* 3. Technical Skills */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-accent-soft flex items-center gap-2">
            <span>🛠️</span> Technical Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-3.5 rounded-xl flex flex-col gap-1" style={{ background: "var(--color-surface-2)" }}>
              <span className="text-xs font-semibold text-faint uppercase">Frontend</span>
              <p className="text-white font-medium">React, Next.js, TypeScript, JavaScript, Tailwind CSS, HTML5, CSS3</p>
            </div>
            <div className="p-3.5 rounded-xl flex flex-col gap-1" style={{ background: "var(--color-surface-2)" }}>
              <span className="text-xs font-semibold text-faint uppercase">Backend (MERN)</span>
              <p className="text-white font-medium">Node.js, Express, MongoDB, REST APIs, JWT Authentication</p>
            </div>
            <div className="p-3.5 rounded-xl flex flex-col gap-1" style={{ background: "var(--color-surface-2)" }}>
              <span className="text-xs font-semibold text-faint uppercase">Tools &amp; Deployment</span>
              <p className="text-white font-medium">Git, GitHub, Vercel, Render, Linux, VS Code, Cloudinary</p>
            </div>
            <div className="p-3.5 rounded-xl flex flex-col gap-1" style={{ background: "var(--color-surface-2)" }}>
              <span className="text-xs font-semibold text-faint uppercase">ML &amp; Data Research</span>
              <p className="text-white font-medium">Python, TensorFlow, PyTorch, scikit-learn, Pandas, NumPy, SQL</p>
            </div>
          </div>
        </section>

        {/* 4. Featured Projects */}
        <section className="flex flex-col gap-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-accent-soft flex items-center gap-2">
            <span>💼</span> Featured Engineering Projects
          </h2>

          {/* Project 1 */}
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <h3 className="text-base font-bold text-white">
                Haal Khata (হাল খাতা) — Voice-First Digital Ledger
              </h3>
              <a
                href="https://haal-khata.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-accent-soft hover:underline font-semibold"
              >
                haal-khata.vercel.app ↗
              </a>
            </div>
            <p className="text-xs text-faint">
              Stack: React 19, TypeScript, Vite, Tailwind, Dexie (IndexedDB), Neon Postgres, Vercel Edge
            </p>
            <ul className="list-disc list-inside text-xs md:text-sm text-muted flex flex-col gap-1 mt-1">
              <li>Engineered offline-first voice bookkeeping for neighborhood shopkeepers.</li>
              <li>Local rule-based Bangla NLP extraction with zero external API latency.</li>
              <li>Grand prize winner at the KAIST Global Training Program.</li>
            </ul>
          </div>

          {/* Project 2 */}
          <div className="flex flex-col gap-1.5 pt-4 border-t" style={{ borderColor: "var(--color-border)" }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <h3 className="text-base font-bold text-white">
                MERN Portfolio &amp; Headless Admin CMS
              </h3>
              <span className="text-xs text-faint">Production MERN System</span>
            </div>
            <p className="text-xs text-faint">
              Stack: Next.js 16, Express, MongoDB Atlas, Node.js, TypeScript, Cloudinary, JWT
            </p>
            <ul className="list-disc list-inside text-xs md:text-sm text-muted flex flex-col gap-1 mt-1">
              <li>Architected headless MERN content management system with JWT auth and publish validation.</li>
              <li>One-click GitHub import and real-time link health checking pipeline.</li>
              <li>Strict accessibility compliance and responsive viewport optimizations.</li>
            </ul>
          </div>

          {/* Project 3 */}
          <div className="flex flex-col gap-1.5 pt-4 border-t" style={{ borderColor: "var(--color-border)" }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <h3 className="text-base font-bold text-white">
                3D Korean Yutnori Game Engine
              </h3>
              <a
                href="https://yutnori-ten.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-accent-soft hover:underline font-semibold"
              >
                yutnori-ten.vercel.app ↗
              </a>
            </div>
            <p className="text-xs text-faint">
              Stack: React, React Three Fiber, Three.js, TypeScript, Vite
            </p>
            <ul className="list-disc list-inside text-xs md:text-sm text-muted flex flex-col gap-1 mt-1">
              <li>Physics-based 3D collision simulation for stick throwing and pawn mechanics.</li>
              <li>Minimax algorithm for challenging AI opponent with test-covered rule engine.</li>
            </ul>
          </div>
        </section>

        {/* 5. Hydrological Research */}
        <section className="flex flex-col gap-3 pt-6 border-t" style={{ borderColor: "var(--color-border)" }}>
          <h2 className="text-sm font-bold uppercase tracking-widest text-accent-soft flex items-center gap-2">
            <span>🔬</span> Research &amp; Publications
          </h2>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-bold text-white">
              Deep Learning for River Basin Discharge &amp; Flood Risk Forecasting in Bangladesh
            </h3>
            <p className="text-xs text-faint">Research Projects • Python, TensorFlow, scikit-learn, GIS</p>
            <p className="text-xs md:text-sm leading-relaxed text-muted mt-1">
              Developed sequence-to-sequence LSTM forecasting models for northern Bangladesh river discharge basins and geospatial flood risk classification indices.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
