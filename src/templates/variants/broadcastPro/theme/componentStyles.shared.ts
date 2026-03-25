import type { ThemeComponentStyles } from "../../../types/TemplateThemeConfig";

/**
 * Cross-cutting typography and metadata classes (not tied to a single cricket composition).
 */
export const broadcastProComponentStylesShared = {
  title: {
    className:
      "text-9xl font-black tracking-tight leading-none text-center m-0 px-4",
  },

  titleSmall: {
    className:
      "text-6xl font-black tracking-tight leading-none text-center m-0 px-4",
  },

  subtitle: {
    className:
      "text-6xl font-black tracking-normal leading-none text-center m-0 px-4",
  },

  bodyText: {
    className: "text-xl font-normal tracking-normal leading-relaxed",
  },

  playerName: {
    className: "text-3xl font-black tracking-tight leading-tight",
  },

  score: {
    className: "text-6xl font-black tracking-tight leading-tight",
  },

  teamName: {
    className: "text-4xl font-black tracking-tight leading-tight",
  },

  label: {
    className: "text-lg font-medium tracking-normal leading-snug",
  },

  metadataSmall: {
    className: "text-2xl font-normal  tracking-wider leading-snug",
  },
  metadataMedium: {
    className: "text-2xl font-semibold  tracking-wider leading-snug",
  },
  metadataLarge: {
    className: "text-2xl font-semibold  tracking-widest leading-snug",
  },
} satisfies Pick<
  ThemeComponentStyles,
  | "title"
  | "titleSmall"
  | "subtitle"
  | "bodyText"
  | "playerName"
  | "score"
  | "teamName"
  | "label"
  | "metadataSmall"
  | "metadataMedium"
  | "metadataLarge"
>;
