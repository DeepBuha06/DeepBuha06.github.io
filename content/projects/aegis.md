---
title: "Aegis"
tagline: "KV cache eviction that actually understands context"
description: "Interpretability-driven KV cache eviction for LLMs in C++. Beats H2O on NIAH benchmark on consumer GPU."
github: "https://github.com/DeepBuha06/aegis"
tag: "C++"
highlights:
  - "Beats H2O on Needle-in-a-Haystack benchmark"
  - "Runs on consumer-grade GPUs"
  - "Composite scoring — attention + entropy + recency"
  - "Built as a custom module for llama.cpp"
---

Aegis implements a composite relevance scoring function that combines attention accumulation, information entropy delta, and positional recency to decide which KV cache entries to evict.

Unlike sliding window approaches that blindly delete the oldest tokens, or attention-based methods like H2O that trust raw attention as importance, Aegis measures the causal impact of each token on the output distribution.

The result: semantic facts survive eviction even when their raw attention scores are modest, because removing them would cause high entropy shift in the model's output.
