# Skill: Core Hooks Folder

## Purpose

Guides working with `src/core/hooks`: placeholder for shared React hooks that access core contexts and helpers. Use when adding hooks that wrap ThemeContext, LayoutContext, AnimationContext, or VideoDataContext for reuse across templates and components.

## Applies To

- `src/core/hooks/` (root)
- Intended for: useTheme, useLayout, useAnimation, useVideoData (or similar wrappers)
- Consumers: templates, components, utils that need context access

## Inputs

- Folder readMe: `hooks/.docs/readMe.md`
- core/context (ThemeContext, VideoDataContext, etc.)

## Process

### 1. Current State

- **Empty**: No hooks defined yet; placeholder for future shared hooks
- Context access is currently done via direct `useThemeContext()`, `useVideoDataContext()`, etc.

### 2. When to Add a Hook Here

| Add to core/hooks | Keep inline |
|-------------------|-------------|
| Wrapper used by 3+ consumers | One-off context usage |
| Combines multiple contexts | Single context access |
| Adds derived state or memoization | Direct context read |
| Shared selector (e.g. useActivePalette) | Per-component logic |

### 3. Guidelines for Adding Hooks

1. Create hook file (e.g. `useActivePalette.ts`, `useVideoData.ts`)
2. Wrap existing context hooks; add derived state if needed
3. Export from hooks/index.ts
4. Update hooks readMe (Files)
5. Document when to use vs direct context access

### 4. Example Hook Shapes

- `useActivePalette()` → palette from ThemeContext for current mode
- `useVideoMetadata()` → video metadata from VideoDataContext
- `useLayoutHeights()` → header/content heights from ThemeContext.layout

### 5. Dependencies

- Internal: context (ThemeContext, VideoDataContext, etc.)
- External: React

## Output

- Clear guidelines for when to add shared hooks
- Ability to add hooks when reuse warrants it

## Rules

- Hooks must consume core/context; do not add hooks that duplicate context logic
- Keep hooks stateless wrappers; avoid heavy computation without memoization

## References

- hooks: `src/core/hooks/.docs/readMe.md`
- Parent: `core-folder-structure.md`
- context: `core-context-folder.md`
