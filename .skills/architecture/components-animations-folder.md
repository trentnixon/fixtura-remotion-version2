# Skill: Components Animations Folder

## Purpose

Guides working with `src/components/animations`: understanding generic animation configuration utilities (getAnimationConfig) and when to use them vs domain-specific animation systems. Use for lightweight initial/final style presets outside frame-accurate Remotion logic.

## Applies To

- `src/components/animations/` (root)
- `config/`: AnimationVariant union, AnimationConfig type, getAnimationConfig
- Consumers: reference; for frame-accurate use containers/animations, images/config, typography/config/animations

## Inputs

- Understanding of CSSProperties and inline transitions
- AnimationVariant (union of preset names)
- Folder readMe: `animations/.docs/readMe.md`

## Process

### 1. Understand the Structure

```
src/components/animations/
└── config/           # variants, getAnimationConfig(variant, duration?, delay?)
```

### 2. What getAnimationConfig Provides

- Declarative presets for `initial` and `final` styles
- No per-frame logic; suitable for CSS transitions or simple inline animations
- Parameters: variant, optional duration, optional delay

### 3. When to Use vs Domain-Specific

| Use Case | Use |
|----------|-----|
| Simple initial/final CSS presets | `animations/` (getAnimationConfig) |
| Frame-accurate container sequences | `containers/animations/` |
| Image entry/exit in compositions | `images/config/`, `images/config/animations/` |
| Typography letter/word splitting | `typography/config/animations/` |

### 4. When Adding a New Animation Variant

1. Add variant to AnimationVariant union in config
2. Extend getAnimationConfig mapping with initial/final styles
3. Keep presets generic; avoid composition-specific logic

### 5. Key Types

- `AnimationVariant`: union of preset names
- `AnimationConfig`: { initial, final } styles (CSSProperties-compatible)

## Output

- Correct choice between generic vs domain-specific animation systems
- Ability to add new presets for lightweight animations

## Rules

- Keep this folder lightweight; no frame-accurate Remotion logic
- Do not duplicate domain-specific logic from containers/images/typography
- Presets should be composition-agnostic

## References

- animations: `src/components/animations/.docs/readMe.md`
- Parent: `components-folder-structure.md`
- Domain-specific: containers/animations, images/config, typography/config/animations
