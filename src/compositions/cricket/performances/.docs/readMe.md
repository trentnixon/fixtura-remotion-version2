# Folder Overview

Handles cricket player performances display with multi-screen transitions. Based on top5 composition but enhanced with screen pagination and transitions when items exceed the per-screen limit (default: 5).

## Files

- `basic.tsx`: Main entry point for basic template with transition logic and pagination
- `types.ts`: Performance-specific typing and constants (independent from top5)
- `controller/PerformancesDisplay/display-Basic.tsx`: Display controller for basic template with parent container matching top5
- `controller/PlayerRow/row-Basic.tsx`: Row component wrapper with animations
- `layout/StandardPerformanceRow.tsx`: Layout component for individual performance rows (matches top5 structure)
- `modules/NoPlayersData/no-data.tsx`: Fallback component for empty data states
- `utils/dataTransformer.ts`: Data transformation and title generation utilities
- `utils/screenCalculator.ts`: Pagination logic (items per screen, screen calculation)
- `.docs/`: Documentation files (readMe, DevelopmentRoadMap, Tickets, TEMPLATE_IMPLEMENTATION_GUIDE)

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: `top5` composition (data structures), `results` composition (transition patterns), templates, core contexts/utils
- Consumed by: cricket feature exports

## Dependencies

- Internal: `top5` (types/data structures), `results` (transition patterns), `controller`, `layout`, `modules`, `utils`
- External: React, Remotion, transition components
