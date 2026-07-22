import { baseTheme } from "../../base/theme";
import { TemplateThemeConfig } from "../../types/TemplateThemeConfig";
import {
  BRICKWORK_COPY_FONT_WEIGHTS,
  BRICKWORK_FONT_COPY,
  BRICKWORK_FONT_DISPLAY,
} from "./design/typography";

/**
 * Brickwork template theme - simplified approach
 *
 * Colour roles (pulse 06): 60/30/10 neutral / primary / secondary.
 * Diagonal accents (pulse 09): 10° token via `design/diagonalAccents.ts` — edge slashes only.
 * Atmosphere texture (pulse 10): `design/textureVocabulary.ts` — default grain @ 4%, disable via variant `none`.
 * Typography (pulse 13): `design/typography.ts` — Allerta Stencil (display) vs Roboto (copy).
 * Row spacing: `design/spacing.ts` — `BRICKWORK_ROW_GAP_CLASS` (`gap-1`) on all vertical stacks.
 *   display → titles, large scores, short labels; copy → names, metadata, stats columns (tabular nums).
 * Resolve colours at runtime via `design/colours.getBrickworkColourRoles()` — do not
 * hardcode composition colours; use named roles (neutral.surface, primary.rule, status.ladderTop, etc.).
 */
export const brickworkTheme: TemplateThemeConfig = {
  ...baseTheme,

  // ===== FONT CONFIGURATION =====
  fonts: {
    title: {
      family: BRICKWORK_FONT_DISPLAY,
    },
    subtitle: {
      family: BRICKWORK_FONT_COPY,
    },
    copy: {
      family: BRICKWORK_FONT_COPY,
    },
    additional: [...BRICKWORK_COPY_FONT_WEIGHTS],
  } as TemplateThemeConfig["fonts"],

  fontClasses: {
    heading: { family: BRICKWORK_FONT_DISPLAY },
    subheading: { family: BRICKWORK_FONT_COPY },
    body: { family: BRICKWORK_FONT_COPY },
    display: { family: BRICKWORK_FONT_DISPLAY },
    stat: { family: BRICKWORK_FONT_DISPLAY },
    copy: { family: BRICKWORK_FONT_COPY },
    compositionName: { family: BRICKWORK_FONT_DISPLAY },
  } as TemplateThemeConfig["fontClasses"],

  // ===== COMPONENT STYLES =====
  // Ready-to-use style objects for components
  componentStyles: {
    // Title component styles
    title: {
      className:
        "text-9xl font-normal tracking-normal leading-[0.95em] text-center m-0 px-4 uppercase",
    },

    // Subtitle component styles — club / metadata copy
    subtitle: {
      className:
        "text-5xl font-normal tracking-normal leading-[0.98em] text-center m-0 px-4",
    },

    compositionName: {
      className:
        "text-7xl font-normal capitalize tracking-wider leading-[0.98em] uppercase",
    },
    compositionNameSmall: {
      className:
        "text-4xl font-medium capitalize tracking-wider leading-[0.98em]",
    },
    // Body text component styles
    bodyText: {
      className: "text-xl font-normal tracking-normal leading-relaxed",
    },

    // Player name component styles
    playerName: {
      className: "text-3xl font-medium tracking-tight leading-tight",
    },

    // Score component styles
    score: {
      className:
        "text-6xl font-normal tracking-tight leading-tight tabular-nums",
    },

    // Team name component styles
    teamName: {
      className: "text-4xl font-medium tracking-tight leading-tight",
    },

    // Label component styles
    label: {
      className:
        "text-lg font-normal tracking-normal leading-snug uppercase tabular-nums",
    },
    // Ladder label component styles
    ladderGradeLabel: {
      className:
        "text-2xl font-normal tracking-normal leading-snug uppercase tabular-nums",
    },
    ladderTeamName: {
      className: "text-3xl font-normal tracking-normal leading-snug",
    },
    ladderTeamPoints: {
      className:
        "text-3xl font-normal tracking-normal leading-snug tabular-nums",
    },
    Top5PlayerName: {
      className: "text-4xl font-bold tracking-wide leading-snug uppercase",
    },
    Top5PlayerTeam: {
      className: "text-2xl font-normal tracking-wider leading-tight",
    },
    Top5PlayerScore: {
      className:
        "text-6xl font-normal tracking-normal leading-snug mr-1 tabular-nums",
    },
    Top5PlayerScoreSuffix: {
      className: "text-2xl font-normal tracking-wide leading-none",
    },
    ResultScore: {
      className:
        "text-6xl font-normal tracking-normal leading-tight tabular-nums",
    },
    ResultScoreFirstInnings: {
      className:
        "text-3xl font-normal tracking-normal leading-tight tabular-nums",
    },
    ResultVS: {
      className: "text-3xl font-normal tracking-normal leading-tight ",
    },
    ResultScoreYetToBat: {
      className: "text-3xl font-medium tracking-wider py-6",
    },
    ResultTeamName: {
      className: "text-2xl font-normal tracking-wider leading-snug",
    },
    ResultPlayerName: {
      className: "text-3xl font-normal tracking-normal leading-snug",
    },
    ResultPlayerScore: {
      className:
        "text-2xl font-medium tracking-normal leading-snug tabular-nums",
    },
    ResultSyntax: {
      className:
        "text-2xl font-medium tracking-wider leading-snug py-4 ml-4",
    },
    ResultFixtureResult: {
      className:
        "text-4xl font-normal text-center tracking-wider leading-snug italic",
    },
    ResultMetaData: {
      className: "text-2xl font-normal tracking-wider leading-snug",
    },
    ResultStatementShort: {
      className:
        "text-3xl font-medium tracking-wider leading-snug py-2 px-16",
    },
    ResultStatementText: {
      className: "text-3xl font-medium tracking-wider leading-snug ",
    },
    RosterPlayerName: {
      className: "text-3xl font-normal tracking-wider leading-snug",
    },
    metadataSmall: {
      className: "text-2xl font-normal tracking-wider leading-snug",
    },
    metadataMedium: {
      className: "text-2xl font-medium tracking-wider leading-snug",
    },
    metadataLarge: {
      className: "text-2xl font-medium tracking-widest leading-snug",
    },
    titleSmall: {
      className: "text-2xl font-medium tracking-normal leading-snug",
    },
    TeamOfTheWeekPlayerName: {
      className: "text-3xl font-bold tracking-wide leading-snug uppercase",
    },
    TeamOfTheWeekTeam: {
      className: "text-2xl font-normal tracking-wider leading-tight",
    },
    TeamOfTheWeekType: {
      className: "text-md font-normal uppercase tracking-wider leading-none",
    },
    TeamOfTheWeekStat: {
      className:
        "text-5xl font-normal tracking-tight leading-tight tabular-nums",
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
