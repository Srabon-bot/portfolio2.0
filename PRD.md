# PRD: Srabon's Developer Portfolio

> Instructions for Antigravity (AI coding agent). Read this whole file before writing code. Build in the phases listed in section 14, and stop at each checkpoint so the owner can review.

---

## 1. Product summary

A dark, blackish-purple developer portfolio that makes a recruiter want to interview the owner within 30 seconds. It copies the **structure, fonts and design style** of the reference site <https://kenjimmy.xyz/> but uses its own dark purple theme and adds everything the owner's teachers require.

The site is **dynamic**: the owner updates projects, skills, bio, resume and contact info from a private admin dashboard. Nothing important is hard-coded. Projects can be imported from a GitHub repo URL.

**Owner:** Shahriar Srabon (goes by Srabon), final-semester B.Sc. CSE student at UITS, Dhaka, Bangladesh. GitHub: `Srabon-bot`. Real profile data and project facts are in **section 17**; use them as seed content.
**Positioning:** **Full-stack developer, MERN first** (MongoDB, Express, React/Next.js, Node, TypeScript). Machine learning and flood-research work is a **secondary** strength shown in a smaller "Research and ML" strip, never in the hero or the featured project cards. Interested in culturally rooted tech with local Bangladeshi impact.
**Primary audience:** Recruiters and hiring managers for intern and junior full-stack roles (Bangladesh and remote). They often browse on phones.
**Primary goal:** Get the visitor to open a project, download the resume, or send a message.

---

## 2. Teacher requirements (must all be satisfied)

These come from the owner's course slides. Treat them as acceptance criteria.

### 2.1 Six required sections
| # | Section | Requirement |
|---|---------|-------------|
| 1 | Hero intro | Name, role, one-line value statement, above the fold |
| 2 | About | Story, background, what makes the owner different |
| 3 | Skills | Technologies **grouped** clearly: frontend, backend, tools |
| 4 | Projects | **3 to 4** strong projects, each with live link and screenshots |
| 5 | Contact | Email, LinkedIn, GitHub. Easy to find, easy to use |
| 6 | Resume | One-click download of an up-to-date PDF |

### 2.2 Project quality rules
- Solve a real, specific problem, not a tutorial clone.
- Show full-stack range: frontend, backend, database, auth.
- Depth over quantity. Never feature more than 4 projects on the home page.
- Every project must be deployed, mobile-friendly and explainable by the owner in an interview.

### 2.3 Every project case study uses the 5-section README structure
1. **Title and value statement**: one sentence on what it does and who it is for.
2. **Live demo and screenshots**: clickable link plus screenshots or a short GIF.
3. **Tech stack and features**: technologies plus 3 to 4 key features.
4. **Setup instructions**: steps that work if someone clones the repo today.
5. **What I would improve**: shows self-awareness and a growth mindset.

### 2.4 GitHub checklist (documented in `docs/`, not coded)
Profile photo and short bio, 4 to 6 pinned repositories, a profile README, no empty or "test" repos visible. Each repo gets the 5-section README.

### 2.5 Deployment (free tier, MERN)
- Frontend: Vercel (or Netlify)
- Backend: Render (or Railway)
- Database: MongoDB Atlas free tier
- Domain: custom domain is optional but adds credibility

### 2.6 The 8 mistakes the site must NOT have
1. Broken links or half-finished projects
2. Copy-pasted tutorial projects, unchanged
3. No live demo, only source code
4. Outdated info, typos or dead contact links
5. No README, or a README with no screenshots
6. Generic design copied from a template, untouched
7. Too many weak projects, no standout project
8. Portfolio link missing from resume and LinkedIn

Build features that make these hard to commit (see section 9: link checker, "featured" flag, publish validation).

---

## 3. Audit and structure decision

Research on portfolio architecture shows two common options: a single scrolling page, or multi-page with individual case-study pages. Recruiters spend only seconds to a few minutes per portfolio, scan for impact rather than reading, and often browse on mobile.

