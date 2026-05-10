import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllProjects, getProjectBySlug } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const project = getProjectBySlug(params.slug);
  return { title: `${project.title} — Deep Buha` };
}

export default function ProjectPage({ params }) {
  const project = getProjectBySlug(params.slug);

  return (
    <main className="min-h-screen relative z-10">
      <div className="max-w-reading mx-auto px-6 sm:px-8 py-20 md:py-28">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-ink-tertiary hover:text-warm transition-colors mb-12 group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Deep Buha
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-ink tracking-tight">
              {project.title}
            </h1>
            <span className="tech-tag">{project.tag}</span>
          </div>
          {project.tagline && (
            <p className="text-lg text-ink-secondary">{project.tagline}</p>
          )}
        </div>

        <article className="prose prose-base prose-custom max-w-none prose-headings:font-serif prose-headings:font-semibold prose-p:leading-[1.8] prose-li:leading-[1.8] mb-12">
          <MDXRemote source={project.content} />
        </article>

        {project.highlights.length > 0 && (
          <div className="mb-12 p-6 rounded-2xl bg-warm-bg border border-warm-border">
            <h2 className="text-xs font-bold uppercase tracking-widest text-warm mb-4">
              Highlights
            </h2>
            <ul className="space-y-2">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-ink-secondary leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-warm mt-2 shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-white bg-ink rounded-xl hover:bg-ink/85 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            View on GitHub
          </a>
        )}
      </div>
    </main>
  );
}
