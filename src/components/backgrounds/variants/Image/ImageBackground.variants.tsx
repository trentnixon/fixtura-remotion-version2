// ImageBackground.variants.tsx
import React from "react";
import { AbsoluteFill, Img } from "remotion";
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

type ImageEffectProps =
  | ZoomEffectProps
  | PanEffectProps
  | KenBurnsEffectProps
  | BreathingEffectProps
  | ColorOverlayEffectProps
  | FocusBlurEffectProps
  | BaseEffectProps;

const coverImageStyle = (
  style: React.CSSProperties = {},
): React.CSSProperties => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  ...style,
});

// Component implementations for each effect type
const ZoomEffect: React.FC<ZoomEffectProps> = ({
  src = "",
  className = "",
  style = {},
}) => {
  return (
    <AbsoluteFill className={`zoom-effect ${className}`}>
      <Img src={src} style={coverImageStyle(style)} />
    </AbsoluteFill>
  );
};

const PanEffect: React.FC<PanEffectProps> = ({
  src = "",
  className = "",
  style = {},
}) => {
  return (
    <AbsoluteFill className={`pan-effect ${className}`}>
      <Img src={src} style={coverImageStyle(style)} />
    </AbsoluteFill>
  );
};

const KenBurnsEffect: React.FC<KenBurnsEffectProps> = ({
  src = "",
  className = "",
  style = {},
}) => {
  return (
    <AbsoluteFill className={`kenburns-effect ${className}`}>
      <Img src={src} style={coverImageStyle(style)} />
    </AbsoluteFill>
  );
};

const BreathingEffect: React.FC<BreathingEffectProps> = ({
  src = "",
  className = "",
  style = {},
}) => {
  return (
    <AbsoluteFill className={`breathing-effect ${className}`}>
      <Img src={src} style={coverImageStyle(style)} />
    </AbsoluteFill>
  );
};

const ColorOverlayEffect: React.FC<ColorOverlayEffectProps> = ({
  src = "",
  color = "rgba(0, 0, 0, 0.3)",
  opacity = 0.3,
  className = "",
  style = {},
}) => {
  return (
    <AbsoluteFill className={`color-overlay-effect ${className}`}>
      <Img src={src} style={coverImageStyle(style)} />
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
  src = "",
  direction = BlurDirection.In,
  maxBlur = 8,
  className = "",
  style = {},
}) => {
  return (
    <AbsoluteFill className={`focus-blur-effect ${className}`}>
      <Img
        src={src}
        style={coverImageStyle({
          filter: `blur(${direction === BlurDirection.In ? maxBlur / 2 : 0}px)`,
          ...style,
        })}
      />
    </AbsoluteFill>
  );
};

// Simple effect with no animation
const StaticEffect: React.FC<BaseEffectProps> = ({
  src = "",
  className = "",
  style = {},
}) => {
  return (
    <AbsoluteFill className={`static-effect ${className}`}>
      <Img src={src} style={coverImageStyle(style)} />
    </AbsoluteFill>
  );
};

// effectType and props are separate args; assert the matching props shape per
// branch (Zoom/Pan/FocusBlur share `direction` with incompatible unions).
export const createImageEffect = (
  effectType: ImageEffectType,
  props: ImageEffectProps,
) => {
  switch (effectType) {
    case ImageEffectType.Zoom:
      return <ZoomEffect {...(props as ZoomEffectProps)} />;

    case ImageEffectType.Pan:
      return <PanEffect {...(props as PanEffectProps)} />;

    case ImageEffectType.KenBurns:
      return <KenBurnsEffect {...(props as KenBurnsEffectProps)} />;

    case ImageEffectType.Breathing:
      return <BreathingEffect {...(props as BreathingEffectProps)} />;

    case ImageEffectType.ColorOverlay:
      return <ColorOverlayEffect {...(props as ColorOverlayEffectProps)} />;

    case ImageEffectType.FocusBlur:
      return <FocusBlurEffect {...(props as FocusBlurEffectProps)} />;

    case ImageEffectType.None:
    default:
      return <StaticEffect {...(props as BaseEffectProps)} />;
  }
};
