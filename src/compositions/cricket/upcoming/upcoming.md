# Cricket Upcoming Games Component Documentation

## Overview

The Cricket Upcoming Games component displays upcoming cricket matches in a visually appealing format. It presents match information including teams, venue, date, time, and other relevant details. The component organizes matches into screens, showing a configurable number of upcoming games per screen (default: 3), with smooth transitions between screens.

## Folder Structure

```
upcoming/
├── basic.tsx                  # Main component with transitions
├── index.tsx                  # Export file
├── types.ts                   # TypeScript interfaces and constants
├── upcoming.md                # This documentation file
├── controller/                # Logic controllers
│   ├── GamesDisplay/          # Main display controller
│   └── GamesList/             # Controls rendering of game lists
├── layout/                    # Layout components
│   ├── Card/                  # Card layout for game info
│   ├── Logos/                 # Team logo components
│   └── Meta/                  # Match metadata components
└── modules/                   # Reusable components
    └── NoGamesData/           # Fallback for missing data
```

## How It Works

### Data Flow

1. The `basic.tsx` component serves as the entry point
2. It retrieves data from `VideoDataContext`
3. The component determines how many games to display per screen based on configuration
4. Games are grouped into screens based on the `gamesPerScreen` value
5. Each screen is rendered as a sequence in the transition series
6. `GamesDisplay` orchestrates the rendering of each screen
7. Individual game cards are rendered with appropriate animations

### Key Features

- **Configurable Games Per Screen**: Dynamically adjusts based on contentLayout or options
- **Screen-based Navigation**: Automatically creates the right number of screens based on data volume
- **Responsive Layouts**: Adapts to different resolutions and aspect ratios
- **Dynamic Duration**: Frame duration can be configured via metadata or timings
- **Transition Effects**: Smooth transitions between screens of upcoming games

### Data Model

The component works with the following key data structures:

- **GameData**: Represents a single upcoming match with details like teams, venue, time
- **TeamLogo**: Image information for team logos
- **AssignSponsors**: Sponsor information related to the match
- **Grade**: Information about the grade or division
- **Competition**: Information about the competition or tournament

### Animation System

- The component uses Remotion's animation capabilities
- Key animation constants are defined in `types.ts`:
  - `HEADER_ANIMATION_DURATION`: Controls header animation timing (default: 45 frames)
  - `CARD_STAGGER_DELAY`: Controls staggered entry timing (default: 15 frames)
  - `CARD_ANIMATION_DURATION`: Controls card animation duration (default: 30 frames)
- Cards appear in a choreographed sequence with staggered animations
- Transition effects between screens are configured via the `AnimationContext`

### Styling System

- Styling is implemented using CSS-in-JS with responsive design
- Different layout components handle specific aspects of the presentation:
  - `Card/`: Visual styling for game cards
  - `Logos/`: Team logo presentation
  - `Meta/`: Date, time, venue, and other metadata styling
- Design follows a modular approach for consistent styling
- Styles automatically adapt to different resolution requirements

## Template System

The upcoming games component follows a template pattern where:

1. `basic.tsx` serves as the foundational template
2. The `controller/GamesDisplay/display.tsx` handles overall layout
3. The `controller/GamesList` controls the appearance of game listings
4. Various visual styles can be applied to the cards and headers

### Adding New Templates

To add a new template for displaying upcoming games:

1. Create a new component in the appropriate directory (e.g., `controller/GamesList/`)
2. Implement the component with proper typing and animations
3. Export the component and add it to the template selection logic

Example structure for a new game card template:

