# How to Create a New Template Variant

This guide provides a definitive, step-by-step process for creating a **new template variant** that extends the base template. 

**What is a Template Variant?**
A template variant is a visual style/layout implementation (like `Basic`, `Classic`, `Brickwork`, `CNSW`, `Sixers`, `Thunder`, `TwoColumnClassic`) that lives in `src/templates/variants/{variantName}/`. All variants extend the same base template infrastructure but provide different:
- Theme configurations (colors, fonts, component styles)
- Animation presets
- Component implementations (Intro, Outro, Main, Background)

**Existing Variants:**
- `basic/` - Minimal, flexible template
- `classic/` - Classic styling
- `brickwork/` - Custom brickwork styling
- `cnsw/` - CNSW-specific variant
- `cnsw-private/` - CNSW private variant
- `sixers/` - Sixers-specific variant
- `thunder/` - Thunder-specific variant
- `twoColumnClassic/` - Two-column classic layout

This guide explains how to create a new variant following the same pattern as these existing ones.

---

## Table of Contents

1. [Template System Architecture](#template-system-architecture)
2. [Creating a New Template Variant](#creating-a-new-template-variant)
3. [Hooking Up to Compositions](#hooking-up-to-compositions)
4. [Hooking Up to Routes](#hooking-up-to-routes)
5. [Testing Your Variant](#testing-your-variant)

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

- **Template Registry** (`src/templates/registry.tsx`): Central registry mapping variant IDs to variant components

- **Compositions** (`src/compositions/{sport}/{compositionType}/`): Sport-specific composition logic that uses templates

- **Routing** (`src/core/utils/routing.tsx`): Routes requests to the correct template + composition combination

### Data Flow

```
Video Data → Template Registry → Base Template → Variant Components → Composition Logic → Rendered Video
```

### Key Concepts

1. **Variant ID**: Unique identifier (e.g., `Basic`, `Classic`, `Brickwork`) used throughout the system - this is the template variant you're creating
2. **Background Variant**: Background style option (e.g., `Solid`, `Gradient`, `Image`, `Video`, `Graphics`, `Particle`, `Pattern`, `Texture`) - all templates share the same background variants
3. **Composition Type**: Sport-specific composition (e.g., `CricketLadder`, `CricketTop5`)
4. **Main Component Layout**: The layout wrapper for the main content (typically uses `OneColumn` or `TwoColumn`)

**Important Terminology Distinction:**
- **Template Variants** (e.g., `Basic`, `Classic`, `Brickwork`, `YourVariant`): Visual style/layout variants that extend `BaseTemplate` - **this is what you're creating**
- **Base Template** (`src/templates/base/`): The foundational infrastructure that all variants extend - you don't modify this
- **Background Variants** (e.g., `Solid`, `Gradient`, `Image`): Background type options shared across all template variants, selected via `data.videoMeta.video.templateVariation.useBackground`
- The registry's `variants` array refers to **background variants**, not template variants

---

## Creating a New Template Variant

**Goal:** Create a new variant folder in `src/templates/variants/` that extends the base template, following the same structure as existing variants (`basic/`, `classic/`, `brickwork/`, etc.).

### Step 1: Create Variant Folder Structure

Create a new folder under `src/templates/variants/` with your variant name (use PascalCase, matching existing variants like `Basic`, `Classic`, `Brickwork`):

```
src/templates/variants/YourVariant/
├── index.tsx          # Main variant component (composes BaseTemplate)
├── theme.ts           # Variant-specific theme configuration
├── animations.ts      # Variant-specific animation presets
├── readMe.md          # Folder documentation (REQUIRED)
└── components/
    ├── YourVariantIntro.tsx
    ├── YourVariantOutro.tsx
    ├── YourVariantMain.tsx
    ├── YourVariantMainHeader.tsx
    ├── YourVariantBackground.tsx
    └── readMe.md      # Components folder documentation (REQUIRED)
```

**Important:** 
- All folders must have `readMe.md` files per `.cursorrules` documentation requirements
- Follow the same structure as existing variants (see `src/templates/variants/basic/` as reference)
- Your variant will extend `BaseTemplate` - you're not creating a new base, just a new visual style

### Step 2: Create Theme Configuration (`theme.ts`)

**Purpose:** Define your variant's visual styling (colors, fonts, component styles) that extends the base theme.

The theme extends `baseTheme` and defines:
- Font families
- Component styles (Tailwind classes)
- Layout configuration
- Color modes (light, dark, lightAlt, darkAlt)

**Example:**

```typescript
import { baseTheme } from "../../base/theme";
import { TemplateThemeConfig } from "../../types/TemplateThemeConfig";

export const yourVariantTheme: TemplateThemeConfig = {
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

**Reference:** 
- See `src/templates/variants/basic/theme.ts` for a minimal example
- See `src/templates/variants/classic/theme.ts` for a classic styling example
- See `src/templates/variants/brickwork/theme.ts` for custom styling patterns

**Note:** Your variant theme extends `baseTheme`, so you only need to override what's different from the base.

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

**Purpose:** Define your variant's animation behavior (how elements animate in/out, transitions).

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

**Purpose:** Create variant-specific component implementations that define how your variant renders intro, outro, main content, and background.

**Important:** These components extend the base template's structure. You're implementing the visual style, not the infrastructure.

#### 4a. Intro Component (`YourVariantIntro.tsx`)

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

export const YourVariantIntro: React.FC = () => {
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

**Reference:** 
- See `src/templates/variants/basic/components/BasicIntro.tsx` for a minimal example
- See `src/templates/variants/classic/components/ClassicIntro.tsx` for alternative patterns

#### 4b. Outro Component (`YourVariantOutro.tsx`)

The outro component displays sponsors or a closing message. It receives `doesAccountHaveSponsors` prop.

**Example:**

```typescript
import React from "react";
import { AbsoluteFill } from "remotion";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { AnimatedImage } from "../../../../components/images";
import { useAnimationContext } from "../../../../core/context/AnimationContext";

interface YourVariantOutroProps {
  doesAccountHaveSponsors: boolean;
}

export const YourVariantOutro: React.FC<YourVariantOutroProps> = ({
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

**Reference:** See `src/templates/variants/basic/components/BasicOutro.tsx` for a complete example with sponsor grid.

#### 4c. Main Component (`YourVariantMain.tsx`)

The main component wraps the composition content. It typically uses a layout component (`OneColumn`, `TwoColumn`) and includes a header.

**Example:**

```typescript
import React from "react";
import { OneColumn } from "../../../../components/layout/screen/OneColumn";
import { YourVariantMainHeader } from "./YourVariantMainHeader";

export const YourVariantMain: React.FC = () => {
  return <OneColumn Header={YourVariantMainHeader} />;
};
```

**Reference:** 
- See `src/templates/variants/basic/components/BasicMain.tsx` for `OneColumn` example
- See `src/templates/variants/twoColumnClassic/components/ClassicMain.tsx` for `TwoColumn` example

#### 4d. Main Header Component (`YourVariantMainHeader.tsx`)

The header component displays at the top of the main content area.

**Example:**

```typescript
import React from "react";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { AnimatedText } from "../../../../components/typography/AnimatedText";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../core/context/AnimationContext";

export const YourVariantMainHeader: React.FC = () => {
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

#### 4e. Background Component (`YourVariantBackground.tsx`)

**Important:** Almost all variants use `SelectTemplateBackground()` - the centralized background system. Only create custom backgrounds if you need variant-specific behavior.

**CRITICAL:** Almost all templates should use `SelectTemplateBackground()` - a centralized component that automatically selects the correct background based on `data.videoMeta.video.templateVariation.useBackground`.

**Standard Pattern (99% of templates):**

```typescript
import React from "react";
import { SelectTemplateBackground } from "../../../../components/backgrounds";

export const YourVariantBackground: React.FC = () => {
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
- See `src/templates/variants/basic/components/BasicBackground.tsx` for the standard pattern (all variants use this)
- See `src/components/backgrounds/README.md` for background system details

### Step 5: Create Main Variant Component (`index.tsx`)

**Purpose:** This is the entry point that composes `BaseTemplate` with your variant-specific components, theme, and animations.

**Important:** You're not creating a new base template - you're creating a variant that uses `BaseTemplate` and provides your variant's customizations.

**Example:**

```typescript
import React from "react";
import { BaseTemplate } from "../../base";
import { yourVariantTheme } from "./theme";
import { FixturaDataset } from "../../../core/types/data";
import { UIConfig } from "../../types/settingsConfig";

// Import your variant components
import { YourVariantIntro } from "./components/YourVariantIntro";
import { YourVariantOutro } from "./components/YourVariantOutro";
import { YourVariantBackground } from "./components/YourVariantBackground";
import { YourVariantMain } from "./components/YourVariantMain";
import { templateAnimations } from "./animations";

/**
 * YourVariant - extends BaseTemplate with variant-specific styling and components
 * 
 * This variant follows the same pattern as Basic, Classic, Brickwork, etc.
 * It composes BaseTemplate with custom theme, animations, and components.
 */
export const YourVariant: React.FC<{ data: FixturaDataset }> = ({ data }) => {
  return (
    <BaseTemplate
      data={data}
      settings={yourVariantTheme as unknown as UIConfig}
      introComponent={YourVariantIntro}
      outroComponent={YourVariantOutro}
      backgroundComponent={YourVariantBackground}
      mainComponentLayout={YourVariantMain}
      animations={templateAnimations}
    />
  );
};
```

**Reference:** 
- See `src/templates/variants/basic/index.tsx` for a minimal example
- See `src/templates/variants/classic/index.tsx` for another example
- All variants follow this same pattern - compose `BaseTemplate` with variant-specific props

### Optional: Create Utility Functions

If your template needs helper functions (e.g., text transformations, data formatting, complex calculations), create a `utils/` folder:

```
src/templates/variants/YourVariant/
├── utils/
│   └── titleLookup.ts  # Example utility (optional)
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

**Reference:** 
- See `src/templates/variants/twoColumnClassic/utils/titleLookup.ts` for an example
- See `src/templates/variants/thunder/utils/titleLookup.ts` for another example
- Not all variants need utilities - only add them if you have reusable logic

### Step 6: Create Documentation Files

Per `.cursorrules` requirements, you must create `readMe.md` files for documentation.

#### 6a. Variant Root `readMe.md`

Create `src/templates/variants/YourVariant/readMe.md`:

```markdown
# Folder Overview

[Brief description of your template variant's purpose and characteristics]

## Files

- `index.tsx`: Main entry point exporting the YourVariant composition (composes BaseTemplate)
- `theme.ts`: YourVariant-specific theme tokens and overrides (extends baseTheme)
- `animations.ts`: Animation presets used by YourVariant components
- `components/`: All YourVariant building blocks (Intro, Outro, Main, Background)

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: composes from `../../base`; uses `../../types` for config
- Consumed by: `../../registry.tsx`

## Dependencies

- Internal: `components`
- External: Remotion, React
```

#### 6b. Components Folder `readMe.md`

Create `src/templates/variants/YourVariant/components/readMe.md`:

```markdown
# Folder Overview

YourVariant components: Intro, Outro, Main, MainHeader, and Background components that extend BaseTemplate.

## Files

- `YourVariantIntro.tsx`: Intro sequence component
- `YourVariantOutro.tsx`: Outro sequence component
- `YourVariantMain.tsx`: Main content layout wrapper
- `YourVariantMainHeader.tsx`: Header component for main content
- `YourVariantBackground.tsx`: Background component wrapper (typically uses SelectTemplateBackground)

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: uses contexts from `../../../../core/context`
- Consumed by: `../index.tsx`

## Dependencies

- Internal: `../../../../core/context`, `../../../../components`
- External: Remotion, React
```

**Reference:** 
- See `src/templates/variants/basic/readMe.md` for a minimal example
- See `src/templates/variants/classic/readMe.md` for another example

### Step 7: Register Variant in Registry

**Purpose:** Add your variant to the template registry so it can be discovered and used by the system.

Add your template to `src/templates/registry.tsx`:

```typescript
import { YourVariant } from "./variants/yourVariant";

// ... existing imports (Basic, Classic, Brickwork, etc.)

export const templateRegistry = {
  Basic: {
    component: Basic,
    variants: Variants, // Shared background variants array
  },
  Classic: {
    component: Classic,
    variants: Variants,
  },
  // ... other existing variants
  YourVariant: {
    component: YourVariant,
    variants: Variants, // Shared background variants array (Solid, Gradient, Image, etc.)
  },
};
```

**Important:** 
- The key in `templateRegistry` (e.g., `YourVariant`) becomes the **variant ID** used throughout the system. Use PascalCase.
- This ID must match your folder name and component export name
- The `variants` array refers to **background variants** (Solid, Gradient, Image, etc.), not template variants
- Component naming must follow conventions: `YourVariantIntro`, `YourVariantOutro`, etc. (NOT `Intro`, `Outro`)
- File naming: PascalCase for components (`YourVariantIntro.tsx`), camelCase for utilities (`titleLookup.ts`)

**See existing variants:** Check `src/templates/registry.tsx` to see how `Basic`, `Classic`, `Brickwork`, etc. are registered.

---

## Hooking Up to Compositions

Compositions are sport-specific modules that contain the logic for rendering different types of content (ladder, top5, results, etc.). Each composition type exports a map of variant IDs to component implementations.

### Step 1: Create Composition Template Implementation

For each composition type (e.g., `CricketLadder`), create a template-specific implementation file.

**Example:** `src/compositions/cricket/ladder/yourVariant.tsx`

**Important:** Before creating this file, you must first create the display component (see Step 1b below).

```typescript
import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import {
  TransitionDirection,
  TransitionSeriesWrapper,
  TransitionType,
} from "../../../components/transitions";
import { LadderData } from "./types";
import LadderDisplayYourVariant from "./controller/Display/display-YourVariant";
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
        content: <LadderDisplayYourVariant ladder={ladder} />,
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

// Export with lowercase name matching variant ID
export const YourVariant: React.FC = () => {
  return <CricketLadderWithTransitions />;
};

export default YourVariant;
```

**Note:** The export name should match your variant ID (lowercase). The component uses `useVideoDataContext()` to access data - this is provided by `BaseTemplate`.

### Step 1b: Create Display Component

**CRITICAL:** Each composition implementation requires a corresponding display component that renders the actual content. The display component lives in `controller/Display/`.

**Example:** `src/compositions/cricket/ladder/controller/Display/display-YourVariant.tsx`

```typescript
import React from "react";
import TableHeader from "../../modules/TableHeader/header";
import StandardRow from "../TeamRows/StandardRow";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { SponsorFooter } from "../../../sponsorFooter";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { LadderDisplayProps } from "./_types/LadderDisplayProps";
import { calculateRowDimensions } from "./_utils/calculations";

export const LadderDisplayYourVariant: React.FC<LadderDisplayProps> = ({
  ladder,
}) => {
  const { selectedPalette, layout } = useThemeContext();
  const { League, gradeName, bias, assignSponsors } = ladder;
  const { heights } = layout;
  const { animations } = useAnimationContext();
  const containerAnimation = animations.container.main.itemContainer;
  const { headerHeight, rowHeight } = calculateRowDimensions(
    heights.asset,
    League.length,
  );

  return (
    <div className="p-0 flex flex-col w-full h-full">
      <AnimatedContainer
        type="full"
        className={`${layout.borderRadius.container} flex-1 flex flex-col mx-8 p-2 overflow-hidden`}
        backgroundColor={undefined}
        style={{
          background: selectedPalette.container.backgroundTransparent.high,
        }}
        animation={containerAnimation.containerIn}
        exitAnimation={containerAnimation.containerOut}
      >
        <div>
          <TableHeader title={gradeName} headerHeight={headerHeight} />
          <div className="flex-1 overflow-hidden">
            {League.map((team, index) => (
              <StandardRow
                key={team.position}
                team={team}
                index={index}
                totalTeams={League.length}
                isBiasTeam={team.teamName === bias}
                LadderRowHeight={rowHeight}
              />
            ))}
          </div>
        </div>
      </AnimatedContainer>
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter assignSponsors={assignSponsors} />
      </div>
    </div>
  );
};

export default LadderDisplayYourVariant;
```

**Key Points:**
- Display components are variant-specific implementations of how data is rendered
- They use shared types from `_types/` folder (e.g., `LadderDisplayProps`)
- They use shared utilities from `_utils/` folder (e.g., `calculateRowDimensions`)
- They access theme and animations via context hooks
- File naming: `display-YourVariant.tsx` (lowercase variant name with hyphens)

**Display Component Structure:**
- Each composition type has its own display component structure
- Display components are located in `controller/Display/` folder
- They receive composition-specific data as props (e.g., `ladder: LadderData`)
- They render the visual representation using template-specific styling

**Reference:** 
- See `src/compositions/cricket/ladder/controller/Display/display-Basic.tsx` for a complete example
- See `src/compositions/cricket/ladder/controller/Display/_types/LadderDisplayProps.ts` for type definitions
- See `src/compositions/cricket/ladder/controller/Display/_utils/calculations.ts` for shared utilities

### Step 2: Export from Composition Index

Add your variant to the composition's index file.

**Example:** `src/compositions/cricket/ladder/index.tsx`

```typescript
import { YourVariant as ladderYourVariant } from "./yourVariant";

// ... existing imports

export const CricketLadder = {
  basic: ladderBasic,
  // ... existing variants
  yourvariant: ladderYourVariant, // lowercase key matching variant ID
};
```

### Step 3: Add to Sport Module Export

Add the composition to the sport's main index file.

**Example:** `src/compositions/cricket/index.tsx`

```typescript
import {
  yourvariant as ladderYourVariant,
} from "./ladder";

// ... existing imports

export const CricketLadder = {
  basic: ladderBasic,
  // ... existing variants
  yourvariant: ladderYourVariant,
};
```

**Important:** The key in the composition map (e.g., `yourvariant`) must match the variant ID from the registry (lowercase). The routing system uses this to find the correct component.

---

## Hooking Up to Routes

The routing system automatically discovers variants from the composition maps. However, you need to ensure:

1. **Template Registry** is updated (already done in Step 7 above)
2. **Composition Maps** are updated (already done in Steps 2-3 above)
3. **Production Root** uses the registry (already configured)

### How Routing Works

1. **Production Root** (`src/ProductionRoot.tsx`):
   - Reads `templateId` from `data.videoMeta.video.appearance.template` (this is your variant ID)
   - Looks up variant in `templateRegistry`
   - Creates a Remotion `Composition` with the variant component

2. **Development Root** (`src/DevelopmentRoot.tsx`):
   - Iterates through `templateRegistry`
   - Creates compositions for each variant + background variant + dataset combination
   - Used for previewing variants in Remotion Studio

3. **Route to Composition** (`src/core/utils/routing.tsx`):
   - Used in development/preview mode
   - Reads sport, composition type, and variant ID from data
   - Looks up component from sport module → composition type → variant ID
   - Returns the component for rendering

### Variant ID Matching

The system matches variant IDs using:
- **Registry keys**: PascalCase (e.g., `YourVariant`)
- **Composition map keys**: lowercase (e.g., `yourvariant`)
- **Data template ID**: Can be either case (system normalizes to lowercase) - note: the data field is called `template` but it contains the variant ID

**Important:** Ensure consistency:
- Registry key: `YourVariant` (PascalCase)
- Composition map key: `yourvariant` (lowercase)
- Both refer to the same variant component

---

## Testing Your Variant

### 1. Development Mode

Start Remotion Studio:

```bash
npm run dev
```

Your variant should appear in the Remotion Studio sidebar under:
- Variant name → Background Variant → Sport → Dataset

### 2. Verify Variant Registration

Check that your variant appears in:
- `src/templates/registry.tsx` (registry export)
- Composition index files (sport → composition type → variant map)

### 3. Test with Different Compositions

Ensure your variant works with all composition types:
- Ladder
- Top5
- Results
- Upcoming
- ResultSingle
- Performances
- TeamOfTheWeek
- Roster

### 4. Test with Different Background Variants

Test that background variants work (these are shared across all template variants):
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

Test your variant with actual test data files:
- Location: `testData/samples/{Sport}/{DatasetName}.json`
- Use Remotion Studio to preview with different datasets
- Test edge cases: empty data, missing fields, etc.
- Verify data flows correctly through all contexts

---

## Common Patterns and Best Practices

### Pattern Library References

When implementing your variant, refer to existing variants for patterns:

- **Minimal Example**: `src/templates/variants/basic/` - Simplest template implementation
- **Complex Layout**: `src/templates/variants/twoColumnClassic/` - Two-column layout with utilities
- **Custom Styling**: `src/templates/variants/brickwork/` - Custom styling patterns
- **Classic Pattern**: `src/templates/variants/classic/` - Standard classic implementation

### Common Gotchas

1. **Variant ID Case Sensitivity**: Registry uses PascalCase, composition maps use lowercase
2. **Background Component**: Always use `SelectTemplateBackground()` unless you have a specific need
3. **Component Naming**: Must include variant prefix to avoid conflicts
4. **Font Access**: Use `fontClasses` from `ThemeContext`, not direct font names
5. **Animation Keys**: Must match exactly what components expect (check existing variants)

## Common Patterns and Best Practices

### 1. Component Structure

- **Intro**: Use `VerticalStackTitleLogoName` or custom layout
- **Outro**: Handle sponsor display or fallback message
- **Main**: Use `OneColumn` or `TwoColumn` layout components
- **Background**: Use `SelectTemplateBackground()` (standard pattern)

### 1a. Component Naming Conventions

**CRITICAL:** All components must use the variant name prefix:
- ✅ `YourVariantIntro` (correct)
- ❌ `Intro` (incorrect - conflicts with other variants)
- ✅ `YourVariantOutro` (correct)
- ✅ `YourVariantMain` (correct)
- ✅ `YourVariantBackground` (correct)

File naming:
- Components: PascalCase (`YourVariantIntro.tsx`)
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

- Use `FixturaDataset` type for variant props
- Use `UIConfig` type for settings
- Use `AnimationConfig` type for animations

### 5a. Custom Types (Optional)

If your template needs custom types beyond base types, create a `types.ts` file:

```typescript
// types.ts
export interface YourVariantConfig {
  customSetting: string;
  // ... other custom types
}
```

**When to create custom types:**
- Variant-specific configuration
- Complex data structures unique to your variant
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

**Note:** Most variants don't need performance optimization initially. Focus on correctness first, optimize later if needed.

---

## Troubleshooting

### Variant Not Appearing in Studio

- Check registry export name matches variant ID (case-sensitive, PascalCase)
- Verify composition map includes your variant (lowercase key)
- Ensure variant component is exported correctly
- Check that `DevelopmentRoot.tsx` includes your variant in iteration
- Verify variant ID consistency: Registry (PascalCase) vs Composition map (lowercase)

### Composition Not Found

- Verify composition type is registered in `SPORT_COMPOSITION_TYPES`
- Check sport module includes your composition type
- Ensure variant key matches (case-sensitive in maps)

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

When creating a new **template variant** (like Basic, Classic, Brickwork), ensure:

### Setup & Structure
- [ ] Created variant folder in `src/templates/variants/YourVariant/` (following same structure as `basic/`, `classic/`, etc.)
- [ ] Created `readMe.md` files (variant root + components/)
- [ ] Created `theme.ts` extending `baseTheme` (only override what's different)
- [ ] Created `animations.ts` with animation presets
- [ ] Created all variant components (Intro, Outro, Main, MainHeader, Background)
- [ ] Background component uses `SelectTemplateBackground()` (standard pattern - see `basic/components/BasicBackground.tsx`)
- [ ] Created `index.tsx` composing `BaseTemplate` with variant-specific props
- [ ] Component naming follows conventions (variant name prefix: `YourVariantIntro`, NOT `Intro`)

### Registration & Integration
- [ ] Registered variant in `registry.tsx` with correct variant ID (PascalCase, e.g., `YourVariant`)
- [ ] Created display components for each composition type (`controller/Display/display-YourVariant.tsx`)
- [ ] Created composition implementations for each composition type (`yourVariant.tsx`)
- [ ] Added variant to composition index files (lowercase key: `yourvariant`)
- [ ] Added variant to sport module exports
- [ ] Updated parent documentation (`templates/.docs/readMe.md` if needed)

### Testing & Verification
- [ ] Tested in Remotion Studio
- [ ] Verified variant appears in sidebar (Variant → Background Variant → Sport → Dataset)
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
- **Variant ID**: PascalCase (e.g., `YourVariant`) - matches folder name and registry key
- **Composition map key**: lowercase (e.g., `yourvariant`)
- **Component files**: PascalCase (`YourVariantIntro.tsx`)
- **Utility files**: camelCase (`titleLookup.ts`)
- **Component names**: Must include variant prefix (`YourVariantIntro`, NOT `Intro`)

### Standard Patterns
- **Background**: `SelectTemplateBackground()` (99% of templates)
- **Fonts**: Access via `useThemeContext()` → `fontClasses.title?.family`
- **Animations**: Access via `useAnimationContext()` → `animations.{category}.{section}`
- **Data**: Access via `useVideoDataContext()` → `data.videoMeta.video.*`

### Key Distinctions
- **Template Variants** (what you're creating): Visual style/layout variants that extend BaseTemplate (Basic, Classic, Brickwork, YourVariant)
- **Background Variants**: Background type options (Solid, Gradient, Image, Video, etc.) - shared across all template variants, selected via `templateVariation.useBackground`
- **Base Template**: The foundational infrastructure (`src/templates/base/`) that all variants extend - you don't modify this

## Reference Files

### Core Template Files
- **Base Template** (infrastructure - don't modify): `src/templates/base/index.tsx`
- **Example Variants** (reference implementations):
  - Minimal: `src/templates/variants/basic/`
  - Classic: `src/templates/variants/classic/`
  - Custom styling: `src/templates/variants/brickwork/`
  - Two-column: `src/templates/variants/twoColumnClassic/`
- Variant Documentation: `src/templates/variants/basic/readMe.md`
- Registry: `src/templates/registry.tsx` (see how existing variants are registered)

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
