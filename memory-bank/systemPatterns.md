# System Patterns

## Architecture Overview

- React-based component architecture
- Remotion framework for video generation
- TypeScript for type safety
- Tailwind CSS for styling components

## Design Patterns

- Component-based design for video elements
- Template patterns for reusable video layouts
- Data provider pattern for integrating sports data
- Factory pattern for creating different video types

## Component Relationships

- Templates contain multiple scenes
- Scenes comprise reusable components
- Components consume data from providers
- Providers interface with external data sources
- Composition pattern for building complex videos from simple components

## Data Flow

- External data → Data adapters → Context providers → Components → Rendered video
- Configuration parameters flow from user inputs to template customization

## Technical Decisions

- Using React and Remotion for familiar development experience
- TypeScript for maintainability and type safety
- Component-based architecture for reusability
- Tailwind for consistent styling
- Modular design to support future expansion
