import React from "react";
import { useBroadcastProTheme } from "./useBroadcastProTheme";
import { cellBlur } from "./glass";

export interface BroadcastProMetadataChipProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/** Metadata pill — main header secondary line, ladder grade label, etc. */
export const BroadcastProMetadataChip: React.FC<
  BroadcastProMetadataChipProps
> = ({ children, className = "", style }) => {
  const { glass } = useBroadcastProTheme();

  return (
    <div
      className={`inline-flex ${className}`.trim()}
      style={{
        background: glass.panel,
        border: glass.border,
        ...cellBlur,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
