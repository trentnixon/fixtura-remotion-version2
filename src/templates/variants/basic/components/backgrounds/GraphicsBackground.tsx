// src/backgrounds/GraphicsBackground.tsx
import React from "react";
import { AbsoluteFill } from "remotion";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { useStylesContext } from "../../../../../core/context/StyleContext";

export const GraphicsBackground: React.FC = () => {
  const { Video } = useVideoDataContext();
  const { THEME } = useStylesContext();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: THEME.primary,
        backgroundImage: `url(${Video?.TemplateVariation?.useBackground || "https://example.com/placeholder.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: -1,
      }}
    />
  );
};
