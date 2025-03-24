# Project Structure

This document outlines the overall structure of the Fixtura Remotion V2 project, focusing on the source code organization.

## Root Directory Organization

The main source code is organized in the `src/` directory with the following structure:

```
src/
├── components/     - Reusable components for video creation
├── compositions/   - Remotion composition definitions
├── config/         - Project configuration
├── core/           - Core functionality and utilities
├── templates/      - Video templates
├── types/          - TypeScript type definitions
├── Root.tsx        - Main application entry point
├── DevelopmentRoot.tsx - Development environment setup
├── ProductionRoot.tsx  - Production build entry point
└── index.ts        - Main exports
```

## Key Directories

### components/

Contains reusable UI and functional components used across templates. See the detailed breakdown in `components-structure.md`.

### compositions/

Houses Remotion composition definitions that define the video outputs. These compositions use templates and components to create the final videos.

### templates/

Contains different video template designs. Templates compose components together to create specific video layouts and styles.

### core/

Core functionality, utilities, and services used throughout the application.

### config/

Configuration files for the project including theme settings, default values, and environment configs.

### types/

TypeScript type definitions used across the project.

## Entry Points

- `Root.tsx`: The main application entry point that determines whether to use the production or development root
- `DevelopmentRoot.tsx`: Configuration and setup for the development environment
- `ProductionRoot.tsx`: Configuration for production builds
- `index.ts`: Exports the main components and functions for use in Remotion

## Application Flow

1. The application starts at `Root.tsx`
2. Based on the environment, it loads either `DevelopmentRoot.tsx` or `ProductionRoot.tsx`
3. These root files load compositions from the `compositions/` directory
4. Compositions utilize templates from the `templates/` directory
5. Templates are built using components from the `components/` directory
6. The Remotion framework renders these compositions into videos

## Development Workflow

1. Components are developed and tested individually
2. Components are composed into templates
3. Templates are used in compositions
4. Compositions are rendered into videos

## Remotion-Specific Structure

This project follows Remotion's recommended structure:

- Separating components from compositions
- Using a Root component to handle environment differences
- Organizing related functionality into directories
