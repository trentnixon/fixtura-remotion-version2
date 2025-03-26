// src/core/utils/datasetProcessing.ts
// @ts-nocheck - Ignoring TypeScript errors in this file as it's a migration utility
import { FixturaDataset } from "../types/data/index";
import { mergeData } from "./dataProcessing";
import { getCompositionIdFromDatasetId } from "./compositionMapping";
import { Video } from "../types/data/videoData";

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
  console.log("[Processing dataset]", dataset);

  // Clone the dataset to avoid modifying the original
  const datasetClone: FixturaDataset = JSON.parse(JSON.stringify(dataset));

  // Extract existing data from the dataset
  const existingVideo = datasetClone.videoMeta?.video || ({} as any); // Using any for migration

  const existingClub =
    datasetClone.videoMeta?.club || datasetClone.videoMeta?.Club || {};

  // Get the correct composition ID - either use existing one or derive it from the dataset ID
  const compositionId =
    existingVideo.metadata?.compositionId ||
    getCompositionIdFromDatasetId(dataset.id || "");

  // Create the full composition ID including template and variant - for internal reference only
  const fullCompositionId = `${templateId}-${variant}-${dataset.id || "unknown"}`;

  // Extract existing theme data
  const existingTheme = existingVideo.appearance?.theme || {};

  // Extract existing template variation if any
  const existingTemplateVariation =
    existingVideo.templateVariation || ({} as any);

  // Process the dataset with template information, preserving existing data
  return mergeData(datasetClone, {
    videoMeta: {
      theme: {
        theme: existingTheme,
        template: existingVideo.appearance?.template || templateId,
        templateVariation:
          existingVideo.templateVariation ||
          ({
            Background: variant,
          } as any), // Use type assertion for migration
      },
      // Support both naming conventions
      fixtureCategory: datasetClone.videoMeta?.fixtureCategory || "Default",
      FixtureCategory: datasetClone.videoMeta?.fixtureCategory || "Default",
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
        },
        templateVariation: {
          ...existingTemplateVariation,
        },
        media: existingVideo.media || {},
        contentLayout: existingVideo.contentLayout || {
          dividedFixturesBy: existingVideo.DiviedFixturesBy || {
            Ladder: 1,
            RosterPoster: 1,
            WeekendResults: 2,
            UpComingFixtures: 2,
            WeekendSingleGameResult: 1,
          },
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
