import React from "react";
import { Container } from "../Container";
import { ContainerProps } from "../config";
import { mergeWithPriority } from "../../../core/utils/classNames";

/**
 * BorderContainer Component
 *
 * A container with customizable borders.
 * Supports different border styles, widths, and colors.
 *
 * @example
 * ```tsx
 * <BorderContainer
 *   className="w-[300px] h-[100px] bg-slate-800 p-4 rounded-lg"
 *   border={{
 *     width: "2px",
 *     style: "solid",
 *     color: "#f59e0b"
 *   }}
 * >
 *   <Typography>Border Container Content</Typography>
 * </BorderContainer>
 * ```
 */
export const BorderContainer: React.FC<ContainerProps> = (props) => {
  const { className = "", ...otherProps } = props;

  // Apply default Tailwind classes if not provided
  const defaultClasses = "";

  return (
    <Container
      variant="border"
      className={mergeWithPriority(defaultClasses, className)}
      {...otherProps}
    />
  );
};
