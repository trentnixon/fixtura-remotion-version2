# Image Animations

This folder contains the animation functions that power the `AnimatedImage` component. Each file in this directory is responsible for a specific category of animations, making the system modular and easy to extend.

## Animation Categories

-   **`broadcastAnimations.ts`**: Contains animations that mimic broadcast television graphics, such as lower thirds and scoreboards.
-   **`cameraAnimations.ts`**: Includes animations that simulate camera effects, like focus pulls and exposure changes.
-   **`cinematicAnimations.ts`**: Provides cinematic transition effects, such as wipes and splits.
-   **`compositeAnimations.ts`**: Contains more complex animations that are composed of multiple simpler animations.
-   **`effectsAnimations.ts`**: Includes special effects animations, such as glitch, ripple, and tint.
-   **`fadeAnimations.ts`**: Contains basic fade in and fade out animations.
-   **`index.ts`**: This file serves as the main entry point for all the animation functions. It exports all the animations from the other files, making them available to the `useImageAnimation` hook.
-   **`perspectiveAnimations.ts`**: Includes 3D perspective animations, such as flips and swings.
-   **`rotateAnimations.ts`**: Contains animations for rotating images.
-   **`slideAnimations.ts`**: Provides animations for sliding images in and out from different directions.
-   **`specialAnimations.ts`**: Contains unique animations like the Ken Burns effect and a pulse effect.
-   **`springAnimations.ts`**: Includes animations that use a physics-based spring model for natural-looking motion.
-   **`zoomAnimations.ts`**: Contains animations for zooming images in and out.

## How it Works

Each animation file exports one or more `AnimationFunction`s. An `AnimationFunction` is a function that takes the current frame, the start and end frames of the animation, and an animation configuration object as input. It returns a `React.CSSProperties` object that defines the style of the image at the given frame.

The `useImageAnimation` hook imports all of these animation functions and uses a `switch` statement to select the correct one based on the `type` of the animation config. This makes it easy to add new animations by simply creating a new animation function and adding it to the `switch` statement in `useImageAnimation.ts` and the `index.ts` in this directory.
