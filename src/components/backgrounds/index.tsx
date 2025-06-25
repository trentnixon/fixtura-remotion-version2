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
import { GridNoise as NoiseBg } from "./variants/NoiseBackground/GridNoise";
import {
  NoiseVariant,
  NOISE_VARIANTS,
} from "./variants/NoiseBackground/config";
import SubtleNoise from "./variants/NoiseBackground/variants/SubtleNoise";
import GrainNoise from "./variants/NoiseBackground/variants/GrainNoise";
import WaveNoise from "./variants/NoiseBackground/variants/WaveNoise";
import FogNoise from "./variants/NoiseBackground/variants/FogNoise";
import StaticNoise from "./variants/NoiseBackground/variants/StaticNoise";
import FloatingParticles from "./variants/NoiseBackground/variants/FloatingParticles";
import DynamicParticles from "./variants/NoiseBackground/variants/DynamicParticles";
import TriangleSwarm from "./variants/NoiseBackground/variants/TriangleSwarm";
import PulsingCircles from "./variants/NoiseBackground/variants/PulsingCircles";
import DigitalRain from "./variants/NoiseBackground/variants/DigitalRain";
import GradientGrid from "./variants/NoiseBackground/variants/GradientGrid";

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
    FloatingParticles: FloatingParticles,
    DynamicParticles: DynamicParticles,
    TriangleSwarm: TriangleSwarm,
    PulsingCircles: PulsingCircles,
    DigitalRain: DigitalRain,
    GradientGrid: GradientGrid,
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
  const background = video.templateVariation?.useBackground;

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
          variant={video.templateVariation?.noise?.type as NoiseVariant}
        />
      );
    case "Pattern":
      return <PatternBackground />;
    case "Particle":
      return <ParticleBackground />;
    case "Noise":
      return (
        <NoiseBackground
          variant={video.templateVariation?.noise?.type as NoiseVariant}
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
      src={video.templateVariation?.video?.url}
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
    case "floatingParticles":
      return <FloatingParticles {...baseProps} />;
    case "dynamicParticles":
      return <DynamicParticles {...baseProps} />;
    case "triangleSwarm":
      return <TriangleSwarm {...baseProps} />;
    case "pulsingCircles":
      return <PulsingCircles {...baseProps} />;
    case "digitalRain":
      return <DigitalRain {...baseProps} />;
    case "gradientGrid":
      return <GradientGrid {...baseProps} />;
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
