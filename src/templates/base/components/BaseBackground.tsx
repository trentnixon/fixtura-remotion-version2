import React from "react";
import { AbsoluteFill } from "remotion";
import { useThemeContext } from "../../../core/context/ThemeContext";
import { BACKGROUND_Z_INDEX } from "./_utils/constants";

export const BaseBackground: React.FC = () => {
  const { colors } = useThemeContext();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.primary || "#000000",
        zIndex: BACKGROUND_Z_INDEX,
      }}
    />
  );
};
