# Ladder Controller

This folder contains the logic controllers for the Cricket Ladder composition. Controllers handle the business logic and data processing for rendering ladder displays.

## Files

- `Display/`: Main display controller for orchestrating ladder rendering
- `TeamRows/`: Controllers for individual team row rendering and data processing

## Relations

- Parent folder: [../ladder.md](../ladder.md)
- Main composition: [../basic.tsx](../basic.tsx)

## Dependencies

- Internal: Uses layout components from `../layout/` and modules from `../modules/`
- External: Remotion framework, React, TypeScript

## Architecture

### Display Controller

The main display controller handles:

- Data retrieval from VideoDataContext
- Template selection and rendering
- Animation orchestration
- Screen management for large datasets

### Team Rows Controller

Team row controllers handle:

- Individual team data processing
- Row animation timing
- Team statistics calculations
- Row styling and layout
