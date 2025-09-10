# Folder Overview

React contexts that provide global data and configuration for templates and compositions (theme, layout, animation, video data, fonts, styles).

## Files

- `AnimationContext.tsx`: exposes timing/easing and animation state
- `FontContext.tsx`: font loading status and font families
- `GlobalContext.tsx`: app-wide globals
- `LayoutContext.tsx`: layout slots, sizing, and responsive settings
- `StyleContext.tsx`: style tokens/overrides at runtime
- `ThemeContext.tsx`: resolved theme and palette
- `types/ThemeContextTypes.ts`: typing for theme-related context values
- `VideoDataContext.tsx`: normalized video data for compositions

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: consumed by `src/templates/*` and `src/components/*`
- Consumed by: providers mounted in app roots (e.g., `DevelopmentRoot`, `ProductionRoot`)

## Dependencies

- Internal: `types`
- External: React
