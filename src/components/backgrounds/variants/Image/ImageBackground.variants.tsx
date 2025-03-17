// ImageBackground.variants.tsx
import React from "react";
import { AbsoluteFill } from "remotion";
import {
  ImageEffectType,
  ZoomDirection,
  PanDirection,
  OverlayType,
  BlurDirection,
} from "./ImageBackground.types";

// Re-export for convenience when importing from the main component
export {
  ImageEffectType,
  ZoomDirection,
  PanDirection,
  OverlayType,
  BlurDirection,
};

// Base props for all effect components
interface BaseEffectProps {
  src?: string;
  className?: string;
  style?: React.CSSProperties;
  startTime?: number;
  endTime?: number;
}

// Zoom effect props
interface ZoomEffectProps extends BaseEffectProps {
  direction?: ZoomDirection;
  intensity?: number;
}

// Pan effect props
interface PanEffectProps extends BaseEffectProps {
  direction?: PanDirection;
  intensity?: number;
}

// Ken Burns effect combines zoom and pan
interface KenBurnsEffectProps extends BaseEffectProps {
  zoomDirection?: ZoomDirection;
  panDirection?: PanDirection;
  zoomIntensity?: number;
  panIntensity?: number;
}

// Breathing effect props
interface BreathingEffectProps extends BaseEffectProps {
  intensity?: number;
}

// Color overlay effect props
interface ColorOverlayEffectProps extends BaseEffectProps {
  overlayType?: OverlayType;
  color?: string;
  secondaryColor?: string;
  opacity?: number;
  animateOpacity?: boolean;
}

// Focus blur effect props
interface FocusBlurEffectProps extends BaseEffectProps {
  direction?: BlurDirection;
  maxBlur?: number;
}

// Component implementations for each effect type
const ZoomEffect: React.FC<ZoomEffectProps> = ({
  src,
  direction = ZoomDirection.In,
  intensity = 1.15,
  className = "",
  style = {},
  startTime = 0,
  endTime,
}) => {
  // Implementation would use Remotion's interpolate, useCurrentFrame, etc.
  return (
    <AbsoluteFill className={`zoom-effect ${className}`}>
      <div
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
          ...style,
        }}
      />
    </AbsoluteFill>
  );
};

const PanEffect: React.FC<PanEffectProps> = ({
  src,
  direction = PanDirection.Left,
  intensity = 15,
  className = "",
  style = {},
  startTime = 0,
  endTime,
}) => {
  // Implementation would use Remotion's interpolate, useCurrentFrame, etc.
  return (
    <AbsoluteFill className={`pan-effect ${className}`}>
      <div
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
          ...style,
        }}
      />
    </AbsoluteFill>
  );
};

const KenBurnsEffect: React.FC<KenBurnsEffectProps> = ({
  src,
  zoomDirection = ZoomDirection.In,
  panDirection = PanDirection.Left,
  zoomIntensity = 1.15,
  panIntensity = 15,
  className = "",
  style = {},
  startTime = 0,
  endTime,
}) => {
  // Implementation would use Remotion's interpolate, useCurrentFrame, etc.
  return (
    <AbsoluteFill className={`kenburns-effect ${className}`}>
      <div
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
          ...style,
        }}
      />
    </AbsoluteFill>
  );
};

const BreathingEffect: React.FC<BreathingEffectProps> = ({
  src,
  intensity = 1.05,
  className = "",
  style = {},
  startTime = 0,
  endTime,
}) => {
  // Implementation would use Remotion's interpolate, useCurrentFrame, etc.
  return (
    <AbsoluteFill className={`breathing-effect ${className}`}>
      <div
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
          ...style,
        }}
      />
    </AbsoluteFill>
  );
};

const ColorOverlayEffect: React.FC<ColorOverlayEffectProps> = ({
  src,
  overlayType = OverlayType.Solid,
  color = "rgba(0, 0, 0, 0.3)",
  secondaryColor = "rgba(0, 0, 0, 0)",
  opacity = 0.3,
  animateOpacity = false,
  className = "",
  style = {},
  startTime = 0,
  endTime,
}) => {
  // Implementation would use Remotion's interpolate, useCurrentFrame, etc.
  return (
    <AbsoluteFill className={`color-overlay-effect ${className}`}>
      <div
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
          ...style,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: color,
          opacity: opacity,
        }}
      />
    </AbsoluteFill>
  );
};

const FocusBlurEffect: React.FC<FocusBlurEffectProps> = ({
  src,
  direction = BlurDirection.In,
  maxBlur = 8,
  className = "",
  style = {},
  startTime = 0,
  endTime,
}) => {
  // Implementation would use Remotion's interpolate, useCurrentFrame, etc.
  return (
    <AbsoluteFill className={`focus-blur-effect ${className}`}>
      <div
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
          filter: `blur(${direction === BlurDirection.In ? maxBlur / 2 : 0}px)`,
          ...style,
        }}
      />
    </AbsoluteFill>
  );
};

// Simple effect with no animation
const StaticEffect: React.FC<BaseEffectProps> = ({
  src,
  className = "",
  style = {},
}) => {
  return (
    <AbsoluteFill className={`static-effect ${className}`}>
      <div
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
          ...style,
        }}
      />
    </AbsoluteFill>
  );
};

// Factory function to create the appropriate effect component
export const createImageEffect = (effectType: ImageEffectType, props: any) => {
  switch (effectType) {
    case ImageEffectType.Zoom:
      return <ZoomEffect {...props} />;

    case ImageEffectType.Pan:
      return <PanEffect {...props} />;

    case ImageEffectType.KenBurns:
      return <KenBurnsEffect {...props} />;

    case ImageEffectType.Breathing:
      return <BreathingEffect {...props} />;

    case ImageEffectType.ColorOverlay:
      return <ColorOverlayEffect {...props} />;

    case ImageEffectType.FocusBlur:
      return <FocusBlurEffect {...props} />;

    case ImageEffectType.None:
    default:
      return <StaticEffect {...props} />;
  }
};
