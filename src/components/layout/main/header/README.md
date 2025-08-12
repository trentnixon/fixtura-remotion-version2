## Header Layouts

Reusable header arrangements using permutations of `Title`, `Logo`, and `Name` slots.

### Files

- `index.tsx` — Exports a suite of header variants (vertical stack, two-column, reversed permutations, and single-element variants)
- `types.ts` — Shared props and `getAlignmentClasses(alignment)` helper to derive flex alignment classes
- `variants/VerticalStack.tsx` — Vertical ordering variants (all permutations + singletons)
- `variants/TwoColumnLayout.tsx` — Two-column variants including reversed orders and singletons

### Usage

```tsx
<VerticalHeaderTitleLogoName
  alignment="center"
  Title={<AnimatedText type="title">Title</AnimatedText>}
  Logo={<img src={logo} />}
  Name={<AnimatedText type="subtitle">Name</AnimatedText>}
/>
```

### Notes

- Alignment affects flexbox alignment across the header block (start/center/end).
- Pair with `AnimatedText` and `AnimatedContainer` for motion/styling.
