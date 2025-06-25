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

export interface TemplateVariation {
  background?: string | null;
  palette?: string;
  borderRadius?: string;
  gradient?: {
    type: string;
    direction: string;
  };
  noise?: unknown;
  video?: {
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
  image?: {
    url?: string;
    ratio?: string;
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
  theme: Theme;
  template: string;
}

// Account structure
export interface Account {
  accountId: number;
}

// Timings for video rendering
export interface Timings {
  FPS_MAIN?: number;
  FPS_INTRO?: number;
  FPS_OUTRO?: number;
  FPS_LADDER?: number;
  FPS_SCORECARD?: number;
}

// Render info
export interface Render {
  renderID: number;
  schedulerID: number;
}
