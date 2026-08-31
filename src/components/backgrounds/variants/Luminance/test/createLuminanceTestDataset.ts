import type { FixturaDataset } from "../../../../../core/types/data";

export const createLuminanceTestDataset = (
  templateVariationOverrides?: Record<string, unknown>,
): FixturaDataset => ({
  data: [],
  asset: {
    assetID: 1,
    assetTypeID: 1,
    assetCategoryID: 1,
    assetsLinkID: "luminance-test",
  },
  render: {
    renderID: 1,
    schedulerID: 1,
  },
  account: {
    accountId: 1,
  },
  timings: {
    FPS_INTRO: 30,
    FPS_MAIN: 300,
    FPS_OUTRO: 0,
  },
  frames: [0, 330],
  errors: [],
  videoMeta: {
    theme: {
      theme: {
        dark: "#000000",
        white: "#ffffff",
        primary: "#003366",
        secondary: "#ffcc00",
      },
      template: "Basic",
    },
    club: {
      name: "Test Club",
      logo: { url: "", width: 1, height: 1 },
      sport: "Cricket",
      sponsors: { primary: [], general: [], sponsorNum: 0 },
    },
    video: {
      metadata: {
        title: "Luminance Test",
        titleSplit: ["Luminance", "Test"],
        videoTitle: "Luminance Test",
        compositionId: "LuminanceTest",
        assetId: 1,
        assetTypeId: 1,
        frames: [0, 300],
        includeSponsors: false,
      },
      appearance: {
        theme: {
          dark: "#000000",
          white: "#ffffff",
          primary: "#003366",
          secondary: "#ffcc00",
        },
        template: "Basic",
        type: "Luminance",
        templateOptions: {
          borderRadius: "0",
          background: "Luminance",
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
        useBackground: "Luminance",
        palette: "primary",
        ...templateVariationOverrides,
      },
      fixtureCategory: "Default",
      groupingCategory: "Cricket",
    },
  },
});
