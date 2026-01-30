# How to Create a Results Template Guide

This guide walks you through creating a new results template variant for cricket match results. A results template consists of four main components working together to display match results in a consistent, reusable format.

## Overview

A results template follows a hierarchical structure:

```
Entry Point (e.g., myTemplate.tsx)
  └── ResultsDisplay Component (controller/ResultsDisplay/display-MyTemplate.tsx)
      └── MatchRow Component (controller/MatchRow/row-MyTemplate.tsx)
          └── MatchCard Component (layout/MatchCard/card-MyTemplate.tsx)
              └── Section Components (layout/Sections/*)
```

## Prerequisites

- Understanding of React and TypeScript
- Familiarity with Remotion framework
- Knowledge of the existing template structure (review `basic.tsx` as reference)

## Step-by-Step Guide

### Step 1: Create the Entry Point Component

Create a new file in the root `results/` directory: `myTemplate.tsx`

**Template Structure:**

```tsx
import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import NoResultsData from "./modules/NoResultsData/no-data";
import ResultsDisplayMyTemplate from "./controller/ResultsDisplay/display-MyTemplate";
import {
  TransitionDirection,
  TransitionSeriesWrapper,
  TransitionType,
} from "../../../components/transitions";
import { useAnimationContext } from "../../../core/context/AnimationContext";
import {
  DEFAULT_RESULTS_PER_SCREEN,
  calculateDisplayDurationPerScreen,
  calculateTotalScreens,
  castToMatchResults,
  hasValidResults,
} from "./_utils/calculations";

export const ResultsList: React.FC = () => {
  const { data } = useVideoDataContext();
  const { data: resultsData, videoMeta, timings } = data;
  const { animations } = useAnimationContext();
  const transitionConfig = animations.transition.Main;

  // If no data is available, show a placeholder
  if (!hasValidResults(resultsData)) {
    return <NoResultsData />;
  }

  // Set to 2 results per screen as requested
  const resultsPerScreen = DEFAULT_RESULTS_PER_SCREEN;

  // Get frame duration from timings or use default
  const frameOptions = videoMeta?.video?.metadata?.frames || [300];
  const displayDurationPerScreen = calculateDisplayDurationPerScreen(
    timings,
    frameOptions,
  );

  // Calculate how many screens we need based on results per screen
  const totalScreens = calculateTotalScreens(
    resultsData.length,
    resultsPerScreen,
  );

  // Cast the data to the correct type
  const matchResults = castToMatchResults(resultsData);

  // Create sequence data for each screen
  const sequences = Array.from({ length: totalScreens }, (_, index) => ({
    content: (
      <ResultsDisplayMyTemplate
        results={matchResults}
        resultsPerScreen={resultsPerScreen}
        screenIndex={index}
      />
    ),
    durationInFrames: displayDurationPerScreen,
  }));

  return (
    <TransitionSeriesWrapper
      sequences={sequences}
      transitionType={transitionConfig.type as TransitionType}
      direction={transitionConfig.direction as TransitionDirection}
      timing={{
        type: "linear",
        durationInFrames: transitionConfig.durationInFrames,
      }}
    />
  );
};

// Export as MyTemplate for compatibility with template system
export const MyTemplate: React.FC = () => {
  return <ResultsList />;
};

export default MyTemplate;
```

**Key Points:**

- Replace `MyTemplate` with your template name (use PascalCase)
- Replace `ResultsDisplayMyTemplate` with your display component import
- The component handles pagination, transitions, and data validation
- Uses shared utilities from `_utils/calculations.ts`

---

### Step 2: Create the ResultsDisplay Component

Create: `controller/ResultsDisplay/display-MyTemplate.tsx`

**Template Structure:**

```tsx
import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { SponsorFooter } from "../../../sponsorFooter";
import MatchRowMyTemplate from "../MatchRow/row-MyTemplate";
import { ResultsDisplayProps } from "./_types/ResultsDisplayProps";
import {
  calculateDisplayedResults,
  calculateRowHeight,
  mergeAssignSponsors,
} from "./_utils/calculations";

const ResultsDisplayMyTemplate: React.FC<ResultsDisplayProps> = ({
  results,
  resultsPerScreen,
  screenIndex,
}) => {
  const { layout } = useThemeContext();
  const { heights } = layout;

  // Calculate which results to show on this screen
  const { displayedResults } = calculateDisplayedResults(
    results,
    resultsPerScreen,
    screenIndex,
  );
  const availableHeight = heights.asset;

  // Calculate row height (divides available height by number of results per screen)
  const rowHeight = calculateRowHeight(availableHeight);

  // Merge all assignSponsors objects from displayedResults into one object
  const mergedAssignSponsors = mergeAssignSponsors(displayedResults);

  return (
    <div className="flex flex-col h-full w-full">
      {/* Results container */}
      <div
        className="w-full flex flex-col justify-between"
        style={{ height: `${availableHeight}px` }}
      >
        {displayedResults.map((match, index) => (
          <div
            key={match.gameID}
            className="w-full"
            style={{
              height: `${rowHeight}px`,
              marginBottom: index === 0 ? "10px" : 0, // Adjust spacing as needed
            }}
          >
            <MatchRowMyTemplate
              match={match}
              index={index}
              rowHeight={rowHeight}
            />
          </div>
        ))}
      </div>
      {/* Sponsor Footer */}
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter assignSponsors={mergedAssignSponsors} />
      </div>
    </div>
  );
};

export default ResultsDisplayMyTemplate;
```

