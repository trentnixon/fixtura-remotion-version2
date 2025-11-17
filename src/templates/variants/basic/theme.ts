import { baseTheme } from "../../base/theme";
import { TemplateThemeConfig } from "../../types/TemplateThemeConfig";

/**
 * Basic template theme - simplified approach
 *
 * This theme provides ready-to-use style objects that can be directly applied to components
 */
export const basicTheme: TemplateThemeConfig = {
  ...baseTheme,

  // ===== FONT CONFIGURATION =====
  fonts: {
    title: {
      family: "Heebo",
    },
    subtitle: {
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
        "text-9xl font-black tracking-tight leading-none text-center m-0 px-4",
    },

    // Title small component styles
    titleSmall: {
      className:
        "text-6xl font-black tracking-tight leading-none text-center m-0 px-4",
    },

    // Subtitle component styles
    subtitle: {
      className:
        "text-6xl font-black tracking-normal leading-none text-center m-0 px-4",
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
    // Ladder label component styles
    ladderGradeLabel: {
      className: "text-2xl font-medium tracking-normal leading-snug",
    },
    ladderTeamName: {
      className: "text-3xl font-medium tracking-normal leading-snug",
    },
    ladderTeamPoints: {
      className: "text-3xl font-medium tracking-normal leading-snug",
    },
    Top5PlayerName: {
      className: "text-5xl font-black  tracking-wide leading-snug",
    },
    Top5PlayerTeam: {
      className:
        "text-2xl font-semibold opacity-80 tracking-wider leading-tight",
    },
    Top5PlayerScore: {
      className: "text-7xl font-black  tracking-normal leading-tight mr-4",
    },
    Top5PlayerScoreSuffix: {
      className: "text-2xl font-black  tracking-wide leading-none",
    },
    ResultScore: {
      className: "text-7xl font-bold  tracking-normal leading-tight ",
    },
    ResultScoreFirstInnings: {
      className: "text-3xl font-bold  tracking-normal leading-tight ",
    },
    ResultScoreYetToBat: {
      className: "text-3xl font-bold  tracking-wider py-6",
    },
    ResultTeamName: {
      className: "text-2xl font-semibold  tracking-wider leading-snug",
    },
    ResultPlayerName: {
      className: "text-2xl font-semibold  tracking-wider leading-snug",
    },
    ResultPlayerScore: {
      className: "text-2xl font-semibold  tracking-wider leading-snug",
    },
    ResultSyntax: {
      className:
        "text-2xl font-semibold  tracking-wider leading-snug py-4 ml-4",
    },
    ResultFixtureResult: {
      className:
        "text-4xl font-normal text-center  tracking-wider leading-snug italic",
    },
    ResultMetaData: {
      className: "text-xl font-semibold  tracking-wider leading-snug",
    },
    ResultVS: {
      className: "text-2xl font-semibold  tracking-wider leading-snug",
    },
    RosterPlayerName: {
      className: "text-3xl font-bold  tracking-wider leading-snug",
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
  },

  // ===== LAYOUT CONFIGURATION =====
  layout: {
    heights: {
      asset: 1010,
      header: 190,
      footer: 150,
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
    borderRadius: {
      container: "rounded-none",
    },
  },
  mode: {
    light: {
      container: {
        background: "#fff",
        backgroundAlt: "#f0f0f0",
        backgroundTransparent: "rgba(255, 255, 255, 0.5)",
      },
      text: {
        title: "#000",
        copy: "#000",
      },
    },
    lightAlt: {
      container: {
        background: "#fff",
        backgroundAlt: "#f0f0f0",
        backgroundTransparent: "rgba(255, 255, 255, 0.5)",
      },
      text: {
        title: "#fff",
        copy: "#000",
      },
    },
    dark: {
      container: {
        background: "#000",
        backgroundAlt: "#1a1a1a",
        backgroundTransparent: "rgba(0, 0, 0, 0.5)",
      },
      text: {
        title: "#fff",
        copy: "#fff",
      },
    },
    darkAlt: {
      container: {
        background: "#000",
        backgroundAlt: "#1a1a1a",
        backgroundTransparent: "rgba(0, 0, 0, 0.5)",
      },
      text: {
        title: "#000",
        copy: "#fff",
      },
    },
  },
};
