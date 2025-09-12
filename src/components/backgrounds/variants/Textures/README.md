## Textures Background

Tiled texture images with a color or gradient overlay in configurable blend modes. Supports direct URLs or assets under `public/textures` by name.

### Component

- `Textures/TextureBackground.tsx`
  - Preloads the image with `<Img>` so Remotion waits for it.
  - Texture is rendered as CSS background for tiling.
  - Overlay supports solid color or gradient with `mix-blend-mode`.

### Props (TextureBackgroundProps)

- `type`: "texture"
- `src?` / `name?` / `url?`: Texture source (priority: url > src > name)
  - `url?`: Direct URL to texture image
  - `src?`: Alternative URL source
  - `name?`: Maps to `public/textures/<name>` or can be direct URL/path
- `position?`, `size?`, `repeat?`, `scale?`: Standard background properties
  - `repeat?`: `no-repeat | repeat | repeat-x | repeat-y | cover`
  - `cover`: Maps to `no-repeat` with `cover` background-size
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
    "name": "Cricket_Pitch_Dry_Soil_Granular",
    "url": "https://fixtura.s3.ap-southeast-2.amazonaws.com/Cricket_Pitch_Dry_Soil_Granular_25b12ac62f.png",
    "repeat": "cover",
    "scale": "100%",
    "overlay": {
      "opacity": 0.8,
      "blendMode": "multiply"
    }
  }
}
```

### Notes

- Priority order: `url` > `src` > `name`
- `url` takes precedence over `src` and `name` if provided
- `name` resolves to `/textures/${name}` served from `public/textures` unless it's a URL/path
- `repeat: "cover"` maps to `background-repeat: no-repeat` with `background-size: cover`
- Use `gradientCss` to pass a complete CSS gradient and override type/direction/colors.
