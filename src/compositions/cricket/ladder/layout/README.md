# Ladder Layout

This folder contains layout components for the Cricket Ladder composition. Layout components handle the visual structure and styling of ladder displays.

## Files

- `TableRowLayout.tsx`: Main table row layout component with comprehensive styling
- `TableSixersRow.tsx`: Sydney Sixers themed table row layout variant

## Relations

- Parent folder: [../ladder.md](../ladder.md)
- Controllers: [../controller/README.md](../controller/README.md)

## Dependencies

- Internal: Uses controllers from `../controller/` and modules from `../modules/`
- External: Remotion framework, React, TypeScript, CSS-in-JS

## Architecture

### TableRowLayout

The main table row layout component provides:

- Responsive table row styling
- Animation integration
- Theme-aware color schemes
- Flexible content areas for team data

### TableSixersRow

Sydney Sixers themed variant provides:

- Brand-specific styling
- Team color integration
- Custom visual elements
- Consistent branding across templates
