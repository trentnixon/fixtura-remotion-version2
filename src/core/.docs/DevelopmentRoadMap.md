# Development Roadmap – Core

## ✅ Completed

- [x] Established core contexts (Theme, Layout, Animation, VideoData, Font, Style)
- [x] Implemented color system utilities and standardized palette generation
- [x] Added core types for data and sport-specific schemas

## ⏳ To Do (easy → hard)

1. Add per-folder readMe.md coverage for components, context, types, utils
2. Document context value shapes and provider usage with examples
3. Consolidate duplicate color utilities between `colorSystem` and `createThemeUtils`
4. Create a guide for extending data schemas and mapping to compositions
5. Add performance guidance for heavy utils (memoization, caching strategies)
6. Improve developer ergonomics for palette/design utilities (clear presets, examples)

## 💡 Recommendations

- Keep docs LLM-focused: roles, relations, dependencies only
- Prefer centralizing color logic in `colorSystem` and re-export via `createThemeUtils`
- Co-locate example JSON under `testData` and reference from docs
- Consider lightweight benchmarks for palette and gradient generators
