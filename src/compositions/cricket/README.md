# Cricket Compositions

This folder contains all cricket-specific video compositions for the Remotion video generation system. Each composition type represents a different way to present cricket data, from team standings to match results and player statistics.

## Overview

The cricket compositions are organized by data type and follow a consistent template system. Each composition type supports multiple visual templates (basic, classic, sixersThunder, brickWork, etc.) and includes comprehensive animation and styling systems.

## Files

- `index.tsx`: Main export file that aggregates all cricket compositions
- `composition-types.ts`: TypeScript interfaces for cricket-specific data structures
- `placeholders.tsx`: Placeholder components for unimplemented compositions

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Components: [../../components/README.md](../../components/README.md)
- Test data: [../../../testData/samples/Cricket/](../../../testData/samples/Cricket/)

## Dependencies

- Internal: Uses components from `src/components/` for backgrounds, containers, typography, images, and layout
- External: Remotion framework, React, TypeScript

## Composition Types

### 1. **Ladder** (`ladder/`)

Displays team standings in a tabular format showing positions, match statistics, and points.

**Templates Available:**

- `basic.tsx`: Standard ladder display with transitions
- `classic.tsx`: Traditional table layout
- `sixersThunder.tsx`: Sydney Sixers themed design
- `brickWork.tsx`: Brick-style visual design
- `classicTwoColumn.tsx`: Two-column classic layout

**Key Features:**

- Staggered row animations
- Header animation system
- Responsive table layout
- Multiple screen support for large datasets

### 2. **Results** (`results/`)

Shows multiple match results in a list format with screen-based navigation.

**Templates Available:**

- `basic.tsx`: Standard results display
- `classic.tsx`: Traditional match card layout
- `sixersThunder.tsx`: Sydney Sixers themed design
- `brickWork.tsx`: Brick-style visual design
- `classicTwoColumn.tsx`: Two-column classic layout

**Key Features:**

- Multiple results per screen (default: 2)
- Screen-based navigation
- Match card layouts
- Staggered animation system

### 3. **Upcoming** (`upcoming/`)

Displays upcoming matches with team information and scheduling details.

**Templates Available:**

- `basic.tsx`: Standard upcoming matches display
- `classic.tsx`: Traditional match preview layout
- `sixersThunder.tsx`: Sydney Sixers themed design
- `brickWork.tsx`: Brick-style visual design
- `classicTwoColumn.tsx`: Two-column classic layout

**Key Features:**

- Match preview cards
- Team logo integration
- Date and time formatting
- Venue information display

### 4. **Top 5** (`top5/`)

Shows top 5 players or teams in various statistical categories.

**Templates Available:**

- `basic.tsx`: Standard top 5 display
- `classic.tsx`: Traditional ranking layout
- `sixersThunder.tsx`: Sydney Sixers themed design
- `brickWork.tsx`: Brick-style visual design
- `classicTwoColumn.tsx`: Two-column classic layout

**Key Features:**

- Ranking display system
- Statistical data presentation
- Player/team information cards
- Animated ranking reveals

### 5. **Result Single** (`resultSingle/`)

Displays detailed information for a single match result.

**Templates Available:**

- `basic.tsx`: Standard single result display
- `classic.tsx`: Traditional detailed match layout
- `sixers.tsx`: Sydney Sixers themed design
- `classicTwoColumns.tsx`: Two-column classic layout

**Key Features:**

- Detailed match statistics
- Team performance breakdowns
- Player statistics display
- Comprehensive match information

### 6. **Team Roster** (`teamRoster/`)

Shows team roster information with player details and statistics.

**Templates Available:**

- `basic.tsx`: Standard roster display
- `classic.tsx`: Traditional roster layout
- `sixersThunder.tsx`: Sydney Sixers themed design
- `classicTwoColumn.tsx`: Two-column classic layout

**Key Features:**

- Player information cards
- Team roster organization
- Player statistics display
- Team logo integration

### 7. **Sponsor Footer** (`sponsorFooter/`)

Displays sponsor information and branding elements.

**Templates Available:**

- `index.tsx`: Standard sponsor footer display

**Key Features:**

- Sponsor logo display
- Branding integration
- Footer positioning
- Sponsor information formatting

## Template System Architecture

Each composition follows a consistent template system:

### Folder Structure Pattern

```
composition-type/
├── index.tsx                  # Export file
├── types.ts                   # TypeScript interfaces
├── basic.tsx                  # Base template
├── classic.tsx                # Classic template variant
├── sixersThunder.tsx          # Sydney Sixers themed variant
├── brickWork.tsx              # Brick-style variant
├── classicTwoColumn.tsx       # Two-column classic variant
├── composition.md             # Documentation file
├── controller/                # Logic controllers
│   ├── Display/               # Main display controllers
│   └── [ComponentName]/       # Component-specific controllers
├── layout/                    # Layout components
│   └── [LayoutName].tsx       # Layout implementations
├── modules/                   # Reusable components
│   └── [ModuleName]/          # Modular components
└── utils/                     # Utility functions
```

### Animation System

All compositions use a consistent animation system:

- **Header Animations**: 45-frame duration for title and header elements
- **Content Animations**: 30-90 frame duration for main content
- **Stagger Delays**: 15-frame delays between sequential elements
- **Transition Effects**: Smooth transitions between screens and sections

### Styling System

Compositions use a modular styling approach:

- **CSS-in-JS**: Styling implemented with responsive design
- **Theme Integration**: Colors and styles from ThemeContext
- **Responsive Layouts**: Adapts to different resolutions
- **Template Variants**: Consistent styling across template variations

## Data Integration

### VideoDataContext Integration

All compositions retrieve data from `VideoDataContext`:

- Template variation settings
- Cricket-specific data structures
- Animation configuration
- Theme preferences

### Type Safety

Compositions use TypeScript interfaces for:

- Cricket data structures (teams, matches, players)
- Template configuration
- Animation parameters
- Component props

## Usage Examples

### Basic Ladder Display

```tsx
import { CricketLadder } from "./cricket";

// Use basic template
const LadderComponent = CricketLadder.basic;

// Use classic template
const ClassicLadderComponent = CricketLadder.classic;
```

### Results with Multiple Templates

```tsx
import { CricketResults } from "./cricket";

// Use sixers themed template
const SixersResultsComponent = CricketResults.sixers;

// Use two-column classic template
const TwoColumnResultsComponent = CricketResults.twocolumnclassic;
```

## Development Guidelines

### Adding New Templates

1. Create new template file following naming convention
2. Implement template with proper TypeScript interfaces
3. Add export to composition's index.tsx
4. Update main cricket index.tsx exports
5. Add documentation in composition's .md file

### Adding New Composition Types

1. Create new folder with standard structure
2. Implement base template and variants
3. Add controllers, layouts, and modules
4. Create documentation file
5. Update main index.tsx exports
6. Add test data samples

### Animation Guidelines

- Use consistent animation durations across templates
- Implement staggered animations for sequential elements
- Ensure smooth transitions between screens
- Test animations at different frame rates

### Styling Guidelines

- Follow responsive design principles
- Use theme colors and typography scales
- Maintain consistency across template variants
- Test at different resolutions and aspect ratios
