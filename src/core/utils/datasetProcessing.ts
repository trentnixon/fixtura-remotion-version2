// src/core/utils/datasetProcessing.ts
import { FixturaDataset } from "../types/data/index";
import { mergeData } from "./dataProcessing";
//import { getCompositionIdFromDatasetId } from "./compositionMapping";
import { Video, VideoTemplateVariation } from "../types/data/videoData";

/**
 * Processes dataset for a specific template and variant
 *
 * @param dataset - The original dataset containing all video data
 * @param templateId - The template identifier
 * @param variant - The template variant
 * @param sportName - The sport name
 * @returns Processed dataset with merged template information
 */
export function processDatasetForTemplate(
  dataset: FixturaDataset,
  templateId: string,
  variant: string,
  sportName: string,
): FixturaDataset {
  // Clone the dataset to avoid modifying the original
  const datasetClone: FixturaDataset = JSON.parse(JSON.stringify(dataset));

  // Extract existing data from the dataset
  const existingVideo = datasetClone.videoMeta?.video || ({} as Video); // Using any for migration

  const existingClub =
    datasetClone.videoMeta?.club || datasetClone.videoMeta?.club || {};

  // Get the correct composition ID - either use existing one or derive it from the dataset ID
  /*   const compositionId =
    existingVideo.metadata?.compositionId ||
    getCompositionIdFromDatasetId(dataset.id || ""); */

  // Create the full composition ID including template and variant - for internal reference only
  /*  const fullCompositionId = `${templateId}-${variant}-${dataset.id || "unknown"}`;
   */
  // Extract existing theme data
  const existingTheme = existingVideo.appearance?.theme || {};

  // Extract existing template variation if any
  const existingTemplateVariation =
    existingVideo.templateVariation || ({} as VideoTemplateVariation);

  // Process the dataset with template information, preserving existing data
  return mergeData(datasetClone, {
    videoMeta: {
      theme: {
        theme: existingTheme,
        template: existingVideo.appearance?.template || templateId,
      },
      // Support both naming conventions
      fixtureCategory: datasetClone.videoMeta?.fixtureCategory || "Default",
      groupingCategory: datasetClone.videoMeta?.groupingCategory || sportName,

      video: {
        // Start with existing properties
        ...existingVideo,
        // Then override specific properties
        metadata: {
          ...(existingVideo.metadata || {}),
        },
        appearance: {
          ...(existingVideo.appearance || {}),
          type: variant,
          template: templateId || existingVideo.appearance?.template,
        },
        templateVariation: {
          ...existingTemplateVariation,
          useBackground: variant,
        },
        media: existingVideo.media || {},
        contentLayout: {
          divideFixturesBy: existingVideo.contentLayout?.divideFixturesBy || {
            CricketLadder: 1,
            CricketRoster: 1,
            CricketResults: 2,
            CricketUpcoming: 2,
            CricketResultSingle: 1,
          },
          // Add other contentLayout properties here if needed
        },
      } as Video, // Type assertion to allow for migration
      // Support both naming conventions
      club: {
        // Start with existing properties
        ...existingClub,
      },
    },
  });
}

/**
 * Calculates duration for a dataset based on timing information
 *
 * @param dataset - The dataset containing timing information
 * @returns Total duration in frames
 */
export function calculateDuration(dataset: FixturaDataset): number {
  // Extract timing values from dataset with fallbacks
  const timings = dataset.timings || {};

  const introFrames = timings.FPS_INTRO || 60;
  const mainFrames = timings.FPS_MAIN || 180;
  const outroFrames = timings.FPS_OUTRO || 60;

  // Check if sponsors should be included
  const includeSponsors =
    dataset.videoMeta?.video?.metadata?.includeSponsors || false;
  // Calculate total duration
  return introFrames + mainFrames + (includeSponsors ? outroFrames : 30);
}
