"use client";

import FadeUp from "./FadeUp";

export default function DailyLog({ logs }) {
  return (
    <section id="log" className="py-20 md:py-28">
      <FadeUp>
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-ink mb-10">
          Daily Log
        </h2>
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {logs.map((log, i) => (
          <FadeUp key={log.date} delay={i * 0.06}>
            <div className="group p-6 bg-surface-card rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300">
              <time className="text-sm font-semibold text-warm">
                {new Date(log.date + "T00:00:00").toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <p className="mt-3 text-[15px] text-ink-secondary leading-relaxed">
                {log.content}
              </p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
