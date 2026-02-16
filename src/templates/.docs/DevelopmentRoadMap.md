# Development Roadmap – Templates

## ✅ Completed

- [x] Initial folder structure: base, types, variants, registry
- [x] Per-folder readMe coverage in .docs (base, types, variants and subfolders)

## ⏳ To Do (easy → hard)

1. ~~Add per-folder readMe.md coverage~~ (done — base, types, variants; all in .docs)
2. Document template composition contract in `types` (settings, assets, animations)
3. Describe common base layout responsibilities and extension points
4. Add guidance for creating new variants from base
5. Audit and document cross-dependencies with `src/components` and `src/core`
6. Add examples for theme overrides and per-variant styling
7. Create diagrams of composition flow from registry → variant → base

## 💡 Recommendations

- Keep `readMe.md` files in `.docs/` per repo rules; written for LLMs: roles, relations, dependencies only
- Co-locate any example JSON in `testData` and reference from docs
- When adding variants, ensure consistent file naming and `index.tsx` exports
- Consider a lightweight generator script to scaffold new variants from base
