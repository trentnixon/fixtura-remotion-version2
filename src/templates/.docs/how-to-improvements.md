# How-To Guide Improvements: Missing Items & Potential Inclusions

This document catalogs potential improvements and missing information for `how-to.md`. Use this as a reference when updating the guide.

---

## 📋 Critical Missing Items

### 1. Documentation Requirements

**Missing:**
- Step-by-step instructions for creating `readMe.md` files
- Requirement to create `readMe.md` in variant folder root
- Requirement to create `readMe.md` in `components/` subfolder
- Instructions for updating parent documentation files

**Should Include:**
- Template for variant `readMe.md` (following folder contract pattern)
- Template for `components/readMe.md`
- When to update `src/templates/.docs/readMe.md` or `src/templates/variants/readMe.md`
- Reference to `.cursorrules` documentation requirements

**Example Structure:**
```markdown
# Folder Overview
[Brief description of variant purpose]

## Files
- `index.tsx`: [description]
- `theme.ts`: [description]
- `animations.ts`: [description]
- `components/`: [description]

## Relations
- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: [list]
- Consumed by: [list]

## Dependencies
- Internal: [list]
- External: [list]
```

---

### 2. Background Component Pattern Clarification

**Missing:**
- Clear explanation that ALL existing templates use `SelectTemplateBackground()`
- The Background component should be a simple wrapper, not custom implementation
- Background variants (Solid, Gradient, Image, etc.) are selected automatically
- Only create custom background if template-specific behavior is needed

**Current Guide Shows:**
```typescript
// Custom background example (WRONG for most cases)
export const YourTemplateBackground: React.FC = () => {
  const { videoMeta } = useVideoDataContext();
  const variant = videoMeta.video.templateVariation.useBackground || "Solid";
  return <AbsoluteFill style={{ backgroundColor: "#000" }} />;
};
```

**Should Show:**
```typescript
// Standard pattern (CORRECT for 99% of templates)
import { SelectTemplateBackground } from "../../../../components/backgrounds";

export const YourTemplateBackground: React.FC = () => {
  return <SelectTemplateBackground />;
};
```

**Should Include:**
- Explanation that `SelectTemplateBackground()` reads `video.templateVariation.useBackground`
- List of available background variants: Solid, Gradient, Image, Video, Graphics, Particle, Pattern, Texture
- When you WOULD create a custom background (rare edge cases)
- Reference to `src/components/backgrounds/README.md` for background system details

---

### 3. Template Variants vs Background Variants Terminology

**Missing:**
- Clear distinction between:
  - **Template Variants**: Basic, Classic, Brickwork (the visual style/layout)
  - **Background Variants**: Solid, Gradient, Image (the background type)
- Explanation that registry's `variants` array refers to background variants
- Clarification that template ID (e.g., `Basic`) is separate from background variant

**Should Include:**
- Visual diagram or clear explanation of the distinction
- Examples showing how template + background variant combine
- Note that all templates share the same background variants array

---

## 📚 Important Missing Sections

### 4. Optional Folders and Utilities

**Missing:**
- When to create a `utils/` folder
- Examples of utility functions (e.g., `titleLookup.ts` in twoColumnClassic)
- Best practices for organizing helper functions

**Should Include:**
- Examples of when utilities are needed:
  - Title/text transformations
  - Data formatting helpers
  - Complex calculations
- Pattern: `utils/helperName.ts` with exports
- When to keep logic in components vs extracting to utils

**Example:**
```typescript
// utils/titleLookup.ts
export const getSimplifiedTitle = (title: string): string => {
  // Transformation logic
};
```

---

### 5. Font Management

**Missing:**
- How fonts are loaded via `FontContext`
- Using `fontClasses` from `ThemeContext`
- Font fallback strategies
- How to specify fonts in theme configuration

**Should Include:**
- Font loading mechanism
- Accessing fonts: `const { fontClasses } = useThemeContext()`
- Using fonts: `fontFamily={fontClasses.title?.family}`
- Font configuration in `theme.ts`:
  ```typescript
  fonts: {
    title: { family: "YourFont" },
    subtitle: { family: "YourFont" },
    copy: { family: "YourFont" },
  }
  ```
- Reference to font loading system documentation

---

### 6. Testing with Test Data

**Missing:**
- How to test with actual test data files
- Where test data lives (`testData/samples/`)
- How to verify data flow through contexts
- Testing different data scenarios

**Should Include:**
- Location of test data: `testData/samples/{Sport}/{DatasetName}.json`
- How test data is registered and loaded
- Using Remotion Studio to preview with test data
- Testing edge cases (empty data, missing fields, etc.)
- Reference to test data integration guides

---

### 7. Type Exports

**Missing:**
- When to export custom types from variant folder
- Type organization best practices
- Sharing types between variant components

**Should Include:**
- When custom types are needed (beyond base types)
- Pattern: `types.ts` file in variant folder
- Exporting types for use in components
- When to extend base types vs create new ones

---

### 8. Error Handling and Fallbacks

**Missing:**
- Fallback behavior for missing data
- Error boundaries (if applicable)
- Handling missing assets/images
- Graceful degradation patterns

**Should Include:**
- Handling missing logos/images
- Fallback text for missing metadata
- Empty state handling
- Data validation patterns
- Examples from existing templates

---

### 9. Performance Considerations

**Missing:**
- When to use memoization
- Frame-based animation optimization
- Component re-render patterns
- Best practices for Remotion performance

**Should Include:**
- Using `React.memo()` for expensive components
- Memoizing calculations in frame-based animations
- Avoiding unnecessary re-renders
- Performance patterns specific to Remotion