**Key Points:**

- Uses `ResultsDisplayProps` from `_types/ResultsDisplayProps.ts` (already exists)
- Uses shared calculation utilities
- Handles pagination logic
- Renders multiple MatchRow components
- Includes SponsorFooter at the bottom

---

### Step 3: Create the MatchRow Component

Create: `controller/MatchRow/row-MyTemplate.tsx`

**Template Structure:**

```tsx
import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import MatchCardMyTemplate from "../../layout/MatchCard/card-MyTemplate";
import MatchCardMyTemplateClubOnly from "../../layout/MatchCard/card-MyTemplate-clubOnly"; // Optional
import { MatchRowProps } from "./_types/MatchRowProps";
import {
  calculateDelay,
  calculateAnimationOutFrame,
} from "./_utils/calculations";

const MatchRowMyTemplate: React.FC<MatchRowProps> = ({
  match,
  index,
  rowHeight,
}) => {
  const { animations } = useAnimationContext();
  const { data, isAccountClub } = useVideoDataContext();
  const { timings } = data;

  const containerAnimation = animations.container.main.itemContainer;
  const delay = calculateDelay(index);
  const animationOutFrame = calculateAnimationOutFrame(timings?.FPS_SCORECARD);

  return (
    <div className="h-full w-full">
      <AnimatedContainer
        type="full"
        className="rounded-md h-full w-full"
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
        exitFrame={animationOutFrame}
      >
        {isAccountClub ? (
          <MatchCardMyTemplateClubOnly
            match={match}
            index={index}
            rowHeight={rowHeight}
            delay={delay}
          />
        ) : (
          <MatchCardMyTemplate
            match={match}
            index={index}
            rowHeight={rowHeight}
            delay={delay}
          />
        )}
      </AnimatedContainer>
    </div>
  );
};

export default MatchRowMyTemplate;
```

**Key Points:**

- Uses `MatchRowProps` from `_types/MatchRowProps.ts` (already exists)
- Uses shared delay and animation calculations
- Handles club-only variant if `isAccountClub` is true
- Wraps MatchCard in AnimatedContainer for transitions

---

### Step 4: Create the MatchCard Component

Create: `layout/MatchCard/card-MyTemplate.tsx`

**Template Structure:**

```tsx
import React from "react";
import MatchHeader from "../Sections/MatchHeader/MatchHeader";
import { ScoreOverNameWithLogo } from "../Sections/TeamsSection/index";
import PlayerStatsBasic from "../Sections/PlayerStats/PlayerStats-Basic";
import MatchStatus from "../Sections/MatchStatus/MatchStatus";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { MatchCardProps } from "./_types/MatchCardProps";
import {
  calculateSectionHeights,
  calculateDelays,
} from "./_utils/calculations";

const MatchCardMyTemplate: React.FC<MatchCardProps> = ({
  match,
  rowHeight,
  delay,
}) => {
  const { selectedPalette } = useThemeContext();

  // Calculate section heights (40% teams, 50% stats, 10% header)
  const { teamsHeight, statsHeight, headerHeight } =
    calculateSectionHeights(rowHeight);

  // Calculate delays for staggered animations
  const { baseDelay, statsDelay, headerDelay } = calculateDelays(delay);

  return (
    <div className="rounded-lg w-auto mx-8 overflow-hidden h-full">
      {/* Section 1: Team scores and names */}
      <ScoreOverNameWithLogo
        type={match.type}
        homeTeam={match.homeTeam}
        awayTeam={match.awayTeam}
        homeTeamLogo={match.teamHomeLogo}
        awayTeamLogo={match.teamAwayLogo}
        delay={baseDelay}
        outerContainer={{
          height: teamsHeight,
        }}
      />

      {/* Show status if match is abandoned */}
      {match.status === "Abandoned" && (
        <MatchStatus
          status={`${match.status}`}
          result={match.result}
          delay={headerDelay}
          outerContainer={{
            background: selectedPalette.container.backgroundTransparent.high,
            height: headerHeight,
          }}
        />
      )}

      {/* Section 2: Player statistics */}
      <PlayerStatsBasic
        homeTeam={match.homeTeam}
        awayTeam={match.awayTeam}
        height={statsHeight}
        delay={statsDelay}
        maxPlayersPerStat={2}
        matchType={match.type}
        matchStatus={match.status}
      />

      {/* Section 3: Match info footer */}
      <MatchHeader
        type={match.type}
        round={match.round}
        ground={match.ground}
        height={headerHeight}
        delay={headerDelay}
        backgroundColor={"transparent"}
        CopyVariant="onContainerCopyNoBg"
      />
    </div>
  );
};

export default MatchCardMyTemplate;
```

