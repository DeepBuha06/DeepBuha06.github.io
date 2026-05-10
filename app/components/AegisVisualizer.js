"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TOKENS = [
  "The", "capital", "of", "France", ",", "which", "is", "known",
  "for", "the", "Eiffel", "Tower", "and", "its", "rich", "cultural",
  "history", ",", "is", "Paris",
];

/* Deterministic PRNG so server & client always agree */
function makeScores(seed) {
  const out = [];
  let s = seed;
  for (let i = 0; i < TOKENS.length; i++) {
    s = (s * 16807) % 2147483647;
    out.push(parseFloat(((s % 10000) / 10000).toFixed(2)));
  }
  return out;
}

const INITIAL_SEED = 42;

export default function AegisVisualizer() {
  const [scores, setScores] = useState(() => makeScores(INITIAL_SEED));
  const [evictedSet, setEvictedSet] = useState(new Set());
  const [didEvict, setDidEvict] = useState(false);

  const evict = useCallback(() => {
    const sorted = scores
      .map((s, i) => ({ s, i }))
      .sort((a, b) => a.s - b.s);
    setEvictedSet(new Set(sorted.slice(0, 5).map((x) => x.i)));
    setDidEvict(true);
  }, [scores]);

  const reset = useCallback(() => {
    const seed = Date.now() % 100000;
    setScores(makeScores(seed));
    setEvictedSet(new Set());
    setDidEvict(false);
  }, []);

  const SW_VICTIMS = new Set([0, 1, 2, 3, 4]);

  return (
    <div className="mt-5 bg-surface-card border border-border rounded-card overflow-hidden shadow-card">
      {/* Title bar */}
      <div className="px-4 py-2.5 bg-[#FAFAF8] border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-[7px] h-[7px] rounded-full bg-ink-faint/60" />
          <div className="w-[7px] h-[7px] rounded-full bg-ink-faint/40" />
          <div className="w-[7px] h-[7px] rounded-full bg-ink-faint/25" />
        </div>
        <span className="text-[10px] font-medium text-ink-tertiary tracking-wider uppercase">
          KV Cache Eviction
        </span>
        <div className="w-12" />
      </div>

      <div className="p-5">
        {/* Tokens */}
        <div className="flex flex-wrap gap-[5px] mb-6">
          {TOKENS.map((tok, i) => {
            const gone = evictedSet.has(i);
            const sc = scores[i];
            const alpha = 0.06 + sc * 0.55;
            const textAlpha = gone ? 0.2 : 0.35 + sc * 0.65;
            const borderAlpha = 0.08 + sc * 0.18;

            return (
              <motion.div
                key={i}
                animate={{
                  opacity: gone ? 0.3 : 1,
                  scale: gone ? 0.88 : 1,
                }}
                transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative"
              >
                <div
                  className="px-2 py-[5px] rounded-md text-center transition-colors duration-300"
                  style={{
                    background: gone
                      ? "rgba(0,0,0,0.03)"
                      : `rgba(139, 115, 85, ${alpha})`,
                    border: `1px solid rgba(139, 115, 85, ${gone ? 0.04 : borderAlpha})`,
                  }}
                >
                  <span
                    className="block text-[11px] font-mono leading-tight"
                    style={{
                      color: `rgba(29, 29, 31, ${textAlpha})`,
                      textDecoration: gone ? "line-through" : "none",
                      textDecorationColor: "rgba(0,0,0,0.15)",
                    }}
                  >
                    {tok}
                  </span>
                  <span
                    className="block text-[8px] font-mono mt-[2px] tabular-nums"
                    style={{
                      color: `rgba(139, 115, 85, ${gone ? 0.15 : 0.3 + sc * 0.4})`,
                    }}
                  >
                    {sc.toFixed(2)}
                  </span>
                </div>

                {/* Sliding-window marker */}
                <AnimatePresence>
                  {didEvict && SW_VICTIMS.has(i) && !gone && (
                    <motion.span
                      initial={{ opacity: 0, y: -3 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.5 }}
                      className="absolute -bottom-[14px] left-1/2 -translate-x-1/2 text-[8px] font-medium text-red-400/70"
                    >
                      ✕ SW
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Button */}
        <div className="flex items-center gap-3 pt-2 pb-4">
          <button
            onClick={didEvict ? reset : evict}
            className="px-5 py-[6px] text-[12px] font-medium rounded-full text-warm border border-warm/20 hover:bg-warm-bg hover:border-warm/30 transition-all duration-300"
          >
            {didEvict ? "↻ Reset" : "▶ Simulate Eviction"}
          </button>

          <AnimatePresence>
            {didEvict && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="text-[11px] text-ink-tertiary"
              >
                5 lowest-scored tokens evicted
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Caption */}
        <div className="border-t border-border pt-4">
          <p className="text-[12px] leading-[1.65] text-ink-secondary">
            {didEvict ? (
              <>
                <span className="font-semibold text-warm">Aegis</span> evicts
                semantically useless tokens.{" "}
                <span className="text-red-400/80 font-medium">Sliding window</span>{" "}
                would have deleted the first 5 — including{" "}
                <code className="text-[11px] bg-warm-bg px-1.5 py-0.5 rounded font-mono">
                  The capital of France
                </code>
              </>
            ) : (
              <span className="text-ink-tertiary">
                Each token has an importance score. Click to simulate which tokens Aegis would evict
                versus a naive sliding-window approach.
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
