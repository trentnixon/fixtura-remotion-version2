// src/backgrounds/GradientBackground.tsx
import React from "react";
import { AbsoluteFill } from "remotion";
import { useGlobalContext } from "../../../../../core/context/GlobalContext";
import { useStylesContext } from "../../../../../core/context/StyleContext";

export const GradientBackground: React.FC = () => {
  const { THEME } = useStylesContext();
  const { settings } = useGlobalContext();

  // Get gradient degree from settings
  const gradientDegree = settings.gradientDegree || "0deg";

  // We need to use inline styles for the gradient
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${gradientDegree}, ${THEME.primary || "#111111"}, ${THEME.secondary || "#ffffff"})`,
        zIndex: -1,
      }}
    />
  );
};