**Key Points:**

- Uses `MatchCardProps` from `_types/MatchCardProps.ts` (already exists)
- Uses shared height and delay calculations
- Composes section components from `layout/Sections/`
- You can customize which section components to use (see available options below)

---

### Step 5: (Optional) Create Club-Only Variant

If you need a club-only variant, create: `layout/MatchCard/card-MyTemplate-clubOnly.tsx`

This variant typically:

- Shows only the club team's player stats
- Uses `PlayerStats-clubOnly-Basic` component
- Filters data using `getClubTeamPlayers` utility from `MatchCard/_utils/calculations.ts`

**Example:**

```tsx
import React from "react";
import MatchHeader from "../Sections/MatchHeader/MatchHeader";
import { ScoreOverNameWithLogo } from "../Sections/TeamsSection/index";
import PlayerStatsClubOnlyBasic from "../Sections/PlayerStats/PlayerStats-clubOnly-Basic";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { MatchCardProps } from "./_types/MatchCardProps";
import {
  calculateSectionHeights,
  calculateDelays,
} from "./_utils/calculations";

const MatchCardMyTemplateClubOnly: React.FC<MatchCardProps> = ({
  match,
  rowHeight,
  delay,
}) => {
  const { selectedPalette } = useThemeContext();

  const { teamsHeight, statsHeight, headerHeight } =
    calculateSectionHeights(rowHeight);
  const { baseDelay, statsDelay, headerDelay } = calculateDelays(delay);

  return (
    <div className="rounded-lg w-auto mx-8 overflow-hidden h-full">
      <ScoreOverNameWithLogo
        type={match.type}
        homeTeam={match.homeTeam}
        awayTeam={match.awayTeam}
        homeTeamLogo={match.teamHomeLogo}
        awayTeamLogo={match.teamAwayLogo}
        delay={baseDelay}
        outerContainer={{
          height: teamsHeight,
        }}
      />

      {/* Club-only player stats */}
      <PlayerStatsClubOnlyBasic
        match={match}
        height={statsHeight}
        delay={statsDelay}
        maxPlayersPerStat={3}
        matchType={match.type}
        matchStatus={match.status}
      />

      <MatchHeader
        type={match.type}
        round={match.round}
        ground={match.ground}
        height={headerHeight}
        delay={headerDelay}
        backgroundColor={"transparent"}
        CopyVariant="onContainerCopyNoBg"
      />
    </div>
  );
};

export default MatchCardMyTemplateClubOnly;
```

---

### Step 6: Export Your Template

Update `index.tsx` in the root `results/` directory:

```tsx
import { MyTemplate as MyTemplateResults } from "./myTemplate";

// Add to existing exports
export { MyTemplateResults as myTemplate };
```

---

## Available Section Components

### TeamsSection Components

Located in: `layout/Sections/TeamsSection/`

- `TeamsSectionVertical` - Vertical team layout
- `TeamsSectionLogoAbove` - Logo above team name
- `TeamsSectionLogoBelow` - Logo below team name
- `TeamsSectionLogoAndScore` - Logo and score combined
- `TeamsSectionScoreOverTeamNameOnly` - Score over team name
- `LogoWithScoreOverName` - Logo with score over name
- `ScoreOverNameWithLogo` - Score over name with logo
- `Horizontal_SingleTeam_LogoWithName_Score` - Horizontal single team
- `Horizontal_SingleTeam_CNSW` - CNSW horizontal variant
- `Horizontal_SingleTeam_CNSW-private` - CNSW private variant

### PlayerStats Components

Located in: `layout/Sections/PlayerStats/`

- `PlayerStats` - Base component
- `PlayerStats-Basic` - Basic variant
- `PlayerStats-BrickWork` - BrickWork variant
- `PlayerStats-CNSW` - CNSW variant
- `PlayerStats-CNSW-private` - CNSW private variant
- `PlayerStats-clubOnly-Basic` - Club-only variant
- `PlayerStats-SingleTeamOnly` - Single team variant

