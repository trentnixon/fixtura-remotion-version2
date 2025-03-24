// src/core/utils/datasetProcessing.ts
import { FixturaDataset } from "../types/data/index";
import { mergeData } from "./dataProcessing";
import { getCompositionIdFromDatasetId } from "./compositionMapping";

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
  const existingVideo = datasetClone.videoMeta?.video || {};
  const existingClub =
    datasetClone.videoMeta?.club || datasetClone.videoMeta?.Club || {};

  // Get the correct composition ID - either use existing one or derive it from the dataset ID
  const compositionId =
    existingVideo.compositionId ||
    getCompositionIdFromDatasetId(dataset.id || "");

  // Create the full composition ID including template and variant - for internal reference only
  const fullCompositionId = `${templateId}-${variant}-${dataset.id || "unknown"}`;
  console.log(`Using dataset ID: ${dataset.id || "unknown"}`);
  console.log(`Full composition ID (reference only): ${fullCompositionId}`);
  console.log(`Actual CompositionID being used: ${compositionId}`);

  // Extract existing theme data
  const existingTheme = existingVideo.theme || {};

  // Extract existing template variation if any
  const existingTemplateVariation = existingVideo.templateVariation || {};

  // Process the dataset with template information, preserving existing data
  return mergeData(datasetClone, {
    videoMeta: {
      theme: {
        theme: existingVideo.theme || {},
        template: existingVideo.template || templateId,
        templateVariation: existingVideo.templateVariation || {
          Background: variant,
        },
      },
      // Support both naming conventions
      fixtureCategory:
        datasetClone.videoMeta?.fixtureCategory ||
        datasetClone.videoMeta?.FixtureCategory ||
        "Default",
      FixtureCategory:
        datasetClone.videoMeta?.fixtureCategory ||
        datasetClone.videoMeta?.FixtureCategory ||
        "Default",
      groupingCategory:
        datasetClone.videoMeta?.groupingCategory ||
        datasetClone.videoMeta?.grouping_category ||
        sportName,
      grouping_category:
        datasetClone.videoMeta?.groupingCategory ||
        datasetClone.videoMeta?.grouping_category ||
        sportName,

      video: {
        // Start with existing properties
        ...existingVideo,
        // Then override specific properties
        Template: templateId,
        templateVariation: {
          ...existingTemplateVariation,
          Background: variant,
          // Add new template variation structure
          Video: existingTemplateVariation.Video || {
            url: "",
            position: "center",
            size: "cover",
            loop: true,
            muted: true,
            overlay: {
              color: "rgba(0,0,0,0.5)",
              opacity: 0.7,
            },
            useOffthreadVideo: true,
          },
          Image: existingTemplateVariation.Image || {
            url: "",
            ratio: "landscape",
            type: "static",
          },
        },
        Theme: {
          ...existingTheme,
          primary: existingTheme.primary || "#000000",
          secondary: existingTheme.secondary || "#ffffff",
          dark: existingTheme.dark || "#333333",
          white: existingTheme.white || "#ffffff",
        },
        Title: existingVideo.Title || `${templateId} - ${variant}`,
        CompositionID: compositionId,
        includeSponsors:
          existingVideo.includeSponsors !== undefined
            ? existingVideo.includeSponsors
            : false,
        media: existingVideo.media || {},
        appearance: existingVideo.appearance || {},
        contentLayout: existingVideo.contentLayout || {},
      },
      // Support both naming conventions
      club: {
        // Start with existing properties
        ...existingClub,
        // Then override specific properties
        Name: existingClub.Name || sportName,
        Sport: existingClub.Sport || sportName,
        Logo: existingClub.Logo || {
          url: "",
          width: 100,
          height: 100,
        },
        Sponsors: existingClub.Sponsors || [],
      },
      Club: {
        // Start with existing properties
        ...existingClub,
        // Then override specific properties
        Name: existingClub.Name || sportName,
        Sport: existingClub.Sport || sportName,
        Logo: existingClub.Logo || {
          url: "",
          width: 100,
          height: 100,
        },
        Sponsors: existingClub.Sponsors || [],
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
  const includeSponsors = dataset.videoMeta?.video?.includeSponsors || false;

  // Calculate total duration
  return introFrames + mainFrames + (includeSponsors ? outroFrames : 30);
}
