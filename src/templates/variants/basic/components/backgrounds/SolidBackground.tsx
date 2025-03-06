// src/backgrounds/SolidBackground.tsx
import React from "react";
import { AbsoluteFill } from "remotion";
import { useStylesContext } from "../../../../../core/context/StyleContext";

export const SolidBackground: React.FC = () => {
  const { THEME } = useStylesContext();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: THEME.primary || "#111111",
        zIndex: -1,
      }}
    />
  );
};
