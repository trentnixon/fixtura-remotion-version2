# Theme-Aware Image Overlay System Guide

This guide explains how to use and configure the theme-aware overlay system that integrates with your palette and template variations.

## Overview

The overlay system composes one or more visual layers on top of an image effect. It supports the following overlay styles via the `OverlayStyle` enum:

- `none`: No overlay
- `solid`: Solid color layer
- `gradient`: Linear or radial gradient layer
- `vignette`: Corner darkening (circle/ellipse) via inset box-shadow
- `duotone`: Two layers (shadow/highlight) blended to create a duotone feel
- `pattern`: Repeating image pattern over an optional background color
- `colorFilter`: Post-processing filter chain applied via `backdrop-filter`

These are strongly typed in `overlays/index.ts` with dedicated config interfaces and factory helpers.

## Overlay Config Types

- `SolidOverlayConfig`:

  - `style: "solid"`
  - `color: string`
  - `opacity: number`
  - `animateOpacity?: boolean`
  - `blendMode?: BlendMode`

- `GradientOverlayConfig`:

  - `style: "gradient"`
  - `primaryColor: string`, `secondaryColor: string`
  - `gradientAngle?: string` (for linear)
  - `gradientType?: "linear" | "radial"`
  - `opacity: number`
  - `animateOpacity?: boolean`
  - `blendMode?: BlendMode`

- `VignetteOverlayConfig`:

  - `style: "vignette"`
  - `color: string`
  - `size?: number` (px)
  - `shape?: "circle" | "ellipse"`
  - `opacity: number`
  - `animateOpacity?: boolean`

- `DuotoneOverlayConfig`:

  - `style: "duotone"`
  - `shadowColor: string`, `highlightColor: string`
  - `intensity?: number` (balance between shadow/highlight)
  - `opacity: number`
  - `animateOpacity?: boolean`

- `PatternOverlayConfig`:

  - `style: "pattern"`
  - `patternUrl: string`
  - `backgroundColor?: string`
  - `patternScale?: number`
  - `patternOpacity?: number`
  - `opacity: number`
  - `animateOpacity?: boolean`
  - `blendMode?: BlendMode`

- `ColorFilterOverlayConfig`:
  - `style: "colorFilter"`
  - `hueRotate?: number`, `saturate?: number`, `brightness?: number`, `contrast?: number`, `sepia?: number`
  - `opacity: number`
  - `animateOpacity?: boolean`

## Factory Helpers

Use helpers from `overlays/index.ts` to construct configs succinctly:

- `createSolidOverlay(color, opacity=0.3, blendMode=Normal)`
- `createGradientOverlay(primaryColor, secondaryColor, angle="135deg", opacity=0.3, blendMode=Normal)`
- `createVignetteOverlay(color="rgba(0,0,0,0.8)", size=150, opacity=0.7, shape="circle")`
- `createDuotoneOverlay(shadow="#222", highlight="#fff", intensity=0.8, opacity=0.85)`
- `createPatternOverlay(patternUrl, backgroundColor="rgba(0,0,0,0.5)", scale=1, opacity=0.3, blendMode=Multiply)`
- `createColorFilterOverlay(hue=0, sat=100, bright=100, contrast=100, sepia=0, opacity=1)`

## Rendering and Animation

`OverlayRenderer` renders the layer(s) and applies optional breathing-style opacity animation when `animateOpacity` is set:

- Opacity is modulated using a sin() function relative to frame/fps
- `mix-blend-mode` is used for solid/gradient/pattern layers when `blendMode` is provided
- Duotone uses two stacked layers: `multiply` for the shadow, `screen` for the highlight
- ColorFilter composes a `backdrop-filter` string (and `-webkit-` variant)

## Theme Integration

When overlay colors are omitted, `ImageBackground` derives them from your theme palette:

- `background` tokens (e.g., `main`, `light`, `dark`, `accent`)
- `container` tokens if `background` doesn’t supply a match
- Gradient presets from `background.gradient`

This allows template variations to specify minimal overlay config while staying visually consistent.

## Template Variation Usage

### Automatic Theme Color Usage

```json
{
  "Background": "Image",
  "Image": {
    "url": "https://example.com/your-image.jpg",
    "effectType": "zoom",
    "overlayStyle": "solid",
    "overlayOpacity": 0.5
  }
}
```

### Theme-Based Overlay Presets (Conceptual)

```json
{
  "Background": "Image",
  "Image": {
    "url": "https://example.com/your-image.jpg",
    "effectType": "kenBurns",
    "overlayPreset": "primaryToAccent"
  }
}
```

Presets can be mapped to factory-created configs using your palette’s gradient/color definitions.

## Examples

1. Solid accent tint with slide pan:

```json
{
  "Background": "Image",
  "Image": {
    "url": "https://example.com/your-image.jpg",
    "effectType": "pan",
    "panDirection": "left",
    "overlayStyle": "solid",
    "overlayColor": "rgba(255,255,255,0.85)",
    "overlayOpacity": 0.25,
    "overlayBlendMode": "overlay"
  }
}
```

2. Radial gradient over breathing effect:

```json
{
  "Background": "Image",
  "Image": {
    "url": "https://example.com/your-image.jpg",
    "effectType": "breathing",
    "overlayStyle": "gradient",
    "gradientType": "radial",
    "gradientAngle": "135deg",
    "overlayOpacity": 0.45,
    "animateOverlayOpacity": true
  }
}
```

3. Vignette with team primary color:

```json
{
  "Background": "Image",
  "Image": {
    "url": "https://example.com/your-image.jpg",
    "effectType": "none",
    "overlayStyle": "vignette",
    "vignetteSize": 180,
    "vignetteShape": "circle",
    "overlayOpacity": 0.7
  }
}
```

4. Duotone with theme colors:

```json
{
  "Background": "Image",
  "Image": {
    "url": "https://example.com/your-image.jpg",
    "effectType": "focusBlur",
    "overlayStyle": "duotone",
    "overlayOpacity": 0.85
  }
}
```

5. Pattern overlay with multiply blend:

```json
{
  "Background": "Image",
  "Image": {
    "url": "https://example.com/your-image.jpg",
    "effectType": "kenBurns",
    "overlayStyle": "pattern",
    "patternUrl": "/assets/patterns/dots.png",
    "patternScale": 0.75,
    "patternOpacity": 0.6,
    "overlayOpacity": 0.2,
    "overlayBlendMode": "multiply"
  }
}
```

6. Color filter overlay for a vintage look:

```json
{
  "Background": "Image",
  "Image": {
    "url": "https://example.com/your-image.jpg",
    "effectType": "none",
    "overlayStyle": "colorFilter",
    "hueRotate": 0,
    "saturate": 80,
    "brightness": 90,
    "contrast": 110,
    "sepia": 30,
    "overlayOpacity": 1
  }
}
```

## Links

- Parent: `../README.md`
- Main component: `../README.md` (Image Background)
