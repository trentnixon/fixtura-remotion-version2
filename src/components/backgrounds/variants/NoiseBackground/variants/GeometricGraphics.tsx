import React from "react";
import { GraphicsBackground } from "../GraphicsBackground";

/**
 * GeometricGraphics - A geometric pattern-based graphics background
 *
 * This variant creates animated geometric shapes including triangles,
 * squares, and circles with smooth rotations and scaling animations.
 * Perfect for modern, clean designs with mathematical precision.
 */
const GeometricGraphics: React.FC<
  React.ComponentProps<typeof GraphicsBackground>
> = (props) => {
  return (
    <GraphicsBackground
      variant="geometric"
      density="medium"
      animationSpeed={0.3}
      opacity={0.7}
      {...props}
    />
  );
};

export default GeometricGraphics;
