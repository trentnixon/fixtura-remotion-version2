## Container Examples

A set of ready-made examples demonstrating `AnimatedContainer` usage and the animation system.

### File

- `AnimatedContainerExamples.tsx`
  - `BasicContainer`, `FadeInContainer`, `FadeInOutContainer`, `SlideInContainer`, `SlideInOutContainer`, `ScaleContainer`, `SpringContainer`, `FlipContainer`, `RevealContainer`
  - `SequencedContainers` — multiple containers staggered via Remotion `Sequence`
  - `AnimationShowcase` — renders all animation types in grouped sections
  - `SpringConfigShowcase` — renders spring variants using each preset config
- `index.ts` — Re-exports for ergonomic importing

### Usage

```tsx
import { AnimationShowcase, SpringConfigShowcase } from "./examples";
```
