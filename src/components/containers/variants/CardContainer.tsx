import React from "react";
import { Container } from "../Container";
import { ContainerProps } from "../config";
import { classNames, mergeWithPriority } from "../../../core/utils/classNames";

/**
 * CardContainer Component
 *
 * A container styled as a card with shadow and rounded corners.
 * Useful for displaying content in a card-like format.
 *
 * @example
 * ```tsx
 * <CardContainer className="w-[300px] h-[100px] bg-white p-4 rounded-lg shadow-lg">
 *   <Typography>Card Container Content</Typography>
 * </CardContainer>
 * ```
 */
export const CardContainer: React.FC<ContainerProps> = (props) => {
  const { className = "", ...otherProps } = props;

  // Apply default Tailwind classes if not provided
  const defaultClasses = "";

  return (
    <Container
      variant="card"
      className={mergeWithPriority(defaultClasses, className)}
      {...otherProps}
    />
  );
};
