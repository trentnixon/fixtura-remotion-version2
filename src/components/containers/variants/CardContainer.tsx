import React from "react";
import { Container } from "../Container";
import {
  ContainerProps,
  DEFAULT_BOX_SHADOW,
  DEFAULT_BORDER_RADIUS,
} from "../config";

/**
 * CardContainer Component
 *
 * A container with card-like appearance.
 * Includes drop shadow and elevation effects.
 *
 * @example
 * ```tsx
 * <CardContainer
 *   width="300px"
 *   height="100px"
 *   backgroundColor="#ffffff"
 *   animation="fadeIn"
 * >
 *   <Typography>Card Container Content</Typography>
 * </CardContainer>
 * ```
 *
 * @example Custom Shadow
 * ```tsx
 * <CardContainer
 *   width="300px"
 *   height="100px"
 *   backgroundColor="#ffffff"
 *   boxShadow={{
 *     offsetX: "0px",
 *     offsetY: "10px",
 *     blur: "20px",
 *     spread: "0px",
 *     color: "rgba(0, 0, 0, 0.2)"
 *   }}
 *   animation="fadeIn"
 * >
 *   <Typography>Custom Shadow Card</Typography>
 * </CardContainer>
 * ```
 */
export const CardContainer: React.FC<ContainerProps> = (props) => {
  // Apply default card styles if not provided
  const cardProps = {
    ...props,
    backgroundColor: props.backgroundColor || "#ffffff",
    borderRadius: props.borderRadius || DEFAULT_BORDER_RADIUS,
    boxShadow: props.boxShadow || DEFAULT_BOX_SHADOW,
  };

  return <Container variant="card" {...cardProps} />;
};
