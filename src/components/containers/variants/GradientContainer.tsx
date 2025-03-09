import React from "react";
import { Container } from "../Container";
import { ContainerProps, DEFAULT_GRADIENT } from "../config";

/**
 * GradientContainer Component
 *
 * A container with a gradient background.
 * Supports both linear and radial gradients.
 *
 * @example Linear Gradient
 * ```tsx
 * <GradientContainer
 *   width="300px"
 *   height="100px"
 *   backgroundGradient={{
 *     type: "linear",
 *     colors: ["#ff0000", "#0000ff"],
 *     direction: "to right"
 *   }}
 *   animation="fadeIn"
 * >
 *   <Typography>Gradient Container Content</Typography>
 * </GradientContainer>
 * ```
 *
 * @example Radial Gradient
 * ```tsx
 * <GradientContainer
 *   width="300px"
 *   height="100px"
 *   backgroundGradient={{
 *     type: "radial",
 *     colors: ["#ff0000", "#0000ff"],
 *   }}
 *   animation="fadeIn"
 * >
 *   <Typography>Radial Gradient Container</Typography>
 * </GradientContainer>
 * ```
 */
export const GradientContainer: React.FC<ContainerProps> = (props) => {
  // Apply default gradient if not provided
  const gradientProps = {
    ...props,
    backgroundGradient: props.backgroundGradient || DEFAULT_GRADIENT,
  };

  return <Container variant="gradient" {...gradientProps} />;
};
