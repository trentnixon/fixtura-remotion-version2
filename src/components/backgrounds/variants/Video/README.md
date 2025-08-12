## Video Background

Plays a video as the composition background with optional overlay.

### File

- `VideoBackground.tsx`
  - `processVideoConfig` merges component props with `templateVariation` defaults: URL, object-position, object-fit, loop, muted, overlay, offthread selection
  - Chooses `Video` vs `OffthreadVideo`
  - Renders overlay layer if specified
- `VideoBackgroundWithContext` binds `templateVariation` from `VideoDataContext`

### Props

- `src`, `fallbackSrc`
- `position` (object-position), `size` (object-fit alias)
- `loop`, `muted`, `overlay`, `className`, `style`

### Usage

```tsx
<VideoBackgroundWithContext />
```

### Links

- Parent: `../../README.md`
