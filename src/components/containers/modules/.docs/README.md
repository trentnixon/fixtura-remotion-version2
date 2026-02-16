## Container Modules

Preconfigured wrapper components around `AnimatedContainer` for common animation patterns. Provide defaults and consistent naming.

### Files

- `fade.tsx` — `FadeIn`, `FadeOut`, `FadeInOut`, `FadeInSpring` + default configs
- `slide.tsx` — Slide in/out variants with directional control and spring translate helpers
- `scale.tsx` — Scale-in/out and axis-specific variants plus spring scale
- `reveal.tsx` — Reveal/collapse from edges
- `spring.tsx` — Spring primitives: in/out/scale/translate/rotate
- `threeD.tsx` — `FlipX`, `FlipY`, `Rotate3D`, `Swing`, `ZoomPerspective`, `Glitch`, `Blur`
- `index.ts` — Barrel

### Usage

```tsx
import { FadeIn, SlideInLeft, FlipX } from "./modules";

<FadeIn>...</FadeIn>
<SlideInLeft>...</SlideInLeft>
<FlipX>...</FlipX>
```

### Notes

- Use modules to standardize motion across compositions and reduce prop repetition.
