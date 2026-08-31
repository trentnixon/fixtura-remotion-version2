// src/core/utils/datasetProcessing.ts
import type {
  DevAppearanceMetadata,
  DevBackgroundWire,
} from "../../components/backgrounds/variants/Generated/catalogue/types";
import { FixturaDataset } from "../types/data/index";
import { mergeData } from "./dataProcessing";
import { Video, VideoTemplateVariation } from "../types/data/videoData";
import { calculateOutroDurationFromSponsors } from "./sponsors";

const mergeBackgroundIntoVariation = (
  existing: VideoTemplateVariation,
  background: DevBackgroundWire,
): VideoTemplateVariation => {
  switch (background.useBackground) {
    case "Animated":
      return {
        ...existing,
        useBackground: "Animated",
        animation: background.animation,
      } as VideoTemplateVariation;
    default:
      return {
        ...existing,
        useBackground: background.useBackground,
      } as VideoTemplateVariation;
  }
};

const resolveDevAppearanceType = (
  background: DevBackgroundWire,
  devAppearance?: DevAppearanceMetadata,
): string => {
  if (devAppearance?.kind === "generated") {
    return devAppearance.presetId;
  }

  if (devAppearance?.kind === "passthrough") {
    return devAppearance.label;
  }

  return background.useBackground;
};

/**
 * Processes dataset for a specific template and explicit background wire.
 */
export function processDatasetForTemplate(
  dataset: FixturaDataset,
  templateId: string,
  sportName: string,
  background: DevBackgroundWire,
  devAppearance?: DevAppearanceMetadata,
): FixturaDataset {
  const datasetClone: FixturaDataset = JSON.parse(JSON.stringify(dataset));

  const existingVideo = datasetClone.videoMeta?.video || ({} as Video);
  const existingClub =
    datasetClone.videoMeta?.club || datasetClone.videoMeta?.club || {};
  const existingTheme = existingVideo.appearance?.theme || {};
  const existingTemplateVariation =
    existingVideo.templateVariation || ({} as VideoTemplateVariation);

  return mergeData(datasetClone, {
    videoMeta: {
      theme: {
        theme: existingTheme,
        template: existingVideo.appearance?.template || templateId,
      },
      fixtureCategory: datasetClone.videoMeta?.fixtureCategory || "Default",
      groupingCategory: datasetClone.videoMeta?.groupingCategory || sportName,
      video: {
        ...existingVideo,
        metadata: {
          ...(existingVideo.metadata || {}),
        },
        appearance: {
          ...(existingVideo.appearance || {}),
          type: resolveDevAppearanceType(background, devAppearance),
          template: templateId || existingVideo.appearance?.template,
        },
        templateVariation: mergeBackgroundIntoVariation(
          existingTemplateVariation,
          background,
        ) as VideoTemplateVariation,
        media: existingVideo.media || {},
        contentLayout: {
          divideFixturesBy: existingVideo.contentLayout?.divideFixturesBy || {
            CricketLadder: 1,
            CricketRoster: 1,
            CricketResults: 2,
            CricketUpcoming: 2,
            CricketResultSingle: 1,
          },
        },
      } as Video,
      club: {
        ...existingClub,
      },
    },
  });
}

/**
 * Calculates duration for a dataset based on timing information
 */
export function calculateDuration(dataset: FixturaDataset): number {
  const timings = dataset.timings || {};

  const introFrames = timings.FPS_INTRO || 60;
  const mainFrames = timings.FPS_MAIN || 180;

  const includeSponsors =
    dataset.videoMeta?.video?.metadata?.includeSponsors || false;
  const sponsors = dataset.videoMeta?.club?.sponsors;
  const outroFrames = calculateOutroDurationFromSponsors(
    sponsors,
    includeSponsors,
  );

  return introFrames + mainFrames + outroFrames;
}
