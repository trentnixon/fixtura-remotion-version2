## Title Screen Layouts

Reusable arrangements for title screens combining `Logo`, `Title`, `Name`, and `PrimarySponsor`.

### Files

- `index.tsx` — Exports vertical and two-column variants for title screens
- `types.ts` — Shared props and `getAlignmentClasses(alignment)`
- `variants/VerticalStack.tsx` — Vertical permutations
- `variants/TwoColumnLayout.tsx` — Two-column permutations (including reversed)

### Usage

```tsx
<VerticalStack
  alignment="center"
  Logo={<img src={logo} />}
  Title={<AnimatedText type="title">Grand Final</AnimatedText>}
  Name={<AnimatedText type="subtitle">Round 7</AnimatedText>}
  PrimarySponsor={<Sponsor />}
/>
```

### Notes

- Coordinate animations within each slot using `AnimatedContainer` and `AnimatedText`.
