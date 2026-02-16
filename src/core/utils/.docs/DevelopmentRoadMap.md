# Development Roadmap – Utils

## 🎯 Current Focus

- Reorganize root-level files into logical categories
- Consolidate duplicate color logic
- Clean up code and improve discoverability

## ✅ Completed

- (none yet)

## ⏳ To Do (easy → hard)

1. Move root files into category folders (general, composition, data, theme) — see TKT-2025-009
2. Consolidate color utilities (colors.ts vs colorSystem) — see TKT-2025-010
3. Deprecate or merge themeColorUtils with colorSystem/designPalettes — see TKT-2025-011
4. Split general.ts (sponsor utils vs formatting) and relocate — see TKT-2025-012
5. Add readMe.md for each new category folder
6. Update all import paths across the codebase

## ⛔ Blocked / Waiting

- None

## 💡 Recommendations

- Create `general/` for classNames, copy, objectUtils (low-risk, high-value)
- Create `composition/` for routing, compositionMapping, PlaceholderComponent
- Create `data/` for dataProcessing, datasetProcessing
- Consolidate colors.ts into colorSystem or re-export from there
- Move sponsor-related utils from general.ts to compositions/cricket/sponsorFooter or a shared sponsors util
- Keep environment.ts, images.ts at root or in small dedicated folders