### MatchHeader Components

Located in: `layout/Sections/MatchHeader/`

- `MatchHeader` - Standard match header
- `SingleDataPointHeader` - Single data point variant

### Other Sections

- `MatchStatus` - Match status display (`layout/Sections/MatchStatus/`)
- `ResultStatementShort` / `ResultStatementText` - Result statements (`layout/Sections/ResultStatement/`)

---

## Customization Tips

### 1. Adjusting Section Heights

Modify the height calculations in `MatchCard/_utils/calculations.ts`:

```tsx
export const calculateSectionHeights = (rowHeight: number) => {
  const teamsHeight = Math.floor(rowHeight * 0.4); // 40% for teams
  const statsHeight = Math.floor(rowHeight * 0.5); // 50% for stats
  const headerHeight = Math.floor(rowHeight * 0.1); // 10% for header
  // Adjust percentages as needed
};
```

### 2. Customizing Animation Delays

Modify delay calculations in `MatchCard/_utils/calculations.ts`:

```tsx
export const calculateDelays = (delay: number) => {
  const baseDelay = delay;
  const statsDelay = baseDelay + 4; // Adjust stagger timing
  const headerDelay = statsDelay + 5; // Adjust stagger timing
};
```

### 3. Using Different Section Components

Mix and match section components based on your design needs:

```tsx
// Example: Use different teams section
import { TeamsSectionLogoAbove } from "../Sections/TeamsSection/index";

// Example: Use different player stats variant
import PlayerStatsBrickWork from "../Sections/PlayerStats/PlayerStats-BrickWork";
```

### 4. Styling Customization

- Use Tailwind CSS classes for styling
- Access theme colors via `useThemeContext()` hook
- Use `selectedPalette` for consistent color theming

---

## Testing Your Template

1. **Import and use in a Remotion composition:**

   ```tsx
   import { myTemplate } from "./compositions/cricket/results";

   <Composition
     id="MyResultsTemplate"
     component={myTemplate}
     durationInFrames={300}
     fps={30}
     width={1920}
     height={1080}
   />;
   ```

2. **Verify data flow:**

   - Check that match results display correctly
   - Verify pagination works (2 results per screen)
   - Test with empty data (should show NoResultsData)
   - Test with club account (should use club-only variant if created)

3. **Check animations:**
   - Verify staggered animations work correctly
   - Check transition effects between screens
   - Ensure exit animations trigger properly

---

## File Checklist

- [ ] Entry point: `results/myTemplate.tsx`
- [ ] ResultsDisplay: `controller/ResultsDisplay/display-MyTemplate.tsx`
- [ ] MatchRow: `controller/MatchRow/row-MyTemplate.tsx`
- [ ] MatchCard: `layout/MatchCard/card-MyTemplate.tsx`
- [ ] (Optional) Club-only MatchCard: `layout/MatchCard/card-MyTemplate-clubOnly.tsx`
- [ ] Export added to `results/index.tsx`

---

## Common Patterns

### Pattern 1: Simple Template (Basic)

- Uses standard section components
- Follows default height/delay calculations
- Single variant (no club-only)

### Pattern 2: Styled Template (BrickWork, CNSW)

- Custom section component combinations
- Adjusted styling and spacing
- May include custom color schemes

### Pattern 3: Multi-Variant Template (Classic, SixersThunder)

- Multiple layout options
- Conditional rendering based on match type
- Enhanced visual effects

---

## Reference Examples

- **Basic Template**: `basic.tsx` → `display-Basic.tsx` → `row-Basic.tsx` → `card-Basic.tsx`
- **BrickWork Template**: `brickWork.tsx` → `display-BrickWork.tsx` → `row-Brickwork.tsx` → `card-BrickWork.tsx`
- **CNSW Template**: `cnsw.tsx` → `display-CNSW.tsx` → `row-CNSW.tsx` → `card-CNSW.tsx`

---

## Need Help?

- Review existing templates for patterns
- Check `_types/types.tsx` for available data structures
- Consult `_utils/calculations.ts` for shared utilities
- Review section component README files in `layout/Sections/`

---

## Notes

- All templates share the same prop types (`MatchCardProps`, `MatchRowProps`, `ResultsDisplayProps`)
- Use shared utilities from `_utils/` folders to maintain consistency
- Follow the naming convention: `myTemplate.tsx`, `display-MyTemplate.tsx`, `row-MyTemplate.tsx`, `card-MyTemplate.tsx`
- Keep component logic focused and composable
- Document any custom behavior or deviations from standard patterns
