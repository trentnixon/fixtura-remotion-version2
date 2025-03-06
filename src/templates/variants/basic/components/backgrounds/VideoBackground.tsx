// src/backgrounds/VideoBackground.tsx
import React from "react";
import { AbsoluteFill } from "remotion";

export const VideoBackground: React.FC = () => {
  // Simplified placeholder for development
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000000",
        zIndex: -1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        fontSize: "2em",
      }}
    >
      Video Background (Placeholder)
    </AbsoluteFill>
  );
};
