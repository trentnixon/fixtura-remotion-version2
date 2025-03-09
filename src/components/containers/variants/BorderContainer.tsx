import React from "react";
import { Container } from "../Container";
import { ContainerProps, DEFAULT_BORDER } from "../config";

/**
 * BorderContainer Component
 *
 * A container with customizable borders.
 * Options for border width, style, color, and radius.
 *
 * @example
 * ```tsx
 * <BorderContainer
 *   width="300px"
 *   height="100px"
 *   backgroundColor="#f0f0f0"
 *   border={{
 *     width: "2px",
 *     style: "solid",
 *     color: "#ff0000",
 *     radius: "8px"
 *   }}
 *   animation="fadeIn"
 * >
 *   <Typography>Border Container Content</Typography>
 * </BorderContainer>
 * ```
 *
 * @example Simple Border
 * ```tsx
 * <BorderContainer
 *   width="300px"
 *   height="100px"
 *   border="2px dashed #ff0000"
 *   animation="fadeIn"
 * >
 *   <Typography>Simple Border Container</Typography>
 * </BorderContainer>
 * ```
 */
export const BorderContainer: React.FC<ContainerProps> = (props) => {
  // Apply default border if not provided
  const borderProps = {
    ...props,
    border: props.border || DEFAULT_BORDER,
  };

  return <Container variant="border" {...borderProps} />;
};
