import React from "react";
import { Container } from "../Container";
import { ContainerProps } from "../config";
import { mergeWithPriority } from "../../../core/utils/classNames";

/**
 * BasicContainer Component
 *
 * A simple container with a solid background color.
 * This is the default container variant.
 *
 * @example
 * ```tsx
 * <BasicContainer className="w-[300px] h-[100px] bg-slate-800 p-4 rounded-lg">
 *   <Typography>Basic Container Content</Typography>
 * </BasicContainer>
 * ```
 */
export const BasicContainer: React.FC<ContainerProps> = (props) => {
  const { className = "", ...otherProps } = props;

  // Apply default Tailwind classes if not provided
  const defaultClasses = "";

  return (
    <Container
      variant="basic"
      className={mergeWithPriority(defaultClasses, className)}
      {...otherProps}
    />
  );
};
