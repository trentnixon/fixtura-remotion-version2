# Folder Overview

Category-specific animation calculators used internally by the container animation system. Prefer useAnimation; direct use for custom animation graphs.

## Files

- **`fadeAnimations.ts`**: opacity-only transitions
- **`slideAnimations.ts`**: translate X/Y by edge direction and progress
- **`scaleAnimations.ts`**: scale in/out, axis-specific
- **`perspectiveAnimations.ts`**: 3D-like transforms (flipX/Y, rotate3D, zoomPerspective, swing)
- **`springAnimations.ts`**: spring-in/out/scale/translate/rotate
- **`specialAnimations.ts`**: glitch, blur
- **`index.ts`**: barrel export

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: Remotion interpolate
- Consumed by: useAnimation, calculateAnimationStyles

## Dependencies

- Internal: none
- External: Remotion
