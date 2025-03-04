// src/core/utils/datasetProcessing.ts
import { FixturaDataset } from "../types/data/index";
import { mergeData } from "./dataProcessing";
import { getCompositionIdFromDatasetId } from "./compositionMapping";

/**
 * Processes dataset for a specific template and variant
 */
export function processDatasetForTemplate(
  dataset: FixturaDataset,
  templateId: string,
  variant: string,
  sportName: string,
): FixturaDataset {
  // Clone the dataset to avoid modifying the original
  const datasetClone: FixturaDataset = JSON.parse(JSON.stringify(dataset));

  // Check if the dataset already has a CompositionID defined
  const existingCompositionId = dataset.VIDEOMETA?.Video?.CompositionID;

  // Get the correct composition ID - either use existing one or get it from the dataset ID
  const compositionId =
    existingCompositionId || getCompositionIdFromDatasetId(dataset.id || "");

  // Create the full composition ID including template and variant - for internal reference only
  const fullCompositionId = `${templateId}-${variant}-${dataset.id || "unknown"}`;
  console.log(`Using dataset ID: ${dataset.id || "unknown"}`);
  console.log(`Full composition ID (reference only): ${fullCompositionId}`);
  console.log(`Actual CompositionID being used: ${compositionId}`);

  // Get existing template variation if any
  const existingTemplateVariation =
    dataset.VIDEOMETA?.Video?.TemplateVariation || {};

  // Process the dataset with template information
  return mergeData(datasetClone, {
    VIDEOMETA: {
      Video: {
        Template: templateId,
        TemplateVariation: {
          ...existingTemplateVariation,
          Background: variant,
        },
        Theme: {
          primary: "#000000",
          secondary: "#ffffff",
          dark: "#333333",
          white: "#ffffff",
        },
        Title: `${templateId} - ${variant}`,
        // Use the simple composition ID which the router expects
        CompositionID: compositionId,
        includeSponsors: false,
      },
      Club: {
        Name: sportName,
        Sport: sportName,
        Logo: {
          url: "",
          width: 100,
          height: 100,
        },
        Sponsors: [], // Add empty sponsors array to satisfy the type
      },
    },
  });
}

/**
 * Calculates duration for a dataset
 */
export function calculateDuration(dataset: FixturaDataset): number {
  const introFrames = dataset.TIMINGS?.FPS_INTRO || 60;
  const mainFrames = dataset.TIMINGS?.FPS_MAIN || 180;
  const outroFrames = dataset.TIMINGS?.FPS_OUTRO || 60;
  const includeSponsors = dataset.VIDEOMETA?.Video?.includeSponsors || false;

  return introFrames + mainFrames + (includeSponsors ? outroFrames : 30);
}
