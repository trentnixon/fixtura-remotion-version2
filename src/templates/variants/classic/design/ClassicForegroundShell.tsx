import React, { CSSProperties, ReactNode } from "react";
import { SplitColourEdge } from "./SplitColourEdgeView";
import { ClassicOffsetPanel } from "./OffsetPanelView";
import { getSplitEdgeInsetPx } from "./splitColourEdge";
import type { ClassicOffsetPanelDepth } from "./offsetPanel";

export interface ClassicForegroundShellProps {
  height: number | string;
  delay?: number;
  depth?: ClassicOffsetPanelDepth;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * Classic row/card shell: vertical split colour-edge + offset panel content plane.
 */
export const ClassicForegroundShell: React.FC<ClassicForegroundShellProps> = ({
  height,
  delay = 0,
  depth = "compact",
  className = "",
  style,
  children,
}) => {
  const splitEdgeInsetPx = getSplitEdgeInsetPx();

  return (
    <div
      className={`relative overflow-visible w-full ${className}`}
      style={{
        height,
        paddingLeft: `${splitEdgeInsetPx}px`,
        ...style,
      }}
    >
      <SplitColourEdge
        orientation="vertical"
        placement="leading"
        animationDelay={delay}
      />
      <ClassicOffsetPanel depth={depth} height={height}>
        {children}
      </ClassicOffsetPanel>
    </div>
  );
};
