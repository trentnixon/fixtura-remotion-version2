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
      family: "Impact",
    },
    subtitle: {
      family: "Impact",
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
        "text-9xl font-normal tracking-normal leading-snug text-center m-0 px-4",
    },
    titleSmall: {
      className:
        "text-7xl font-normal tracking-normal leading-none text-center m-0 mt-8 px-4",
    },
    // Subtitle component styles
    subtitle: {
      className:
        "text-9xl font-normal tracking-normal leading-none text-center m-0  px-4",
    },

    // Body text component styles
    bodyText: {
      className: "text-xl font-normal tracking-tight leading-tight",
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
      className: "text-lg font-medium tracking-tight leading-tight",
    },
    // Ladder label component styles
    ladderGradeLabel: {
      className: "text-3xl font-medium tracking-tight leading-tight",
    },
    ladderTeamName: {
      className: "text-3xl font-medium tracking-tight leading-tight",
    },
    ladderTeamPoints: {
      className: "text-3xl font-normal tracking-tight leading-tight",
    },
    Top5PlayerName: {
      className: "text-4xl font-black tracking-tight leading-tight",
    },
    Top5PlayerTeam: {
      className: "text-2xl font-normal tracking-tight leading-tight",
    },
    Top5PlayerScore: {
      className: "text-6xl font-black  tracking-tight leading-tight mr-2",
    },
    Top5PlayerScoreSuffix: {
      className: "text-3xl font-black  tracking-tight leading-loose",
    },
    ResultScore: {
      className: "text-4xl font-black  tracking-tight leading-tight ",
    },
    ResultScoreFirstInnings: {
      className: "text-4xl font-black  tracking-tight leading-tight ",
    },
    ResultScoreYetToBat: {
      className: "text-4xl font-bold  tracking-tight py-6",
    },
    ResultTeamName: {
      className: "text-3xl font-normal  tracking-tight leading-tight",
    },
    ResultPlayerName: {
      className: "text-[1.6rem] font-normal  tracking-tight leading-tight",
    },
    ResultPlayerScore: {
      className: "text-[1.6rem] font-bold  tracking-tight leading-tight",
    },
    ResultSyntax: {
      className:
        "text-[1.4rem] font-semibold  tracking-tight leading-tight py-4 ml-4",
    },
    ResultFixtureResult: {
      className: "text-4xl font-normal  tracking-tight leading-tight italic",
    },
    ResultMetaData: {
      className: "text-2xl font-normal  tracking-tight leading-tight",
    },
    ResultVS: {
      className: "text-3xl font-normal  tracking-tight leading-tight",
    },
    RosterPlayerName: {
      className: "text-3xl font-bold  tracking-tight py-2 leading-tight",
    },

    metadataSmall: {
      className: "text-2xl font-normal  tracking-tight leading-tight",
    },
    metadataMedium: {
      className: "text-3xl font-semibold  tracking-tight leading-tight",
    },
    metadataLarge: {
      className: "text-4xl font-semibold  tracking-tight leading-tight",
    },
  },

  // ===== LAYOUT CONFIGURATION =====
  layout: {
    heights: {
      asset: 1230,
      header: 230,
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
      container: "rounded-none ",
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
