# Folder Overview

Lightweight animation configuration utilities for generic usage across the component system. Provides declarative presets and config helpers without frame-accurate Remotion logic. Complements domain-specific animation systems in `containers/`, `images/`, and `typography/`.

## Skill

- `.skills/architecture/components-animations-folder.md` – Generic animation configs, getAnimationConfig; when to use vs domain-specific systems

## Files

No root-level files; all exports live in `config/`.

## Child Modules

- **`config/`**: AnimationVariant union, AnimationConfig type, `getAnimationConfig(variant, duration?, delay?)` — generic presets for initial/final styles

## Relations

- Parent folder: [../.docs/readMe.md](../.docs/readMe.md)
- Key dependencies: none (standalone helpers)
- Consumed by: reference from components readMe; for frame-accurate animation use `../containers/animations/`, `../images/config/`, `../typography/config/animations/`

## Dependencies

- Internal: none
- External: React (CSSProperties in AnimationConfig)

## When to Use

- Simple initial/final style presets for CSS or inline transitions outside the Remotion frame graph
- Quick config composition without per-frame logic

For frame-accurate sequences in compositions, use the domain-specific animation systems under `containers/`, `images/`, or `typography/`.
