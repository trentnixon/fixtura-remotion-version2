import { baseTheme } from "../../base/theme";
import { TemplateThemeConfig } from "../../types/TemplateThemeConfig";

export const cnswTheme: TemplateThemeConfig = {
  ...baseTheme,
  fonts: {
    title: {
      family: "Impact",
    },
    subtitle: {
      family: "Heebo",
    },
    copy: {
      family: "Heebo",
    },
  },
  componentStyles: {
    title: {
      className:
        "text-[12em] font-normal tracking-wider leading-none text-center m-0 px-0",
    },
    subtitle: {
      className:
        "text-4xl font-light  leading-normal text-center m-0 px-4 text-white",
    },
    bodyText: {
      className: "text-2xl font-normal tracking-normal leading-normal",
    },
    playerName: {
      className: "text-3xl font-black tracking-tight leading-normal",
    },
    score: {
      className: "text-6xl font-black tracking-tight leading-normal",
    },
    teamName: {
      className: "text-4xl font-black tracking-tight leading-normal",
    },
    label: {
      className: "text-xl font-medium tracking-wide leading-normal",
    },
    ladderGradeLabel: {
      className: "text-2xl font-medium tracking-normal leading-normal",
    },
    ladderTeamName: {
      className: "text-2xl font-bold tracking-normal leading-normal",
    },
    ladderTeamPoints: {
      className: "text-2xl font-bold tracking-normal leading-normal",
    },
    Top5PlayerName: {
      className: "text-4xl font-black tracking-normal leading-normal",
    },
    Top5PlayerTeam: {
      className:
        "text-2xl font-semibold opacity-80 tracking-wider leading-tight",
    },
    Top5PlayerScore: {
      className: "text-4xl font-bold  tracking-normal leading-tight mr-2",
    },
    Top5PlayerScoreSuffix: {
      className: "text-2xl font-normal  tracking-wide leading-loose",
    },
    ResultScore: {
      className: "text-6xl font-bold  tracking-normal leading-tight ",
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
        "text-4xl font-normal text-center tracking-wider leading-normal italic",
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
      className: "text-6xl font-bold  tracking-widest leading-normal",
    },
    titleSmall: {
      className: "text-4xl font-semibold tracking-normal leading-normal",
    },
  },
  layout: {
    heights: {
      asset: 910,
      header: 300,
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
        background: "#ffffff",
        backgroundAlt: "#f2f6ff",
        backgroundTransparent: "rgba(255, 255, 255, 0.65)",
      },
      text: {
        title: "#002C6E",
        copy: "#0A1A2F",
      },
    },
    lightAlt: {
      container: {
        background: "#ffffff",
        backgroundAlt: "#e9f1ff",
        backgroundTransparent: "rgba(255, 255, 255, 0.5)",
      },
      text: {
        title: "#001a45",
        copy: "#0A1A2F",
      },
    },
    dark: {
      container: {
        background: "#0A1A2F",
        backgroundAlt: "#031022",
        backgroundTransparent: "rgba(10, 26, 47, 0.65)",
      },
      text: {
        title: "#E6F0FF",
        copy: "#E6F0FF",
      },
    },
    darkAlt: {
      container: {
        background: "#0A1A2F",
        backgroundAlt: "#0c1c33",
        backgroundTransparent: "rgba(10, 26, 47, 0.5)",
      },
      text: {
        title: "#cfe3ff",
        copy: "#e6f0ff",
      },
    },
  },
};
