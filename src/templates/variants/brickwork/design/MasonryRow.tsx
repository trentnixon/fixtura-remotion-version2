import React, { CSSProperties, ReactNode } from "react";
import { getMasonryRowStyle } from "./masonry";

export interface MasonryRowProps {
  index: number;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Applies even/odd horizontal masonry inset without altering inner column tracks.
 */
export const MasonryRow: React.FC<MasonryRowProps> = ({
  index,
  children,
  className = "",
  style,
}) => (
  <div
    className={className}
    style={{
      ...getMasonryRowStyle(index),
      ...style,
    }}
  >
    {children}
  </div>
);
