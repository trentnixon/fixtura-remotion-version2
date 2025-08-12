## Layout

Reusable layout primitives for assembling scenes: screen containers, headers, and title-screen permutations.

### Structure

- `screen/OneColumn.tsx`: A page-level wrapper.

  - Uses `ThemeContext.layout.heights` to set header/content heights.
  - Calls `RouteToComposition()` to render the active composition.

- `main/header/`:

  - `index.tsx`: Exports a suite of header layout variants with different slot orders: `Title`, `Logo`, `Name`.
  - `types.ts`: Shared props and helper `getAlignmentClasses(alignment)` to produce flex alignment utility classes.
  - `variants/VerticalStack.tsx`: Vertical header variants including all permutations and single-element variants.
  - `variants/TwoColumnLayout.tsx`: Two-column header variants including reversed permutations and single-element variants.

- `titleScreen/`:
  - `index.tsx`: Exports title-screen layout variants that arrange `Logo`, `Title`, `Name`, and `PrimarySponsor`.
  - `types.ts`: Shared props (alignment, optional height/exitFrame) and `getAlignmentClasses`.
  - `variants/VerticalStack.tsx`, `variants/TwoColumnLayout.tsx`: Concrete permutations similar to header.

### Common Props

Across header/title layouts, expect variants to accept:

- `Logo`: ReactNode
- `Title`: ReactNode
- `Name`: ReactNode
- `PrimarySponsor?`: ReactNode (title screens)
- `alignment?`: "start" | "center" | "end"
- `exitFrame?`: number (for coordinated exit timing)

### Usage

Header (vertical ordering Title → Logo → Name):

```tsx
<VerticalHeaderTitleLogoName
  alignment="center"
  Title={<AnimatedText type="title">Grand Final</AnimatedText>}
  Logo={<img src={logo} alt="logo" />}
  Name={<AnimatedText type="subtitle">Premier League</AnimatedText>}
/>
```

Title screen (two-column reversed order):

```tsx
<ReverseTwoColumnLayout
  alignment="end"
  Title={<AnimatedText type="title">Match Day</AnimatedText>}
  Logo={<img src={logo} alt="logo" />}
  Name={<AnimatedText type="subtitle">Round 7</AnimatedText>}
  PrimarySponsor={<Sponsor />}
/>
```

### Notes

- These are presentational arrangements. Use `AnimatedContainer`, `AnimatedText`, `AnimatedImage`, and Backgrounds inside slots to apply motion and styling.
- For consistent spacing, rely on `ThemeContext.layout` (heights, gaps) so scene-wide changes propagate globally.
