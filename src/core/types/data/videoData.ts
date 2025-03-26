// types/data/video.ts

import { ThemeData } from "./common";
import { Club } from "./sponsors";

// Division fixtures structure
export interface DividedFixturesBy {
  Ladder: number;
  RosterPoster: number;
  WeekendResults: number;
  UpComingFixtures: number;
  WeekendSingleGameResult: number;
}

// Video structure
export interface Video {
  metadata: VideoMetadata;
  appearance: VideoAppearance;
  media: VideoMedia;
  contentLayout: VideoContentLayout;
  templateVariation: VideoTemplateVariation;
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
    Background: string;
    Palette: string;
  };
}

export interface VideoMedia {
  HeroImage?: {
    url: string;
    ratio: string;
    width: number;
    height: number;
    AgeGroup?: string;
    AssetType?: string;
    markerPosition?: string;
  };
  audio?: {
    url: string;
  };
}

export interface VideoContentLayout {
  dividedFixturesBy: {
    Ladder: number;
    RosterPoster: number;
    WeekendResults: number;
    UpComingFixtures: number;
    WeekendSingleGameResult: number;
  };
}

export interface VideoTemplateVariation {
  Video?: {
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
  Image?: {
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
  Background?: string;
  Palette?: string;
  borderRadius?: string;
  Gradient?: {
    type: string;
    direction: string;
  };
  Noise?: {
    type: string;
  };
  Pattern?: {
    type: string;
    animation: string;
    scale: number;
    rotation: number;
    opacity: number;
    animationDuration: number;
    animationSpeed: number;
  };
  Particle?: {
    type: string;
    particleCount: number;
    speed: number;
    direction: string;
    animation: string;
  };
}

// Video meta structure
export interface VideoMeta {
  Club: Club;
  club?: Club;
  theme: ThemeData;
  video: Video;
  fixtureCategory?: string;
  FixtureCategory?: string;
  groupingCategory?: string;
  grouping_category?: string;
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
