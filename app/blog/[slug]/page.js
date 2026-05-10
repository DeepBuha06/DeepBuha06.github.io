import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllBlogs, getBlogBySlug } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllBlogs().map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }) {
  const { title } = getBlogBySlug(params.slug);
  return { title: `${title} — Deep Buha` };
}

export default function BlogPost({ params }) {
  const { title, date, content } = getBlogBySlug(params.slug);

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

        <header className="mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-ink leading-tight tracking-tight">
            {title}
          </h1>
          <time className="block mt-3 text-sm text-ink-tertiary">
            {new Date(date + "T00:00:00").toLocaleDateString("en-US", {
              month: "long", day: "numeric", year: "numeric",
            })}
          </time>
        </header>

        <article className="prose prose-base prose-custom max-w-none prose-headings:font-serif prose-headings:font-semibold prose-p:leading-[1.8] prose-li:leading-[1.8]">
          <MDXRemote source={content} />
        </article>
      </div>
    </main>
  );
}
