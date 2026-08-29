# Setup Guide — Byd Car Stand

This covers three things: (1) setting up Supabase from scratch, (2) running the
site locally, and (3) how everything fits together as one project (there's
nothing separate to "merge" — every page we built lives in this one zip already).

---

## 1. Create your Supabase project

1. Go to https://supabase.com and sign up / log in (free tier is fine).
2. Click **New Project**. Pick a name (e.g. "byd-car-stand"), set a database
   password (save it somewhere), choose a region close to you, and create it.
   Wait ~2 minutes for provisioning.
3. Once it's ready, go to **Project Settings > API**. You'll need two values:
   - **Project URL** (looks like `https://xxxxxxxx.supabase.co`)
   - **anon public key** (a long string under "Project API keys")

## 2. Create the database table

1. In the Supabase dashboard, open **SQL Editor** (left sidebar) > **New query**.
2. Open `supabase/schema.sql` from this project, copy its full contents,
   paste into the SQL editor, and click **Run**.
3. This creates a `models` table and sets up permissions so:
   - Anyone visiting your site can *view* the models (needed for the public `/models` page)
   - Only a logged-in admin can add, edit, or delete

## 3. Create your admin login

1. In Supabase, go to **Authentication > Users**.
2. Click **Add user** > **Create new user**.
3. Enter the email and password you (the admin) want to log in with.
   Leave "Auto Confirm User" checked so you don't need to verify by email.
4. That's it — this is the account you'll use at `/admin/login`.

(You can add more admin users the same way later if needed.)

## 3b. Set up photo uploads (Supabase Storage)

The admin dashboard lets you upload car photos directly from your computer —
here's the one-time setup for that:

1. In the Supabase dashboard, go to **Storage** (left sidebar) > **New bucket**.
2. Name it exactly `car-images`.
3. Toggle **Public bucket** ON. This lets uploaded photos be viewable on your
   public site without needing a login.
4. Click **Create bucket**.
5. Go back to **SQL Editor > New query**, paste the following, and run it —
   this allows your admin to upload/replace/delete photos, while keeping
   read access public:

   ```sql
   create policy "Public read access for car images"
   on storage.objects for select
   using ( bucket_id = 'car-images' );

   create policy "Authenticated users can upload car images"
   on storage.objects for insert
   to authenticated
   with check ( bucket_id = 'car-images' );

   create policy "Authenticated users can update car images"
   on storage.objects for update
   to authenticated
   using ( bucket_id = 'car-images' );

   create policy "Authenticated users can delete car images"
   on storage.objects for delete
   to authenticated
   using ( bucket_id = 'car-images' );
   ```

That's it — the admin form's "Car Photo" field will now upload straight to
this bucket and save the resulting link automatically.

## 4. Configure the project with your keys

1. In the project folder, copy `.env.example` to a new file named `.env`:
   ```
   cp .env.example .env
   ```
2. Open `.env` and fill in the two values from Step 1:
   ```
   VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=your-long-anon-key-here
   ```
3. Save the file. **Never commit `.env` to a public GitHub repo** — it's already
   listed in `.gitignore` conventions for Vite projects, but double check.

## 5. Install and run

You need Node.js installed (v18+). Then, in the project folder:

```
npm install
npm run dev
```

This starts a local dev server (usually at http://localhost:5173). Visit:
- `/` — homepage
- `/models` — public model listing (pulls live from Supabase)
- `/admin/login` — log in with the admin account you created in Step 3
- `/admin` — add, edit, delete models (only accessible once logged in)

## 6. Deploying

When you're ready to put this live, you can deploy to a static host like
Vercel, Netlify, or Cloudflare Pages — they all support Vite projects out of
the box. In the host's dashboard, set the same two environment variables
(`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) under your project's
Environment Variables settings, since your local `.env` file won't be
uploaded with your code.

---

## How the project fits together (no separate "merging" needed)

Every page we've built across this conversation — Home, About, Services,
Models, and the Admin dashboard — lives in **this one project** already. There
was never a separate file per page; each time I gave you an updated zip, it
already contained everything built so far. So as long as you're working from
the *latest* zip I've shared, it's already merged.

If you separately edited an **older** zip download (e.g. you tweaked the Home
page in an earlier version, and want that carried into this latest one),
here's how to fold it in by hand:

1. Unzip both the old (edited) version and this new version into separate
   folders.
2. Copy over just the specific files you changed from the old folder into the
   new one — most likely just files inside `src/pages/`, `src/components/`,
   or their `.css` counterparts. Don't copy `package.json`, `App.jsx`, or
   anything in `src/lib/`, `src/context/`, or `src/pages/admin/` from the old
   version, since the new version has structural additions (routing, auth)
   those old files don't know about.
3. If you added any new files of your own (extra components, images), copy
   those across as well, and register any new page as a route in `App.jsx`
   if it's a full page.

Going forward, easiest path: keep working from whatever zip I hand you next,
and tell me about any manual edits you made in between so I can fold them in
on my end instead.

## What's left to build

- **Contact page** (`/contact`) — not yet built
- Individual **model detail pages** (currently Models page shows all info on
  each card; a dedicated `/models/:id` page is a possible next step if you
  want deeper per-car pages)
