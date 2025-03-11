import React from "react";
import { Container } from "../Container";
import { ContainerProps } from "../config";
import { mergeWithPriority } from "../../../core/utils/classNames";

/**
 * GradientContainer Component
 *
 * A container with a gradient background.
 * Supports both linear and radial gradients.
 *
 * @example
 * ```tsx
 * <GradientContainer
 *   className="w-[300px] h-[100px] p-4 rounded-lg"
 *   backgroundGradient={{
 *     type: "linear",
 *     colors: ["#4F46E5", "#7C3AED"],
 *     direction: "to right"
 *   }}
 * >
 *   <Typography>Gradient Container Content</Typography>
 * </GradientContainer>
 * ```
 */
export const GradientContainer: React.FC<ContainerProps> = (props) => {
  const { className = "", ...otherProps } = props;

  // Apply default Tailwind classes if not provided
  const defaultClasses = "";

  return (
    <Container
      variant="gradient"
      className={mergeWithPriority(defaultClasses, className)}
      {...otherProps}
    />
  );
};
