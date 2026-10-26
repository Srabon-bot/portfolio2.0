# Adding Projects from GitHub — Admin Guide

> **PRD §10** — Step-by-step instructions for importing, reviewing, and publishing projects via the GitHub import feature.

---

## 1. Prepare your GitHub repository

Before importing, make sure the repo is ready:

| Check | What to do |
|-------|-----------|
| **Description** | Add a one-line description in the repo's About section — this becomes the project tagline |
| **Homepage URL** | Set the deployed URL (e.g. `https://yourapp.vercel.app`) in the repo's About section — becomes `liveUrl` |
| **Topics** | Add 3–6 topic tags (e.g. `nextjs`, `mongodb`, `typescript`) — become the stack chips |
| **5-section README** | The README should follow the structure: Title · Live demo · Tech stack · Setup · What I'd improve |
| **Screenshots** | Add at least one screenshot or GIF to the README (upload images to the repo) |
| **No broken links** | Check that your live URL and any demo links work |

---

## 2. Import a project from GitHub

1. **Log in** to the admin dashboard at `/admin/login`.
2. Go to **Projects → Add Project → Import from GitHub**.
3. Paste the full repository URL:  
   ```
   https://github.com/Srabon-bot/kaist-haalkhata
   ```
4. Click **Import**. The server calls the GitHub API to fetch:
   - Repo name → project title (hyphens/underscores → spaces)
   - Repo description → tagline
   - Repo homepage → live URL
   - Topics + top language → stack list
   - README → setup instructions (install section auto-detected if possible)
5. A **draft project** is created. It is **not published** and not visible on the public site.

---

## 3. Review and fill in the empty fields

The import pre-fills what it can from GitHub. You must complete the rest before publishing.

| Field | Pre-filled? | What to write |
|-------|------------|---------------|
| Title | ✅ Yes | Edit if the auto-generated name is unclear |
| Tagline | ✅ Yes (repo description) | Rewrite as a one-sentence value statement |
| Problem statement | ❌ Empty | 2–4 sentences: what specific problem does this solve and for whom? |
| Features (3–4) | ❌ One placeholder | List the 3–4 most technically interesting things you built |
| Stack | ✅ Topics/language | Review and clean up; add frameworks not in topics |
| Live URL | ✅ If homepage set | Verify it opens and works |
| Repo URL | ✅ Yes | Pre-filled automatically |
| Cover image | ❌ Empty | Upload a screenshot (see Section 4) |
| Screenshots | ❌ Empty | Upload 2–4 screenshots |
| Setup instructions | ✅ Partial | Expand to be runnable step-by-step (clone → install → env → dev) |
| What I would improve | ❌ Empty | 1–3 honest, specific improvements you would make next |

---

## 4. Attach screenshots

Screenshots are required to publish a `full-stack` or `frontend` project.

1. In the project editor, click **Upload image**.
2. Upload a PNG or WebP file (max 5 MB). It is stored on Cloudinary.
3. Set one image as the **cover image** — this appears on the ProjectCard on the home page.
4. Add 2–4 additional screenshots to the **Screenshots** gallery — they appear in the case study.

**Tips:**
- Capture at 1280 × 800 px or wider for best quality.
- Show the most visually interesting screens (dashboard, auth flow, key feature).
- Avoid screenshots with real personal data visible.

---

## 5. Validate and publish

The publish button runs a validation check. A project is blocked from publishing unless:

- ✅ Title is set (no "PLACEHOLDER" or "Lorem ipsum")
- ✅ Tagline is set
- ✅ Live URL is set and does not start with "PLACEHOLDER"
- ✅ Repo URL is set
- ✅ At least one screenshot or cover image is uploaded
- ✅ Setup instructions are filled in
- ✅ "What I would improve" section is filled in

For `ml-research` projects the rules are relaxed: title, tagline, and repo URL are enough.

Once all checks pass, set **Status → Published** and click **Save**.

---

## 6. Feature and reorder projects

- **Featured toggle**: up to 4 projects can be featured. Only `full-stack` and `frontend` types can be featured. The admin shows a warning if you try to add a 5th.
- **Order**: drag the project rows up/down in the Projects list, or set the numeric `order` field. Lower numbers appear first on the home page.
- **Recommendation**: keep Haal Khata as order 1 (standout project per PRD §17.3).

---

## 7. Fix a failing link

The admin dashboard has a **Check Links** button (Settings page) that pings every `liveUrl` and `repoUrl`.

If a link shows 🔴 Broken:
1. Open the live URL in a new tab to confirm it is actually down.
2. If the deploy is sleeping (Render free tier), wait 30 s and retry.
3. If the URL has changed, update it in the project editor and save.
4. Re-run **Check Links** to confirm the fix.

---

## 8. Sync a GitHub-imported project

After updating a repo's description, topics, or homepage on GitHub, you can pull the changes into the portfolio without losing your hand-written edits:

1. Open the project in the admin editor.
2. Click **Sync from GitHub**.
3. The server re-fetches: description, homepage URL, and topics.
4. Fields you edited by hand (problem, features, improvements, screenshots) are **not overwritten**.

---

## 9. Common errors and fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `GitHub API error: 404` | Repo is private or URL is wrong | Make the repo public, or check the URL |
| `GitHub API error: 403` | Unauthenticated rate limit hit | Add a `GITHUB_TOKEN` to `server/.env` |
| `Invalid GitHub repository URL` | URL format is wrong | Use full URL: `https://github.com/owner/repo` |
| `Publish validation failed` | A required field is empty or contains "PLACEHOLDER" | Fill in all required fields (see Section 5) |
| `Maximum of 4 featured projects allowed` | Already have 4 featured | Unfeature one existing project first |
| Images not showing after upload | Cloudinary not configured | Set `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` in `server/.env` |

---

## 10. Example: importing Haal Khata end to end

```
1. Repo URL: https://github.com/Srabon-bot/kaist-haalkhata
2. Import → draft created with:
   - title: "kaist haalkhata" → edit to "Haal Khata (হাল খাতা)"
   - tagline: repo description → rewrite as value statement
3. Fill in: problem, features (4 items), improvements
4. Upload cover image + 4 screenshots from the repo
5. Set type: full-stack, featured: true, order: 1
6. Click Publish → validation passes → visible on home page immediately
```

---

_This document was generated as part of PRD Phase 4. Update it when the admin UI changes._
