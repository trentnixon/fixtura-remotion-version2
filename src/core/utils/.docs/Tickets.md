# Completed Tickets Index

- (none yet)

---

## Active Tickets

---

## TKT-2025-009: Reorganize Utils Root Files into Category Folders

---
ID: TKT-2025-009
Status: Draft
Priority: High
Owner: Development Team
Created: 2025-02-16
Updated: 2025-02-16
Related: Roadmap-Utils-Cleanup
---

### Overview

Move root-level utility files into logical category folders to improve discoverability and maintainability. Keep barrel exports or re-exports for backward compatibility during transition.

### What We Need to Do

Create category subfolders and relocate files according to their domain. Update imports incrementally.

### Phases & Tasks

#### Phase 1: Create Folder Structure

##### Tasks

- [ ] Create `general/` folder for classNames, copy, objectUtils
- [ ] Create `composition/` folder for routing, compositionMapping, PlaceholderComponent
- [ ] Create `data/` folder for dataProcessing, datasetProcessing
- [ ] Add `.docs/readMe.md` for each new folder

#### Phase 2: Move General Utilities

##### Tasks

- [ ] Move `classNames.ts` → `general/classNames.ts`
- [ ] Move `copy.ts` → `general/copy.ts`
- [ ] Move `objectUtils.ts` → `general/objectUtils.ts`
- [ ] Create `general/index.ts` barrel export
- [ ] Add backward-compat re-export at utils root: `export * from "./general"`

#### Phase 3: Move Composition Utilities

##### Tasks

- [ ] Move `routing.tsx` → `composition/routing.tsx`
- [ ] Move `compositionMapping.ts` → `composition/compositionMapping.ts`
- [ ] Move `PlaceholderComponent.tsx` → `composition/PlaceholderComponent.tsx`
- [ ] Create `composition/index.ts` barrel export
- [ ] Add backward-compat re-export at utils root

#### Phase 4: Move Data Utilities

##### Tasks

- [ ] Move `dataProcessing.ts` → `data/dataProcessing.ts`
- [ ] Move `datasetProcessing.ts` → `data/datasetProcessing.ts`
- [ ] Create `data/index.ts` barrel export
- [ ] Add backward-compat re-export at utils root

#### Phase 5: Update Imports

##### Tasks

- [ ] Update imports in AnimatedContainer, MatchHeader, Round_Ground (classNames)
- [ ] Update imports in OneColumn, TwoColumn (routing)
- [ ] Update imports in CompositionEntry (datasetProcessing)
- [ ] Update imports in Root (environment)
- [ ] Audit and fix any remaining direct imports

### Constraints, Risks, Assumptions

- **Risk**: Many files reference utils; use backward-compat re-exports initially
- **Assumption**: Environment, images can remain at root or move in a later phase

---

## TKT-2025-010: Consolidate Color Utilities (colors.ts vs colorSystem)

---
ID: TKT-2025-010
Status: Draft
Priority: Medium
Owner: Development Team
Created: 2025-02-16
Updated: 2025-02-16
Related: Roadmap-Utils-Cleanup, Core Roadmap Item 3
---

### Overview

`colors.ts` in utils root duplicates functionality from colorSystem (getContrastColor, lightenColor, darkenColor, etc.). Per Core roadmap: prefer centralizing color logic in colorSystem.

### What We Need to Do

Audit colors.ts usage, migrate callers to colorSystem, deprecate or re-export from colorSystem.

### Phases & Tasks

#### Phase 1: Audit

##### Tasks

- [ ] Grep for imports of utils/colors
- [ ] Document which exports from colors.ts are used and where
- [ ] Map colors.ts exports to colorSystem equivalents

#### Phase 2: Migrate

##### Tasks

- [ ] Update callers to use colorSystem (or createThemeUtils) exports
- [ ] Add re-export in utils for backward compat if needed: `export { getContrastColor, lightenColor, ... } from "./colorSystem"`
- [ ] Deprecate or remove colors.ts

### Constraints, Risks, Assumptions

- **Constraint**: colors.ts may use ColorThief or other libs not in colorSystem—verify overlap
- **Reference**: Core DevelopmentRoadMap item 3

---

## TKT-2025-011: Consolidate themeColorUtils with colorSystem/designPalettes

---
ID: TKT-2025-011
Status: Draft
Priority: Medium
Owner: Development Team
Created: 2025-02-16
Updated: 2025-02-16
Related: Roadmap-Utils-Cleanup
---

### Overview

`themeColorUtils.ts` provides `getPaletteColor` and similar helpers. Used by themeIntegration (Image overlays). Consider moving into colorSystem, designPalettes, or a dedicated theme/ folder.

### What We Need to Do

Relocate themeColorUtils to a coherent home and update the single consumer (themeIntegration).

### Phases & Tasks

#### Phase 1: Decide Location

##### Tasks

- [ ] Evaluate: move to colorSystem/utils, designPalettes, or utils/theme/
- [ ] Document decision in ticket

#### Phase 2: Migrate

##### Tasks

- [ ] Move file to chosen location
- [ ] Update import in themeIntegration.ts
- [ ] Add backward-compat re-export if needed

### Constraints, Risks, Assumptions

- **Constraint**: themeColorUtils imports DesignPalette from StyleContext; verify no circular deps

---

## TKT-2025-012: Split general.ts and Relocate Sponsor Utils

---
ID: TKT-2025-012
Status: Draft
Priority: Low
Owner: Development Team
Created: 2025-02-16
Updated: 2025-02-16
Related: Roadmap-Utils-Cleanup
---

### Overview

`general.ts` mixes sponsor-related utils (hasSponsors, getPrimarySponsor, groupSponsors, calculateImgSize) with no clear home. `copy.ts` has formatting utilities (calculateLetterSpacing, restrictString). Consider splitting and relocating.

### What We Need to Do

- Move sponsor utils to a sponsor-specific location (e.g. compositions/cricket/sponsorFooter/utils or core/utils/sponsors)
- Keep or merge copy.ts formatting into general/
- Ensure helpers.ts (which uses general) is updated

### Phases & Tasks

#### Phase 1: Audit Dependencies

##### Tasks

- [ ] Trace imports of general.ts (helpers.ts uses hasSponsors)
- [ ] Trace imports of copy.ts

#### Phase 2: Split and Relocate

##### Tasks

- [ ] Create sponsors utils folder or move to sponsorFooter
- [ ] Move sponsor functions from general.ts
- [ ] Update helpers.ts and any other consumers
- [ ] Remove or repurpose general.ts

### Constraints, Risks, Assumptions

- **Assumption**: general.ts name is misleading (mostly sponsors); rename or split for clarity
