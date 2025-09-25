// types/data/video.ts

import { ThemeData } from "./common";
import { Club } from "./sponsors";

// Division fixtures structure
export interface DivideFixturesBy {
  CricketLadder: number;
  CricketRoster: number;
  CricketResults: number;
  CricketUpcoming: number;
  CricketResultSingle: number;
}

// Video structure
export interface Video {
  metadata: VideoMetadata;
  appearance: VideoAppearance;
  media: VideoMedia;
  contentLayout: VideoContentLayout;
  templateVariation: VideoTemplateVariation;
  fixtureCategory: string;
  groupingCategory: string;
}

// Video theme definition to match structure in data
export interface VideoTheme {
  dark: string;
  white: string;
  primary: string;
  secondary: string;
}

export interface VideoMetadata {
  title: string;
  titleSplit: string[];
  videoTitle: string;
  compositionId: string;
  assetId: number;
  assetTypeId: number;
  frames: number[];
  includeSponsors: boolean;
}

export interface VideoAppearance {
  theme: VideoTheme;
  template: string;
  type: string;
  templateOptions: {
    borderRadius: string;
    background: string;
    palette: string;
  };
}

export interface VideoMedia {
  heroImage?: {
    url: string;
    ratio: string;
    width: number;
    height: number;
    ageGroup?: string;
    assetType?: string;
    markerPosition?: string;
  };
  audio?: {
    url: string;
    audioOption?: string;
  };
}

export interface VideoContentLayout {
  divideFixturesBy: DivideFixturesBy;
}

export interface VideoTemplateVariation {
  useBackground: string;
  mode?: string;
  video?: {
    url: string;
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
    url: string;
    ratio: string;
    width: number;
    height: number;
    type?: string;
    direction?: string;
    overlayStyle?: string;
    gradientType?: string;
    overlayOpacity?: number;
  };
  texture?: {
    name?: string;
    url?: string;
    position?: string;
    size?: string;
    repeat?: "no-repeat" | "repeat" | "repeat-x" | "repeat-y" | "cover";
    scale?: number | string;
    overlay?: {
      color?: string;
      opacity?: number;
      blendMode?: string;
    };
  };
  background?: string;
  palette?: string;
  borderRadius?: string;
  gradient?: {
    type: string;
    direction: string;
  };
  noise?: {
    type: string;
  };
  pattern?: {
    type: string;
    animation: string;
    scale: number;
    rotation: number;
    opacity: number;
    animationDuration: number;
    animationSpeed: number;
  };
  particle?: {
    type: string;
    particleCount: number;
    speed: number;
    direction: string;
    animation: string;
  };
}

// Video meta structure
export interface VideoMeta {
  club: Club;
  theme: ThemeData;
  video: Video;
  fixtureCategory?: string;
  groupingCategory?: string;
  cricketLadder?: CricketLadderData;
  sport?: string;
  competitionType?: string;
}

export interface CricketLadderData {
  teams: CricketTeam[];
  ladderColumns?: string[];
  displayColumns?: string[];
}

export interface CricketTeam {
  teamName: string;
  position: number;
  played: number;
  won: number;
  lost: number;
  drawn?: number;
  points: number;
  netRunRate?: number;
  percentage?: number;
}
