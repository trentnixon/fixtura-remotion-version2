# Folder Overview

Effect-driven image background (zoom, pan, kenBurns, breathing, focusBlur, none) with theme-integrated overlays (solid, gradient, vignette, duotone, pattern, colorFilter). TemplateVariationAdapter normalizes legacy config; presets for quick setup.

## Files

- **`index.tsx`**: ImageBackground — reads video.templateVariation.image; adaptImageConfig; selects effect (ImageEffectType); OverlayConfig from theme/palette; renders AbsoluteFill + effect + OverlayRenderer
- **`TemplateVariationAdapter.ts`**: adaptImageConfig, mapEffectType, mapDirection; normalizes legacy template variation
- **`ImageBackground.types.ts`**: ImageEffectType, overlay enums, positions, sizes, directions
- **`ImageBackground.config.ts`**, **`ImageBackground.variants.tsx`**: config helpers, curated exports
- **`ImageBackground.presets.ts`**: presets (kenBurns_gentle_left_vignette, focus_dramatic_in_solid, etc.)
- **`variants/`**: zoom, pan, kenBurns, breath, blur, colorOverlay, combined; index exports ImageEffectType
- **`overlays/`**: OverlayStyle, OverlayConfig, OverlayRenderer; factory helpers (createSolidOverlay, createGradientOverlay, etc.)

## Child Modules

- **`variants/`**: effect components (zoom, pan, kenBurns, breath, blur, etc.)
- **`overlays/`**: OverlayRenderer, config types, theme integration

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: `core/context/ThemeContext`, `core/context/VideoDataContext`
- Consumed by: BackgroundComponents.Image, SelectTemplateBackground

## Dependencies

- Internal: `core/context`, `variants/`, `overlays/`
- External: React, Remotion (Img, interpolate, useCurrentFrame)
