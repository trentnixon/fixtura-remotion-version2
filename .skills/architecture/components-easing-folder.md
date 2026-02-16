# Skill: Components Easing Folder

## Purpose

Guides working with `src/components/easing`: understanding shared easing types and the mapping from declarative easing descriptors to Remotion easing functions. Use when images, containers, or typography need custom easing curves.

## Applies To

- `src/components/easing/` (root)
- `types.ts`: ImageAnimationType, ImageEasingType, ImageSpringConfig, ImageAnimationConfig
- `easingFunctions.ts`: getImageEasingFunction
- Consumers: images/config, containers/animations, typography/config/animations

## Inputs

- Understanding of Remotion Easing API
- Declarative easing descriptor (string or object)
- Folder readMe: `easing/.docs/readMe.md`

## Process

### 1. Understand the Structure

```
src/components/easing/
├── types.ts           # Cross-domain animation types
└── easingFunctions.ts # getImageEasingFunction(easing) → (t: number) => number
```

### 2. Supported Easing Descriptors

**Strings**: `linear`, `ease`, `quad`, `cubic`, `sin`, `circle`, `exp`, `bounce`  
**Parameterized**: `poly`, `elastic`, `back`, `bezier` (with params)  
**Composed**: `in`, `out`, `inOut` combined with a base easing

### 3. When to Use getImageEasingFunction

- Image entry/exit animations (images/config)
- Container animation curves (containers/animations)
- Typography letter/word animations (typography/config/animations)

### 4. When Adding a New Easing Type

1. Add to `easingFunctions.ts` in the mapping logic
2. Update `ImageEasingType` in `types.ts` if the type union changes
3. Ensure consumers (images, containers, typography) can pass the new descriptor via their config

### 5. Key Types

- `ImageEasingType`: union of supported easing descriptor shapes
- `ImageAnimationConfig`: ties animation type, duration, easing
- `getImageEasingFunction(easing)`: returns `(t: number) => number` for use with `interpolate`

## Output

- Correct use of shared easing across images, containers, typography
- Ability to add new easing types when needed

## Rules

- Prefer shared easing from this folder over ad hoc easing in consumers
- All easing ultimately maps to Remotion-compatible `(t) => number` functions
- Keep types in sync with easingFunctions mapping

## References

- easing: `src/components/easing/.docs/readMe.md`
- Parent: `components-folder-structure.md`
- Consumers: images, containers, typography readMes
