# 02 — Required/optional scalar binds and fail-closed hydration

**Status:** Completed

- [x] Optional bind entries do not throw when data or nodes absent
- [x] Hydration returns success/failure; initializer skips data-dependent steps on failure
- [x] Error banner identifies variant/sport/asset and failing bind or fixture
- [x] Duplicate-key parse helper fails on duplicate bind JSON keys
- [x] Vitest covers bind policy and duplicate JSON helper

**Completion:** `hydrate-core.js`, `bind-json.js`, `hydrate.js`, `init-template.js`, vitest.
