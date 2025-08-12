import { DivideFixturesBy } from "../../core/types/data";

// Root response interface
export interface ApiResponse {
  data: Game[];
  asset: Asset;
  render: Render;
  account: Account;
  timings: Timings;
  videoMeta: VideoMeta;
  video: Video;
  theme: Theme;
  fixtureCategory: string;
  FixtureCategory: string;
  groupingCategory: string;
  errors: ErrorObject[];
}

// -------------------------
// Core “data” section types
// -------------------------

export interface Game {
  gameID: string;
  status: string;
  homeTeam: Team;
  awayTeam: Team;
  teamHomeLogo: Logo;
  teamAwayLogo: Logo;
  date: string;
  type: string;
  ground: string;
  round: string;
  gender: string;
  ageGroup: string;
  gradeName: string;
  assignSponsors: AssignSponsors;
  result: string;
  prompt: string;
}

export interface Team {
  name: string;
  isHome: boolean;
  logo: Logo;
  score: string;
  overs: string;
  // Either "homeScoresFirstInnings" or "awayScoresFirstInnings" will appear
  homeScoresFirstInnings?: string;
  awayScoresFirstInnings?: string;
  battingPerformances: BattingPerformance[];
  bowlingPerformances: BowlingPerformance[];
  isClubTeam: boolean;
}

export interface Logo {
  url: string;
  width: number;
  height: number;
}

export interface BattingPerformance {
  player: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  SR: number;
  team: string;
  notOut: boolean;
}

export interface BowlingPerformance {
  player: string;
  overs: number;
  maidens: number;
  runs: number;
  wickets: number;
  economy: string;
  team: string;
}

export interface AssignSponsors {
  competition: Sponsor[];
  grade: Sponsor[];
  team: Sponsor[];
}

export interface Sponsor {
  id: number;
  isPrimary: boolean;
  isActive: boolean;
  isArticle: boolean;
  isVideo: boolean;
  url: string;
  tagline: string;
  description: string | null;
  name: string;
  logo: SponsorLogo;
}

export interface SponsorLogo {
  id: number;
  url: string;
}

// -------------------------
// Asset, Render, Account
// -------------------------

export interface Asset {
  assetID: number;
  assetTypeID: number;
  assetCategoryID: number;
  assetsLinkID: string;
}

export interface Render {
  schedulerID: number;
  renderID: number;
}

export interface Account {
  accountId: number;
}

// -------------------------
// Timings
// -------------------------

export interface Timings {
  FPS_MAIN: number;
  FPS_INTRO: number;
  FPS_OUTRO: number;
  FPS_LADDER: number;
}

// -------------------------
// VideoMeta section
// -------------------------

export interface VideoMeta {
  club: Club;
}

export interface Club {
  Logo: Logo;
  Name: string;
  Sport: string;
  Sponsors: SponsorsGroup;
}

export interface SponsorsGroup {
  primary: Record<string, Sponsor>;
  default: Record<string, Record<string, Sponsor>>;
}

// -------------------------
// Video section
// -------------------------

export interface Video {
  fixtureCategory: string;
  groupingCategory: string;
  metadata: VideoMetadata;
  appearance: Appearance;
  media: Media;
  contentLayout: ContentLayout;
  templateVariation: TemplateVariation;
}

export interface VideoMetadata {
  title: string;
  titleSplit: Record<string, string>;
  videoTitle: string;
  compositionId: string;
  assetId: number;
  assetTypeId: number;
  frames: Record<string, unknown>;
  includeSponsors: boolean;
}

export interface Appearance {
  theme: ThemeColors;
  template: string;
  type: string;
}

export interface Media {
  HeroImage: HeroImage;
  audio: Audio;
}

export interface HeroImage {
  url: string;
  ratio: string;
  width: number;
  height: number;
  AgeGroup: string;
  AssetType: string;
  markerPosition: string;
}

export interface Audio {
  url: string;
  audio_option: string;
}

export interface ContentLayout {
  divideFixturesBy: DivideFixturesBy;
}

// -------------------------
// Theme section (reused)
// -------------------------

export interface Theme {
  theme: ThemeColors;
  template: string;
  templateVariation: TemplateVariation;
}

export interface ThemeColors {
  dark: string;
  white: string;
  primary: string;
  secondary: string;
}

export interface TemplateVariation {
  useBackground: string;
  // For “video” under variation
  Video: VideoTemplate | null;
  // For “Image” under variation
  Image: ImageTemplate;
  Palette: string;
  Gradient: Gradient;
  Noise: Noise;
  Pattern: Pattern;
  Particle: Particle;
}

export interface VideoTemplate {
  url: string | null;
  fallbackUrl: string | null;
  position: string;
  size: string;
  loop: boolean;
  muted: boolean;
  overlay: Overlay;
  volume: number;
}

export interface Overlay {
  color: string;
  opacity: number;
}

export interface ImageTemplate {
  url: string | null;
  ratio: string | null;
  width: number | null;
  height: number | null;
  type: string;
  direction: string;
  overlayStyle: string;
  gradientType: string;
  overlayOpacity: number;
}

export interface Gradient {
  type: string;
  direction: string;
}

export interface Noise {
  type: string;
  variant?: "geometric" | "organic" | "abstract" | "tech" | "flowing";
  density?: "low" | "medium" | "high";
  animationSpeed?: number;
  opacity?: number;
}

export interface Pattern {
  type: string;
  animation: string;
  scale: number;
  rotation: number;
  opacity: number;
  animationDuration: number;
  animationSpeed: number;
}

export interface Particle {
  type: string;
  particleCount: string;
  speed: number;
  direction: string;
  animation: string;
}
export interface ErrorObject {
  message: string;
  code?: string | number;
  // Add more fields as needed
}
