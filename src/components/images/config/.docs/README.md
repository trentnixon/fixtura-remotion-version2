# Image Animation Configuration

This folder contains the core logic for defining and applying animations to the `AnimatedImage` component. It provides a flexible and extensible system for creating a wide range of image animations.

## Files

-   **`animationUtils.ts`**: This file contains utility functions for normalizing animation configurations. The `normalizeImageAnimation` function is a key helper that takes a shorthand animation definition (e.g., a string like `"fadeIn"`) and converts it into a full `ImageAnimationConfig` object, applying default values for properties like `delay`, `duration`, and `easing`.

-   **`imageAnimations.ts`**: This file is a re-exporter. It simply exports all the functionality from the `index.ts` file. This is likely for backward compatibility or to maintain a consistent import path.

-   **`index.ts`**: This is the main entry point for the animation configuration. It exports all the key functions, types, and configurations from the other files in this directory, making them available to the `AnimatedImage` component.

-   **`springConfigs.ts`**: This file defines a set of predefined spring configurations for use with physics-based animations. These configurations, such as `BOUNCY`, `GENTLE`, and `RESPONSIVE`, provide a quick way to apply different spring dynamics to animations.

-   **`useImageAnimation.ts`**: This is the core of the animation system. It contains the `useImageAnimation` and `useDualImageAnimation` hooks. These hooks are responsible for calculating the CSS styles for an animation at a given frame. The `useImageAnimation` hook handles a single animation, while the `useDualImageAnimation` hook manages both an entry and an exit animation, applying the correct one based on the current frame.

## How it Works

The `AnimatedImage` component uses the `useDualImageAnimation` hook to get the appropriate animation styles. This hook, in turn, uses the `useImageAnimation` hook to calculate the styles for the entry and exit animations. The `useImageAnimation` hook uses a `switch` statement to call the correct animation function (e.g., `fadeIn`, `slideInLeft`, etc.) based on the `type` of the animation config. These animation functions then calculate and return the CSS properties for the animation at the current frame.
