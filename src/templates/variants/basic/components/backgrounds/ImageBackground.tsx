// src/backgrounds/ImageBackground.tsx
import React from "react";
import { AbsoluteFill } from "remotion";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";

export const ImageBackground: React.FC = () => {
  const { Video } = useVideoDataContext();

  return (
    <AbsoluteFill
      style={{
        backgroundImage: `url(${Video?.TemplateVariation?.useBackground || "https://example.com/placeholder.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: -1,
      }}
    />
  );
};
