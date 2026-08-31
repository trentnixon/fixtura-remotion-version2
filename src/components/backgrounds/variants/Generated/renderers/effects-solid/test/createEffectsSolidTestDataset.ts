import type { FixturaDataset } from "../../../../../../../core/types/data";
import type { AnimatedPresetType } from "../../../catalogue/types";

export type EffectsSolidTestDatasetOptions = {
  presetId?: AnimatedPresetType;
  primary?: string;
  secondary?: string;
  compositionId?: string;
};

export const createEffectsSolidTestDataset = ({
  presetId = "light-leak",
  primary = "#FF0000",
  secondary = "#004DE2",
  compositionId = "EffectsSolidTest",
}: EffectsSolidTestDatasetOptions = {}): FixturaDataset => ({
  data: [],
  asset: {
    assetID: 1,
    assetTypeID: 1,
    assetCategoryID: 1,
    assetsLinkID: "effects-solid-test",
  },
  render: {
    renderID: 1,
    schedulerID: 1,
  },
  account: {
    accountId: 1,
  },
  timings: {
    FPS_INTRO: 60,
    FPS_MAIN: 180,
    FPS_OUTRO: 0,
  },
  frames: [0, 240],
  errors: [],
  videoMeta: {
    theme: {
      theme: {
        dark: "#111",
        white: "#FFF",
        primary,
        secondary,
      },
      template: "Basic",
    },
    club: {
      name: "Effects Solid Test Club",
      logo: { url: "", width: 1, height: 1 },
      sport: "Cricket",
      sponsors: { primary: [], general: [], sponsorNum: 0 },
    },
    video: {
      metadata: {
        title: "Effects Solid Test",
        titleSplit: ["Effects", "Solid", "Test"],
        videoTitle: "Effects Solid Test",
        compositionId,
        assetId: 1,
        assetTypeId: 1,
        frames: [0, 240],
        includeSponsors: false,
      },
      appearance: {
        theme: {
          dark: "#111",
          white: "#FFF",
          primary,
          secondary,
        },
        template: "Basic",
        type: presetId,
        templateOptions: {
          borderRadius: "0",
          background: "Animated",
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
        useBackground: "Animated",
        animation: { type: presetId },
      },
      fixtureCategory: "Default",
      groupingCategory: "Cricket",
    },
  },
});
