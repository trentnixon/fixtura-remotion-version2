# Theme-Aware Image Overlay System Guide

This guide explains how to use the enhanced image overlay system that integrates with your theme palette.

## Overview

The theme-aware overlay system automatically uses colors from your theme palette to create visually consistent backgrounds. It pulls colors from your theme's:

- `background` section (main, light, dark, accent, etc.)
- `container` section
- `text` sections
- Gradients from `background.gradient`

## Using Theme Colors in Template Variations

### Automatic Theme Color Usage

When you don't specify explicit colors, the system will automatically use appropriate colors from your theme:

```javascript
{
  "Background": "Image",
  "Image": {
    "url": "https://example.com/your-image.jpg",
    "effectType": "zoom",
    "overlayStyle": "solid", // Will use theme.background.main automatically
    "overlayOpacity": 0.5
  }
}
```

### Theme-Based Overlay Presets

You can use any of these theme-based overlay presets in your template variations:

```javascript
{
  "Background": "Image",
  "Image": {
    "url": "https://example.com/your-image.jpg",
    "effectType": "kenBurns",
    "overlayPreset": "primaryGradient" // Use theme-based preset
  }
}
```

Available theme presets:

- **Solid Color Presets**:

  - `primarySolid`: Uses background.main
  - `primaryLight`: Uses background.light
  - `primaryDark`: Uses background.dark
  - `accentSolid`: Uses background.accent
  - `primaryFaint`: Primary color at low opacity
  - `primaryStrong`: Primary color at high opacity

- **Gradient Presets**:

  - `primaryGradient`: Main to light gradient
  - `primaryToAccent`: Main to accent gradient
  - `accentToPrimary`: Accent to main gradient
  - All gradients from your theme are also available as presets

- **Effect Presets**:

  - `primaryVignette`: Vignette using primary dark color
  - `accentVignette`: Vignette using accent color
  - `darkVignette`: Dark vignette
  - `primaryDuotone`: Duotone effect using theme colors
  - `accentDuotone`: Duotone effect using accent colors
  - `warmFilter`: Warm color filter
  - `coolFilter`: Cool color filter
  - `softGlow`: Subtle radial glow using theme colors

- **Special Presets** (if available in your theme):

  - `meshGradient`: Complex gradient with multiple colors
  - `hardStopGradient`: Hard-stop gradient with theme colors
  - `primaryAdvancedGradient`: Uses advanced gradient settings

- **Team Color Presets** (if team colors are available):
  - `teamPrimary`: Uses team's primary color
  - `teamGradient`: Gradient using team's colors

## Example Template Variations

### 1. Simple Primary Color Overlay with Zoom

```javascript
{
  "Background": "Image",
  "Image": {
    "url": "https://example.com/your-image.jpg",
    "effectType": "zoom",
    "zoomDirection": "in",
    "zoomIntensity": 1.2,
    "overlayPreset": "primarySolid"
  }
}
```

### 2. Theme Gradient with Ken Burns Effect

```javascript
{
  "Background": "Image",
  "Image": {
    "url": "https://example.com/your-image.jpg",
    "effectType": "kenBurns",
    "zoomDirection": "in",
    "panDirection": "left",
    "overlayPreset": "primaryToAccent",
    "overlayOpacity": 0.6, // Override preset opacity
    "overlayBlendMode": "overlay" // Override preset blend mode
  }
}
```

### 3. Using Theme Gradient Directly

```javascript
{
  "Background": "Image",
  "Image": {
    "url": "https://example.com/your-image.jpg",
    "effectType": "none",
    "overlayPreset": "primaryAdvancedGradient", // Uses your theme's advanced gradient
    "overlayBlendMode": "soft-light"
  }
}
```

### 4. Vignette Effect with Team Colors

```javascript
{
  "Background": "Image",
  "Image": {
    "url": "https://example.com/your-image.jpg",
    "effectType": "breathing",
    "breathingIntensity": 1.05,
    "overlayStyle": "vignette",
    // No color specified, will use team primary color if available or fall back to theme colors
    "vignetteSize": 180,
    "vignetteShape": "circle",
    "overlayOpacity": 0.7
  }
}
```

### 5. Duotone Effect with Theme Colors

```javascript
{
  "Background": "Image",
  "Image": {
    "url": "https://example.com/your-image.jpg",
    "effectType": "focusBlur",
    "blurDirection": "in",
    "overlayPreset": "primaryDuotone"
  }
}
```

## Working with Color Palettes

The theme palette you provided (primaryOnWhite) has been integrated with the overlay system. Here's how different parts of your palette map to overlay presets:

### From Your Background Colors

```json
"background": {
  "main": "#043666",
  "light": "#065097",
  "dark": "#021c35",
  "contrast": "#FFFFFF",
  "accent": "white"
}
```

- `primarySolid` uses `background.main` (#043666)
- `primaryLight` uses `background.light` (#065097)
- `primaryDark` uses `background.dark` (#021c35)
- `accentSolid` uses `background.accent` (white)

### From Your Gradients

Your palette includes multiple gradient definitions that are all available as presets:

- `
