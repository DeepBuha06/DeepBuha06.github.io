import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogsDir = path.join(process.cwd(), "content", "blogs");
const logsDir = path.join(process.cwd(), "content", "logs");
const projectsDir = path.join(process.cwd(), "content", "projects");

// ── Blogs ──

export function getAllBlogs() {
  if (!fs.existsSync(blogsDir)) return [];
  const files = fs.readdirSync(blogsDir).filter((f) => f.endsWith(".md"));
  const blogs = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(blogsDir, filename), "utf-8");
    const { data } = matter(raw);
    return { slug, title: data.title, date: data.date };
  });
  return blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getBlogBySlug(slug) {
  const raw = fs.readFileSync(path.join(blogsDir, `${slug}.md`), "utf-8");
  const { data, content } = matter(raw);
  return { title: data.title, date: data.date, content };
}

// ── Logs ──

export function getAllLogs() {
  if (!fs.existsSync(logsDir)) return [];
  const files = fs.readdirSync(logsDir).filter((f) => f.endsWith(".md"));
  const logs = files.map((filename) => {
    const raw = fs.readFileSync(path.join(logsDir, filename), "utf-8");
    const { data, content } = matter(raw);
    return { date: data.date, content: content.trim() };
  });
  return logs.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// ── Projects ──

export function getAllProjects() {
  if (!fs.existsSync(projectsDir)) return [];
  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".md"));
  return files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(projectsDir, filename), "utf-8");
    const { data } = matter(raw);
    return {
      slug,
      title: data.title,
      tagline: data.tagline || "",
      description: data.description || "",
      github: data.github || "",
      tag: data.tag || "",
    };
  });
}

export function getProjectBySlug(slug) {
  const raw = fs.readFileSync(path.join(projectsDir, `${slug}.md`), "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title,
    tagline: data.tagline || "",
    description: data.description || "",
    github: data.github || "",
    tag: data.tag || "",
    highlights: data.highlights || [],
    content,
  };
}
