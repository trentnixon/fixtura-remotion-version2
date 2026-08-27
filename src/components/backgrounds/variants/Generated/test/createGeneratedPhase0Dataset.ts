import type { FixturaDataset } from "../../../../../core/types/data";

export const createGeneratedPhase0Dataset = (
  templateVariationOverrides?: Record<string, unknown>,
): FixturaDataset => ({
  data: [],
  asset: {
    assetID: 1,
    assetTypeID: 1,
    assetCategoryID: 1,
    assetsLinkID: "generated-phase0-audit",
  },
  render: {
    renderID: 1,
    schedulerID: 1,
  },
  account: {
    accountId: 1,
  },
  timings: {
    FPS_INTRO: 0,
    FPS_MAIN: 90,
    FPS_OUTRO: 0,
  },
  frames: [0, 90],
  errors: [],
  videoMeta: {
    theme: {
      theme: {
        dark: "#0b1f33",
        white: "#ffffff",
        primary: "#003366",
        secondary: "#ffcc00",
      },
      template: "Basic",
    },
    club: {
      name: "Phase 0 Audit Club",
      logo: { url: "", width: 1, height: 1 },
      sport: "Cricket",
      sponsors: { primary: [], general: [], sponsorNum: 0 },
    },
    video: {
      metadata: {
        title: "Generated Phase 0 Audit",
        titleSplit: ["Generated", "Phase 0"],
        videoTitle: "Generated Phase 0 Audit",
        compositionId: "GeneratedPhase0Audit",
        assetId: 1,
        assetTypeId: 1,
        frames: [0, 90],
        includeSponsors: false,
      },
      appearance: {
        theme: {
          dark: "#0b1f33",
          white: "#ffffff",
          primary: "#003366",
          secondary: "#ffcc00",
        },
        template: "Basic",
        type: "GeneratedPhase0",
        templateOptions: {
          borderRadius: "0",
          background: "Solid",
          palette: "primary",
        },
      },
      media: {},
      contentLayout: {
        divideFixturesBy: {
          CricketLadder: 1,
          CricketRoster: 1,
          CricketResults: 1,
          CricketUpcoming: 1,
          CricketResultSingle: 1,
        },
      },
      templateVariation: {
        useBackground: "Solid",
        palette: "primary",
        mode: "light",
        ...templateVariationOverrides,
      },
      fixtureCategory: "Default",
      groupingCategory: "Cricket",
    },
  },
});
