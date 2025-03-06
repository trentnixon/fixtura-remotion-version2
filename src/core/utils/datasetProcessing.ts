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
  const existingVideo = datasetClone.VIDEOMETA?.Video || {};
  const existingClub = datasetClone.VIDEOMETA?.Club || {};

  // Get the correct composition ID - either use existing one or derive it from the dataset ID
  const compositionId =
    existingVideo.CompositionID ||
    getCompositionIdFromDatasetId(dataset.id || "");

  // Create the full composition ID including template and variant - for internal reference only
  const fullCompositionId = `${templateId}-${variant}-${dataset.id || "unknown"}`;
  console.log(`Using dataset ID: ${dataset.id || "unknown"}`);
  console.log(`Full composition ID (reference only): ${fullCompositionId}`);
  console.log(`Actual CompositionID being used: ${compositionId}`);

  // Extract existing theme data
  const existingTheme = existingVideo.Theme || {};

  // Extract existing template variation if any
  const existingTemplateVariation = existingVideo.TemplateVariation || {};

  // Process the dataset with template information, preserving existing data
  return mergeData(datasetClone, {
    VIDEOMETA: {
      THEME: {
        Theme: existingVideo.Theme || {},
        Template: existingVideo.Template || templateId,
        TemplateVariation: existingVideo.TemplateVariation || {
          Background: variant,
        },
      },
      FixtureCategory: datasetClone.VIDEOMETA?.FixtureCategory || "Default",
      grouping_category: datasetClone.VIDEOMETA?.grouping_category || sportName,

      Video: {
        // Start with existing properties
        ...existingVideo,
        // Then override specific properties
        Template: templateId,
        TemplateVariation: {
          ...existingTemplateVariation,
          Background: variant,
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
  const timings = dataset.TIMINGS || {};
  const introFrames = timings.FPS_INTRO || 60;
  const mainFrames = timings.FPS_MAIN || 180;
  const outroFrames = timings.FPS_OUTRO || 60;

  // Check if sponsors should be included
  const includeSponsors = dataset.VIDEOMETA?.Video?.includeSponsors || false;

  // Calculate total duration
  return introFrames + mainFrames + (includeSponsors ? outroFrames : 30);
}
