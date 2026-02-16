# Skill: Components Transitions Folder

## Purpose

Guides working with `src/components/transitions`: understanding thin wrappers around @remotion/transitions for applying transitions between sequences or around a single child. Use when adding or configuring between-scene motion in compositions.

## Applies To

- `src/components/transitions/` (root)
- `TransitionWrapper.tsx`: single child in TransitionSeries
- `TransitionSeriesWrapper.tsx`: array of { content, durationInFrames } with transitions
- Consumers: compositions, templates, layout (between-scene motion)

## Inputs

- Understanding of @remotion/transitions (TransitionSeries, TransitionPresentation)
- Props: transitionType, direction, timing (linear|spring), width, height
- Folder readMe: `transitions/.docs/readMe.md`

## Process

### 1. Understand the Structure

```
src/components/transitions/
├── index.ts                  # barrel export
├── TransitionWrapper.tsx     # single child
└── TransitionSeriesWrapper.tsx # array of content + duration
```

### 2. Supported Transition Types

`slide`, `fade`, `wipe`, `clockWipe`, `flip`, `none`

### 3. Timing: Linear vs Spring

- **linear**: predictable, duration-based
- **spring**: physics-based; use when natural feel is desired

### 4. When to Use Each Wrapper

| Wrapper | Use |
|---------|-----|
| TransitionWrapper | Single child; wrap one scene/sequence |
| TransitionSeriesWrapper | Multiple segments; array of { content, durationInFrames } with transitions between each |

### 5. When Adding a New Transition Type

1. Verify @remotion/transitions supports it
2. Add to transitionType prop union and mapping
3. Document direction/timing behavior if non-standard

### 6. Key Props

- `transitionType`: slide | fade | wipe | clockWipe | flip | none
- `direction`: transition direction (depends on type)
- `timing`: linear | spring
- `width`, `height`: presentation dimensions

## Output

- Correct use of TransitionWrapper vs TransitionSeriesWrapper
- Appropriate choice of transition type and timing

## Rules

- Do not implement custom transitions; use @remotion/transitions
- Keep wrappers thin; map declarative props to TransitionSeries/TransitionPresentation
- Compositions/templates own the content; transitions only wrap

## References

- transitions: `src/components/transitions/.docs/readMe.md`
- Parent: `components-folder-structure.md`
- External: @remotion/transitions
