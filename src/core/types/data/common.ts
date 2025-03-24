// types/data/common.ts

// Common type for images and logos
export interface ImageLogo {
  url: string;
  width: number;
  height: number;
}

// Theme related types
export interface Theme {
  dark: string;
  white: string;
  primary: string;
  secondary: string;
}

export interface templateVariation {
  Background?: string | null;
  Palette?: string;
  borderRadius?: string;
  Gradient?: {
    type: string;
    direction: string;
  };
  Noise?: any;
  Video?: {
    url?: string;
    fallbackUrl?: string;
    position?: string;
    size?: string;
    loop?: boolean;
    muted?: boolean;
    overlay?: {
      color: string;
      opacity: number;
    };
    useOffthreadVideo?: boolean;
    volume?: number;
    playbackRate?: number;
  };
  Image?: {
    url?: string;
    ratio?: "landscape" | "portrait" | "square";
    width?: number;
    height?: number;
    type?: string;
    direction?: string;
    overlayStyle?: string;
    gradientType?: string;
    overlayOpacity?: number;
  };
}

export interface ThemeData {
  Theme: Theme;
  Template: string;
  templateVariation: templateVariation;
}

// Account structure
export interface Account {
  accountId: number;
}

// timings for video rendering
export interface timings {
  FPS_MAIN: number;
  FPS_INTRO: number;
  FPS_OUTRO: number;
  FPS_SCORECARD: number;
}

// Render info
export interface Render {
  RenderID: number;
  SchedulerID: number;
}
