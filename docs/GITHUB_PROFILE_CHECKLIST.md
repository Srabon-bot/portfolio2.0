# GitHub Profile Checklist

> This checklist must be completed before launch. It incorporates every finding from the PRD (section 17.4) so you can fix your GitHub presence in one pass.

---

## ⚠️ Findings to Fix (from PRD §17.4)

These are specific problems found during the audit of your GitHub profile. Fix them before linking the portfolio to your LinkedIn and resume.

### Finding 2 — GitHub positioning conflicts with the goal

**Problem:** Your profile bio currently reads *"ML Engineer and Aspiring Full-Stack Developer"* and your profile README leads with ML work.

**Fix:**
- [ ] Change the GitHub profile bio to: *"Full-stack developer (MERN · Next.js · TypeScript) | CSE @ UITS Dhaka"* — or something equally MERN-first.
- [ ] Rewrite the profile README introduction to lead with full-stack development. Mention ML only in one short sentence toward the bottom.
- [ ] Add the portfolio link (`https://your-portfolio-url.vercel.app`) to the GitHub profile website field.

---

### Finding 3 — Pinned repos are not ideal

**Problem:** The pinned "Portfolio" repo is plain HTML with no description. ML notebook repos are pinned. There is no pin for Haal Khata.

**Fix:**
- [ ] Unpin the old HTML portfolio repo. Archive or rename it (e.g., `portfolio-v1`) so it does not appear first.
- [ ] Pin repos in this order: **Haal Khata → Yutnori 3D → Sholo Guti → (MERN portfolio once live) → one other**.
- [ ] Do NOT pin the flood/ML repos. They should remain in your repo list but not in the spotlight.
- [ ] Add a short description to every pinned repo (see Finding 6 below).

---

### Finding 4 — Possible broken link in Haal Khata

**Problem:** The Haal Khata README's "Source" badge points to a repo named `kaist-lalkhata`, but the actual repo is `kaist-haalkhata`. This is a broken link — exactly the mistake the teacher warns against.

**Fix:**
- [ ] Open `kaist-haalkhata` → README → find the "Source" badge URL.
- [ ] Change `kaist-lalkhata` to `kaist-haalkhata` in the badge URL.
- [ ] Verify the live link `https://haal-khata.vercel.app` is still accessible.
- [ ] Commit with message: `fix: correct source badge repo name in README`.

---

### Finding 5 — Repo names hurt first impressions

**Problem:** `Sholo-Guti_6_U222_U224_U202` and `Vibe-coding-project-Korean-game-Yutnori-` (trailing hyphen) look messy to a recruiter.

**Fix:**
- [ ] Rename `Vibe-coding-project-Korean-game-Yutnori-` → `yutnori-3d` on GitHub (Settings → Repository name).
- [ ] Rename `Sholo-Guti_6_U222_U224_U202` → `sholo-guti` on GitHub.
- [ ] GitHub automatically redirects old URLs, so forks and existing links are safe — but update any hardcoded links in the seed data and in your resume after renaming.
- [ ] Update the project slug and `repoUrl` in the admin dashboard once the backend is live.

---

### Finding 6 — Several repos lack descriptions and screenshots

**Problem:** Multiple repos (including `Simulation-and-Modeling-Lab`) have no description, no topics, and no homepage URL. The GitHub import feature reads these fields.

**Fix for every repo you care about:**
- [ ] Add a one-line description (GitHub → gear icon on the repo page → About → Description).
- [ ] Add relevant topics (e.g., `react`, `nextjs`, `typescript`, `mern`).
- [ ] Set a homepage URL if there is a live demo.
- [ ] Add at least one screenshot to the README.

Repos that need this immediately:
- [ ] `camera-control-maze`
- [ ] `Sholo-Guti_6_U222_U224_U202` (after renaming)
- [ ] `Simulation-and-Modeling-Lab`
- [ ] Any flood/ML repos you plan to show in the "Research and ML" strip

---

## Core Checklist (standard best practice)

### Profile
- [ ] Profile photo is set (professional or clean-looking).
- [ ] Short bio is MERN-first (see Finding 2).
- [ ] Location is set to "Dhaka, Bangladesh".
- [ ] Portfolio URL is in the website field.
- [ ] LinkedIn URL is in the social links.

### Pinned Repositories (4-6 repos)
- [ ] Haal Khata is pinned first.
- [ ] Yutnori 3D is pinned second.
- [ ] MERN portfolio repo is pinned once live.
- [ ] No empty, test, or ML-only repos are pinned.
- [ ] Every pinned repo has a description and at least one topic.

### Profile README
- [ ] Profile README exists (README.md in a repo named exactly `Srabon-bot`).
- [ ] Leads with a full-stack / MERN intro (not ML).
- [ ] Links to the live portfolio.
- [ ] Includes a tech stack section (HTML badges or a table).
- [ ] Stats images and typing banner do NOT push projects below the fold.
- [ ] ML work appears in one short sentence or a collapsed section, not in the hero.

### Every Featured Repository
Each of the pinned repos must have:
- [ ] A repo description (one line).
- [ ] Topics (at least 3 relevant ones).
- [ ] A 5-section README (see template below).
- [ ] At least one screenshot in the README.
- [ ] A live demo link (in the README and in the repo homepage field).
- [ ] No broken badge links (see Finding 4).

### Housekeeping
- [ ] No repos named "test", "untitled", or similarly unnamed.
- [ ] No empty repos (0 commits or only a README with auto-generated text).
- [ ] The old HTML portfolio repo is archived or renamed.

---

## 5-Section README Template

Copy this into every featured repo. Fill in each section — never leave a section empty.

```
# [Project Title]

> One sentence: what it does and who it is for.

## Live Demo and Screenshots

Live app: https://your-live-url.com

![Screenshot description](./screenshots/main.png)

## Tech Stack and Features

Stack: React, TypeScript, Node.js, Express, MongoDB, Tailwind CSS

Key features:
1. Feature one — brief explanation of the real problem it solves.
2. Feature two — what makes this technically interesting.
3. Feature three — a UX or product decision you made.

## Setup Instructions

git clone https://github.com/Srabon-bot/[repo-name].git
cd [repo-name]
npm install
cp .env.example .env   # fill in your values
npm run dev

Open http://localhost:3000.

## What I Would Improve

- If I had more time: describe one architectural improvement you would make.
- Known limitation: describe one tradeoff you made and why.
- Next feature: what would ship next in a real product?
```

---

## Profile README Template (starter)

```
# Hi, I am Srabon

Full-stack developer (MERN, Next.js, TypeScript) building web apps that solve real problems for people in Bangladesh.

Portfolio: https://your-portfolio-url.vercel.app
Location: Dhaka, Bangladesh | CSE @ UITS

---

Tech Stack

Frontend: React, Next.js, TypeScript, Tailwind CSS
Backend: Node.js, Express, MongoDB, REST APIs, JWT
Tools: Git, Vercel, Render, VS Code, Linux

---

Featured Projects

| Project | Description | Live |
|---------|-------------|------|
| Haal Khata | Voice-first bookkeeper for Bangladeshi shopkeepers | haal-khata.vercel.app |
| Yutnori 3D | 3D Korean board game with AI opponent | yutnori-ten.vercel.app |
| Portfolio CMS | MERN portfolio with admin dashboard | your-portfolio-url.vercel.app |

---

I also research deep learning models for flood forecasting in Bangladesh.
```

---

*Last updated: Phase 5 (launch). Update this checklist whenever findings change.*
