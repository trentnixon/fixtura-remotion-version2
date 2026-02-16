# Cricket Top 5 Players Component Documentation

## Overview

The Cricket Top 5 Players component displays the top performing players in a cricket competition or season. It can present either batting or bowling statistics, dynamically adapting to showcase the appropriate statistics based on the composition type. This component is ideal for highlighting standout individual performances.

## Folder Structure

```
top5/
├── basic.tsx                  # Main component entry point
├── index.tsx                  # Export file
├── types.ts                   # TypeScript interfaces and constants
├── top5.md                    # This documentation file
├── controller/                # Logic controllers
│   ├── PlayersDisplay/        # Main display controller
│   └── PlayerRow/             # Controls rendering of individual player rows
├── layout/                    # Layout components
│   └── PlayerRowLayout.tsx    # Row layout for player statistics
├── modules/                   # Reusable components
│   └── NoPlayersData/         # Fallback for missing data
└── utils/                     # Utility functions
    └── dataTransformer.ts     # Data transformation helpers
```

## How It Works

### Data Flow

1. The `basic.tsx` component serves as the entry point
2. It retrieves data from `VideoDataContext`
3. The `transformPlayerData` utility function converts raw data to strongly typed player data
4. The component determines the appropriate title based on the composition type
5. Data is passed to `PlayersDisplay` component
6. Individual player rows are rendered through the `PlayerRow` controller with animations

### Key Features

- **Dual Purpose**: Handles both batting and bowling statistics
- **Dynamic Content**: Adapts display based on composition type (batting/bowling)
- **Animated Presentation**: Smooth entry animations for titles and player rows
- **Responsive Design**: Adapts to different resolutions and aspect ratios
- **Visual Hierarchy**: Clear presentation of player ranking and statistics

### Data Model

The component works with the following key data structures:

- **PlayerData**: Union type representing either a batter or bowler
- **BatterData**: Batting statistics including runs, balls, strike rate
- **BowlerData**: Bowling statistics including wickets, overs, economy
- **BasePlayerData**: Common player information (name, team, etc.)
- **TeamLogo**: Image information for team logos

### Animation System

- The component uses Remotion's animation capabilities
- Key animation constants are defined in `types.ts`:
  - `HEADER_ANIMATION_DURATION`: Controls header animation timing (default: 45 frames)
  - `PLAYER_STAGGER_DELAY`: Controls staggered entry timing (default: 15 frames)
  - `PLAYER_ANIMATION_DURATION`: Controls player row animation duration (default: 30 frames)
- Elements appear in a choreographed sequence with staggered player-by-player animations

### Styling System

- Styling is implemented using CSS-in-JS with responsive design
- The `PlayerRowLayout.tsx` contains the core styling logic for player rows
- Different visual treatments for batters vs. bowlers
- Design follows a modular approach for consistent styling
- Visual elements automatically adapt to different resolution requirements

## Template System

The top5 component follows a template pattern where:

1. `basic.tsx` serves as the foundational template
2. The `controller/PlayersDisplay/display.tsx` handles overall layout
3. The `controller/PlayerRow` controls the appearance of individual player entries
4. The component adapts its display based on player type (batter or bowler)

### Adding New Templates

To add a new template for displaying players:

1. Create a new component in the appropriate directory (e.g., `controller/PlayerRow/`)
2. Implement the component with proper typing and animations
3. Export the component and add it to the template selection logic

Example structure for a new player row template:

```tsx
// controller/PlayerRow/AlternativePlayerRow.tsx
import React from "react";
import {
  PlayerData,
  isBatter,
  isBowler,
  PLAYER_ANIMATION_DURATION,
  PLAYER_STAGGER_DELAY,
} from "../../types";

interface Props {
  player: PlayerData;
  index: number;
}

export const AlternativePlayerRow: React.FC<Props> = ({ player, index }) => {
  return (
    <div
      className="alternative-player-row"
      style={{
        animation: `fadeIn ${PLAYER_ANIMATION_DURATION}frames ease-in-out`,
        animationDelay: `${PLAYER_STAGGER_DELAY * index}frames`,
      }}
    >
      {/* Player info (common to both types) */}
      <div className="player-info">
        <span className="rank">#{index + 1}</span>
        <span className="name">{player.name}</span>
        <span className="team">{player.playedFor}</span>
      </div>

      {/* Conditional rendering based on player type */}
      {isBatter(player) && (
        <div className="batting-stats">
          <span className="runs">{player.runs} runs</span>
          <span className="sr">SR: {player.SR}</span>
        </div>
      )}

      {isBowler(player) && (
        <div className="bowling-stats">
          <span className="wickets">{player.wickets} wickets</span>
          <span className="overs">{player.overs} overs</span>
        </div>
      )}
    </div>
  );
};

export default AlternativePlayerRow;
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
import {
  PlayerData,
  PLAYER_ANIMATION_DURATION,
  PLAYER_STAGGER_DELAY,
} from "../../types";

interface Props {
  player: PlayerData;
  animationDelay: number;
}

export const PlayerCard: React.FC<Props> = ({ player, animationDelay }) => {
  return (
    <div
      className="player-card"
      style={{
        animationDelay: `${PLAYER_STAGGER_DELAY + animationDelay}frames`,
      }}
    >
      {/* Component implementation */}
    </div>
  );
};

export default PlayerCard;
```

3. Import and use the component in the appropriate template or controller

## Customization Options

The Top5 component can be customized in several ways:

1. **Number of Players**: Modify the component to show top 3, top 5, or top 10 players
2. **Animation Timing**: Adjust the constants in `types.ts`
3. **Layout Styles**: Create new layout components in the `layout` directory
4. **Visual Themes**: Implement different visual styles through the styling system
5. **Additional Statistics**: Extend player interfaces to show more detailed statistics

## Potential Improvements

### Short-term Improvements

- Add more visual variations for player rows
- Implement color-coding based on performance tiers
- Add player images or avatars
- Create special visual treatment for the #1 ranked player
- Enhance animations with more diverse effects

### Medium-term Improvements

- Support for all-rounders (combined batting and bowling performances)
- Create specialty templates for tournament statistics
- Add interactive filtering by team or competition
- Support for highlighting specific players
- Add trend indicators showing performance changes

### Long-term Enhancements

- Historical comparison with previous seasons
- Advanced performance metrics and analytics visualizations
- Integration with live data sources
- Comparative player-vs-player visualizations
- AI-powered performance insights and predictions

## Usage Example

The top5 component can be used within a Remotion composition as follows:

```tsx
import { Composition } from "remotion";
import { Top5Players } from "./compositions/cricket/top5";
import { TOP5_COMPOSITIONS } from "./compositions/cricket/top5/types";

export const RemotionVideo: React.FC = () => {
  return (
    <>
      <Composition
        id={TOP5_COMPOSITIONS.BATTING}
        component={Top5Players}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id={TOP5_COMPOSITIONS.BOWLING}
        component={Top5Players}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
```

## Adding New Player Types

To extend the component for new player types (e.g., fielding statistics):

1. Add new interface in `types.ts`:

```tsx
export interface FielderData extends BasePlayerData {
  type: "fielding";
  catches: number;
  runOuts: number;
  stumpings: number;
}
```

2. Update the PlayerData union type:

```tsx
export type PlayerData = BatterData | BowlerData | FielderData;
```

3. Add type guard functions:

```tsx
export const isFielder = (player: PlayerData): player is FielderData => {
  return player.type === "fielding";
};
```

4. Update the transformation utility in `dataTransformer.ts`
5. Add appropriate rendering logic in the templates

This documentation will be updated as new features and improvements are added to the top5 component.
