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
      family: "Slightly Marker",
    },
    subtitle: {
      family: "Slightly Marker",
    },
    copy: {
      family: "Resolve",
    },
  },

  // ===== COMPONENT STYLES =====
  // Ready-to-use style objects for components
  componentStyles: {
    // Title component styles
    title: {
      className:
        "text-[14em] font-normal tracking-normal leading-snug text-center m-0 px-4 my-8",
    },
    titleSmall: {
      className:
        "text-7xl font-normal tracking-normal leading-none text-center m-0 mt-8 px-4",
    },

    // Subtitle component styles
    subtitle: {
      className:
        "text-7xl font-normal tracking-wider leading-normal text-center m-0  px-4",
    },

    // Body text component styles
    bodyText: {
      className: "text-xl font-normal tracking-normal leading-normal",
    },

    // Player name component styles
    playerName: {
      className: "text-3xl font-black tracking-tight leading-normal",
    },

    // Score component styles
    score: {
      className: "text-6xl font-black tracking-tight leading-normal",
    },

    // Team name component styles
    teamName: {
      className: "text-4xl font-black tracking-tight leading-normal",
    },

    // Label component styles
    label: {
      className: "text-lg font-medium tracking-normal leading-normal",
    },
    // Ladder label component styles
    ladderGradeLabel: {
      className: "text-2xl font-medium tracking-normal leading-normal",
    },
    ladderTeamName: {
      className: "text-3xl font-medium tracking-normal leading-normal",
    },
    ladderTeamPoints: {
      className: "text-3xl font-medium tracking-normal leading-normal",
    },
    Top5PlayerName: {
      className: "text-4xl font-black tracking-normal leading-normal",
    },
    Top5PlayerTeam: {
      className:
        "text-2xl font-semibold opacity-80 tracking-wider leading-tight",
    },
    Top5PlayerScore: {
      className: "text-6xl font-black  tracking-normal leading-tight mr-2",
    },
    Top5PlayerScoreSuffix: {
      className: "text-2xl font-black  tracking-wide leading-loose",
    },
    ResultScore: {
      className: "text-3xl font-bold  tracking-normal leading-tight ",
    },
    ResultScoreFirstInnings: {
      className: "text-3xl font-bold  tracking-normal leading-tight ",
    },
    ResultScoreYetToBat: {
      className: "text-3xl font-bold  tracking-wider py-6",
    },
    ResultTeamName: {
      className: "text-2xl font-semibold  tracking-wider leading-normal",
    },
    ResultPlayerName: {
      className: "text-2xl font-semibold  tracking-normal leading-normal",
    },
    ResultPlayerScore: {
      className: "text-2xl font-semibold  tracking-normal leading-normal",
    },
    ResultSyntax: {
      className:
        "text-2xl font-semibold  tracking-wider leading-normal py-4 ml-4",
    },
    ResultFixtureResult: {
      className:
        "text-4xl font-normal text-center  tracking-wider leading-normal italic",
    },
    ResultMetaData: {
      className: "text-2xl font-semibold  tracking-wider leading-normal",
    },
    ResultVS: {
      className: "text-2xl font-semibold  tracking-wider leading-normal",
    },
    RosterPlayerName: {
      className: "text-3xl font-bold  tracking-wider leading-normal",
    },

    metadataSmall: {
      className: "text-2xl font-normal  tracking-wider leading-normal",
    },
    metadataMedium: {
      className: "text-3xl font-semibold  tracking-wider leading-normal",
    },
    metadataLarge: {
      className: "text-4xl font-semibold  tracking-widest leading-normal",
    },
  },

  // ===== LAYOUT CONFIGURATION =====
  layout: {
    heights: {
      asset: 1100,
      header: 130,
      footer: 120,
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
