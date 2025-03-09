import React from "react";
import { Container } from "../Container";
import { ContainerProps } from "../config";

/**
 * BasicContainer Component
 *
 * A simple container with a solid background color.
 * This is the default container variant.
 *
 * @example
 * ```tsx
 * <BasicContainer
 *   width="300px"
 *   height="100px"
 *   backgroundColor="#f0f0f0"
 *   animation="fadeIn"
 * >
 *   <Typography>Basic Container Content</Typography>
 * </BasicContainer>
 * ```
 */
export const BasicContainer: React.FC<ContainerProps> = (props) => {
  return <Container variant="basic" {...props} />;
};
