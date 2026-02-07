# How to Create a New Template

This guide provides a definitive, step-by-step process for creating a new template variant from scratch. It explains the template system architecture, how templates integrate with compositions, and how routing works.

---

## Table of Contents

1. [Template System Architecture](#template-system-architecture)
2. [Creating a New Template Variant](#creating-a-new-template-variant)
3. [Hooking Up to Compositions](#hooking-up-to-compositions)
4. [Hooking Up to Routes](#hooking-up-to-routes)
5. [Testing Your Template](#testing-your-template)

---

## Template System Architecture

### Overview

The template system uses a **base + variant** pattern:

- **Base Template** (`src/templates/base/`): Provides foundational infrastructure including:
  - Context providers (Global, VideoData, Theme, Style, Font, Layout, Animation)
  - Layout sequencing (intro → main → outro)
  - Shared components (background, audio)
  - Type definitions and utilities

- **Template Variants** (`src/templates/variants/{variantName}/`): Extend the base with:
  - Theme configuration (colors, fonts, component styles)
  - Animation presets
  - Variant-specific components (Intro, Outro, Main, Background)

- **Template Registry** (`src/templates/registry.tsx`): Central registry mapping template IDs to components

- **Compositions** (`src/compositions/{sport}/{compositionType}/`): Sport-specific composition logic that uses templates

- **Routing** (`src/core/utils/routing.tsx`): Routes requests to the correct template + composition combination

### Data Flow

```
Video Data → Template Registry → Base Template → Variant Components → Composition Logic → Rendered Video
```

### Key Concepts

1. **Template ID**: Unique identifier (e.g., `Basic`, `Classic`, `Brickwork`) used throughout the system - this is the visual style/layout template
2. **Background Variant**: Background style option (e.g., `Solid`, `Gradient`, `Image`, `Video`, `Graphics`, `Particle`, `Pattern`, `Texture`) - all templates share the same background variants
3. **Composition Type**: Sport-specific composition (e.g., `CricketLadder`, `CricketTop5`)
4. **Main Component Layout**: The layout wrapper for the main content (typically uses `OneColumn` or `TwoColumn`)

**Important Terminology Distinction:**
- **Template Variants** (e.g., `Basic`, `Classic`, `Brickwork`): The visual style/layout template - this is what you're creating
- **Background Variants** (e.g., `Solid`, `Gradient`, `Image`): The background type selected via `data.videoMeta.video.templateVariation.useBackground`
- The registry's `variants` array refers to **background variants**, not template variants

---

## Creating a New Template Variant

### Step 1: Create Variant Folder Structure

Create a new folder under `src/templates/variants/` with your template name (use PascalCase):

```
src/templates/variants/YourTemplate/
├── index.tsx          # Main template component
├── theme.ts           # Theme configuration
├── animations.ts      # Animation presets
├── readMe.md          # Folder documentation (REQUIRED)
└── components/
    ├── YourTemplateIntro.tsx
    ├── YourTemplateOutro.tsx
    ├── YourTemplateMain.tsx
    ├── YourTemplateMainHeader.tsx
    ├── YourTemplateBackground.tsx
    └── readMe.md      # Components folder documentation (REQUIRED)
```

**Important:** All folders must have `readMe.md` files per `.cursorrules` documentation requirements.

### Step 2: Create Theme Configuration (`theme.ts`)

The theme extends `baseTheme` and defines:
- Font families
- Component styles (Tailwind classes)
- Layout configuration
- Color modes (light, dark, lightAlt, darkAlt)

**Example:**

```typescript
import { baseTheme } from "../../base/theme";
import { TemplateThemeConfig } from "../../types/TemplateThemeConfig";

export const yourTemplateTheme: TemplateThemeConfig = {
  ...baseTheme,

  // Override fonts
  fonts: {
    title: {
      family: "YourFont",
    },
    subtitle: {
      family: "YourFont",
    },
    copy: {
      family: "YourFont",
    },
  },

  // Define component styles (Tailwind classes)
  componentStyles: {
    title: {
      className: "text-9xl font-black tracking-tight leading-none text-center",
    },
    subtitle: {
      className: "text-6xl font-bold tracking-normal leading-none text-center",
    },
    // ... add all component styles you need
  },

  // Layout configuration
  layout: {
    heights: {
      asset: 1010,
      header: 190,
      footer: 150,
    },
    spacing: {
      section: "space-y-8",
      item: "space-y-4",
    },
    padding: {
      container: "p-8",
      section: "py-6",
      item: "py-2",
    },
    borderRadius: {
      container: "rounded-none",
    },
  },

  // Color modes
  mode: {
    light: {
      container: {
        background: "#fff",
        backgroundAlt: "#f0f0f0",
        backgroundTransparent: "rgba(255, 255, 255, 0.5)",
      },
      text: {
        title: "#000",
        copy: "#000",
      },
    },
    // ... add dark, lightAlt, darkAlt modes
  },
};
```

**Reference:** See `src/templates/variants/basic/theme.ts` for a complete example.

**Font Configuration:**
Fonts are loaded via `FontContext` and accessed through `useThemeContext()`. Configure fonts in your theme:

```typescript
fonts: {
  title: { family: "YourFont" },
  subtitle: { family: "YourFont" },
  copy: { family: "YourFont" },
}
```

Access fonts in components:
```typescript
const { fontClasses } = useThemeContext();
// Use: fontFamily={fontClasses.title?.family}
```

### Step 3: Create Animation Configuration (`animations.ts`)

Define animation presets for:
- Image animations (intro, main, sponsor logos)
- Text animations (intro, main, outro)
- Container animations (item containers)
- Transitions

**Example:**

```typescript
import { AnimationConfig } from "../../types/AnimationConfig ";

export const templateAnimations: AnimationConfig = {
  image: {
    intro: {
      logo: {
        introIn: {
          type: "slideInBottom",
          duration: 15,
          delay: 0,
          easing: { type: "inOut", base: "ease" },
          custom: { distance: 100 },
        },
        introOut: {
          type: "fadeOut",
          duration: 15,
          easing: { type: "inOut", base: "ease" },
        },
        introExitFrame: 60,
      },
    },
    // ... main and sponsor animations
  },
  text: {
    intro: {
      mainTitle: {
        type: "fadeInUp",
        duration: 15,
        easing: { type: "inOut", base: "ease" },
        delay: 0,
        custom: { distance: 100 },
      },
      // ... more intro text animations
    },
    // ... main and outro text animations
  },
  container: {
    main: {
      itemContainer: {
        containerIn: {
          type: "slideInBottom",
          easing: { type: "inOut", base: "ease" },
          duration: 15,
          custom: { distance: "105%" },
        },
        containerOut: {
          type: "slideOutBottom",
          easing: { type: "inOut", base: "ease" },
          duration: 20,
          custom: { distance: "105%" },
        },
      },
    },
  },
  transition: {
    Main: {
      type: "none",
      direction: "none",
      durationInFrames: 15,
    },
  },
};
```

**Reference:** See `src/templates/variants/basic/animations.ts` for a complete example.

### Step 4: Create Variant Components

#### 4a. Intro Component (`YourTemplateIntro.tsx`)

The intro component displays at the start of the video. It typically shows:
- Club logo
- Title
- Club name
- Primary sponsor (optional)

**Example:**

```typescript
import React from "react";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { AnimatedText } from "../../../../components/typography/AnimatedText";
import { AnimatedImage } from "../../../../components/images";
import { VerticalStackTitleLogoName } from "../../../../components/layout/titleScreen/index";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../core/context/AnimationContext";

export const YourTemplateIntro: React.FC = () => {
  const { club, metadata, sponsors } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.intro;
  const LogoAnimations = animations.image.intro.logo;
  const { fontClasses } = useThemeContext();

  return (
    <VerticalStackTitleLogoName
      alignment="center"
      Logo={
        <div className="w-full h-full flex justify-center py-8 items-center max-h-[500px] max-w-[500px]">
          <AnimatedImage
            src={club.logo?.url || ""}
            alt={club.name}
            width={"auto"}
            height={"auto"}
            fit="contain"
            animation={LogoAnimations.introIn}
            exitAnimation={LogoAnimations.introOut}
            exitFrame={LogoAnimations.introExitFrame}
          />
        </div>
      }
      Title={
        <div className="overflow-hidden mb-4">
          <AnimatedText
            textAlign="center"
            type="title"
            variant="onContainerTitle"
            letterAnimation="word"
            animation={TextAnimations.mainTitle}
            exitAnimation={TextAnimations.introOut}
            exitFrame={TextAnimations.introExitFrame}
            fontFamily={fontClasses.title?.family}
          >
            {metadata.title}
          </AnimatedText>
        </div>
      }
      Name={
        <div className="overflow-hidden">
          <AnimatedText
            type="subtitle"
            textAlign="center"
            variant="onContainerTitle"
            letterAnimation="word"
            animation={TextAnimations.clubName}
            exitAnimation={TextAnimations.introOut}
            exitFrame={TextAnimations.introExitFrame}
            fontFamily={fontClasses.subtitle?.family}
          >
            {club.name}
          </AnimatedText>
        </div>
      }
    />
  );
};
```

**Reference:** See `src/templates/variants/basic/components/BasicIntro.tsx` for a complete example.

#### 4b. Outro Component (`YourTemplateOutro.tsx`)

The outro component displays sponsors or a closing message. It receives `doesAccountHaveSponsors` prop.

**Example:**

```typescript
import React from "react";
import { AbsoluteFill } from "remotion";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { AnimatedImage } from "../../../../components/images";
import { useAnimationContext } from "../../../../core/context/AnimationContext";

interface YourTemplateOutroProps {
  doesAccountHaveSponsors: boolean;
}

export const YourTemplateOutro: React.FC<YourTemplateOutroProps> = ({
  doesAccountHaveSponsors,
}) => {
  const { sponsors } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const LogoAnimations = animations.image.sponsor.logo;

  if (!doesAccountHaveSponsors) {
    return (
      <AbsoluteFill className="flex flex-col justify-center items-center">
        <h2 className="text-5xl font-bold text-center">Thank you for watching!</h2>
      </AbsoluteFill>
    );
  }

  // Render sponsor grid or outro content
  return (
    <AbsoluteFill className="flex flex-col justify-center items-center">
      {/* Your outro content */}
    </AbsoluteFill>
  );
};
```

**Reference:** See `src/templates/variants/basic/components/BasicOutro.tsx` for a complete example.

#### 4c. Main Component (`YourTemplateMain.tsx`)

The main component wraps the composition content. It typically uses a layout component (`OneColumn`, `TwoColumn`) and includes a header.

**Example:**

```typescript
import React from "react";
import { OneColumn } from "../../../../components/layout/screen/OneColumn";
import { YourTemplateMainHeader } from "./YourTemplateMainHeader";

export const YourTemplateMain: React.FC = () => {
  return <OneColumn Header={YourTemplateMainHeader} />;
};
```

**Reference:** See `src/templates/variants/basic/components/BasicMain.tsx` for a complete example.

#### 4d. Main Header Component (`YourTemplateMainHeader.tsx`)

The header component displays at the top of the main content area.

**Example:**

```typescript
import React from "react";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { AnimatedText } from "../../../../components/typography/AnimatedText";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../core/context/AnimationContext";

export const YourTemplateMainHeader: React.FC = () => {
  const { metadata } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const { fontClasses } = useThemeContext();
  const TitleAnimations = animations.text.main.title;

  return (
    <div className="w-full flex justify-center items-center py-4">
      <AnimatedText
        textAlign="center"
        type="title"
        variant="onContainerTitle"
        animation={TitleAnimations}
        fontFamily={fontClasses.title?.family}
      >
        {metadata.title}
      </AnimatedText>
    </div>
  );
};
```

#### 4e. Background Component (`YourTemplateBackground.tsx`)

**CRITICAL:** Almost all templates should use `SelectTemplateBackground()` - a centralized component that automatically selects the correct background based on `data.videoMeta.video.templateVariation.useBackground`.

**Standard Pattern (99% of templates):**

```typescript
import React from "react";
import { SelectTemplateBackground } from "../../../../components/backgrounds";

export const YourTemplateBackground: React.FC = () => {
  return <SelectTemplateBackground />;
};
```

**How it works:**
- `SelectTemplateBackground()` reads `video.templateVariation.useBackground` from context
- Automatically renders the appropriate background: Solid, Gradient, Image, Video, Graphics, Particle, Pattern, or Texture
- All background variants are handled by the centralized system

**Available Background Variants:**
- `Solid` - Theme color fill
- `Gradient` - Palette-driven gradients
- `Image` - Effect-driven image backgrounds (zoom, pan, breathing, etc.)
- `Video` - Video backgrounds
- `Graphics` / `Noise` - Procedural noise and graphics
- `Pattern` - SVG-based repeatable patterns
- `Particle` - Dynamic particle fields
- `Texture` - Tiled image backgrounds with color overlay

**When to Create a Custom Background:**
Only create a custom background implementation if you need template-specific behavior that cannot be achieved through the standard background system. This is rare.

**Reference:** 
- See `src/templates/variants/basic/components/BasicBackground.tsx` for the standard pattern
- See `src/components/backgrounds/README.md` for background system details

### Step 5: Create Main Template Component (`index.tsx`)

This is the entry point that composes `BaseTemplate` with your variant components.

**Example:**

```typescript
import React from "react";
import { BaseTemplate } from "../../base";
import { yourTemplateTheme } from "./theme";
import { FixturaDataset } from "../../../core/types/data";
import { UIConfig } from "../../types/settingsConfig";

// Import your variant components
import { YourTemplateIntro } from "./components/YourTemplateIntro";
import { YourTemplateOutro } from "./components/YourTemplateOutro";
import { YourTemplateBackground } from "./components/YourTemplateBackground";
import { YourTemplateMain } from "./components/YourTemplateMain";
import { templateAnimations } from "./animations";

/**
 * YourTemplate variant
 */
export const YourTemplate: React.FC<{ data: FixturaDataset }> = ({ data }) => {
  return (
    <BaseTemplate
      data={data}
      settings={yourTemplateTheme as unknown as UIConfig}
      introComponent={YourTemplateIntro}
      outroComponent={YourTemplateOutro}
      backgroundComponent={YourTemplateBackground}
      mainComponentLayout={YourTemplateMain}
      animations={templateAnimations}
    />
  );
};
```

**Reference:** See `src/templates/variants/basic/index.tsx` for a complete example.

### Optional: Create Utility Functions

If your template needs helper functions (e.g., text transformations, data formatting, complex calculations), create a `utils/` folder:

```
src/templates/variants/YourTemplate/
├── utils/
│   └── titleLookup.ts  # Example utility
```

**Example:**

```typescript
// utils/titleLookup.ts
export const getSimplifiedTitle = (title: string): string => {
  // Transformation logic
  return title.replace(/[^a-zA-Z0-9\s]/g, "").trim();
};
```

**When to use utilities:**
- Title/text transformations
- Data formatting helpers
- Complex calculations
- Reusable logic shared across multiple components

**When to keep logic in components:**
- Simple, component-specific logic
- One-time calculations
- UI-specific transformations

**Reference:** See `src/templates/variants/twoColumnClassic/utils/titleLookup.ts` for an example.

### Step 6: Create Documentation Files

Per `.cursorrules` requirements, you must create `readMe.md` files for documentation.

#### 6a. Variant Root `readMe.md`

Create `src/templates/variants/YourTemplate/readMe.md`:

```markdown
# Folder Overview

[Brief description of your template variant's purpose and characteristics]

## Files

- `index.tsx`: Main entry point exporting the YourTemplate variant composition
- `theme.ts`: YourTemplate-specific theme tokens and overrides
- `animations.ts`: Animation presets used by YourTemplate components
- `components/`: All YourTemplate variant building blocks

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: composes from `../../base`; uses `../../types` for config
- Consumed by: `../../registry.tsx`

## Dependencies

- Internal: `components`
- External: Remotion, React
```

#### 6b. Components Folder `readMe.md`

Create `src/templates/variants/YourTemplate/components/readMe.md`:

```markdown
# Folder Overview

YourTemplate variant components: Intro, Outro, Main, MainHeader, and Background components.

## Files

- `YourTemplateIntro.tsx`: Intro sequence component
- `YourTemplateOutro.tsx`: Outro sequence component
- `YourTemplateMain.tsx`: Main content layout wrapper
- `YourTemplateMainHeader.tsx`: Header component for main content
- `YourTemplateBackground.tsx`: Background component wrapper

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: uses contexts from `../../../../core/context`
- Consumed by: `../index.tsx`

## Dependencies

- Internal: `../../../../core/context`, `../../../../components`
- External: Remotion, React
```

**Reference:** See `src/templates/variants/basic/readMe.md` for a complete example.

### Step 7: Register Template in Registry

Add your template to `src/templates/registry.tsx`:

```typescript
import { YourTemplate } from "./variants/yourTemplate";

// ... existing imports

export const templateRegistry = {
  // ... existing templates
  YourTemplate: {
    component: YourTemplate,
    variants: Variants, // Shared variants array
  },
};
```

**Important:** 
- The key in `templateRegistry` (e.g., `YourTemplate`) becomes the **template ID** used throughout the system. Use PascalCase.
- Component naming must follow conventions: `YourTemplateIntro`, `YourTemplateOutro`, etc. (NOT `Intro`, `Outro`)
- File naming: PascalCase for components (`YourTemplateIntro.tsx`), camelCase for utilities (`titleLookup.ts`)

---

## Hooking Up to Compositions

Compositions are sport-specific modules that contain the logic for rendering different types of content (ladder, top5, results, etc.). Each composition type exports a map of template IDs to component implementations.

### Step 1: Create Composition Template Implementation

For each composition type (e.g., `CricketLadder`), create a template-specific implementation file.

**Example:** `src/compositions/cricket/ladder/yourTemplate.tsx`

```typescript
import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import {
  TransitionDirection,
  TransitionSeriesWrapper,
  TransitionType,
} from "../../../components/transitions";
import { LadderData } from "./types";
import LadderDisplayYourTemplate from "./controller/Display/display-YourTemplate";
import NoLadderData from "./modules/NoLadderData/no-data";
import { useAnimationContext } from "../../../core/context/AnimationContext";
import {
  hasValidLadderData,
  castToLadderDataArray,
  calculateLadderDuration,
} from "./_utils/helpers";

// Main component with TransitionSeries
export const CricketLadderWithTransitions: React.FC = () => {
  const { data } = useVideoDataContext();
  const { data: CompositionData } = data;
  const { timings } = data;
  const { animations } = useAnimationContext();
  const transitionConfig = animations.transition.Main;

  if (!hasValidLadderData(CompositionData)) {
    return <NoLadderData />;
  }

  const ladderDataArray = castToLadderDataArray(CompositionData);

  return (
    <TransitionSeriesWrapper
      sequences={ladderDataArray.map((ladder: LadderData) => ({
        content: <LadderDisplayYourTemplate ladder={ladder} />,
        durationInFrames: calculateLadderDuration(timings),
      }))}
      transitionType={transitionConfig.type as TransitionType}
      direction={transitionConfig.direction as TransitionDirection}
      timing={{
        type: "linear",
        durationInFrames: transitionConfig.durationInFrames,
      }}
    />
  );
};

// Export with lowercase name matching template ID
export const YourTemplate: React.FC = () => {
  return <CricketLadderWithTransitions />;
};

export default YourTemplate;
```

**Note:** The export name should match your template ID (lowercase). The component uses `useVideoDataContext()` to access data - this is provided by `BaseTemplate`.

### Step 2: Export from Composition Index

Add your template to the composition's index file.

**Example:** `src/compositions/cricket/ladder/index.tsx`

```typescript
import { YourTemplate as ladderYourTemplate } from "./yourTemplate";

// ... existing imports

export const CricketLadder = {
  basic: ladderBasic,
  // ... existing templates
  yourtemplate: ladderYourTemplate, // lowercase key matching template ID
};
```

### Step 3: Add to Sport Module Export

Add the composition to the sport's main index file.

**Example:** `src/compositions/cricket/index.tsx`

```typescript
import {
  yourtemplate as ladderYourTemplate,
} from "./ladder";

// ... existing imports

export const CricketLadder = {
  basic: ladderBasic,
  // ... existing templates
  yourtemplate: ladderYourTemplate,
};
```

**Important:** The key in the composition map (e.g., `yourtemplate`) must match the template ID from the registry (lowercase). The routing system uses this to find the correct component.

---

## Hooking Up to Routes

The routing system automatically discovers templates from the composition maps. However, you need to ensure:

1. **Template Registry** is updated (already done in Step 6 above)
2. **Composition Maps** are updated (already done in Steps 2-3 above)
3. **Production Root** uses the registry (already configured)

### How Routing Works

1. **Production Root** (`src/ProductionRoot.tsx`):
   - Reads `templateId` from `data.videoMeta.video.appearance.template`
   - Looks up template in `templateRegistry`
   - Creates a Remotion `Composition` with the template component

2. **Development Root** (`src/DevelopmentRoot.tsx`):
   - Iterates through `templateRegistry`
   - Creates compositions for each template + variant + dataset combination
   - Used for previewing templates in Remotion Studio

3. **Route to Composition** (`src/core/utils/routing.tsx`):
   - Used in development/preview mode
   - Reads sport, composition type, and template ID from data
   - Looks up component from sport module → composition type → template ID
   - Returns the component for rendering

### Template ID Matching

The system matches template IDs using:
- **Registry keys**: PascalCase (e.g., `YourTemplate`)
- **Composition map keys**: lowercase (e.g., `yourtemplate`)
- **Data template ID**: Can be either case (system normalizes to lowercase)

**Important:** Ensure consistency:
- Registry key: `YourTemplate` (PascalCase)
- Composition map key: `yourtemplate` (lowercase)
- Both refer to the same template component

---

## Testing Your Template

### 1. Development Mode

Start Remotion Studio:

```bash
npm run dev
```

Your template should appear in the Remotion Studio sidebar under:
- Template name → Variant → Sport → Dataset

### 2. Verify Template Registration

Check that your template appears in:
- `src/templates/registry.tsx` (registry export)
- Composition index files (sport → composition type → template map)

### 3. Test with Different Compositions

Ensure your template works with all composition types:
- Ladder
- Top5
- Results
- Upcoming
- ResultSingle
- Performances
- TeamOfTheWeek
- Roster

### 4. Test with Different Variants

Test that background variants work:
- Solid
- Gradient
- Image
- Video
- Graphics
- Particle
- Pattern
- Texture

### 5. Verify Data Flow

Ensure your components can access:
- `useVideoDataContext()` - video data
- `useThemeContext()` - theme configuration (including `fontClasses`)
- `useAnimationContext()` - animation presets
- `useLayoutContext()` - layout utilities

### 6. Test with Test Data

Test your template with actual test data files:
- Location: `testData/samples/{Sport}/{DatasetName}.json`
- Use Remotion Studio to preview with different datasets
- Test edge cases: empty data, missing fields, etc.
- Verify data flows correctly through all contexts

---

## Common Patterns and Best Practices

### Pattern Library References

When implementing your template, refer to existing templates for patterns:

- **Minimal Example**: `src/templates/variants/basic/` - Simplest template implementation
- **Complex Layout**: `src/templates/variants/twoColumnClassic/` - Two-column layout with utilities
- **Custom Styling**: `src/templates/variants/brickwork/` - Custom styling patterns
- **Classic Pattern**: `src/templates/variants/classic/` - Standard classic implementation

### Common Gotchas

1. **Template ID Case Sensitivity**: Registry uses PascalCase, composition maps use lowercase
2. **Background Component**: Always use `SelectTemplateBackground()` unless you have a specific need
3. **Component Naming**: Must include template prefix to avoid conflicts
4. **Font Access**: Use `fontClasses` from `ThemeContext`, not direct font names
5. **Animation Keys**: Must match exactly what components expect (check existing templates)

## Common Patterns and Best Practices

### 1. Component Structure

- **Intro**: Use `VerticalStackTitleLogoName` or custom layout
- **Outro**: Handle sponsor display or fallback message
- **Main**: Use `OneColumn` or `TwoColumn` layout components
- **Background**: Use `SelectTemplateBackground()` (standard pattern)

### 1a. Component Naming Conventions

**CRITICAL:** All components must use the template name prefix:
- ✅ `YourTemplateIntro` (correct)
- ❌ `Intro` (incorrect - conflicts with other templates)
- ✅ `YourTemplateOutro` (correct)
- ✅ `YourTemplateMain` (correct)
- ✅ `YourTemplateBackground` (correct)

File naming:
- Components: PascalCase (`YourTemplateIntro.tsx`)
- Utilities: camelCase (`titleLookup.ts`)

### 2. Animation Usage

- Access animations via `useAnimationContext()`
- Use `AnimatedText` and `AnimatedImage` components for animated content
- Follow animation structure: `animations.{category}.{section}.{element}`
- Verify animation keys match what components expect
- Ensure animations are passed to `BaseTemplate`

### 3. Theme Usage

- Access theme via `useThemeContext()`
- Use `componentStyles` for consistent styling
- Support multiple color modes (light, dark, lightAlt, darkAlt)
- Access fonts via `fontClasses` from `ThemeContext`
- Use `fontFamily={fontClasses.title?.family}` in components

### 4. Data Access

- All data is available via `useVideoDataContext()`
- Structure: `data.videoMeta.video.*` for video metadata
- Structure: `data.Data.*` for composition-specific data

### 4a. Error Handling and Fallbacks

Handle missing data gracefully:

```typescript
// Handle missing logos/images
const logoUrl = club.logo?.url || "";
if (!logoUrl) {
  return <FallbackLogo />;
}

// Fallback text for missing metadata
const title = metadata.title || "Untitled";

// Empty state handling
if (!hasValidData(CompositionData)) {
  return <NoDataComponent />;
}
```

**Best Practices:**
- Always use optional chaining (`?.`) for nested data
- Provide fallback values for required fields
- Handle empty states gracefully
- Validate data before rendering

### 5. Type Safety

- Use `FixturaDataset` type for template props
- Use `UIConfig` type for settings
- Use `AnimationConfig` type for animations

### 5a. Custom Types (Optional)

If your template needs custom types beyond base types, create a `types.ts` file:

```typescript
// types.ts
export interface YourTemplateConfig {
  customSetting: string;
  // ... other custom types
}
```

**When to create custom types:**
- Template-specific configuration
- Complex data structures unique to your template
- Types shared between multiple components

**When to use base types:**
- Standard data structures (use `FixturaDataset`)
- Common configurations (use `UIConfig`)
- Shared types (import from `../../types`)

### 6. Performance Considerations

For Remotion-specific optimizations:

- Use `React.memo()` for expensive components that don't need frequent re-renders
- Memoize calculations in frame-based animations
- Avoid unnecessary re-renders by properly structuring component dependencies
- Consider Remotion's frame-based rendering model when optimizing

**Note:** Most templates don't need performance optimization initially. Focus on correctness first, optimize later if needed.

---

## Troubleshooting

### Template Not Appearing in Studio

- Check registry export name matches template ID (case-sensitive, PascalCase)
- Verify composition map includes your template (lowercase key)
- Ensure template component is exported correctly
- Check that `DevelopmentRoot.tsx` includes your template in iteration
- Verify template ID consistency: Registry (PascalCase) vs Composition map (lowercase)

### Composition Not Found

- Verify composition type is registered in `SPORT_COMPOSITION_TYPES`
- Check sport module includes your composition type
- Ensure template key matches (case-sensitive in maps)

### Styling Issues

- Verify theme extends `baseTheme` correctly
- Check component styles use correct Tailwind classes
- Ensure color modes are defined

### Animation Issues

- Verify animation config structure matches `AnimationConfig` type
- Check animation keys match what components expect
- Ensure animations are passed to `BaseTemplate`
- Verify `useAnimationContext()` is called correctly in components

### Background Not Rendering

- Verify `SelectTemplateBackground()` is imported correctly
- Check `video.templateVariation.useBackground` value in test data
- Ensure background variant is in registry's `Variants` array
- See `src/components/backgrounds/README.md` for background system details

### Fonts Not Loading

- Verify font family names in `theme.ts` match loaded fonts
- Check `FontContext` configuration
- Verify `fontClasses` are accessed correctly: `const { fontClasses } = useThemeContext()`
- Ensure fonts are configured in theme: `fonts: { title: { family: "YourFont" } }`

---

## Summary Checklist

When creating a new template, ensure:

### Setup & Structure
- [ ] Created variant folder structure
- [ ] Created `readMe.md` files (variant root + components/)
- [ ] Created `theme.ts` extending `baseTheme`
- [ ] Created `animations.ts` with animation presets
- [ ] Created all variant components (Intro, Outro, Main, MainHeader, Background)
- [ ] Background component uses `SelectTemplateBackground()` (unless custom needed)
- [ ] Created `index.tsx` composing `BaseTemplate`
- [ ] Component naming follows conventions (template name prefix)

### Registration & Integration
- [ ] Registered template in `registry.tsx` with correct template ID (PascalCase)
- [ ] Created composition implementations for each composition type
- [ ] Added template to composition index files (lowercase key)
- [ ] Added template to sport module exports
- [ ] Updated parent documentation (`templates/.docs/readMe.md` if needed)

### Testing & Verification
- [ ] Tested in Remotion Studio
- [ ] Verified template appears in sidebar (Template → Variant → Sport → Dataset)
- [ ] Tested with all background variants (Solid, Gradient, Image, Video, Graphics, Particle, Pattern, Texture)
- [ ] Tested with all composition types (Ladder, Results, Top5, Upcoming, ResultSingle, Performances, TeamOfTheWeek, Roster)
- [ ] Verified theme colors work correctly
- [ ] Checked animations are smooth and consistent
- [ ] Tested with different test datasets
- [ ] Verified font loading works
- [ ] Checked error handling for missing data
- [ ] Verified component naming follows conventions

---

## Quick Reference

### Naming Conventions
- **Template ID**: PascalCase (e.g., `YourTemplate`)
- **Composition map key**: lowercase (e.g., `yourtemplate`)
- **Component files**: PascalCase (`YourTemplateIntro.tsx`)
- **Utility files**: camelCase (`titleLookup.ts`)
- **Component names**: Must include template prefix (`YourTemplateIntro`, NOT `Intro`)

### Standard Patterns
- **Background**: `SelectTemplateBackground()` (99% of templates)
- **Fonts**: Access via `useThemeContext()` → `fontClasses.title?.family`
- **Animations**: Access via `useAnimationContext()` → `animations.{category}.{section}`
- **Data**: Access via `useVideoDataContext()` → `data.videoMeta.video.*`

### Key Distinctions
- **Template Variants**: Visual style/layout (Basic, Classic, Brickwork) - what you're creating
- **Background Variants**: Background type (Solid, Gradient, Image) - selected via `templateVariation.useBackground`

## Reference Files

### Core Template Files
- Base Template: `src/templates/base/index.tsx`
- Example Variant: `src/templates/variants/basic/`
- Variant Documentation: `src/templates/variants/basic/readMe.md`
- Registry: `src/templates/registry.tsx`

### Background System
- Background Selector: `src/components/backgrounds/index.tsx` (`SelectTemplateBackground`)
- Background Documentation: `src/components/backgrounds/README.md`

### Context Providers
- Theme Context: `src/core/context/ThemeContext.tsx`
- Video Data Context: `src/core/context/VideoDataContext.tsx`
- Animation Context: `src/core/context/AnimationContext.tsx`
- Font Context: `src/core/context/FontContext.tsx`

### Composition & Routing
- Example Composition: `src/compositions/cricket/ladder/basic.tsx`
- Production Root: `src/ProductionRoot.tsx`
- Development Root: `src/DevelopmentRoot.tsx`
- Routing: `src/core/utils/routing.tsx`

### Documentation
- `.cursorrules` - Documentation requirements
- `src/templates/.docs/readMe.md` - Templates folder overview
