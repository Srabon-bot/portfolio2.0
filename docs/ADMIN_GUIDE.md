# Admin Dashboard Guide

> **PRD §12** — How to log in, edit site content, upload your resume, and read contact messages.

---

## 1. Logging in

1. Navigate to `https://your-domain.com/admin/login` (or `http://localhost:3001/admin/login` locally).
2. Enter the **admin email and password** you configured in `ADMIN_EMAIL` and `ADMIN_PASSWORD` when you ran the seed script (`npm run seed` in the `server/` directory).
3. Click **Login**. A secure httpOnly cookie is set — you stay logged in until you log out or the server restarts.

> **Forgot your password?** Run `npm run seed` in `server/` again with new values in `.env`. It will update the admin password.

---

## 2. Overview page

After logging in you land on the **Overview** page showing:
- Published vs. draft project counts
- Unread message count
- Last resume upload date
- A **Check Links** button to ping all project live URLs and repo URLs for broken links

---

## 3. Editing the Profile

Go to **Profile** in the sidebar.

| Field | Notes |
|-------|-------|
| Name / Display name | Used in hero and footer |
| Role | Appears under your name in the hero section |
| Tagline | One-sentence value statement, used in hero and meta description |
| Avatar URL | Paste a Cloudinary URL, or upload via **Upload → Image** |
| Photo URL | Used in the About card |
| Location, Email, LinkedIn, GitHub | Used in contact and footer |
| About paragraphs | Each paragraph is a separate entry; supports plain text |
| Currently → Building / Learning / Fun fact | Appears in the About card's currently list |
| Resume URL | Set automatically after resume upload (see Section 6) |

Click **Save** when done. Changes appear on the public site within ~60 seconds (ISR) or immediately if on-demand revalidation is configured.

---

## 4. Managing Skills

Go to **Skills** in the sidebar.

- **Add skill**: click **+ Add Skill**, enter a name and pick a category (Frontend, Backend, Tools, ML & Data).
- **Reorder**: drag rows up/down or change the `order` number — lower = appears first in each group.
- **Edit**: click a skill row to edit its name or category.
- **Delete**: click the trash icon. Deleted skills are removed immediately.

**Category mapping:**
| Category | Where it shows |
|----------|---------------|
| `frontend` | Frontend skill card |
| `backend` | Backend skill card |
| `tools` | Tools skill card |
| `ml-data` | "Also: ML & data" secondary strip |

---

## 5. Managing Projects

Go to **Projects** in the sidebar.

### Creating or importing a project
- **Manual**: click **+ Add Project → Manual** and fill in all fields.
- **From GitHub**: click **+ Add Project → Import from GitHub** and follow the [GitHub import guide](ADD_PROJECTS_FROM_GITHUB.md).

### Key project fields
| Field | Notes |
|-------|-------|
| Status | `draft` (hidden) or `published` (visible). Publish validation runs on save. |
| Type | `full-stack`, `frontend`, or `ml-research`. Only full-stack/frontend can be featured. |
| Featured | Toggle on to show in the 4-card featured grid on the home page. Max 4 allowed. |
| Order | Lower number = appears higher on the home page. |
| Cover image | Upload via **Upload → Image**. Appears on the ProjectCard thumbnail. |
| Screenshots | Upload 2–4 images. Appear in the case study gallery. |

### Publish validation rules
A project cannot be published unless:
- Title, tagline, live URL, repo URL are set
- At least one screenshot or cover image exists
- Setup instructions are filled in
- "What I would improve" section is filled in
- No "PLACEHOLDER" or "Lorem ipsum" text anywhere in the project

---

## 6. Uploading the resume PDF

1. Go to **Settings → Resume** (or **Profile → Resume Upload**).
2. Click **Upload PDF** and select your updated PDF.
3. The file is uploaded to Cloudinary. The `resumeUrl` on your profile is updated automatically.
4. The **Download resume** button on the hero now serves the new file. The "Last updated" date on the resume page also updates.

> **Tip**: name your file clearly before uploading, e.g. `Shahriar_Srabon_Resume_2025.pdf`. The download filename shown to visitors is fixed to `Shahriar_Srabon_Resume.pdf` regardless.

---

## 7. Reading contact messages

Go to **Messages** in the sidebar.

- Messages arrive here when someone submits the contact form on the home page.
- **Unread** messages are bold. Click any message to open it and mark it as read.
- You also receive an email notification at `CONTACT_TO_EMAIL` (set in `server/.env`) for every new message.
- Use the **Delete** button to remove spam. Deleted messages cannot be recovered.

---

## 8. Running the link checker

On the **Overview** page, click **Check Links**.

The server pings every project's `liveUrl` and `repoUrl` and marks each as `ok`, `broken`, or `unknown`. Results appear in a table. If any show 🔴 Broken:
1. Visit the URL in a browser to confirm.
2. Render free-tier APIs can sleep — wait 30 s and recheck before assuming it is broken.
3. Fix the URL in the project editor and re-run the checker.

A banner appears on the admin overview if any link has been broken for more than 7 days.

---

## 9. Logging out

Click your initials / avatar in the top-right corner and select **Logout**. The httpOnly cookie is cleared and you are redirected to the login page.

---

_This document was generated as part of PRD Phase 4. Update it when the admin UI changes._
