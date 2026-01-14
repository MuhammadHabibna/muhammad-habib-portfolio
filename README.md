# Portfolio Website

A modern, professional portfolio website built with Next.js 15, Tailwind CSS, Shadcn UI, and Supabase.

## Features
- **Public Portfolio**: Responsive, animated, and accessible.
  - Hero, About, Projects, Certifications, Experience, Skills, Contact.
  - Detailed Modals for projects and certifications.
  - Sky-blue cloud aesthetic using Tailwind v4.
- **Admin Studio**: Secure dashboard for content management.
  - Auth protected (Supabase).
  - CRUD for Projects and Profile.
  - Image uploads via Supabase Storage.

## Setup Instructions

### 1. Environment Variables
Create a `.env.local` file in the root directory:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Supabase Setup
1. Create a new Supabase project.
2. Go to the SQL Editor and run the contents of `schema.sql` (found in root).
   - This sets up tables (profiles, projects, etc.) and RLS policies.
3. **Storage**: Create a bucket named `portfolio` and ensure usage public is enabled (or use the SQL provided).
4. **Auth**: Create a user for yourself.
   - Manually insert your User ID into the `public.admins` table to grant admin access.
   - SQL: `INSERT INTO public.admins (user_id) VALUES ('your-uuid-here');`

### 3. Installation
```bash
npm install
```

### 4. Running Locally
```bash
npm run dev
```
Visit `http://localhost:3000`.
Visit `http://localhost:3000/studio` to log in.

## Project Structure
- `/app`: App Router pages.
  - `/page.tsx`: Main portfolio page (uses dummy data if DB empty).
  - `/studio`: Admin dashboard.
- `/components`: UI components.
  - `/sections`: Public page sections.
  - `/admin`: Admin forms.
  - `/ui`: Shadcn primitives.
- `/lib`: Utilities and Supabase client.

## Deployment

### Deploy to Vercel
1. **GitHub**: Push this repository to GitHub.
2. **Vercel**: Import the project from GitHub.
3. **Environment Variables**: Add the following in Vercel Project Settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (Set to your Vercel URL, e.g., `https://your-project.vercel.app`)
   - `SITE_URL` (Same as above)
4. **Supabase Auth**: Go to Supabase Dashboard -> Authentication -> URL Configuration.
   - Add your Vercel domain to **Redirect URLs** (e.g., `https://your-project.vercel.app/**`).
5. **Redeploy**: If previously deployed, redeploy to ensure env vars take effect.

### Supabase Storage
- Ensure your `portfolio` bucket has Public Access enabled (or set appropriate policies in `schema.sql`).
- The app uses `next/image` which is configured in `next.config.ts` to allow domains ending in `.supabase.co`.

## Data
The public site uses `lib/fetch.ts` which falls back to `lib/data.ts` (Dummy Data) if the database connection fails or returns no data. This ensures the site acts as a template immediately.

