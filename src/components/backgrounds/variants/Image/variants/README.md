# Image Background Effect Variants

This folder contains the individual animation effect components that are used by the `ImageBackground` component. Each file in this directory is responsible for a specific visual effect, making the system modular and easy to extend.

## Effect Components

-   **`blur.tsx`**: Implements a focus/blur effect that can transition an image from blurry to sharp, sharp to blurry, or pulse between the two states.

-   **`breath.tsx`**: Creates a subtle "breathing" effect by slowly zooming the image in and out, giving a sense of life and motion.

-   **`colorOverlay.tsx`**: Applies a color overlay to the image. It supports solid colors, gradients, and vignettes, and can be used to tint the image or create other color-based effects.

-   **`combined.tsx`**: Provides a utility component, `CombinedEffects`, that allows for the combination of multiple effects. It also includes helper functions for aspect ratio calculations.

-   **`index.tsx`**: This file serves as the main entry point for all the effect variants. It exports all the effect components and defines the `ImageEffectType` enum, which is used to specify which effect to apply.

-   **`kenBurns.tsx`**: Implements the Ken Burns effect, which combines a slow zoom and pan to create a cinematic, documentary-style animation.

-   **`pan.tsx`**: Pans the image horizontally or vertically across the screen.

-   **`zoom.tsx`**: Applies a zoom-in or zoom-out effect to the image.

## How it Works

Each effect component is a React component that takes a set of props, including the image `src` and other effect-specific parameters. These components use Remotion's `useCurrentFrame` and `interpolate` functions to calculate the animation at the current frame.

The `ImageBackground` component uses the `effectType` from its configuration to determine which of these variant components to render. This makes it easy to switch between different effects by simply changing the configuration.