**Decision: hybrid structure.**
- **Home (`/`)**: one scrolling page with all six required sections, so a recruiter gets everything in one scroll (this also matches the reference site).
- **Case studies (`/projects/[slug]`)**: one page per project holding the 5-section README structure, so the home page stays short and skimmable.
- **Resume (`/resume`)**: an HTML preview of the resume with a prominent PDF download button.
- **Admin (`/admin/*`)**: private dashboard, not indexed.
- **Optional later (Phase 5): `/shelf`**: the reference site's "Shelf" page (certificates, achievements, books, tools). Do not build it until the owner asks.

Reasons: a single page for the 30-second scan, separate case-study pages for depth, and the "projects with README, live link, screenshots" requirement fits naturally on the case-study page.

---

## 4. Tech stack (decided)

| Layer | Choice |
|-------|--------|
| Frontend | Next.js (App Router), React, TypeScript, Tailwind CSS |
| UI library | **Public site: custom components only** (design fidelity). **Admin dashboard: HeroUI** for tables, modals and forms. Verify HeroUI's current compatibility with the installed Tailwind version in its docs before installing; if incompatible, use plain Tailwind for admin too. Do not use DaisyUI. |
| Animation | Framer Motion, subtle only |
| Backend | Node.js + Express (TypeScript) REST API |
| Database | MongoDB Atlas with Mongoose |
| Auth | Single admin user, JWT in an httpOnly cookie, bcrypt password hash |
| Validation | Zod on client and server |
| File storage | Cloudinary free tier for images and the resume PDF |
| Email (contact form) | Nodemailer with a Gmail app password, or Resend. Messages are always saved to the database too. |
| Fonts | Roboto via `next/font/google` (weights 400, 500, 700, 900). The reference uses a Roboto-style sans. Match its feel. |

Use current stable versions. Check each library's docs before using an API from memory.

### Repo layout (monorepo, two deployables)
```
portfolio/
  web/            Next.js app (Vercel)
  server/         Express API (Render)
  docs/           Guides (see section 12)
  PRD.md
  README.md
```

---

## 5. Design system

### 5.1 Principles
- Copy the **reference layout and rhythm**: slim top bar, left vertical social rail, hero with text left and large illustrated avatar right, section headings with a short accent underline, soft rounded cards, project thumbnail grid, a README-style About card, a multi-segment footer strip.
- Copy the signature detail: **a soft circle blob offset behind buttons** ("Download resume", "See my works"). Recolor it purple.
- Do not use a purchased or untouched template. Everything is custom code.
- Dark mode only. No light-mode toggle in v1.

### 5.2 Color tokens (define as CSS variables and Tailwind theme colors)
| Token | Hex | Use |
|-------|-----|-----|
| `bg` | `#0B0714` | Page background (blackish purple) |
| `surface` | `#140E22` | Cards |
| `surface-2` | `#1C1330` | Chips, inputs, image placeholders |
| `border` | `#2A1F45` | Card and input borders |
| `text` | `#EDE9F7` | Primary text |
| `muted` | `#A79CC4` | Secondary text |
| `faint` | `#6F6490` | Captions, footer text |
| `accent` | `#8B5CF6` | Links, underlines, active states |
| `accent-soft` | `#A78BFA` | Role label, link hover |
| `blob` | `#5B2FC9` at 75% opacity | Circle behind buttons |
| `strip` | `#5B2FC9`, `#8B5CF6`, `#C4B5FD`, `#3B2A7A` | Four-segment footer strip |

Text contrast must meet WCAG AA against its background.

### 5.3 Typography
- Hero name: uppercase or wide-tracked (letter-spacing about 0.2em), weight 500 to 700, large.
- Role label: small caps style, letter-spacing about 0.15em, `accent-soft`.
- Section headings: weight 700, with a 34px by 3px `accent` underline bar below.
- Body: 16px on mobile, weight 400, line-height 1.6.

