# Folder Overview

Thin wrappers around `@remotion/transitions` for applying transitions between sequences or around a single child. Maps declarative props to TransitionSeries and TransitionPresentation.

## Skill

- `.skills/architecture/components-transitions-folder.md` – TransitionWrapper, TransitionSeriesWrapper; linear vs spring timing

## Files

- **`index.ts`**: barrel export for TransitionWrapper, TransitionSeriesWrapper
- **`TransitionWrapper.tsx`**: wraps single child in TransitionSeries.Sequence + TransitionSeries.Transition; props: transitionType (slide|fade|wipe|clockWipe|flip|none), direction, timing (linear|spring), width, height
- **`TransitionSeriesWrapper.tsx`**: renders array of { content, durationInFrames } with transitions between each; same props as TransitionWrapper

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: `@remotion/transitions` (slide, fade, wipe, clockWipe, flip, none)
- Consumed by: compositions, templates, layout (between-scene motion)

## Dependencies

- Internal: none
- External: React, Remotion, @remotion/transitions
