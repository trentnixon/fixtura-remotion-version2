// src/components/backgrounds/BGImageAnimation.tsx

import { useVideoDataContext } from "../../core/context/VideoDataContext";
import { useThemeContext } from "../../core/context/ThemeContext";

// Import all background variants
import { SolidBackground as SolidBg } from "./variants/SolidBackground";
import { GradientBackground as GradientBg } from "./variants/GradientBackground";
import { ImageBackground as ImageBg } from "./variants/ImageBackground";
import { VideoBackground as VideoBg } from "./variants/VideoBackground";
import { GraphicsBackground as GraphicsBg } from "./variants/GraphicsBackground";
import { PatternBackground as PatternBg } from "./variants/PatternBackground";
import { ParticleBackground as ParticleBg } from "./variants/ParticleBackground";
import { NoiseBackground as NoiseBg } from "./variants/NoiseBackground";
import { LayeredBackground as LayeredBg } from "./variants/LayeredBackground";
import { AnimatedBackground as AnimatedBg } from "./variants/AnimatedBackground";

// Export all background variants
export const BackgroundComponents = {
  Solid: SolidBg,
  Gradient: GradientBg,
  Image: ImageBg,
  Video: VideoBg,
  Graphics: GraphicsBg,
  Pattern: PatternBg,
  Particle: ParticleBg,
  Noise: NoiseBg,
  Layered: LayeredBg,
  Animated: AnimatedBg,
};

// Export types and constants
export * from "./config";

// Background component
export const SelectTemplateBackground = () => {
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
    case "Pattern":
      return <PatternBackground />;
    case "Particle":
      return <ParticleBackground />;
    case "Noise":
      return <NoiseBackground />;
    case "Layered":
      return <LayeredBackground />;
    case "Animated":
      return <AnimatedBackground />;
    default:
      return <SolidBackground />;
  }
};

// Gradient background
const GradientBackground = () => {
  return <GradientBg />;
};

// Image background
const ImageBackground = () => {
  const { Video } = useVideoDataContext();

  return (
    <ImageBg
      src={Video.TemplateVariation.useBackground}
      position="center"
      size="cover"
    />
  );
};

// Video background
const VideoBackground = () => {
  const { Video } = useVideoDataContext();

  return (
    <VideoBg
      src={Video.TemplateVariation.useBackground}
      position="center"
      size="cover"
      loop={true}
      muted={true}
    />
  );
};

// Graphics background
const GraphicsBackground = () => {
  const { selectedPalette } = useThemeContext();

  return (
    <GraphicsBg
      variant="abstract"
      primaryColor={selectedPalette.background.main}
      secondaryColor={selectedPalette.background.accent}
      density="medium"
    />
  );
};

// Pattern background
const PatternBackground = () => {
  const { selectedPalette } = useThemeContext();

  return (
    <PatternBg
      pattern="dots"
      primaryColor={selectedPalette.background.main}
      secondaryColor={selectedPalette.background.accent}
    />
  );
};

// Particle background
const ParticleBackground = () => {
  const { selectedPalette } = useThemeContext();

  return (
    <ParticleBg
      particleType="dots"
      particleColor={selectedPalette.background.accent}
      backgroundColor={selectedPalette.background.main}
      particleCount={100}
    />
  );
};

// Noise background
const NoiseBackground = () => {
  const { selectedPalette } = useThemeContext();

  return (
    <NoiseBg
      baseColor={selectedPalette.background.main}
      noiseColor={selectedPalette.background.accent}
      noiseOpacity={0.3}
      noiseScale={0.5}
    />
  );
};

// Layered background
const LayeredBackground = () => {
  const { selectedPalette } = useThemeContext();

  return (
    <LayeredBg
      layers={[
        {
          type: "gradient",
          gradientType: "linear",
          colors: [
            selectedPalette.background.main,
            selectedPalette.background.accent,
          ],
          opacity: 1,
        },
        {
          type: "noise",
          baseColor: "transparent",
          noiseColor: selectedPalette.background.accent,
          noiseOpacity: 0.2,
          noiseScale: 0.8,
        },
      ]}
    />
  );
};

// Animated background
const AnimatedBackground = () => {
  const { selectedPalette } = useThemeContext();

  return (
    <AnimatedBg
      type="pulsingGradient"
      colors={[
        selectedPalette.background.main,
        selectedPalette.background.accent,
      ]}
      duration={60}
      intensity={0.2}
    />
  );
};

// Solid background
const SolidBackground = () => {
  return <SolidBg />;
};
