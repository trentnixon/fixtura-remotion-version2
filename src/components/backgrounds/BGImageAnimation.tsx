// src/components/backgrounds/BGImageAnimation.tsx
import { AbsoluteFill } from "remotion";
import { useVideoDataContext } from "../../core/context/VideoDataContext";
import { useStylesContext } from "../../core/context/StyleContext";
import { useGlobalContext } from "../../core/context/GlobalContext";

// Background component
export const BGImageAnimation = () => {
  const { Video } = useVideoDataContext();
  const background = Video.TemplateVariation?.Background;

  // Render different backgrounds based on template variation
  switch (background) {
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

// Gradient background
const GradientBackground = () => {
  const { THEME } = useStylesContext();
  const { settings } = useGlobalContext();

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${settings.gradientDegree}, ${THEME.primary}, ${THEME.secondary})`,
        zIndex: -1,
      }}
    />
  );
};

// Image background
const ImageBackground = () => {
  const { Video } = useVideoDataContext();

  return (
    <AbsoluteFill
      style={{
        backgroundImage: `url(${Video.TemplateVariation.useBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: -1,
      }}
    />
  );
};

// Video background (stub - would need proper implementation)
const VideoBackground = () => {
  return (
    <AbsoluteFill style={{ zIndex: -1 }}>
      {/* Video background implementation */}
    </AbsoluteFill>
  );
};

// Graphics background
const GraphicsBackground = () => {
  const { Video } = useVideoDataContext();

  return (
    <AbsoluteFill
      style={{
        backgroundImage: `url(${Video.TemplateVariation.useBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: -1,
      }}
    />
  );
};

// Solid background
const SolidBackground = () => {
  const { THEME } = useStylesContext();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: THEME.primary,
        zIndex: -1,
      }}
    />
  );
};
