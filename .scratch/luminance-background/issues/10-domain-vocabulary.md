# 10 — Domain vocabulary

**What to build:** CONTEXT.md entries for **Luminance background**, **Luminance map**, and **Foreground protection**, with avoid guidance for overloaded terms (e.g. do not use "overlay" for foreground protection).

**Blocked by:** 02 — Global background routing and first render path

**Status:** ready-for-agent

## Acceptance criteria

- [ ] CONTEXT.md defines **Luminance background** as a global background option alongside Image, Texture, and Gradient.
- [ ] CONTEXT.md defines **Luminance map** as tone-to-RGB lookup from theme preset or explicit stops.
- [ ] CONTEXT.md defines **Foreground protection** as scrim/vignette separate from the luminance map, sitting between mapped image and composition content.
- [ ] Each entry includes _Avoid_ guidance where terms collide with existing language (especially Image overlay semantics).
- [ ] No implementation details, file paths, or code snippets in CONTEXT.md entries.

## Verification commands

```bash
npm test
npm run lint
```

Expected: no code changes required beyond CONTEXT.md; existing suite remains green. Manually confirm three glossary entries present at repository CONTEXT.md.
