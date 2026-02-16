## Screen Layouts

High-level screen wrappers for compositions.

### Files

- `OneColumn.tsx` — A single-column screen that:
  - Uses `ThemeContext.layout.heights` for header/content sizing
  - Renders the provided `Header` component into the header region
  - Calls `RouteToComposition()` to render the active composition in the content region

### Usage

```tsx
<OneColumn Header={VerticalHeaderTitleLogoName} />
```
