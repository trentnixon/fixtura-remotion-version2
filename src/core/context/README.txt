# Context Folder Documentation

## Overview
The context folder contains React Context providers and hooks that manage global state across the Remotion video creation application. These contexts provide access to shared data, styling, theming, fonts, and other configuration that needs to be accessible throughout the component tree. The context system is designed to be hierarchical, with some contexts depending on others, creating a layered state management approach.

## File Breakdown

### GlobalContext.tsx
**Purpose**: Provides application-wide settings and configuration.
**How it works**:
- Stores global settings like template configurations, default values, and application preferences
- Provides access to these settings via the `useGlobalContext` hook
- Acts as the top-level context that other contexts may depend on
- Settings can include animation durations, default colors, and other application-wide preferences

### VideoDataContext.tsx
**Purpose**: Manages video-specific data and metadata.
**How it works**:
- Stores information about the current video being created/edited
- Contains data like video dimensions, duration, fps, and content data
- Provides access to template variations and video-specific settings
- Used by components to adapt their rendering based on video requirements
- Accessed via the `useVideoDataContext` hook

### ThemeContext.tsx
**Purpose**: Manages theming and styling for the entire application.
**How it works**:
- Creates a comprehensive theming system with colors, typography, and layout settings
- Generates color utilities using the `createThemeColorUtils` function
- Provides design palettes for different color schemes (primary, secondary, dark, light, etc.)
- Handles contrast safety and accessibility concerns
- Offers helper functions like `getActivePalette` to easily access the current theme
- Depends on GlobalContext and VideoDataContext for theme configuration
- Accessed via the `useThemeContext` hook

### StyleContext.tsx
**Purpose**: Provides backward compatibility for styling and acts as a bridge to the new ThemeContext.
**How it works**:
- Wraps ThemeContext and provides a simplified interface for legacy components
- Exposes THEME, fontConfig, and other styling properties
- Maintains compatibility with older components while the application transitions to the new theming system
- Accessed via the `useStylesContext` hook

### FontContext.tsx
**Purpose**: Manages font loading and provides font-related utilities.
**How it works**:
- Handles loading of custom fonts for the video
- Tracks font loading status to prevent rendering before fonts are ready
- Provides font fallbacks and default configurations
- May include font metrics and sizing utilities
- Accessed via the `useFontContext` hook

### AnimationContext.tsx
**Purpose**: Manages global animation settings and provides animation utilities.
**How it works**:
- Stores animation presets, durations, and easing functions
- Provides utilities for creating consistent animations across components
- May include animation sequencing and coordination functions
- Accessed via the `useAnimationContext` hook

## Summary for LLMs

When working with this context folder:

1. **Understand the hierarchy**: ThemeContext depends on VideoDataContext and GlobalContext. StyleContext depends on ThemeContext. Respect these dependencies when making changes.

2. **Theme system**: The theming system is sophisticated, with color utilities, palettes, and accessibility features. When editing theme-related code, preserve the contrast safety and accessibility features.

3. **Backward compatibility**: StyleContext exists for backward compatibility. When updating ThemeContext, ensure StyleContext still provides the expected values to legacy components.

4. **Context usage pattern**: All contexts follow the pattern of:
   - A Provider component that wraps children
   - A custom hook (e.g., `useThemeContext`) for accessing the context
   - A check in the hook to ensure it's used within the provider

5. **Design palettes**: The theme system includes multiple design palettes (primary, secondary, dark, light, accent, etc.) with structured color options for backgrounds, containers, text, and more. These are generated based on primary and secondary colors.

6. **Video template focus**: These contexts are designed for a video template creation system. UI-specific elements (like hover states) are less relevant than visual styling elements.

7. **Performance considerations**: Many contexts use `useMemo` to optimize performance. Preserve this pattern when making changes to prevent unnecessary recalculations.

When editing files in this folder, maintain the existing patterns and ensure changes are consistent across the interdependent contexts. The context system is central to the application's state management and styling approach.