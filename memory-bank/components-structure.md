# Components Structure

This document maps the structure and purpose of components in the Fixtura Remotion V2 project.

## Directory Organization

The `src/components` directory is organized into the following subdirectories:

```
src/components/
├── animations/     - Animation utilities and configurations
├── backgrounds/    - Background components and variants
├── containers/     - Container components for layout structure
├── images/         - Image-related components and utilities
├── layout/         - Layout templates and screen structures
├── typography/     - Text and typography components
└── ui/             - UI elements and controls
```

## Component Categories

### Typography Components

Located in `src/components/typography/`

Purpose: Text rendering, styling, and animations for video content.

Key files:

- `AnimatedText.tsx` - Main component for animated text elements
- `types.ts` - TypeScript definitions for typography components
- `README.txt` - Documentation for typography usage

Structure:

- `config/` - Configuration for text styling and animation
- `utils/` - Utility functions for text manipulation and rendering

### Layout Components

Located in `src/components/layout/`

Purpose: Define the structure and arrangement of video scenes.

Subcomponents:

- `titleScreen/` - Components for title cards and introductions
- `main/` - Primary layout components for the main content
- `sponsors/` - Components for displaying sponsor information

### Container Components

Located in `src/components/containers/`

Purpose: Wrapper components that provide structure, animation, and styling.

Key files:

- `AnimatedContainer.tsx` - Main animated container component
- `types.ts` - TypeScript definitions for containers
- `README.md` - Comprehensive documentation for containers
- `index.ts` - Exports and component registration

Subcomponents:

- `modules/` - Modular container components
- `examples/` - Example implementations
- `animations/` - Container-specific animations
- `styles/` - Styling utilities for containers

### Background Components

Located in `src/components/backgrounds/`

Purpose: Create and manage video backgrounds with various styles and effects.

Key files:

- `index.tsx` - Main background component

Subcomponents:

- `variants/` - Different background styles and types
- `config/` - Configuration options for backgrounds
- `hooks/` - React hooks for background functionality

### Image Components

Located in `src/components/images/`

Purpose: Handle image display, animation, and manipulation.

Key files:

- `AnimatedImage.tsx` - Component for animated image elements
- `index.ts` - Exports and component registration
- `placeholders.ts` - Placeholder images for development

Subcomponents:

- `config/` - Configuration for image animations and effects

### Animation Components

Located in `src/components/animations/`

Purpose: Provide animation utilities and configurations for other components.

Subcomponents:

- `config/` - Animation configuration and presets

### UI Components

Located in `src/components/ui/`

Purpose: User interface elements and controls for video components.

## Component Relationships

1. **Composition Pattern**:

   - Layouts use Containers
   - Containers use Typography and Images
   - All components may use Animations
   - Backgrounds provide the foundation for scenes

2. **Configuration Flow**:

   - Most component directories contain a `config/` subdirectory
   - Configuration is typically separate from component implementation

3. **Documentation Pattern**:
   - README files provide usage instructions
   - Type definitions clarify component interfaces

## Usage Patterns

1. Component imports typically follow this pattern:

   ```typescript
   import { AnimatedText } from "../components/typography";
   import { AnimatedContainer } from "../components/containers";
   ```

2. Components are designed to be composable and reusable across different video templates.

3. Configuration is often centralized and passed to components as props.

## Development Approach

- TypeScript is used for type safety
- Component architecture follows React best practices
- Remotion-specific features are integrated into components
- Documentation is maintained alongside code
