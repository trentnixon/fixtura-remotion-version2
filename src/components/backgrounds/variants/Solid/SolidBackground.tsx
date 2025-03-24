import React from "react";
import { AbsoluteFill } from "remotion";
import { SolidBackgroundProps } from "../../config";
import { useThemeContext } from "../../../../core/context/ThemeContext";

interface Props extends Partial<SolidBackgroundProps> {
  className?: string;
  style?: React.CSSProperties;
}

export const SolidBackground: React.FC<Props> = ({
  className = "",
  style = {},
}) => {
  const { selectedPalette } = useThemeContext();

  // Use provided color, or palette background
  const backgroundColor = selectedPalette.background.main;

  return (
    <AbsoluteFill
      className={`bg-background ${className} ${backgroundColor}`}
      style={{
        background: backgroundColor,
        zIndex: -1,
        ...style,
      }}
    />
  );
};
