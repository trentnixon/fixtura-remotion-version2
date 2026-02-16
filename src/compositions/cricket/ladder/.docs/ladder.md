# Cricket Ladder Component Documentation

## Overview

The Cricket Ladder component is designed to display team standings in a cricket league or tournament. It presents data in a tabular format showing team positions, match statistics, and points.

## Folder Structure

```
ladder/
├── basic.tsx                  # Main component with transitions
├── index.tsx                  # Export file
├── types.ts                   # TypeScript interfaces and constants
├── ladder.md                  # This documentation file
├── controller/                # Logic controllers
│   ├── Display/               # Main display controller
│   │   └── display.tsx        # Controls rendering of ladder data
│   └── TeamRows/              # Team row controllers
├── layout/                    # Layout components
│   └── TableRowLayout.tsx     # Table row layout and styling
└── modules/                   # Reusable components
    ├── LadderHeaders/         # Ladder header components
    ├── NoLadderData/          # Fallback for missing data
    └── TableHeader/           # Table header components
```

## How It Works

### Data Flow

1. The `basic.tsx` component serves as the entry point
2. It retrieves data from `VideoDataContext`
3. Data is passed to `LadderDisplay` component
4. `LadderDisplay` organizes the layout with headers and rows
5. Each row is rendered with appropriate animations

### Animation System

- The component uses Remotion's animation capabilities
- Key animation constants are defined in `types.ts`:
  - `HEADER_ANIMATION_DURATION`: Controls header animation timing (default: 45 frames)
  - `TABLE_ANIMATION_DURATION`: Controls table row animation timing (default: 90 frames)
- Animations follow a staggered pattern where elements appear sequentially
- Transition effects between multiple ladder tables are configured via the `AnimationContext`

### Styling System

- Styling is implemented using CSS-in-JS with a focus on responsive design
- The `TableRowLayout.tsx` contains most of the styling logic
- Design follows a modular approach with reusable components
- Styles are responsive and will adapt to different resolution requirements
- Color schemes can be customized through context providers

## Template System

The ladder component follows a template pattern where:

1. `basic.tsx` serves as the base template
2. The `controller/Display/display.tsx` handles template selection and rendering
3. Templates are composed of modules (headers, rows, etc.)

### Adding New Templates

To add a new template:

1. Create a new component in the `controller/Display` directory
2. Extend the existing display controller or create a new one
3. Import and use necessary layout components
4. Update the template selection logic in `display.tsx`

Example structure for a new template:

```tsx
// controller/Display/NewTemplate.tsx
import React from "react";
import { LadderData } from "../../types";
import { existing components... }

interface Props {
  ladder: LadderData;
}

export const NewTemplate: React.FC<Props> = ({ ladder }) => {
  return (
    <div className="new-template">
      {/* Template implementation */}
    </div>
  );
};

export default NewTemplate;
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
import { TeamData } from "../../types";

interface Props {
  team: TeamData;
  animationDelay: number;
}

export const NewTeamComponent: React.FC<Props> = ({ team, animationDelay }) => {
  return (
    <div
      className="new-team-component"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Component implementation */}
    </div>
  );
};

export default NewTeamComponent;
```

3. Import and use the component in the appropriate template or controller

## Potential Improvements

### Short-term Improvements

- Add more visual variations for team rows
- Implement color-coding based on team performance
- Add support for team logos with different aspect ratios
- Enhance animations with more diverse effects

### Medium-term Improvements

- Create themed templates with different visual styles
- Implement filters for displaying specific statistics
- Add interactive elements for video exports with overlays
- Support for highlighting specific teams or positions

### Long-term Enhancements

- Integration with live data sources
- Advanced statistics and performance metrics
- Comparative view between different seasons/tournaments
- AI-powered insights and predictions display

## Usage Example

The ladder component can be used within a Remotion composition as follows:

```tsx
import { Composition } from "remotion";
import { CricketLadder } from "./compositions/cricket/ladder";

export const RemotionVideo: React.FC = () => {
  return (
    <>
      <Composition
        id="CricketLadder"
        component={CricketLadder}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
```

This documentation will be updated as new features and improvements are added to the ladder component.
