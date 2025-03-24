import React from "react";
import { AbsoluteFill } from "remotion";
import { useThemeContext } from "../../../core/context/ThemeContext";

export const BaseBackground: React.FC = () => {
  const { theme } = useThemeContext();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.colors.primary || "#000000",
        zIndex: -1,
      }}
    />
  );
};
