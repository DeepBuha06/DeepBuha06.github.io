"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FadeUp from "./FadeUp";

export default function ResearchBlogs({ blogs }) {
  return (
    <section id="writings" className="py-20 md:py-28">
      <FadeUp>
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-ink mb-10">
          Writings
        </h2>
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {blogs.map((blog, i) => (
          <FadeUp key={blog.slug} delay={i * 0.08}>
            <Link href={`/blog/${blog.slug}`} className="group block h-full">
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="h-full p-7 bg-surface-card rounded-2xl border border-border shadow-card group-hover:shadow-card-hover transition-all duration-300"
              >
                <time className="text-sm text-ink-tertiary font-medium">
                  {new Date(blog.date + "T00:00:00").toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                <h3 className="font-serif text-xl md:text-2xl font-semibold text-ink mt-3 group-hover:text-warm transition-colors duration-300">
                  {blog.title}
                </h3>
                <div className="mt-4 flex items-center gap-1 text-warm text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Read more
                  <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-200">→</span>
                </div>
              </motion.div>
            </Link>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
