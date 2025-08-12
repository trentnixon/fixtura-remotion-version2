## Easing

Shared animation types and utilities for mapping declarative easing descriptors to actual Remotion easing functions.

### Files

- `types.ts`: Cross-package animation type definitions used by images, containers, and typography, including:
  - `ImageAnimationType`, `ImageEasingType`, `ImageSpringConfig`, `ImageAnimationConfig`, etc.
- `easingFunctions.ts`: `getImageEasingFunction(easing)` which returns a concrete `(t:number) => number` easing function.
  - Supports strings: `linear`, `ease`, `quad`, `cubic`, `sin`, `circle`, `exp`, `bounce`
  - Parameterized: `{ type: "poly", n }`, `{ type: "elastic", bounciness }`, `{ type: "back", s }`, `{ type: "bezier", values }`
  - Composed: `{ type: "in" | "out" | "inOut", base: ImageEasingType }`

### Usage

```ts
import { interpolate } from "remotion";
import { getImageEasingFunction } from "../easing/easingFunctions";

const progress = interpolate(frame, [0, 30], [0, 1], {
  easing: getImageEasingFunction({ type: "inOut", base: "cubic" }),
});
```

### Notes

- This module intentionally keeps types generic so they can be used by other domains (containers, typography) beyond images.
