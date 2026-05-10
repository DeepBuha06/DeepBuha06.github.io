"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PortfolioLayout({ projects, logs, blogs }) {
  const [activeSection, setActiveSection] = useState("about");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Track mouse for spotlight
  useEffect(() => {
    const handler = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  // Track scroll to highlight active nav
  useEffect(() => {
    const sections = ["about", "projects", "log", "writings"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "log", label: "Log" },
    { id: "writings", label: "Writings" },
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen">
      {/* Spotlight glow */}
      <div
        className="spotlight"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(155, 123, 91, 0.04), transparent 50%)`,
        }}
      />

      <div className="mx-auto max-w-screen-xl px-6 sm:px-10 md:px-12 lg:px-24 py-12 md:py-20 lg:py-0 lg:flex lg:justify-between lg:gap-16 relative z-10">
        {/* ═══ LEFT — Sticky sidebar ═══ */}
        <header className="lg:sticky lg:top-0 lg:flex lg:flex-col lg:justify-between lg:max-h-screen lg:w-[45%] lg:py-24">
          <div>
            {/* Name & title */}
            <h1 className="font-serif text-5xl sm:text-6xl font-bold text-ink tracking-tight">
              <a href="#top">Deep Buha</a>
            </h1>
            <h2 className="mt-3 text-xl font-medium text-ink">
              Systems Engineer
            </h2>
            <p className="mt-4 text-base text-ink-secondary leading-relaxed max-w-sm">
              I build interpretability-driven systems for large language models
              at IIT Gandhinagar.
            </p>

            {/* Nav links with indicator lines */}
            <nav className="hidden lg:block mt-16">
              <ul className="space-y-5">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      className={`nav-link ${activeSection === link.id ? "active" : ""}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Résumé link */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-10 text-sm font-semibold text-ink hover:text-warm transition-colors group"
            >
              View Full Résumé
              <svg className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </div>

          {/* Social links at bottom of sidebar */}
          <div className="mt-10 lg:mt-0 flex items-center gap-4">
            <a
              href="https://github.com/DeepBuha06"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-tertiary hover:text-ink transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/deepbuha/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-tertiary hover:text-ink transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </header>

        {/* ═══ RIGHT — Scrollable content ═══ */}
        <main className="lg:w-[55%] lg:py-24 mt-16 lg:mt-0">
          {/* ── About ── */}
          <section id="about" className="mb-24 scroll-mt-24">
            <h3 className="text-sm font-bold uppercase tracking-widest text-ink-tertiary mb-8 lg:hidden">
              About
            </h3>
            <div className="space-y-4 text-base leading-[1.8] text-ink-secondary">
              <p>
                I&apos;m a systems engineer with a focus on making large language models more
                efficient without sacrificing the semantics they&apos;ve learned. My work sits at the
                intersection of{" "}
                <span className="text-ink font-medium">interpretability</span>,{" "}
                <span className="text-ink font-medium">memory systems</span>, and{" "}
                <span className="text-ink font-medium">low-level C++ engineering</span>.
              </p>
              <p>
                Currently at{" "}
                <a href="https://iitgn.ac.in" target="_blank" rel="noopener noreferrer" className="text-ink font-medium hover:text-warm transition-colors border-b border-warm/30 hover:border-warm">
                  IIT Gandhinagar
                </a>
                , I&apos;m building{" "}
                <a href="https://github.com/DeepBuha06/aegis" target="_blank" rel="noopener noreferrer" className="text-ink font-medium hover:text-warm transition-colors border-b border-warm/30 hover:border-warm">
                  Aegis
                </a>
                — an interpretability-driven KV cache eviction system that outperforms
                existing approaches like H2O on the Needle-in-a-Haystack benchmark, running
                entirely on consumer-grade hardware.
              </p>
              <p>
                When I&apos;m not deep in attention heads and cache lines, I read research papers
                obsessively and document what I learn in my daily log below.
              </p>
            </div>
          </section>

          {/* ── Projects ── */}
          <section id="projects" className="mb-24 scroll-mt-24">
            <h3 className="text-sm font-bold uppercase tracking-widest text-ink-tertiary mb-8 lg:hidden">
              Projects
            </h3>
            <div className="space-y-3">
              {projects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/project/${project.slug}`}
                  className="group block"
                >
                  <div className="exp-card flex flex-col sm:flex-row gap-4">
                    {/* Tag column */}
                    <div className="sm:w-28 shrink-0 pt-1">
                      <span className="tech-tag">{project.tag}</span>
                    </div>
                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-ink group-hover:text-warm transition-colors inline-flex items-center gap-1.5">
                        {project.title}
                        <svg className="w-4 h-4 opacity-0 -translate-y-0.5 translate-x-0 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-200" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                      </h4>
                      <p className="mt-1 text-sm text-ink-secondary leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── Daily Log ── */}
          <section id="log" className="mb-24 scroll-mt-24">
            <h3 className="text-sm font-bold uppercase tracking-widest text-ink-tertiary mb-8 lg:hidden">
              Daily Log
            </h3>
            <div className="space-y-3">
              {logs.map((log) => (
                <div key={log.date} className="exp-card flex flex-col sm:flex-row gap-4">
                  {/* Date column */}
                  <div className="sm:w-28 shrink-0 pt-0.5">
                    <time className="text-xs font-semibold uppercase tracking-wider text-ink-tertiary">
                      {new Date(log.date + "T00:00:00").toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                  {/* Content */}
                  <p className="flex-1 text-sm text-ink-secondary leading-relaxed">
                    {log.content}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Writings ── */}
          <section id="writings" className="mb-24 scroll-mt-24">
            <h3 className="text-sm font-bold uppercase tracking-widest text-ink-tertiary mb-8 lg:hidden">
              Writings
            </h3>
            <div className="space-y-3">
              {blogs.map((blog) => (
                <Link
                  key={blog.slug}
                  href={`/blog/${blog.slug}`}
                  className="group block"
                >
                  <div className="exp-card flex flex-col sm:flex-row gap-4">
                    {/* Date column */}
                    <div className="sm:w-28 shrink-0 pt-0.5">
                      <time className="text-xs font-semibold uppercase tracking-wider text-ink-tertiary">
                        {new Date(blog.date + "T00:00:00").toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                    {/* Content */}
                    <h4 className="flex-1 text-base font-semibold text-ink group-hover:text-warm transition-colors inline-flex items-center gap-1.5">
                      {blog.title}
                      <svg className="w-4 h-4 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-200" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── Footer ── */}
          <footer className="pt-12 border-t border-border">
            <p className="text-sm text-ink-tertiary leading-relaxed max-w-md">
              Built with{" "}
              <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="text-ink-secondary hover:text-warm transition-colors">Next.js</a>
              {" "}and{" "}
              <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="text-ink-secondary hover:text-warm transition-colors">Tailwind CSS</a>
              . All text set in the{" "}
              <a href="https://rsms.me/inter/" target="_blank" rel="noopener noreferrer" className="text-ink-secondary hover:text-warm transition-colors">Inter</a>
              {" "}and{" "}
              <a href="https://fonts.google.com/specimen/Lora" target="_blank" rel="noopener noreferrer" className="text-ink-secondary hover:text-warm transition-colors">Lora</a>
              {" "}typefaces.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
