# Folder Overview

Theme-aware overlay system for ImageBackground. Composes visual layers (solid, gradient, vignette, duotone, pattern, colorFilter) on top of image effects. Typed configs and factory helpers.

## Files

- **`index.ts`**: OverlayStyle, BlendMode; SolidOverlayConfig, GradientOverlayConfig, VignetteOverlayConfig, DuotoneOverlayConfig, PatternOverlayConfig, ColorFilterOverlayConfig; createSolidOverlay, createGradientOverlay, createVignetteOverlay, createDuotoneOverlay, createPatternOverlay, createColorFilterOverlay
- **`OverlayRenderer.tsx`**: renders overlay layer(s); animateOpacity (breathing); mix-blend-mode; style-specific logic per overlay type
- **`themeIntegration.ts`**: theme/palette color derivation when overlay colors omitted

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: theme palette (for default colors)
- Consumed by: ImageBackground (index.tsx)

## Dependencies

- Internal: none
- External: React