---

### 10. Component Naming Consistency

**Missing:**
- Explicit naming convention requirements
- All components must use template name prefix
- File naming conventions

**Should Include:**
- Component naming: `YourTemplateIntro`, `YourTemplateOutro`, etc. (NOT `Intro`, `Outro`)
- File naming: PascalCase for components (`YourTemplateIntro.tsx`)
- Utility naming: camelCase for utilities (`titleLookup.ts`)
- Consistency checklist

---

## ✅ Integration & Testing Enhancements

### 11. Enhanced Integration Checklist

**Current Checklist is Basic - Should Include:**

- [ ] Created variant folder structure
- [ ] Created `readMe.md` files (variant root + components/)
- [ ] Created `theme.ts` extending `baseTheme`
- [ ] Created `animations.ts` with animation presets
- [ ] Created all variant components (Intro, Outro, Main, MainHeader, Background)
- [ ] Background component uses `SelectTemplateBackground()` (unless custom needed)
- [ ] Created `index.tsx` composing `BaseTemplate`
- [ ] Registered template in `registry.tsx` with correct template ID
- [ ] Created composition implementations for each composition type
- [ ] Added template to composition index files (lowercase key)
- [ ] Added template to sport module exports
- [ ] Updated parent documentation (`templates/.docs/readMe.md` or `variants/readMe.md`)
- [ ] Tested in Remotion Studio
- [ ] Verified template appears in sidebar (Template → Variant → Sport → Dataset)
- [ ] Tested with all background variants (Solid, Gradient, Image, etc.)
- [ ] Tested with all composition types (Ladder, Results, Top5, etc.)
- [ ] Verified theme colors work correctly
- [ ] Checked animations are smooth and consistent
- [ ] Tested with different test datasets
- [ ] Verified font loading works
- [ ] Checked error handling for missing data
- [ ] Verified component naming follows conventions

---

## 🔍 Additional Context Sections

### 12. Common Patterns Reference

**Should Add:**
- Links to example implementations
- Common gotchas and solutions
- Pattern library references

**Examples:**
- "See `src/templates/variants/basic/` for minimal example"
- "See `src/templates/variants/twoColumnClassic/` for complex layout example"
- "See `src/templates/variants/brickwork/` for custom styling example"

---

### 13. Troubleshooting Expansion

**Current Troubleshooting is Good - Could Add:**

- **Template Not Appearing in Studio**
  - Check registry export name matches template ID (case-sensitive)
  - Verify composition map includes your template (lowercase key)
  - Ensure template component is exported correctly
  - Check that `DevelopmentRoot.tsx` includes your template in iteration

- **Background Not Rendering**
  - Verify `SelectTemplateBackground()` is imported correctly
  - Check `video.templateVariation.useBackground` value in test data
  - Ensure background variant is in registry's `Variants` array

- **Fonts Not Loading**
  - Verify font family names in `theme.ts` match loaded fonts
  - Check `FontContext` configuration
  - Verify `fontClasses` are accessed correctly

- **Animations Not Working**
  - Verify animation config structure matches `AnimationConfig` type
  - Check animation keys match what components expect
  - Ensure animations are passed to `BaseTemplate`
  - Verify `useAnimationContext()` is called correctly

- **Composition Not Found**
  - Verify composition type is registered in sport module
  - Check template key matches (lowercase in composition maps)
  - Ensure composition exports match expected structure

---

### 14. Quick Reference Section

**Should Add:**
- Template ID naming: PascalCase (e.g., `YourTemplate`)
- Composition map key: lowercase (e.g., `yourtemplate`)
- Background component pattern: `SelectTemplateBackground()`
- File naming: PascalCase for components, camelCase for utilities
- Documentation: `readMe.md` in variant root and `components/`

---

## 📖 Reference Links to Add

**Should Include Links To:**
- `src/templates/base/index.tsx` - Base template implementation
- `src/templates/variants/basic/` - Minimal example variant
- `src/templates/registry.tsx` - Template registry
- `src/components/backgrounds/README.md` - Background system docs
- `src/components/backgrounds/index.tsx` - `SelectTemplateBackground()` implementation
- `src/core/context/ThemeContext.tsx` - Theme context
- `src/core/context/VideoDataContext.tsx` - Video data context
- `src/core/context/AnimationContext.tsx` - Animation context
- `src/core/context/FontContext.tsx` - Font context
- `src/compositions/cricket/ladder/basic.tsx` - Example composition implementation
- `.cursorrules` - Documentation requirements

---

## 🎯 Priority Recommendations

### High Priority (Critical for Success)
1. **Background Component Pattern** - Most templates will use `SelectTemplateBackground()`
2. **Documentation Requirements** - Required by `.cursorrules`
3. **Template vs Background Variants** - Common source of confusion
4. **Component Naming** - Consistency is critical

### Medium Priority (Important for Quality)
5. **Font Management** - Needed for proper typography
6. **Testing with Test Data** - Essential for verification
7. **Enhanced Integration Checklist** - Comprehensive testing

### Low Priority (Nice to Have)
8. **Optional Folders/Utilities** - Only needed for complex templates
9. **Type Exports** - Only needed if custom types required
10. **Performance Considerations** - Optimization can come later

---

## 📝 Notes for Guide Updates

- Consider splitting into multiple sections or adding expandable sections
- Add visual diagrams for template vs background variant distinction
- Include code examples for each pattern
- Cross-reference with existing documentation
- Keep examples consistent with actual codebase patterns
- Update reference files section with actual file paths

---

**Last Updated:** 2026-02-07
**Status:** Pending integration into `how-to.md`
