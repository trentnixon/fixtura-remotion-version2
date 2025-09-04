# Ladder Modules

This folder contains reusable modular components for the Cricket Ladder composition. Modules provide specific functionality that can be shared across different templates.

## Files

- `LadderHeaders/`: Header components for ladder displays
- `NoLadderData/`: Fallback component for missing ladder data
- `TableHeader/`: Table header components with column definitions

## Relations

- Parent folder: [../ladder.md](../ladder.md)
- Controllers: [../controller/README.md](../controller/README.md)
- Layout: [../layout/README.md](../layout/README.md)

## Dependencies

- Internal: Used by controllers in `../controller/` and layouts in `../layout/`
- External: Remotion framework, React, TypeScript

## Architecture

### LadderHeaders

Header components provide:

- Title and subtitle displays
- Competition branding
- Date and time information
- Consistent header styling across templates

### NoLadderData

Fallback component provides:

- Graceful handling of missing data
- User-friendly error messages
- Consistent styling with main composition
- Placeholder content when data is unavailable

### TableHeader

Table header components provide:

- Column definitions and labels
- Sort indicators
- Consistent header styling
- Responsive column layouts
