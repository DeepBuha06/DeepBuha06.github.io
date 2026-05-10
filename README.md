# Deep Buha — Portfolio

Minimal personal portfolio built with Next.js 14, Tailwind CSS, and Framer Motion. Static export for GitHub Pages.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How to Add Content

### Add a Blog Post

Create a new `.md` file in `content/blogs/`:

```md
---
title: "Your Post Title"
date: "2026-05-10"
---

Your content here. Supports full Markdown/MDX.
```

The filename becomes the URL slug: `my-post.md` → `/blog/my-post`

### Add a Daily Log Entry

Create a new `.md` file in `content/logs/` (name it by date):

```md
---
date: "2026-05-10"
---
What you worked on today...
```

### Add a Project

Edit `data.js` and add to the `PROJECTS` array:

```js
{
  title: "Project Name",
  description: "What it does.",
  github: "https://github.com/you/repo",
  tag: "Python"
}
```

## Deploy to GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages → Source** and select **GitHub Actions**
3. Push to `main` — the site deploys automatically

The included `.github/workflows/deploy.yml` handles build and deploy.

### Project repo (not `username.github.io`)

If deploying to a project repo (e.g. `username.github.io/portfolio`), uncomment and set `basePath` in `next.config.mjs`:

```js
basePath: '/portfolio',
```

## Project Structure

```
├── app/
│   ├── layout.js              # Root layout + Inter font
│   ├── page.js                # Home (all sections)
│   ├── globals.css            # Global styles
│   ├── blog/[slug]/page.js    # Blog post page
│   └── components/            # All UI components
├── content/
│   ├── blogs/                 # Blog .md files
│   └── logs/                  # Daily log .md files
├── data.js                    # Projects array
├── lib/content.js             # Markdown parsing utils
└── .github/workflows/         # GitHub Pages deploy
```

## Stack

- **Next.js 14** — App Router, static export
- **Tailwind CSS** — Styling with typography plugin
- **Framer Motion** — Scroll animations
- **next-mdx-remote** — Markdown/MDX rendering
- **gray-matter** — Frontmatter parsing
