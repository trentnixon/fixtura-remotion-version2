# Noise Background

This folder contains the components and configuration for creating animated noise backgrounds in Remotion. These components can be used to add texture, depth, and visual interest to video compositions.

## Core Components

- **`GridNoise.tsx`**: This component generates a grid-based noise effect. It creates a grid of cells and applies a noise value to each cell, which can be used to control properties like opacity and color. It supports both 2D and 3D noise, and can be customized with different cell shapes, colors, and animations.

- **`ParticleNoise.tsx`**: This component creates a particle-based noise effect. It generates a field of particles and animates their position and opacity using 3D noise. This can be used to create effects like floating dust, stars, or other particle-based phenomena.

- **`ShapeNoise.tsx`**: This is a helper component that is used by `ParticleNoise.tsx` to render the individual particles. It can render different shapes, such as circles, squares, triangles, and lines.

- **`GraphicsBackground.tsx`**: This component creates animated SVG graphics backgrounds with various geometric patterns, organic shapes, and flowing elements. It supports multiple variants including geometric, organic, abstract, tech, and flowing styles.

- **`index.ts`**: This file serves as the public API for the noise background components. It exports the `GridNoise`, `ParticleNoise`, and `GraphicsBackground` components, as well as the `NOISE_VARIANTS` configuration.

- **`config.ts`**: This file defines the available noise variants and their descriptions. The `NOISE_VARIANTS` object provides a set of predefined configurations for different noise effects, such as "subtle", "grain", "wave", "fog", and "graphics".

## Graphics Background Variants

The `GraphicsBackground` component supports several variants:

- **`geometric`**: Creates animated geometric shapes including triangles, squares, and circles with smooth rotations and scaling animations. Perfect for modern, clean designs.

- **`organic`**: Creates smooth, organic shapes with flowing curves and blob-like elements that move naturally. Perfect for creating a more natural, fluid aesthetic.

- **`abstract`**: Creates abstract shapes and patterns with flowing lines and artistic elements. Perfect for creative content and artistic presentations.

- **`tech`**: Creates circuit-like patterns, digital nodes, and tech-inspired elements that give a futuristic, digital feel. Perfect for technology-related content.

- **`flowing`**: Creates smooth, flowing waves and particles that move across the screen in a natural, fluid motion. Perfect for creating a dynamic, energetic background.

## Usage

To use the noise background components, you can import them from this directory and add them to your Remotion composition. You can then use the `NOISE_VARIANTS` to select a predefined noise effect, or you can customize the effect by passing in your own props.

### Example

```tsx
import {
  GridNoise,
  NOISE_VARIANTS,
} from "./components/backgrounds/variants/NoiseBackground";

const MyComposition = () => {
  return <GridNoise {...NOISE_VARIANTS.subtle} />;
};
```

### Graphics Background Example

```tsx
import { GraphicsBackground } from "./components/backgrounds/variants/NoiseBackground";

const MyComposition = () => {
  return (
    <GraphicsBackground
      variant="geometric"
      density="medium"
      animationSpeed={0.4}
      opacity={0.7}
      primaryColor="#4a90e2"
      secondaryColor="#7b68ee"
      accentColor="#ff6b6b"
    />
  );
};
```
