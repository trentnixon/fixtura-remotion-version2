# Folder Overview

Generic animation variant presets and config normalizer for lightweight, non–frame-accurate contexts. Intentionally minimal — no Remotion-specific APIs.

## Files

- **`variants.ts`**: AnimationVariant union (fadeIn, fadeOut, slideIn, slideOut, zoomIn, zoomOut, bounce, pulse); AnimationConfig interface (duration, delay, easing, keyframes, initialStyles, finalStyles); `getAnimationConfig(variant, duration?, delay?)` — returns normalized config with initial/final styles

## Relations

- Parent folder: [../.docs/readMe.md](../.docs/readMe.md)
- Key dependencies: none
- Consumed by: documented as generic helper; domain-specific consumers use containers/images/typography animation systems

## Dependencies

- Internal: none
- External: React (CSSProperties)

## When to Use

- Quick initial/final style presets without per-frame logic
- Composing CSS/inline transitions outside the Remotion graph

For frame-accurate Remotion animation, use `../../containers/animations/`, `../../images/config/`, or `../../typography/config/animations/`.
