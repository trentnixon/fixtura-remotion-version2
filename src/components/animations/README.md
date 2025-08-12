## Animations (Top-level)

This folder hosts lightweight animation configuration utilities intended for generic usage across the component system. It complements the domain-specific animation systems in `containers/`, `images/`, and `typography/` by offering small, declarative presets.

### Contents

- `config/` — See `./config/README.md` for details
  - `variants.ts` — A compact catalog of animation variants and a helper to construct normalized configs without frame-accurate logic

### Integration

- Use these helpers when you need simple initial/final styles or when orchestrating CSS transitions that are not bound to Remotion’s per-frame graph.
- For frame-accurate sequences in compositions, prefer the animation systems under:
  - `../containers/animations/`
  - `../images/config/animations/`
  - `../typography/config/animations/`

### Links

- Parent: `../README.md`
- Child: `./config/README.md`