### 5.4 Components
- **BlobButton**: text button with an offset circular blob behind the leading edge. Hover moves the blob slightly. Focus ring visible.
- **SectionHeading**: title + accent underline + optional subtitle.
- **Card**: `surface`, 1px `border`, radius 12 to 16px, soft shadow. Hover lifts 2px and brightens the border.
- **Chip**: small rounded tag in `surface-2`.
- **ProjectCard**: cover image, title, one-line problem, stack chips, "Live demo" and "Code" links, links to the case-study page.
- **SocialRail**: vertical icons (LinkedIn, GitHub, email) fixed on the left on desktop, moved into the footer on mobile.
- **FooterStrip**: four colored segments, then a row of links and copyright.

### 5.5 Motion
- Subtle fade-and-rise on scroll for sections and cards, hover transitions, a gentle blob movement.
- **Critical:** content must be visible without JavaScript and must never render as a blank area (the reference site's skills section can appear empty when its scroll animation fails). Use Framer Motion `whileInView` with an initial state that still shows content if the animation never fires, and respect `prefers-reduced-motion`.

### 5.6 Responsive rules
- Mobile first. Test at 360px, 768px, 1280px.
- Hero stacks on mobile: avatar above or below text, never clipped.
- Project grid: 1 column on mobile, 2 on tablet and up.
- Touch targets at least 44px. No horizontal scroll at any width.

---

## 6. Home page spec (`/`)

Order top to bottom. All text comes from the database (section 7), with placeholders from the seed script on first run.

1. **Top bar**: logo or initials, email, nav links (About, Skills, Works, Contact), "Resume" link highlighted. Sticky on scroll with a subtle blur-free solid background.
2. **Hero**: "It's me" speech-bubble tag, name, role (e.g. FULL-STACK DEVELOPER), one-line value statement, a **`Download resume` BlobButton** (in the same position and the same size as the reference's "Let's talk" button; one click downloads the current PDF via `GET /api/resume`, with a download icon and no page navigation), large illustrated avatar on the right. There is **no "Let's talk" button**; contact is reached through the top bar link and the Contact section.
3. **About** (README-style card): photo, short "currently" list (Building, Learning, Fun fact), 2 to 3 short paragraphs. Include a line about building culturally rooted tech with local impact.
4. **Skills**: three grouped cards (Frontend, Backend, Tools) with chips. Grouping must be clear. MERN technologies lead each card. A slim, lower-emphasis row labelled "Also: ML and data" shows the `ml-data` skills. Order and contents managed in admin.
5. **Projects ("My works")**: grid of up to 4 featured ProjectCards (types `full-stack` or `frontend` only) plus a "View all projects" link if more exist. Below it, a compact **"Research and ML"** strip lists `ml-research` projects as small text cards (title, one line, repo link) with no screenshot requirement, so they support the profile without competing with the MERN work.
6. **Contact ("Keep in touch")**: email, LinkedIn, GitHub, location, plus a working contact form (name, email, message, honeypot field). Show success and error states. Show a loading state because the free-tier API can be slow to wake.
7. **Footer**: four-segment strip, links, copyright.

---

## 7. Data models (Mongoose)

**Admin** `{ email, passwordHash }` (single document, created by a seed script from env vars).

**Profile** (singleton) `{ name, role, tagline, avatarUrl, photoUrl, location, email, linkedin, github, twitter?, telegram?, instagram?, aboutParagraphs[], currently: { building, learning, funFact }, resumeUrl, resumeUpdatedAt, seoTitle, seoDescription }`

**Skill** `{ name, category: 'frontend' | 'backend' | 'tools' | 'ml-data', icon?, order }`  (`ml-data` is shown in a smaller secondary row, see section 6)

**Project**
```
{
  slug (unique), title, tagline,            // tagline = value statement, one sentence
  problem, description,
  role,                                     // owner's role
  features[] (3-4 recommended),
  stack[],
  liveUrl, repoUrl,
  coverImage, screenshots[],                // Cloudinary URLs
  setupInstructions (markdown),
  improvements (markdown),                  // "What I would improve"
  type: 'full-stack' | 'frontend' | 'ml-research',   // only 'full-stack' and 'frontend' can be featured
  featured (bool), order, status: 'draft' | 'published',
  source: { type: 'manual' | 'github', owner?, repo?, lastSyncedAt? },
  linkStatus: { live: 'ok' | 'broken' | 'unknown', checkedAt }
}
```

**Message** `{ name, email, message, read, createdAt, ip hash }`

---

## 8. API (Express, all under `/api`)

Public (read-only, cacheable):
- `GET /profile`
- `GET /skills`
- `GET /projects` (published only), `GET /projects/:slug`
- `POST /contact` (rate limited, validated, honeypot, saves + emails)
- `GET /resume` redirects to the PDF URL (so the download link never breaks)

Admin (requires auth cookie):
- `POST /auth/login`, `POST /auth/logout`, `GET /auth/me`
- `PUT /profile`
- CRUD: `/admin/skills`, `/admin/projects`
- `POST /admin/projects/import-github` (see section 10)
- `POST /admin/projects/:id/sync-github`
- `POST /admin/upload` (images and resume PDF to Cloudinary, with type and size limits)
- `GET /admin/messages`, `PATCH /admin/messages/:id` (mark read), `DELETE`
- `POST /admin/check-links` (checks every project's live URL and repo URL)

Security: Helmet, CORS limited to the web origin, express-rate-limit (stricter on login and contact), Zod validation on every body, bcrypt, secure httpOnly SameSite cookies, no secrets in the repo, generic error messages. Never return `passwordHash`.

---

## 9. Admin dashboard (`/admin`, `noindex`)

Pages: Login, Overview, Profile, Skills, Projects (list, create, edit), Messages, Settings.

Features:
- Edit everything on the home page without touching code.
- Drag or numeric ordering for skills and projects. "Featured" toggle (max 4 allowed; show a warning at 5).
- Image uploads with preview. Resume PDF upload with "last updated" date.
- **Publish validation** for a project: block publishing unless it has a title, value statement, at least 1 screenshot, a live URL, a repo URL, setup instructions and an "improvements" section. This enforces the teacher rules and the 8 mistakes. For `ml-research` projects the rules are relaxed: title, one-line summary and repo URL are enough, and they can never be featured.
- **Link checker** button and a weekly warning banner for any broken live or repo link.
- After every save, trigger on-demand revalidation of the public pages so changes appear immediately.
- Add placeholder content visibly flagged "PLACEHOLDER" so it is never left live by accident. The publish validation also blocks the literal word "PLACEHOLDER" or "Lorem ipsum" in published fields.

---

## 10. Add projects from GitHub (feature + guide)

### 10.1 Import flow
1. In admin, click **Add project, then Import from GitHub**, paste `https://github.com/<owner>/<repo>`.
2. Server calls the GitHub REST API (`/repos/{owner}/{repo}`, `/languages`, `/topics`, and the README endpoint). Use an optional `GITHUB_TOKEN` env var to avoid the unauthenticated rate limit. Handle 404, private repos and rate-limit errors with clear messages.
3. Server returns a **draft, not a saved project**, prefilled as:
   - `title`: humanized repo name
   - `tagline`: repo description
   - `repoUrl`: repo URL
   - `liveUrl`: repo homepage field if set
   - `stack`: topics + top languages
   - `setupInstructions`: the README's install/setup section if detectable, else the full README
   - `improvements`, `problem`, `features`: left empty for the owner
4. The owner reviews, uploads screenshots, fills the empty fields, then publishes.
5. **Sync** button re-fetches description, topics and languages without overwriting fields the owner edited by hand.

### 10.2 Documentation Antigravity must write
Create `docs/ADD_PROJECTS_FROM_GITHUB.md` explaining, with screenshots or clear steps:
- How to prepare a repo (description, topics, homepage URL, 5-section README).
- How to import, review and publish a project.
- How to attach screenshots and fix a failing link.
- How to feature and reorder projects.
- Common errors and fixes.

---

## 11. SEO, performance, accessibility

- Per-page metadata, Open Graph image, Twitter card, `sitemap.xml`, `robots.txt` (disallow `/admin`), JSON-LD `Person` schema, canonical URLs.
- `next/image` for all images, lazy loading, correct sizes, WebP/AVIF.
- Public pages server-rendered or ISR (`revalidate` about 60s) with on-demand revalidation. **Do not fetch the free-tier API on every visit**, because Render free instances sleep and the first request can take a long time. Include a static JSON fallback of the last good data so the home page never shows a blank section if the API is asleep.
- Target Lighthouse 90+ for Performance, Accessibility, Best Practices and SEO on mobile.
- Semantic HTML, keyboard navigation, visible focus, alt text for every image, `prefers-reduced-motion` respected.

---

## 12. Documentation deliverables

- `README.md` for the portfolio repo itself, using the 5-section structure, with live link and screenshots (the portfolio is also a project).
- `docs/ADD_PROJECTS_FROM_GITHUB.md` (section 10.2)
- `docs/ADMIN_GUIDE.md`: logging in, editing content, uploading the resume, reading messages.
- `docs/DEPLOYMENT.md`: step-by-step for MongoDB Atlas, Render (API), Vercel (web), environment variables, CORS, custom domain, and cold-start notes.
- `docs/GITHUB_PROFILE_CHECKLIST.md`: pin 4 to 6 repos, profile README template with intro and tech stack, photo and bio, remove empty or test repos, 5-section README template for every repo.
- `docs/LAUNCH_CHECKLIST.md`: copy of section 15 plus "add the portfolio link to resume, LinkedIn and GitHub".

---

## 13. Environment variables

`server/.env.example` and `web/.env.example` must be committed with names only, never values:

```
# server
MONGODB_URI=
JWT_SECRET=
ADMIN_EMAIL=
ADMIN_PASSWORD=            # used only by the seed script
CLIENT_ORIGIN=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
GITHUB_TOKEN=              # optional
SMTP_USER=
SMTP_PASS=
CONTACT_TO_EMAIL=
REVALIDATE_SECRET=

# web
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_SITE_URL=
REVALIDATE_SECRET=
```

Add `.env*` to `.gitignore`. Never commit secrets.

---

## 14. Build phases (stop at each checkpoint)

**Phase 1: Foundation.** Monorepo, Next.js + Tailwind + TypeScript, design tokens, Roboto, base components, and the static home page with placeholder content. **Checkpoint:** owner reviews the look against the reference and the mockup.

**Phase 2: Backend.** Express API, Mongoose models, seed script (placeholder profile, skills, 4 placeholder projects marked PLACEHOLDER), public endpoints, contact form, resume redirect. **Checkpoint:** home page reads live data.

**Phase 3: Admin.** Auth, dashboard, CRUD, uploads, publish validation, messages, link checker. **Checkpoint:** owner edits content from the browser.

**Phase 4: GitHub import and case studies.** Import and sync endpoints, `/projects/[slug]` page with the 5-section structure, `/resume` page. **Checkpoint:** owner imports one real repo end to end.

**Phase 5: Polish and launch.** SEO, performance, accessibility, animations, docs, deployment to Vercel + Render + Atlas, custom domain (optional). Optional `/shelf` page only on request.

---

## 15. Definition of done (acceptance checklist)

- [ ] All six required sections exist on the home page and read from the database.
- [ ] Skills are grouped as frontend, backend and tools.
- [ ] 3 to 4 featured projects, each with live link, repo link and screenshots, and none still marked PLACEHOLDER.
- [ ] Each project case study has all 5 README sections.
- [ ] At least one standout project has auth, real data and roles.
- [ ] The hero "Download resume" button downloads the latest PDF in one click, and no second resume button exists lower on the home page.
- [ ] Contact form works end to end and messages appear in admin.
- [ ] No broken links (link checker passes), no typos, no dead contact links.
- [ ] Design is custom, dark blackish-purple, matches the reference structure and fonts feel, and is not an untouched template.
- [ ] Mobile layout verified at 360px with no horizontal scroll and no blank sections.
- [ ] Lighthouse 90+ on mobile for all four categories.
- [ ] Deployed: Vercel (web), Render (API), MongoDB Atlas (database). Cold-start fallback tested.
- [ ] `/admin` is protected, noindex, and rate limited; no secrets in the repo.
- [ ] All docs in section 12 exist and are accurate.
- [ ] Portfolio link added to resume, LinkedIn and GitHub profile.

---

## 16. Rules for Antigravity

1. Ask the owner when something is ambiguous. Do not invent personal details, project claims or contact info. Use clearly marked placeholders.
2. Explain each phase's code briefly in comments or docs, because the owner must be able to explain every line in an interview.
3. Prefer simple, readable code over clever abstractions.
4. Verify library APIs against current documentation rather than relying on memory.
5. Never store the owner's secrets, student ID or other personal identifiers in code, seeds or docs.
6. Keep every change small enough to review; commit with clear messages per phase.
7. Keep the site MERN-first in every visible choice: copy, ordering, featured slots and the "How this site is built" panel (section 17.5).
8. Use the real contact and profile data in section 17 for seeding. Mark only unknown fields as placeholders.

---

## 17. Owner content from GitHub (seed data and findings)

Source: <https://github.com/Srabon-bot> and its repos. Treat this as the starting content. The owner confirms or edits everything in the admin dashboard.

### 17.1 Profile seed
| Field | Value |
|-------|-------|
| Name | Shahriar Srabon (display "Srabon") |
| Role | Full-stack developer (MERN) |
| University | University of Information Technology and Sciences (UITS), Dhaka |
| Location | Dhaka, Bangladesh |
| Email | srabon361@gmail.com |
| LinkedIn | https://www.linkedin.com/in/shahriar-hossain-b0589a402/ |
| GitHub | https://github.com/Srabon-bot |
| Instagram | https://www.instagram.com/its_srabon_here_/ (optional, owner decides whether to show it) |
| Facebook | owner decides; default is not shown on a recruiter-facing site |
| Avatar | GitHub avatar is a stand-in until the owner supplies an illustrated avatar and a photo |

**Draft tagline (owner edits):** "I build full-stack web apps with the MERN stack, with a focus on tools that solve real problems for people in Bangladesh."

**About draft (owner edits):** final-semester CSE student; builds MERN and Next.js apps; won the grand prize at the KAIST training program with a voice-first ledger app for local shopkeepers; also researches deep learning for flood forecasting in Bangladesh (one short sentence, secondary).

**"Currently" list:** Building: this portfolio and its MERN admin CMS. Learning: Next.js and modern full-stack patterns. Fun fact: owner supplies.

### 17.2 Skills seed (grouped; MERN first)
- **Frontend:** React, Next.js, TypeScript, JavaScript, Tailwind CSS, HTML5, CSS3
- **Backend:** Node.js, Express, MongoDB, REST APIs, JWT auth
- **Tools:** Git, GitHub, VS Code, Vercel, Render, Linux, Firebase
- **ml-data (secondary row):** Python, TensorFlow, PyTorch, scikit-learn, Pandas, NumPy, Jupyter, SQL, C, C++

Only list skills the owner can defend in an interview. Express, MongoDB, JWT and Render appear here because they are required for this portfolio's own build; the owner should confirm they are comfortable listing them, or remove any that are not yet true after Phase 3.

### 17.3 Project seed (create as drafts; owner completes the empty fields)
| Repo | Type | Seed facts | Notes |
|------|------|-----------|-------|
| `kaist-haalkhata` (Haal Khata, Bangla: হাল খাতা) | full-stack | Voice-first bookkeeper for Bangladesh's mudi dokans; speaks Bangla, English and Korean; grand prize at the KAIST program. Live: https://haal-khata.vercel.app. Stack in README: React 19, TypeScript, Vite, Tailwind, Dexie (IndexedDB), Neon Postgres, Vercel Edge Functions, email and Google sign-in, multi-device sync. Local rule-based voice extraction, no AI API in the voice path. | **Standout project.** Real problem, auth, real data, offline-first, deployed. The README already has a strong problem statement. |
| This portfolio (new repo) | full-stack | MERN + Next.js CMS with admin auth, GitHub import, contact inbox, resume upload | The MERN flagship. Feature it once live. |
| `Vibe-coding-project-Korean-game-Yutnori-` | frontend | 3D Yutnori board game with React Three Fiber, rules engine with unit tests, AI opponent, English/Korean/Bangla. Live: https://yutnori-ten.vercel.app | Shows frontend and engineering depth. README states "no backend, no accounts", so be honest about that in the case study. |
| `Sholo-Guti_6_U222_U224_U202`, `camera-control-maze` | frontend | Two games from the KAIST program (a traditional Bangladeshi game; a hand-gesture camera game) | Candidates for the 4th slot or the "View all projects" list. Need live links and READMEs first. |
| Slot 4 | owner decides | | Best option: a MERN project with auth and roles. Candidate if it has a web dashboard: the AquaGuard capstone. |
| `Bangladesh-flood-data-set`, `Discharge-forecaster-model-for-Bangladesh`, `Bangladesh-flood-risk-classifier-model`, `Bangladesh-flood-susceptibility` | ml-research | Flood research and ML models for Bangladesh | Show only in the "Research and ML" strip. |

Do not invent project claims. Anything not in the table or the repo README stays empty for the owner to fill.

### 17.4 Findings: gaps against the teacher rules and the MERN focus
1. **No featured project is MERN today.** Haal Khata is React + Vite + Neon Postgres, and Yutnori has no backend. The portfolio itself is therefore the main MERN proof, and the owner should consider building one more MERN project (auth, roles, real data) for slot 4.
2. **GitHub positioning conflicts with the goal.** The profile bio reads "ML Engineer and Aspiring Full-Stack Developer" and the profile README leads with ML. Change both to full-stack first.
3. **Pinned repos are not ideal.** The pinned "Portfolio" repo is plain HTML with no description. Replace it with the new MERN portfolio repo and archive or rename the old one. Also pin Haal Khata first and the Yutnori game; the two ML notebook repos should not be pinned.
4. **Possible broken link.** The Haal Khata README's "Source" badge points to a repo named `kaist-lalkhata`, while the repo is `kaist-haalkhata`. Verify it and fix it. This matches the teacher's "broken links" mistake.
5. **Repo names hurt first impressions.** `Sholo-Guti_6_U222_U224_U202` and `Vibe-coding-project-Korean-game-Yutnori-` (trailing hyphen) should be renamed to clean names such as `sholo-guti` and `yutnori-3d`. GitHub redirects old URLs, but update every link and the seed data after renaming.
6. **Several repos lack descriptions and screenshots** (for example the Simulation-and-Modeling-Lab project). Add a one-line description, topics and a homepage URL where relevant, because the GitHub import feature reads those fields.
7. **Profile README says "Building a Portfolio" and "Exploring Next.js"**. Update it once the site is live, link the portfolio, and move ML items lower.
8. The profile README stats images and typing banner are fine, but they must not push the full-stack projects below the fold.

### 17.5 "How this site is built" panel
On the About card or the portfolio's own case-study page, include a short panel that shows the MERN architecture of this site: Next.js frontend on Vercel, Express API on Render, MongoDB Atlas, JWT admin auth, Cloudinary uploads, GitHub import. It turns the portfolio itself into evidence of full-stack range.

### 17.6 Additional acceptance items
- [ ] Hero, tagline and About are MERN/full-stack first; ML is mentioned only in one short sentence and the "Research and ML" strip.
- [ ] No `ml-research` project is featured.
- [ ] Haal Khata is the first featured project and its live link works.
- [ ] GitHub bio, profile README and pinned repos match the new positioning (see `docs/GITHUB_PROFILE_CHECKLIST.md`, which must include findings 2 to 6 above).
- [ ] The Haal Khata "Source" badge link is verified.
