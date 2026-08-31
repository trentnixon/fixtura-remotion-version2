// src/components/backgrounds/BGImageAnimation.tsx

import { useVideoDataContext } from "../../core/context/VideoDataContext";
import { useThemeContext } from "../../core/context/ThemeContext";
import { matchLegacyIngress } from "./variants/Generated/catalogue";
import {
  logUnsupportedBackgroundDiagnostic,
  resolveValidatedBackgroundRoute,
} from "./resolveValidatedBackgroundRoute";

// Import all background variants
import { SolidBackground as SolidBg } from "./variants/Solid/SolidBackground";
import { GradientBackground as GradientBg } from "./variants/Gradient/GradientBackground";
import { ImageBackground as ImageBg } from "./variants/Image";
import { VideoBackground as VideoBg } from "./variants/Video/VideoBackground";

// Import NoiseBackground components
import {
  NoiseVariant,
  NOISE_VARIANTS,
} from "./variants/NoiseBackground/config";
import FloatingParticles from "./variants/NoiseBackground/variants/FloatingParticles";
import PulsingCircles from "./variants/NoiseBackground/variants/PulsingCircles";
import DigitalRain from "./variants/NoiseBackground/variants/DigitalRain";
import SpokesGraphics from "./variants/NoiseBackground/variants/SpokesGraphics";

//import { LayeredBackground as LayeredBg } from "./variants/LayeredBackground";
import { AnimatedBackground as AnimatedBg } from "./variants/AnimatedBackground";
import { PatternBackground } from "./variants/Patterns";
import ParticleBackground from "./variants/Particles";
import { VideoTemplateVariation } from "../../core/types/data/videoData";
import TextureBackground from "./variants/Textures/TextureBackground";
import { LuminanceBackground } from "./variants/Luminance";

// Export all background variants
export const BackgroundComponents = {
  Solid: SolidBg,
  Gradient: GradientBg,
  Image: ImageBg,
  Video: VideoBg,
  Graphics: SpokesGraphics,
  Pattern: PatternBackground,
  Particle: ParticleBackground,
  Texture: TextureBackground,
  Luminance: LuminanceBackground,
  Noise: {
    FloatingParticles,
    PulsingCircles,
    DigitalRain,
    Spokes: SpokesGraphics,
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
  const match = matchLegacyIngress(video.templateVariation ?? {});
  const route = resolveValidatedBackgroundRoute(match);

  if (route.kind === "unsupported") {
    logUnsupportedBackgroundDiagnostic(route.diagnostic);
    return <SolidBackground />;
  }

  switch (route.kind) {
    case "gradient":
      return <GradientBackground />;
    case "image":
      return <ImageBackground />;
    case "video":
      return <VideoBackground />;
    case "texture":
      return <TextureBackground />;
    case "luminance":
      return <LuminanceBackground />;
    case "noise":
      return <NoiseBackground variant={route.variant} />;
    case "pattern":
      return <PatternBackground />;
    case "particle":
      return <ParticleBackground />;
    case "animated":
      return <AnimatedBackground />;
    case "solid":
      return <SolidBackground />;
    default: {
      const exhaustive: never = route;
      return exhaustive;
    }
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
  type ExtendedVideoConfig = NonNullable<VideoTemplateVariation["video"]> & {
    videoIntro?: { url?: string };
    videoBackground?: { url?: string };
    introFrames?: number;
  };
  const vcfg = (video.templateVariation?.video || {}) as ExtendedVideoConfig;

  return (
    <VideoBg
      // Background video source, prefer new field, fallback to legacy video.url
      src={vcfg?.videoBackground?.url || vcfg?.url}
      // Intro video source
      introSrc={vcfg?.videoIntro?.url}
      // Intro frames configurable, default handled in component
      introFrames={vcfg?.introFrames}
      // Let component read position/size/muted/loop/overlay from templateVariation
      templateVariation={vcfg}
    />
  );
};

// Noise background
const NoiseBackground = ({
  variant = "floatingParticles",
}: {
  variant?: NoiseVariant;
}) => {
  const { selectedPalette } = useThemeContext();
  const baseProps = {
    baseColor: selectedPalette.background.main,
    noiseColor: selectedPalette.background.accent,
  };

  switch (variant) {
    case "floatingParticles":
      return <FloatingParticles {...baseProps} />;
    case "pulsingCircles":
      return <PulsingCircles {...baseProps} />;
    case "digitalRain":
      return <DigitalRain {...baseProps} />;
    case "spokes":
      return <SpokesGraphics />;
    default:
      return <FloatingParticles {...baseProps} />;
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
