import { baseTheme } from "../../base/theme";

/**
 * Basic template theme - simplified approach
 *
 * This theme provides ready-to-use style objects that can be directly applied to components
 */
export const basicTheme = {
  ...baseTheme,

  // ===== FONT CONFIGURATION =====
  fonts: {
    title: {
      family: "Heebo",
    },
    copy: {
      family: "Heebo",
    },
  },

  // ===== COMPONENT STYLES =====
  // Ready-to-use style objects for components
  componentStyles: {
    // Title component styles
    title: {
      className:
        "text-8xl font-black tracking-tight leading-tight text-center m-0 px-4",
    },

    // Subtitle component styles
    subtitle: {
      className:
        "text-5xl font-semibold tracking-normal leading-snug text-center m-0 px-4",
    },

    // Body text component styles
    bodyText: {
      className: "text-xl font-normal tracking-normal leading-relaxed",
    },

    // Player name component styles
    playerName: {
      className: "text-3xl font-black tracking-tight leading-tight",
    },

    // Score component styles
    score: {
      className: "text-6xl font-black tracking-tight leading-tight",
    },

    // Team name component styles
    teamName: {
      className: "text-4xl font-black tracking-tight leading-tight",
    },

    // Label component styles
    label: {
      className: "text-lg font-medium tracking-normal leading-snug",
    },
  },

  // ===== LAYOUT CONFIGURATION =====
  layout: {
    heights: {
      asset: 1350,
      header: 190,
      footer: 110,
    },
    spacing: {
      section: "space-y-8",
      item: "space-y-4",
    },
    padding: {
      container: "p-8",
      section: "py-6",
      item: "py-2",
    },
  },
};
