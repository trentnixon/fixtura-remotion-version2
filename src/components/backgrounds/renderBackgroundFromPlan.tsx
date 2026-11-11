import React from "react";
import type { BackgroundRenderPlan } from "./resolveBackgroundRenderPlan";
import { GradientBackground as GradientBgReal } from "./variants/Gradient/GradientBackground";
import { ImageBackground as ImageBg } from "./variants/Image";
import { VideoBackground as VideoBg } from "./variants/Video/VideoBackground";
import TextureBackground from "./variants/Textures/TextureBackground";
import { LuminanceBackgroundView } from "./variants/Luminance/LuminanceBackgroundView";
import FloatingParticles from "./variants/NoiseBackground/variants/FloatingParticles";
import PulsingCircles from "./variants/NoiseBackground/variants/PulsingCircles";
import DigitalRain from "./variants/NoiseBackground/variants/DigitalRain";
import SpokesGraphics from "./variants/NoiseBackground/variants/SpokesGraphics";
import { AnimatedBackground as AnimatedBg } from "./variants/AnimatedBackground";
import { PatternBackground } from "./variants/Patterns";
import ParticleBackground from "./variants/Particles";
import { SolidBackground as SolidBg } from "./variants/Solid/SolidBackground";
import { useVideoDataContext } from "../../core/context/VideoDataContext";
import { useThemeContext } from "../../core/context/ThemeContext";
import type { VideoTemplateVariation } from "../../core/types/data/videoData";
import type { GeneratedRenderPlan } from "./variants/Generated/resolveGeneratedRenderPlan";

const renderGeneratedNoise = (generated: Extract<GeneratedRenderPlan, { kind: "noise" }>) => {
  const baseProps = {
    baseColor: generated.baseColor,
    noiseColor: generated.noiseColor,
  };

  switch (generated.variant) {
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

export const RenderBackgroundFromPlan: React.FC<{
  plan: BackgroundRenderPlan;
}> = ({ plan }) => {
  const { route, luminance, generated } = plan;

  switch (route.kind) {
    case "gradient":
      return <GradientBgReal />;
    case "image":
      return <ImageBg />;
    case "video":
      return <VideoBackgroundFromContext />;
    case "texture":
      return <TextureBackground />;
    case "luminance":
      if (!luminance) {
        return <SolidBg />;
      }
      return <LuminanceBackgroundView plan={luminance} />;
    case "noise":
      if (generated?.kind === "noise") {
        return renderGeneratedNoise(generated);
      }
      return <SolidBg />;
    case "pattern":
      return <PatternBackground />;
    case "particle":
      return <ParticleBackground />;
    case "animated":
      return <AnimatedBackgroundFromPalette />;
    case "solid":
      return <SolidBg />;
    default: {
      const exhaustive: never = route;
      return exhaustive;
    }
  }
};

const VideoBackgroundFromContext = () => {
  const { video } = useVideoDataContext();
  type ExtendedVideoConfig = NonNullable<VideoTemplateVariation["video"]> & {
    videoIntro?: { url?: string };
    videoBackground?: { url?: string };
    introFrames?: number;
  };
  const vcfg = (video.templateVariation?.video || {}) as ExtendedVideoConfig;

  return (
    <VideoBg
      src={vcfg?.videoBackground?.url || vcfg?.url || undefined}
      introSrc={vcfg?.videoIntro?.url}
      introFrames={vcfg?.introFrames}
      templateVariation={vcfg}
    />
  );
};

const AnimatedBackgroundFromPalette = () => {
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
