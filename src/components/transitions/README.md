## Transitions

Thin wrappers around `@remotion/transitions` to simplify applying transitions between sequences or around a single child sequence.

### Files

- `index.ts`: Barrel export for the two wrappers below.
- `TransitionWrapper.tsx`:
  - Wraps a single child block in a `TransitionSeries.Sequence` and appends one `TransitionSeries.Transition`.
  - Props:
    - `transitionType`: `"slide" | "fade" | "wipe" | "clockWipe" | "flip" | "none"`
    - `direction`: `"from-right" | "from-left" | "from-top" | "from-bottom"` (used by slide/wipe/flip)
    - `timing`: `{ type: "linear" | "spring", durationInFrames?, easing?, springConfig? }`
    - `width?`, `height?`: For `clockWipe` presentation sizing
  - Internals:
    - Maps `transitionType` to a `TransitionPresentation` (slide, fade, wipe, clockWipe, flip, none)
    - Maps `timing` to `linearTiming` or `springTiming`
    - Renders:
      - `TransitionSeries.Sequence` with `durationInFrames = timing.durationInFrames || 30`
      - `TransitionSeries.Transition` with the computed `presentation` and `timing`
- `TransitionSeriesWrapper.tsx`:
  - Renders an array of `{ content, durationInFrames }` with transitions inserted between each sequence.
  - Uses the same `transitionType`, `direction`, `timing`, `width`, and `height` contract as `TransitionWrapper`.

### Usage

Wrap a segment with a single transition after it:

```tsx
<TransitionWrapper
  transitionType="slide"
  direction="from-right"
  timing={{ type: "linear", durationInFrames: 30 }}
>
  <YourContent />
</TransitionWrapper>
```

Render multiple segments with transitions in between:

```tsx
<TransitionSeriesWrapper
  sequences={[
    { content: <First />, durationInFrames: 60 },
    { content: <Second />, durationInFrames: 90 },
  ]}
  transitionType="flip"
  direction="from-left"
  timing={{
    type: "spring",
    springConfig: { damping: 200, mass: 1, stiffness: 100 },
  }}
/>
```

### Notes

- `direction` has effect only for certain presentations (e.g., slide/wipe/flip).
- For non-interactive builds, prefer `springTiming` with stable configs to avoid excessive oscillation.
- Combine with higher-level layout/components to structure full scenes; these wrappers only manage between-segment motion.