```tsx
// controller/GamesList/AlternativeCardList.tsx
import React from "react";
import {
  GameData,
  CARD_ANIMATION_DURATION,
  CARD_STAGGER_DELAY,
} from "../../types";

interface Props {
  games: GameData[];
  startIndex: number;
  count: number;
}

export const AlternativeCardList: React.FC<Props> = ({
  games,
  startIndex,
  count,
}) => {
  // Slice the games array to get only the games for this screen
  const gamesForThisScreen = games.slice(startIndex, startIndex + count);

  return (
    <div className="alternative-games-list">
      {gamesForThisScreen.map((game, index) => (
        <div
          key={game.gameID}
          className="game-card"
          style={{
            animation: `fadeIn ${CARD_ANIMATION_DURATION}frames ease-in-out`,
            animationDelay: `${CARD_STAGGER_DELAY * index}frames`,
          }}
        >
          {/* Game information display */}
          <div className="teams">
            <div className="home-team">
              {game.teamHomeLogo && (
                <img
                  src={game.teamHomeLogo.url}
                  alt={game.teamHome}
                  width={game.teamHomeLogo.width}
                  height={game.teamHomeLogo.height}
                />
              )}
              <span>{game.teamHome}</span>
            </div>
            <div className="vs">vs</div>
            <div className="away-team">
              {game.teamAwayLogo && (
                <img
                  src={game.teamAwayLogo.url}
                  alt={game.teamAway}
                  width={game.teamAwayLogo.width}
                  height={game.teamAwayLogo.height}
                />
              )}
              <span>{game.teamAway}</span>
            </div>
          </div>

          <div className="game-details">
            <div className="date-time">
              {game.date} • {game.time}
            </div>
            <div className="venue">{game.ground}</div>
            <div className="competition">{game.gradeName}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlternativeCardList;
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
  GameData,
  CARD_ANIMATION_DURATION,
  CARD_STAGGER_DELAY,
} from "../../types";

interface Props {
  game: GameData;
  animationDelay: number;
}

export const CompactGameCard: React.FC<Props> = ({ game, animationDelay }) => {
  return (
    <div
      className="compact-game-card"
      style={{
        animationDelay: `${CARD_STAGGER_DELAY + animationDelay}frames`,
      }}
    >
      {/* Component implementation */}
    </div>
  );
};

export default CompactGameCard;
```

3. Import and use the component in the appropriate template or controller

## Customization Options

The Upcoming Games component can be customized in several ways:

1. **Games Per Screen**: Modify through `contentLayout.divideFixturesBy.UpComingFixtures` or `options.gamesPerScreen`
2. **Animation Timing**: Adjust the constants in `types.ts`
3. **Layout Styles**: Create new layout components in the `layout` directory
4. **Visual Themes**: Implement different visual styles through the styling system
5. **Screen Duration**: Configure through `timings.FPS_GAMES` or video metadata

## Potential Improvements

### Short-term Improvements

- Add more visual variations for game cards
- Implement color-coding based on competition types
- Add countdown for imminent matches
- Support for map previews of venues
- Enhance animations with more diverse effects

### Medium-term Improvements

- Create specialty templates for tournament fixtures
- Implement filtering options by competition or team
- Add team statistics and head-to-head records
- Support for highlighting marquee matches
- Create compact view for showing more games per screen

### Long-term Enhancements

- Weather forecast integration for match days
- Ticketing information and availability
- Integration with live data sources for real-time updates
- Interactive elements for web-based video players
- Contextual information like league standings

## Usage Example

The upcoming games component can be used within a Remotion composition as follows:

```tsx
import { Composition } from "remotion";
import { UpcomingGames } from "./compositions/cricket/upcoming";

export const RemotionVideo: React.FC = () => {
  return (
    <>
      <Composition
        id="CricketUpcomingGames"
        component={UpcomingGames}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
```

## Configuration Options

The component can be configured in several ways:

### Via VideoDataContext

```json
{
  "contentLayout": {
    "divideFixturesBy": {
      "UpComingFixtures": 3
    }
  },
  "options": {
    "gamesPerScreen": 3
  },
  "timings": {
    "FPS_GAMES": 300
  },
  "video": {
    "metadata": {
      "frames": [300]
    }
  }
}
```

### Component Props

The component automatically extracts configuration from the VideoDataContext, but if needed, additional props could be added to override these settings.

This documentation will be updated as new features and improvements are added to the upcoming games component.
