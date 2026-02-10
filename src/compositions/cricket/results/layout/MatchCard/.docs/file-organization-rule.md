# File Organization Rule

## Rule: Component Placement in Parent Folders

**Date Created:** 2026-02-08

### Principle

When creating new variant-specific components for match cards, place them in the **appropriate existing parent folder** rather than creating new root-level folders.

### Structure Rules

1. **Header Components** → Place in `MatchHeader/` folder
   - Example: `MudgeerabaClubHeader` → `MatchHeader/MudgeerabaClubHeader.tsx`

2. **Status Components** → Place in `MatchStatus/` folder
   - Example: `MudgeerabaStatusFooter` → `MatchStatus/MudgeerabaStatusFooter.tsx`

3. **Team Section Components** → Place in `TeamsSection/` folder
   - Example: `MudgeerabaTeamsSection` → `TeamsSection/MudgeerabaTeamsSection.tsx`

4. **Common/Shared Components** → Place in `_common/` folder
   - Only create `_common/` if components are used by multiple sections
   - Example: Shared utilities, dividers used across multiple card types

5. **Divider/Separator Components** → Place in appropriate section folder or `_common/` if truly shared
   - If Mudgeeraba-specific: Place in `MatchHeader/` or relevant section
   - If used across multiple variants: Place in `_common/`

### File Naming Convention

- Component files: `ComponentName-Mudgeeraba.tsx` or `MudgeerabaComponentName.tsx`
- Keep variant-specific files alongside base components in the same folder
- Use descriptive names that indicate both purpose and variant

### Examples

**Correct:**
```
MatchHeader/
  ├── MatchHeader.tsx (base)
  ├── MudgeerabaClubHeader.tsx (variant-specific)
  └── _types/
      └── MudgeerabaClubHeaderProps.ts
```

**Incorrect:**
```
Sections/
  ├── MatchHeader/
  └── MudgeerabaClubHeader/  ❌ (new root folder)
```

### Benefits

- Maintains existing folder structure
- Easier to find related components
- Reduces folder nesting
- Follows established patterns in codebase
