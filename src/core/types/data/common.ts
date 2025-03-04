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
  Background: string;
}

export interface ThemeData {
  Theme: Theme;
  Template: string;
  TemplateVariation: TemplateVariation;
}

// Account structure
export interface Account {
  accountId: number;
}

// Timings for video rendering
export interface Timings {
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
