## Generic Animation Variants (Lightweight)

These helpers are intentionally minimal, providing lightweight variant presets and a normalizer for use in simple contexts that do not require frame-by-frame Remotion animation graphs.

### Files

- `variants.ts`
  - `AnimationVariant`: union of simple variants (fadeIn, fadeOut, slideIn/out, zoomIn/out, bounce, pulse)
  - `getAnimationConfig(variant, duration?, delay?)`: Returns an `AnimationConfig` with suggested `initialStyles` and `finalStyles`. Intended for quick, non-Remotion contexts or initial state composition.

### When to use

- You need quick initial/final style presets without per-frame logic
- You are composing CSS/inline transitions outside the Remotion graph

For frame-accurate animation in Remotion, use the domain-specific animation systems in:

- `components/images/config` (rich image animations)
- `components/containers/animations` (container motions)
- `components/typography/config/animations` (text motions)
