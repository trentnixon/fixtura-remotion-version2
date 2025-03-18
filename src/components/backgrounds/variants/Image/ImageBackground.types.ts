// src/components/backgrounds/ImageBackground/ImageBackground.types.ts

// Base position and size options
export enum BACKGROUND_POSITIONS {
  TOP = "top",
  RIGHT = "right",
  BOTTOM = "bottom",
  LEFT = "left",
  CENTER = "center",
  TOP_LEFT = "top left",
  TOP_RIGHT = "top right",
  BOTTOM_LEFT = "bottom left",
  BOTTOM_RIGHT = "bottom right",
}

export enum BACKGROUND_SIZES {
  COVER = "cover",
  CONTAIN = "contain",
  AUTO = "auto",
}

// Effect type enumeration
export enum ImageEffectType {
  None = "none",
  Zoom = "zoom",
  Pan = "pan",
  KenBurns = "kenburns",
  Breathing = "breathing",
  ColorOverlay = "coloroverlay",
  FocusBlur = "focusblur",
}

// Direction enums for different effects
export enum ZoomDirection {
  In = "in",
  Out = "out",
}

export enum PanDirection {
  Left = "left",
  Right = "right",
  Up = "up",
  Down = "down",
}

export enum BlurDirection {
  In = "in",
  Out = "out",
  Pulse = "pulse",
}

export enum OverlayType {
  Solid = "solid",
  Gradient = "gradient",
  Radial = "radial",
  BottomToTop = "bottomToTop",
  TopToBottom = "topToBottom",
  LeftToRight = "leftToRight",
  RightToLeft = "rightToLeft",
}

export interface PanEffectProps {
  src: string;
  style?: React.CSSProperties;
  className?: string;
}

export interface ImageBackgroundProps {
  className?: string;
  style?: React.CSSProperties;
}
