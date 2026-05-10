"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FadeUp from "./FadeUp";

export default function Projects({ projects }) {
  return (
    <section id="projects" className="py-20 md:py-28">
      <FadeUp>
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-ink mb-10">
          Projects
        </h2>
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((project, i) => (
          <FadeUp key={project.slug} delay={i * 0.1}>
            <Link href={`/project/${project.slug}`} className="group block h-full">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="h-full p-7 md:p-8 bg-surface-card rounded-2xl border border-border shadow-card group-hover:shadow-card-hover transition-all duration-400"
              >
                {/* Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 text-xs font-semibold text-warm bg-warm-bg rounded-full uppercase tracking-wider">
                    {project.tag}
                  </span>
                  <span className="text-ink-faint group-hover:text-warm text-lg transition-all duration-200 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1">
                    →
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-2xl font-semibold text-ink mb-2 group-hover:text-warm transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Tagline */}
                <p className="text-base text-ink-tertiary mb-4">
                  {project.tagline}
                </p>

                {/* Description */}
                <p className="text-[15px] text-ink-secondary leading-relaxed">
                  {project.description}
                </p>
              </motion.div>
            </Link>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
