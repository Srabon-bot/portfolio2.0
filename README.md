# Srabon's Portfolio (MERN)

A dark, blackish-purple developer portfolio built as a full-stack MERN project. Recruiters get everything in one scroll, and I update projects, skills, my bio and my resume from a private admin dashboard instead of editing code.

> **Status:** in progress. The home page UI is built (Phase 1). The API, admin dashboard and GitHub import are next. See the [roadmap](#roadmap).

---

## 1. What it is and who it is for

- **For:** recruiters and hiring managers for intern and junior full-stack roles, who often browse on a phone and spend only a short time per portfolio.
- **What it does:** shows who I am, my skills grouped as frontend, backend and tools, 3 to 4 featured projects with live links and case studies, a contact form, and a one-click resume download.
- **Why it is dynamic:** all content lives in MongoDB. An admin dashboard lets me add a project (including importing it from a GitHub repo URL), reorder skills, upload a new resume and read messages.
- **Design:** the structure and feel of [kenjimmy.xyz](https://kenjimmy.xyz/), re-themed in dark purple with my own components.

## 2. Live demo and screenshots

- **Live site:** coming soon
- **Screenshots:** add them to `docs/screenshots/` and link them here

```
![Home page](docs/screenshots/home.png)
![Projects](docs/screenshots/projects.png)
![Admin dashboard](docs/screenshots/admin.png)
```

## 3. Tech stack and features

### Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js (App Router), React, TypeScript, Tailwind CSS |
| Backend | Node.js, Express |
| Database | MongoDB (Atlas), Mongoose |
| Auth | JWT in an httpOnly cookie, single admin user |
| Uploads | Cloudinary (images and resume PDF) |
| Deployment (planned) | Vercel (web), Render (API), MongoDB Atlas |

The repo is an npm workspaces monorepo with two apps:

```
portfolio2.0/
  web/        Next.js frontend
  server/     Express API
  docs/       Guides and notes
  PRD.md      Product requirements document
```

### Features

Built so far:
- Home page with hero, About, Skills, Projects, Research and ML strip, Contact and footer
- Hero "Download resume" button
- Responsive dark purple design

Planned (see [PRD.md](PRD.md)):
- Case-study page for every project (value statement, live demo and screenshots, stack and features, setup steps, what I would improve)
- Admin dashboard with login, CRUD for projects and skills, image and resume uploads
- Import a project from a GitHub repo URL
- Contact form that stores messages and emails me
- Link checker for live and repo URLs
- SEO metadata, sitemap and Lighthouse 90+ on mobile

## 4. Setup instructions

**Requirements:** Node.js (current LTS), npm, a MongoDB Atlas connection string.

```bash
# 1. Clone
git clone https://github.com/Srabon-bot/portfolio2.0.git
cd portfolio2.0

# 2. Install all workspaces from the root
npm install

# 3. Create environment files (names only are committed)
cp server/.env.example server/.env
cp web/.env.example web/.env.local
# then fill in the values

# 4. Run the frontend (http://localhost:3000)
npm run dev:web

# 5. Run the API in a second terminal
npm run dev:server
```

Production build of the frontend:

```bash
npm run build:web
```

### Environment variables

Check the `.env.example` file in each app for the exact list. The PRD expects these names:

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
GITHUB_TOKEN=              # optional, avoids GitHub rate limits
SMTP_USER=
SMTP_PASS=
CONTACT_TO_EMAIL=
REVALIDATE_SECRET=

# web
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_SITE_URL=
REVALIDATE_SECRET=
```

Never commit real values. `.env*` files are in `.gitignore`.

## 5. What I would improve

- Finish the API and admin dashboard so every piece of content comes from the database.
- Add automated tests for the API (auth, validation, GitHub import) and the key UI flows.
- Add a static fallback of the last good data so the site never shows a blank section when a free-tier API instance is asleep.
- Replace the placeholder screenshots with real ones and publish a case study for each featured project.
- Add an optional `/shelf` page for certificates and achievements.

---

## Documentation

- [PRD.md](PRD.md): full product requirements and acceptance checklist
- `docs/`: guides for adding projects from GitHub, the admin dashboard, deployment and the GitHub profile checklist (written as each phase is completed)

## Contact

Shahriar Srabon, Dhaka, Bangladesh
Email: srabon361@gmail.com
LinkedIn: https://www.linkedin.com/in/shahriar-hossain-b0589a402/
GitHub: https://github.com/Srabon-bot
