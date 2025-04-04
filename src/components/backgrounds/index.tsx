// src/components/backgrounds/BGImageAnimation.tsx

import { useVideoDataContext } from "../../core/context/VideoDataContext";
import { useThemeContext } from "../../core/context/ThemeContext";

// Import all background variants
import { SolidBackground as SolidBg } from "./variants/Solid/SolidBackground";
import { GradientBackground as GradientBg } from "./variants/Gradient/GradientBackground";
import { ImageBackground as ImageBg } from "./variants/Image";
import { VideoBackground as VideoBg } from "./variants/Video/VideoBackground";
import { GraphicsBackground as GraphicsBg } from "./variants/GraphicsBackground";

// Import NoiseBackground components
import { NoiseBackground as NoiseBg } from "./variants/NoiseBackground/NoiseBackground";
import {
  NoiseVariant,
  NOISE_VARIANTS,
} from "./variants/NoiseBackground/config";
import SubtleNoise from "./variants/NoiseBackground/variants/SubtleNoise";
import GrainNoise from "./variants/NoiseBackground/variants/GrainNoise";
import WaveNoise from "./variants/NoiseBackground/variants/WaveNoise";
import FogNoise from "./variants/NoiseBackground/variants/FogNoise";
import StaticNoise from "./variants/NoiseBackground/variants/StaticNoise";
//import { LayeredBackground as LayeredBg } from "./variants/LayeredBackground";
import { AnimatedBackground as AnimatedBg } from "./variants/AnimatedBackground";
import { PatternBackground } from "./variants/Patterns";
import ParticleBackground from "./variants/Particles";

// Export all background variants
export const BackgroundComponents = {
  Solid: SolidBg,
  Gradient: GradientBg,
  Image: ImageBg,
  Video: VideoBg,
  Graphics: GraphicsBg,
  Pattern: PatternBackground,
  Particle: ParticleBackground,
  Noise: {
    Default: NoiseBg,
    Subtle: SubtleNoise,
    Grain: GrainNoise,
    Wave: WaveNoise,
    Fog: FogNoise,
    Static: StaticNoise,
  },
  Animated: AnimatedBg,
};

// Export noise variants for template configuration
export const NoiseVariants = NOISE_VARIANTS;

// Export types and constants
export * from "./config";

// Background component
export const SelectTemplateBackground = () => {
  const { video } = useVideoDataContext();
  const background = video.appearance?.type;

  // Render different backgrounds based on template variation
  switch (background) {
    case "Gradient":
      return <GradientBackground />;
    case "Image":
      return <ImageBackground />;
    case "Video":
      return <VideoBackground />;
    case "Graphics":
      return (
        <NoiseBackground
          variant={video.templateVariation?.Noise?.type as NoiseVariant}
        />
      );
    case "Pattern":
      return <PatternBackground />;
    case "Particle":
      return <ParticleBackground />;
    case "Noise":
      return (
        <NoiseBackground
          variant={video.templateVariation?.Noise?.type as NoiseVariant}
        />
      );
    /*   case "Layered":
      return <LayeredBackground />; */
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
  return <ImageBg />;
};

// Video background
const VideoBackground = () => {
  const { video } = useVideoDataContext();

  return (
    <VideoBg
      src={video.templateVariation?.Video?.url}
      position="center"
      size="cover"
      loop={true}
      muted={true}
    />
  );
};

// Noise background
const NoiseBackground = ({
  variant = "default",
}: {
  variant?: NoiseVariant;
}) => {
  const { selectedPalette } = useThemeContext();
  const baseProps = {
    baseColor: selectedPalette.background.main,
    noiseColor: selectedPalette.background.accent,
  };
  // video.templateVariation?.Noise.type
  switch (variant) {
    case "subtle":
      return <SubtleNoise {...baseProps} />;
    case "grain":
      return <GrainNoise {...baseProps} />;
    case "wave":
      return <WaveNoise {...baseProps} />;
    case "fog":
      return <FogNoise {...baseProps} />;
    case "static":
      return <StaticNoise {...baseProps} />;
    default:
      return (
        <NoiseBg
          baseColor={selectedPalette.background.main}
          noiseColor={selectedPalette.background.accent}
          noiseOpacity={0.3}
          noiseScale={0.5}
        />
      );
  }
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
