# Image Component System

This folder contains the core components and configuration for handling animated images within the Remotion project. It provides a flexible and powerful system for creating dynamic and engaging video content with rich image animations.

## Core Components

-   **`AnimatedImage.tsx`**: This is the heart of the image system. It's a versatile React component that wraps the standard Remotion `<Img>` component, adding a layer of animation and functionality. It supports a wide range of animations, including entry and exit animations, as well as physics-based spring animations. It also handles image loading, fallbacks, and aspect ratio control.

-   **`index.ts`**: This file serves as the public API for the image component system. It exports the `AnimatedImage` component, along with key utility functions and types, making them easily accessible to other parts of the application.

-   **`placeholders.ts`**: This file defines a set of placeholder image URLs. These are used as fallbacks when an image fails to load, ensuring that the video rendering process doesn't fail and that there is a visual indicator that an image is missing.

## Configuration

The `config` subfolder contains all the configuration and logic for the image animations.

-   **`config/`**: This directory houses the animation logic, including animation definitions, easing functions, and spring configurations. It's the engine that powers the `AnimatedImage` component.

## Usage

To use the `AnimatedImage` component, import it from this directory and provide it with a `src` and other desired props. You can specify animations using the `animation` and `exitAnimation` props.

### Example

```tsx
import { AnimatedImage } from './components/images';

const MyComponent = () => {
  return (
    <AnimatedImage
      src="path/to/my-image.png"
      animation="fadeIn"
      animationDuration={30}
      exitAnimation="fadeOut"
      exitFrame={120}
    />
  );
};
```
