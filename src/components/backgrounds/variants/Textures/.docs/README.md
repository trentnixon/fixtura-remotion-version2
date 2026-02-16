# Folder Overview

Tiled texture images with color or gradient overlay in configurable blend modes. Supports URL, src, or name (resolved to public/textures). Uses mix-blend-mode (default multiply).

## Files

- **`TextureBackground.tsx`**: preloads with Img; texture as CSS background for tiling; overlay supports solid/gradient with mix-blend-mode

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: `core/context/ThemeContext`, `core/context/VideoDataContext`
- Consumed by: BackgroundComponents.Texture, SelectTemplateBackground

## Dependencies

- Internal: `core/context`
- External: React, Remotion (Img)

## Props (Template Variation)

- type, src/name/url, position, size, repeat, scale; overlay: style (solid|gradient), color, opacity, blendMode, gradientCss, gradientColors
