# Components Directory Map — Detailed Reference

Detailed directory map, component deep-dives, and usage examples. For the standard folder contract, see [readMe.md](readMe.md).

---

## Directory Map

- `animations/config/variants.ts`: Small helper for generic animation variant configs
- `backgrounds/`: All background systems (solid, gradient, image, video, noise, particles, patterns, animated)
- `containers/`: The polymorphic AnimatedContainer plus animation utilities, styles, modules, and examples
- `easing/`: Shared easing types and mapping utilities
- `images/`: Animated image component and a rich animation system for images
- `layout/`: Page-level layout building blocks (headers, title screens, screen wrappers)
- `transitions/`: Thin wrappers around `@remotion/transitions` for sequences and transitions
- `typography/`: Animated typography with theme-aware styles and variants
- `ui/`: Reserved for future UI atoms/molecules (currently empty)

---

## backgrounds/

- See [backgrounds/.docs/readMe.md](../backgrounds/.docs/readMe.md)
- Child docs: NoiseBackground, Image/variants, Image/overlays, Textures

---

## containers/

- See [containers/.docs/readMe.md](../containers/.docs/readMe.md)
- AnimatedContainer: type, size, rounded, shadow, backgroundColor, animation, exitAnimation, exitFrame

---

## images/

- See [images/.docs/readMe.md](../images/.docs/readMe.md)
- AnimatedImage: entry/exit animations, aspect ratio, fallbacks

---

## typography/

- See [typography/.docs/readMe.md](../typography/.docs/readMe.md)
- AnimatedText: type, variant, letterAnimation, entry/exit animations

---

## layout/

- See [layout/.docs/readMe.md](../layout/.docs/readMe.md)
- screen/OneColumn, main/header, titleScreen, sponsors

---

## How these parts work together

- **Theme + Data**: Components query ThemeContext (palette, component styles, typography scales) and VideoDataContext (template variation settings).
- **Animation**: All animation is frame-driven using interpolate, spring helpers, and easing mapping.
- **Composability**: Layout components compose AnimatedContainer, AnimatedText, AnimatedImage, and Backgrounds. Transitions wrap sequences for between-scene motion.

---

## Example usage snippets

Select a background: `<SelectTemplateBackground />`

Animated container:
```tsx
<AnimatedContainer type="card" backgroundColor="light" rounded="lg" shadow="md"
  animation="slideInRight" animationDuration={30}
  exitAnimation="slideOutRight" exitFrame={120}>
  <Typography>Slide Animated Container</Typography>
</AnimatedContainer>
```

Animated image:
```tsx
<AnimatedImage src={logoUrl} animation={{ type: "fadeIn", duration: 30 }}
  exitAnimation={{ type: "fadeOut", duration: 30 }} exitFrame={90}
  width={200} height={200} />
```

Header variant:
```tsx
<VerticalHeaderTitleLogoName alignment="center"
  Title={<AnimatedText type="title">Grand Final</AnimatedText>}
  Logo={<img src={logo} />}
  Name={<AnimatedText type="subtitle">Premier League</AnimatedText>} />
```
