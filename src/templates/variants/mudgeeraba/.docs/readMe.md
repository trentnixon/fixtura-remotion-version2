# Folder Overview

Mudgeeraba variant: a template variant extending the base layout with custom theming and animations.

## Files

- `index.tsx`: Main entry point exporting the Mudgeeraba variant composition (composes BaseTemplate)
- `theme.ts`: Mudgeeraba-specific theme tokens and overrides (extends baseTheme)
- `animations.ts`: Animation presets used by Mudgeeraba components
- `components/`: All Mudgeeraba building blocks (Intro, Outro, Main, Background)

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: composes from `../../base`; uses `../../types` for config
- Consumed by: `../../registry.tsx`

## Dependencies

- Internal: `components`
- External: Remotion, React
