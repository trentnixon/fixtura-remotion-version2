# Tickets.md – RosterHeader Components

This file is used for detailed planning of the RosterHeader component improvements.

---

# Ticket – TKT-2025-001

## Overview

Create missing documentation files for RosterHeader folder to comply with .cursorrules requirements.

## What We Need to Do

Add DevelopmentRoadMap.md and Tickets.md files to track progress and detailed planning for header component improvements.

## Phases & Tasks

### Phase 1: Documentation Setup

- [x] Create DevelopmentRoadMap.md with current state and planned improvements
- [x] Create Tickets.md with detailed ticket breakdowns
- [ ] Update readMe.md to reflect new folder structure

## Notes

- Required by .cursorrules for all feature/route folders
- Foundation for tracking all subsequent improvements

---

# Ticket – TKT-2025-002

## Overview

Restructure RosterHeader folder into organized home/away subfolders with separate header files.

## What We Need to Do

Split current header components into logical home/away structure and create index file for clean imports.

## Phases & Tasks

### Phase 1: Folder Restructure

- [ ] Create `home/` subfolder
- [ ] Create `away/` subfolder
- [ ] Create `index.ts` for centralized exports
- [ ] Move AccountTeam components to appropriate folders
- [ ] Move AgainstTeam component to appropriate folder

### Phase 2: Component Separation

- [ ] Split AccountTeam.tsx into separate home/away variants
- [ ] Create AccountTeamHome.tsx in home/ folder
- [ ] Create AccountTeamAway.tsx in away/ folder
- [ ] Create AgainstTeamHome.tsx in home/ folder
- [ ] Create AgainstTeamAway.tsx in away/ folder

### Phase 3: Index File Creation

- [ ] Create index.ts with all component exports
- [ ] Update import statements in consuming components
- [ ] Remove old files after migration

## Notes

- Improves code organization and maintainability
- Makes component purposes clearer
- Related to Roadmap item: "Restructure folder into home/away subfolders"

---

# Ticket – TKT-2025-003

## Overview

Consolidate duplicate AccountTeam components and remove code duplication.

## What We Need to Do

Merge AccountLogoInSubtleWrapper and AccountLogoNoWrapper into a single, configurable component.

## Phases & Tasks

### Phase 1: Analysis

- [ ] Identify differences between the two components
- [ ] Document unique features of each component
- [ ] Plan unified component interface

### Phase 2: Consolidation

- [ ] Create unified AccountTeam component
- [ ] Add backgroundColor prop as optional
- [ ] Maintain backward compatibility
- [ ] Update consuming components

### Phase 3: Testing

- [ ] Verify all existing functionality works
- [ ] Test both with and without background wrapper
- [ ] Update documentation

## Notes

- Reduces maintenance burden
- Improves code consistency
- Related to Roadmap item: "Consolidate duplicate AccountTeam components"

---

# Ticket – TKT-2025-004

## Overview

Extract common utilities and create shared types for header components.

## What We Need to Do

Move shared functionality like truncateText and create common type definitions.

## Phases & Tasks

### Phase 1: Utilities Extraction

- [ ] Create utils/ subfolder
- [ ] Move truncateText function to utils/textUtils.ts
- [ ] Create shared types file for common interfaces

### Phase 2: Type Definitions

- [ ] Create HeaderProps interface
- [ ] Create LogoConfig interface
- [ ] Create AnimationConfig interface
- [ ] Update all components to use shared types

### Phase 3: Import Updates

- [ ] Update all components to import from utils
- [ ] Remove duplicate type definitions
- [ ] Verify type safety

## Notes

- Improves code reusability
- Centralizes common functionality
- Related to Roadmap item: "Extract common utilities"

---

# Ticket – TKT-2025-005

## Overview

Standardize props interface across all header components for consistency.

## What We Need to Do

Create unified prop interfaces and ensure all header components accept the same core props.

## Phases & Tasks

### Phase 1: Interface Design

- [ ] Define BaseHeaderProps interface
- [ ] Define AccountTeamProps interface
- [ ] Define AgainstTeamProps interface
- [ ] Ensure backward compatibility

### Phase 2: Implementation

- [ ] Update all components to use standardized interfaces
- [ ] Add missing props to components that lack them
- [ ] Remove inconsistent prop patterns

### Phase 3: Validation

- [ ] Test all component variants
- [ ] Verify prop passing works correctly
- [ ] Update consuming components if needed

## Notes

- Improves developer experience
- Reduces confusion about component APIs
- Related to Roadmap item: "Standardize props interface"

---

# Ticket – TKT-2025-006

## Overview

Refactor header components to support configurable logo sizes and animation delays.

## What We Need to Do

Replace hardcoded values with configurable props for better flexibility.

## Phases & Tasks

### Phase 1: Configuration Interface

- [ ] Create LogoSizeConfig interface
- [ ] Create AnimationDelayConfig interface
- [ ] Define default values for all configs

### Phase 2: Component Updates

- [ ] Add logoSize prop to all components
- [ ] Add animationDelay prop to all components
- [ ] Fix dynamic Tailwind class generation
- [ ] Update AgainstTeam to support configurable logo size

### Phase 3: Default Handling

- [ ] Set sensible defaults for all configurable props
- [ ] Ensure backward compatibility
- [ ] Test with various configurations

## Notes

- Improves component flexibility
- Fixes dynamic Tailwind issues
- Related to Roadmap item: "Refactor to support configurable logo sizes"

---

# Ticket – TKT-2025-007

## Overview

Add comprehensive JSDoc documentation for all header components.

## What We Need to Do

Document all components, props, and interfaces with detailed JSDoc comments.

## Phases & Tasks

### Phase 1: Component Documentation

- [ ] Add JSDoc comments to all components
- [ ] Document prop interfaces
- [ ] Add usage examples
- [ ] Document animation requirements

### Phase 2: Interface Documentation

- [ ] Document all TypeScript interfaces
- [ ] Add prop descriptions
- [ ] Document default values
- [ ] Add type constraints

### Phase 3: Usage Documentation

- [ ] Create component usage examples
- [ ] Document common patterns
- [ ] Add troubleshooting notes

## Notes

- Improves code maintainability
- Helps new developers understand components
- Related to Roadmap item: "Add comprehensive JSDoc documentation"
