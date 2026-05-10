---
title: "Why Attention is Not Explanation"
date: "2026-05-09"
---

## The Intuition

Attention weights in transformer models are often treated as explanations — "the model paid attention to *this* word, so *this* word must be important." This is dangerously misleading.

Jain & Wallace (2019) showed that attention weights frequently do not correlate with gradient-based feature importance measures. You can permute attention weights significantly and still get the same prediction. If attention were truly an explanation, this should be impossible.

## Why This Matters for Aegis

When building Aegis, I needed a way to decide which KV cache entries to evict. The naive approach would be: "just evict tokens with low attention scores." But if attention ≠ importance, this fails catastrophically.

Consider a sentence like:

> "The capital of France, which is known for the Eiffel Tower and its rich cultural history spanning many centuries of European civilization, is Paris."

A sliding window approach deletes the earliest tokens — including "The capital of France." An attention-based approach might keep "Eiffel Tower" (high attention) but drop "France" (distributed attention). Both lose the needle.

## The Aegis Approach

Instead of raw attention, Aegis computes a composite relevance score:

$$S_i = \alpha \cdot A_i + \beta \cdot \Delta H_i + \gamma \cdot R_i$$

Where:
- $A_i$ is the normalized attention accumulation across layers
- $\Delta H_i$ is the information entropy delta — how much removing token $i$ changes the output distribution
- $R_i$ is a recency-weighted positional factor

This means semantically critical tokens like "France" and "Paris" survive eviction even if their raw attention scores are modest, because their removal would cause high entropy shift in the output.

## The Takeaway

Attention is a *mechanism*, not an *explanation*. Building systems that treat it as ground-truth importance will silently degrade on long-context tasks. Aegis sidesteps this by measuring what actually matters: the causal impact of each token on the output distribution.

## References

- Jain, S., & Wallace, B. C. (2019). *Attention is not Explanation.* NAACL.
- Wiegreffe, S., & Pinter, Y. (2019). *Attention is not not Explanation.* EMNLP.
- Zhang, Z., et al. (2023). *H2O: Heavy-Hitter Oracle for Efficient Generative Inference.* NeurIPS.
