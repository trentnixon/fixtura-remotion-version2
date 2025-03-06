/**
 * Base theme for all templates
 *
 * Provides foundational styles and configurations that can be extended by specific templates.
 * Uses a simplified approach with ready-to-use style objects for components.
 */
export const baseTheme = {
  // ===== FONT CONFIGURATION =====
  fonts: {
    title: {
      family: "Heebo",
    },
    copy: {
      family: "Heebo",
    },
    additional: [],
  },

  // ===== COLORS =====
  colors: {
    primary: "#1a365d",
    secondary: "#e53e3e",
    text: {
      dark: "#1a202c",
      light: "#f7fafc",
    },
    background: {
      light: "#f7fafc",
      dark: "#1a202c",
    },
    accent: "#4299e1",
    utility: {
      success: "#48bb78",
      warning: "#ed8936",
      error: "#f56565",
    },
  },

  // ===== COMPONENT STYLES =====
  // Ready-to-use style objects for components
  componentStyles: {
    // Title component styles
    title: {
      className:
        "text-6xl font-bold tracking-tight leading-tight text-center m-0 px-4",
      style: {},
    },

    // Subtitle component styles
    subtitle: {
      className:
        "text-3xl font-semibold tracking-normal leading-snug text-center m-0 px-4",
      style: {},
    },

    // Body text component styles
    bodyText: {
      className: "text-lg font-normal tracking-normal leading-relaxed",
      style: {},
    },

    // Header component styles
    header: {
      className: "w-full flex items-center justify-between p-4",
      style: {},
    },

    // Footer component styles
    footer: {
      className: "w-full flex items-center justify-center p-4",
      style: {},
    },

    // Card component styles
    card: {
      className: "bg-white rounded-lg shadow-md p-4",
      style: {},
    },

    // Button component styles
    button: {
      className: "px-4 py-2 rounded-md font-medium",
      style: {},
    },

    // Label component styles
    label: {
      className: "text-sm font-medium",
      style: {},
    },

    // Input component styles
    input: {
      className: "px-3 py-2 border rounded-md",
      style: {},
    },

    // Sports-specific component styles
    playerName: {
      className: "text-2xl font-bold tracking-tight leading-tight",
      style: {},
    },

    score: {
      className: "text-5xl font-bold tracking-tight leading-tight",
      style: {},
    },

    teamName: {
      className: "text-3xl font-bold tracking-tight leading-tight",
      style: {},
    },

    statValue: {
      className: "text-3xl font-bold",
      style: {},
    },
  },

  // ===== LAYOUT CONFIGURATION =====
  layout: {
    heights: {
      asset: 1080,
      header: 160,
      footer: 100,
    },
    spacing: {
      section: "space-y-6",
      item: "space-y-3",
    },
    padding: {
      container: "p-6",
      section: "py-4",
      item: "py-2",
    },
  },

  // ===== ANIMATION CONFIGURATION =====
  animation: {
    duration: {
      fast: 300,
      normal: 500,
      slow: 800,
    },
    easing: {
      ease: "cubic-bezier(0.25, 0.1, 0.25, 1.0)",
      easeIn: "cubic-bezier(0.42, 0, 1.0, 1.0)",
      easeOut: "cubic-bezier(0, 0, 0.58, 1.0)",
      easeInOut: "cubic-bezier(0.42, 0, 0.58, 1.0)",
    },
  },

  // ===== MEDIA CONFIGURATION =====
  media: {
    aspectRatios: {
      portrait: 4 / 5,
      square: 1,
      landscape: 16 / 9,
    },
    borderRadius: {
      small: "rounded",
      medium: "rounded-md",
      large: "rounded-lg",
      full: "rounded-full",
    },
  },
};
