# Deployment Guide (Vercel, Render, MongoDB Atlas)

Step-by-step instructions for deploying the MERN portfolio to production.

---

## 1. MongoDB Atlas Setup

1. Create a free M0 cluster on [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Create a database user with read/write privileges.
3. Whitelist Network Access: Allow `0.0.0.0/0` (standard for serverless/Render access).
4. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.mongodb.net/srabon_portfolio?retryWrites=true&w=majority
   ```

---

## 2. Backend API Deployment (Render)

1. Push this repository to GitHub.
2. In [Render Dashboard](https://dashboard.render.com), create a new **Web Service**.
3. Select this repository:
   - **Root Directory**: `server`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
4. Set Environment Variables in Render:
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
   - `MONGODB_URI`: `<Atlas connection string>`
   - `JWT_SECRET`: `<Generate a random 64-character secret>`
   - `ADMIN_EMAIL`: `srabon361@gmail.com`
   - `ADMIN_PASSWORD`: `<Strong admin password>`
   - `CLIENT_ORIGIN`: `https://srabon-portfolio.vercel.app` (your Vercel URL)
5. Seed the production database once:
   In Render shell or locally pointing `MONGODB_URI` to Atlas, run:
   ```bash
   npm run seed --workspace=server
   ```

---

## 3. Frontend Deployment (Vercel)

1. In [Vercel Dashboard](https://vercel.com), import the GitHub repository.
2. Configure Project Settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `web`
3. Set Environment Variables in Vercel:
   - `NEXT_PUBLIC_API_URL`: `https://your-api.onrender.com/api`
   - `NEXT_PUBLIC_SITE_URL`: `https://your-domain.com`
4. Click **Deploy**.

---

## 4. Cold-Start Optimization

Because Render free tier spins down inactive web services after 15 minutes:
- The Next.js frontend implements automated **fallback caching**, rendering cached or seed profile data without showing blank screens or connection errors.
- You can optionally set up a free uptime monitor (e.g., UptimeRobot, Cron-Job.org) to ping `GET /api/health` every 10 minutes to keep the service warm.
