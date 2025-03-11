# Typography Components Documentation

## Overview
This folder contains reusable typography components for the Remotion V2 project. These components provide consistent text styling across the application, with specialized components for sports-related content and animated text effects. The components are organized by their purpose and usage context.

## Component Breakdown

### Body Text Components
- **BodyLarge.tsx**: Provides large-sized body text styling. Used for primary content or emphasized paragraphs.
- **BodyMedium.tsx**: Standard body text component for general content.
- **BodySmall.tsx**: Smaller body text, suitable for secondary information or captions.
- **BodyXS.tsx**: Extra small text for fine print, footnotes, or other minimal text elements.

### Sports-Specific Typography
- **Score.tsx**: Specialized component for displaying game scores with appropriate styling.
- **StatValue.tsx**: Component for displaying statistical values with proper formatting.
- **PlayerName.tsx**: Styled component for athlete names with consistent appearance.
- **TeamName.tsx**: Component for team names with appropriate styling and possibly team color integration.
- **Label.tsx**: General-purpose label component, likely used for various data points in sports visualizations.

### Special Animation Components
- **AnimatedText.tsx**: Text component with built-in animation capabilities, possibly leveraging Remotion's animation features.

### Utility
- **index.tsx**: Export file that consolidates all typography components for easy importing throughout the application.

## Implementation Notes
Each component likely encapsulates specific styling (font size, weight, color, etc.) and may include responsive behavior. Components are designed to be reusable and maintain consistency across the application.

## For LLMs/Developers
When working with this typography system:

1. **Component Selection**: Choose the appropriate typography component based on the content's hierarchy and purpose. Body components are for general text, while specialized components should be used for their specific contexts.

2. **Consistency**: Maintain design consistency by using these pre-defined components rather than creating custom text styles.

3. **Extending Components**: When adding new typography components, follow the established pattern and export them through the index.tsx file.

4. **Modifications**: When modifying existing components, consider the impact on all instances where they're used throughout the application.

5. **Animation**: For text that requires animation, leverage the AnimatedText component rather than creating custom animation logic.

This typography system follows a component-based approach to text styling, ensuring consistency while providing specialized components for different contexts within the application.