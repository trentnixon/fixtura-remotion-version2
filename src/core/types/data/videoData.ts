// types/data/video.ts

import { Theme, TemplateVariation, ThemeData } from "./common";
import { Club } from "./sponsors";

// Division fixtures structure
export interface DivideFixturesBy {
  Ladder: number;
  RosterPoster: number;
  WeekendResults: number;
  UpComingFixtures: number;
  WeekendSingleGameResult: number;
}

// Video structure
export interface Video {
  Theme: Theme;
  Title: string;
  FRAMES: number[];
  ASSETID: number;
  Template: string;
  HeroImage: null;
  TitleSplit: string[];
  VideoTitle: string;
  ASSETTYPEID: number;
  audio_option: string;
  CompositionID: string;
  includeSponsors: boolean;
  DiviedFixturesBy: DivideFixturesBy;
  TemplateVariation: TemplateVariation;
}

// Video meta structure
export interface VideoMeta {
  Club: Club;
  THEME: ThemeData;
  Video: Video;
  FixtureCategory: string;
  grouping_category: string;
}
