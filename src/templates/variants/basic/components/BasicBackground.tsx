import React from "react";
import { AbsoluteFill } from "remotion";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useStylesContext } from "../../../../core/context/StyleContext";
import { useGlobalContext } from "../../../../core/context/GlobalContext";

export const BasicBackground: React.FC = () => {
  const { Video } = useVideoDataContext();
  const backgroundType = Video?.TemplateVariation?.Background || "Solid";

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

// Different background implementations
const GradientBackground: React.FC = () => {
  const { THEME } = useStylesContext();
  const { settings } = useGlobalContext();

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${settings.gradientDegree || "0deg"}, ${THEME.primary || "#111111"}, ${THEME.secondary || "#f8cb4c"})`,
        zIndex: -1,
      }}
    />
  );
};

const ImageBackground: React.FC = () => {
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

const VideoBackground: React.FC = () => {
  // Simplified for development
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

const GraphicsBackground: React.FC = () => {
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

const SolidBackground: React.FC = () => {
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
