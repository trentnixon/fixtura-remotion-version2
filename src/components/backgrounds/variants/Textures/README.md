## Textures Background

Tiled texture images with a color or gradient overlay in configurable blend modes. Supports direct URLs or assets under `public/textures` by name.

### Component

- `Textures/TextureBackground.tsx`
  - Preloads the image with `<Img>` so Remotion waits for it.
  - Texture is rendered as CSS background for tiling.
  - Overlay supports solid color or gradient with `mix-blend-mode`.

### Props (TextureBackgroundProps)

- `type`: "texture"
- `src?` / `name?`: Texture source (direct URL or `public/textures/<name>`)
- `position?`, `size?`, `repeat?`, `scale?`: Standard background properties
- `overlay?`:
  - `style?`: `solid | gradient` (default `solid`)
  - `color?`: Solid overlay color (default theme background main)
  - `opacity?`: 0..1 (default `0.35`)
  - `blendMode?`: blend mode (default `multiply`)
  - `gradientCss?`: Full CSS gradient string (takes precedence)
  - `gradientType?`: `linear | radial | conic` (used if no `gradientCss`)
  - `gradientDirection?`: e.g., `to right`, `45deg` (linear/conic)
  - `gradientColors?`: Array of colors; falls back to theme background main/accent

### Template Variation

```json
{
  "useBackground": "Texture",
  "texture": {
    "name": "Gemini_Stone.png",
    "repeat": "repeat",
    "scale": "50%",
    "overlay": {
      "style": "gradient",
      "opacity": 0.4,
      "blendMode": "multiply",
      "gradientType": "linear",
      "gradientDirection": "to bottom right",
      "gradientColors": ["#0b1220", "#243b55"]
    }
  }
}
```

### Notes

- If both `src` and `name` are provided, `src` takes precedence.
- `name` resolves to `/textures/${name}` served from `public/textures`.
- Use `gradientCss` to pass a complete CSS gradient and override type/direction/colors.
