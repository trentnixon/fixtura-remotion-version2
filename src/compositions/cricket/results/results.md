# Cricket Results List Component Documentation

## Overview

The Cricket Results List component is designed to display multiple match results in a list format. It organizes match data into screens, showing a predefined number of match results per screen (default: 2), with smooth transitions between screens. This component is ideal for presenting a summary view of multiple cricket matches.

## Folder Structure

```
results/
├── basic.tsx                  # Main component with transitions
├── index.tsx                  # Export file
├── types.tsx                  # TypeScript interfaces and constants
├── results.md                 # This documentation file
├── controller/                # Logic controllers
│   ├── ResultsDisplay/        # Main display controller for results screens
│   └── MatchRow/              # Controls rendering of individual match rows
├── layout/                    # Layout components
│   ├── MatchCard/             # Card layout for match info
│   ├── MatchRowLayout.tsx     # Row layout for matches
│   └── Sections/              # Specialized section layouts
├── modules/                   # Reusable components
│   └── NoResultsData/         # Fallback for missing data
└── utils/                     # Utility functions
```

## How It Works

### Data Flow

1. The `basic.tsx` component serves as the entry point
2. It retrieves data from `VideoDataContext`
3. The match results are grouped into screens (default: 2 results per screen)
4. Each screen is rendered as a sequence in the transition series
5. `ResultsDisplay` orchestrates the rendering of each screen
6. Individual match rows are rendered with the `MatchRow` controller
7. Multiple screens transition smoothly based on the animation configuration

### Key Features

- **Multiple Results Per Screen**: Displays a configurable number of match results per screen (default: 2)
- **Screen-based Navigation**: Automatically creates the right number of screens based on data volume
- **Uniform Styling**: Consistent presentation of match results
- **Responsive Layouts**: Adapts to different resolutions and aspect ratios
- **Transition Effects**: Smooth transitions between screens

### Data Model

The component works with the following key data structures:

- **MatchResult**: Top-level object containing all match data
- **Team**: Team information including scores, logo, and player performances
- **BattingPerformance**: Individual player batting statistics
- **BowlingPerformance**: Individual player bowling statistics
- **TeamLogo**: Image information for team logos

### Animation System

- The component uses Remotion's animation capabilities
- Key animation constants are defined in `types.tsx`:
  - `RESULT_HEADER_ANIMATION_DURATION`: Controls header animation timing (default: 45 frames)
  - `RESULT_STAGGER_DELAY`: Controls staggered entry timing (default: 15 frames)
  - `RESULT_ANIMATION_DURATION`: Controls general animation duration (default: 30 frames)
- Elements appear in a choreographed sequence with staggered animations
- Transition effects between screens are configured via the `AnimationContext`

### Styling System

- Styling is implemented using CSS-in-JS with responsive design
- The `MatchRowLayout.tsx` contains the core styling logic for result rows
- Design follows a modular approach for consistent styling across templates
- Visual elements automatically adapt to different resolution requirements
- Color themes can be customized through context providers

## Template System

The results component follows a template pattern where:

1. `basic.tsx` serves as the foundational template
2. The `controller/ResultsDisplay/display.tsx` handles overall layout and screen rendering
3. The `controller/MatchRow` controls the appearance of individual match results
4. Various visual styles can be applied to match rows and headers

### Adding New Templates

To add a new template for displaying match results:

1. Create a new component in the appropriate directory (e.g., `controller/MatchRow/`)
2. Implement the component with proper typing and animations
3. Export the component and add it to the available options in the display controller

Example structure for a new match row template:

```tsx
// controller/MatchRow/AlternativeRow.tsx
import React from "react";
import { MatchResult } from "../../types";
import { RESULT_ANIMATION_DURATION, RESULT_STAGGER_DELAY } from "../../types";

interface Props {
  match: MatchResult;
  index: number;
}

export const AlternativeRow: React.FC<Props> = ({ match, index }) => {
  return (
    <div
      className="alternative-match-row"
      style={{
        animation: `fadeIn ${RESULT_ANIMATION_DURATION}frames ease-in-out`,
        animationDelay: `${RESULT_STAGGER_DELAY * index}frames`,
      }}
    >
      {/* Alternative match row implementation */}
      {/* Team information */}
      {/* Match details */}
    </div>
  );
};

export default AlternativeRow;
```

## Adding New Components

To add new components or variations:

1. Create a new folder in the appropriate directory:

   - Reusable UI elements → `modules/`
   - Layout structures → `layout/`
   - Data handling → `controller/`

2. Create the component with clear interfaces:

```tsx
// Example of a new component
import React from "react";
import { MatchResult } from "../../types";
import { RESULT_ANIMATION_DURATION, RESULT_STAGGER_DELAY } from "../../types";

interface Props {
  match: MatchResult;
  animationDelay: number;
}

export const MatchSummary: React.FC<Props> = ({ match, animationDelay }) => {
  return (
    <div
      className="match-summary"
      style={{
        animationDelay: `${RESULT_STAGGER_DELAY + animationDelay}frames`,
      }}
    >
      {/* Component implementation */}
    </div>
  );
};

export default MatchSummary;
```

3. Import and use the component in the appropriate template or controller

## Customization Options

The Results component can be customized in several ways:

1. **Number of Results Per Screen**: Modify the `resultsPerScreen` value in `basic.tsx`
2. **Animation Timing**: Adjust the constants in `types.tsx`
3. **Layout Styles**: Create new layout components in the `layout` directory
4. **Visual Themes**: Implement different visual styles through the styling system
5. **Transition Effects**: Configure transitions in the `AnimationContext`

## Potential Improvements

### Short-term Improvements

- Add filtering options for results by date, competition, or team
- Implement sorting capabilities (e.g., by date, score)
- Add more visual variations for match rows
- Support for team color themes
- Enhance animations with more diverse effects

### Medium-term Improvements

- Create specialty templates for tournament results
- Implement pagination controls for manual navigation
- Add statistical summaries across multiple matches
- Support for highlighting specific matches
- Group results by round, date, or competition

### Long-term Enhancements

- Advanced filtering and search capabilities
- Integration with live data sources
- Comparative analysis between teams across multiple matches
- Interactive elements for web-based video players
- AI-powered match highlights or insights

## Usage Example

The results component can be used within a Remotion composition as follows:

```tsx
import { Composition } from "remotion";
import { ResultsList } from "./compositions/cricket/results";

export const RemotionVideo: React.FC = () => {
  return (
    <>
      <Composition
        id="CricketResults"
        component={ResultsList}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
```

## Differences from ResultSingle

While the ResultSingle component focuses on displaying detailed information for a single match, the Results component is optimized for:

1. Displaying multiple match results in a concise format
2. Organizing results into screens with a fixed number of results per screen
3. Providing a summary view rather than detailed statistics
4. Efficient navigation through multiple matches

This documentation will be updated as new features and improvements are added to the results component.
