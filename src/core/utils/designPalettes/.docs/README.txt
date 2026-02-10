# Design Palettes System Documentation

## Overview

The `designPalettes` folder contains a comprehensive theming system for the Remotion video creation application. This system is designed to generate consistent, accessible, and visually appealing color palettes from user-provided primary and secondary colors. The palettes follow a structured naming convention that makes it easy to apply appropriate colors to various UI elements while ensuring good contrast and accessibility.

The system is built to handle user-generated colors of any value, automatically adjusting them when necessary to maintain readability and visual harmony. Each palette provides a complete set of colors for backgrounds, containers, text elements, accents, and shadows, organized in a hierarchical and semantically meaningful way.

## File Breakdown

### types.ts
Defines the core interfaces and helper functions for the design palette system:
- `DesignPalette`: The main interface that all palette generators must implement
- `BackgroundOptions`, `ContainerOptions`, `TextOptions`, `ShadowOptions`: Structured interfaces for different aspects of a palette
- `ensureContrast()`: Helper function that ensures text has sufficient contrast against its background
- `processUserColor()`: Utility to handle potentially problematic user-provided colors

### index.ts
Serves as the entry point for the design palettes system:
- Exports all palette creators and types
- Provides the `generateAllPalettes()` function that creates a complete set of palettes from primary and secondary colors
- Centralizes the creation of all palette types in one convenient function

### primaryPalette.ts
Generates a palette based on the primary color:
- Creates background variations centered around the primary color
- Provides container styles that work well on primary backgrounds
- Ensures text colors have proper contrast against primary-based backgrounds
- Includes gradient options using primary color variations

### secondaryPalette.ts
Similar to primaryPalette.ts but centered around the secondary color:
- Creates a complementary palette to the primary one
- Useful for creating visual hierarchy and contrast in designs
- Maintains the same structure as the primary palette for consistency

### lightPalette.ts
Creates a light-themed palette regardless of the input colors:
- Uses light backgrounds (whites, light grays)
- Provides dark text colors for contrast
- Incorporates the primary/secondary colors as accents
- Useful for light-mode designs

### darkPalette.ts
Creates a dark-themed palette regardless of the input colors:
- Uses dark backgrounds (blacks, dark grays)
- Provides light text colors for contrast
- Incorporates the primary/secondary colors as accents
- Useful for dark-mode designs

### accentPalette.ts
Generates a palette that emphasizes the secondary color:
- Uses the secondary color as the main background
- Creates a visually distinct palette from primary/secondary
- Useful for highlighting important UI elements or sections

### complementaryPalette.ts
Creates a palette using colors complementary to the primary color:
- Uses color theory to find complementary colors (opposite on the color wheel)
- Creates high-contrast, visually interesting combinations
- Useful for creating visual interest and emphasis

### triadicPalette.ts
Generates a palette using triadic color harmony:
- Uses colors spaced evenly around the color wheel (120° apart)
- Creates balanced, vibrant color combinations
- Provides good visual distinction while maintaining harmony

### monochromaticPalette.ts
Creates a palette using only variations of the primary color:
- Uses different shades, tints, and tones of a single hue
- Creates a cohesive, unified look
- Useful for subtle, elegant designs

## Structure of a Design Palette

Each palette follows a consistent structure:

1. **Background Options**:
   - `main`: The primary background color
   - `light`: A lighter variant for subtle contrast
   - `dark`: A darker variant for emphasis
   - `contrast`: A high-contrast color for the background
   - `accent`: An accent color for the background
   - `gradient`: Various gradient options using the palette colors

2. **Container Options**:
   - `primary`: Main container color
   - `secondary`: Alternative container color
   - `light`: Light container variant
   - `dark`: Dark container variant
   - `transparent`: Semi-transparent container
   - `onBackground`: Container colors specifically designed to work on different backgrounds

3. **Text Options**:
   - `onBackground`: Text colors for use directly on backgrounds
   - `onContainer`: Text colors for use on containers
   - Various semantic text colors (title, body, muted, etc.)
   - Accessibility-focused options (safePrimary, safeSecondary)

4. **Additional Properties**:
   - `accent`: Main accent color for the palette
   - `highlight`: Highlight color for emphasis
   - `shadow`: Shadow options for depth and elevation

## Guidelines for LLMs

When working with the design palettes system:

1. **Respect the Structure**: Maintain the hierarchical structure of the palettes. Each palette must implement the complete `DesignPalette` interface.

2. **Ensure Accessibility**: Always use the `ensureContrast()` function when determining text colors to maintain readability.

3. **Handle User Colors Carefully**: Remember that this system is designed to work with user-provided colors. Use `processUserColor()` to handle potentially problematic colors.

4. **Maintain Naming Conventions**: Follow the established naming patterns (onBackground, onContainer, etc.) when adding new properties.

5. **Consider All Use Cases**: When modifying the system, ensure that all palette types (primary, secondary, light, dark, accent, complementary, triadic, monochromatic) remain consistent.

6. **Preserve Helper Functions**: The utility functions in this system are crucial for maintaining color harmony and accessibility.

7. **Update All Palettes Together**: When adding new properties to the `DesignPalette` interface, update all palette generators to include these properties.

This system is designed to be flexible enough to handle any color input while providing a structured, accessible, and visually appealing set of palettes for the application. When making changes, focus on maintaining this balance of flexibility and structure.