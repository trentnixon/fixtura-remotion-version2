// src/backgrounds/index.tsx
import React from "react";

import { GradientBackground } from "./GradientBackground";
import { ImageBackground } from "./ImageBackground";
import { VideoBackground } from "./VideoBackground";
import { GraphicsBackground } from "./GraphicsBackground";
import { SolidBackground } from "./SolidBackground";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";

export const Background: React.FC = () => {
  const { Video } = useVideoDataContext();
  const backgroundType = Video?.TemplateVariation?.Background || "Solid";
  console.log("Background type:", backgroundType);
  // Render the appropriate background
  switch (backgroundType) {
    case "Gradient":
      return <GradientBackground />;
    case "Image":
      return <ImageBackground />;
    case "Video":
      return <VideoBackground />;
    case "Graphics":
      return <GraphicsBackground />;
    default:
      return <SolidBackground />;
  }
};

// Export all background components
export { GradientBackground } from "./GradientBackground";
export { ImageBackground } from "./ImageBackground";
export { VideoBackground } from "./VideoBackground";
export { GraphicsBackground } from "./GraphicsBackground";
export { SolidBackground } from "./SolidBackground";
