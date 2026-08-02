import React from "react";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useBroadcastProRoundedTheme } from "./useBroadcastProRoundedTheme";
import { cellBlur } from "./glass";

export interface BroadcastProRoundedMetadataChipProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/** Metadata pill — main header secondary line, ladder grade label, etc. */
export const BroadcastProRoundedMetadataChip: React.FC<
  BroadcastProRoundedMetadataChipProps
> = ({ children, className = "", style }) => {
  const { glass } = useBroadcastProRoundedTheme();
  const { layout } = useThemeContext();
  const cellRadius = layout.borderRadius.container;

  return (
    <div
      className={`inline-flex overflow-hidden ${cellRadius} ${className}`.trim()}
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
