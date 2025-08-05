// src/core/components/dev/CompositionEntry.tsx
import React from "react";
import { Composition } from "remotion";
import { FixturaDataset } from "../../types/data/index";
import { testDatasets } from "../../../../testData/index";
import {
  processDatasetForTemplate,
  calculateDuration,
} from "../../utils/datasetProcessing";

interface CompositionEntryProps {
  templateId: string;
  variant: string;
  sportName: string;
  datasetID: string;
  templateComponent: React.ComponentType<{ data: FixturaDataset }>;
}

export const CompositionEntry: React.FC<CompositionEntryProps> = ({
  templateId,
  variant,
  sportName,
  datasetID,
  templateComponent,
}) => {
  // Get the dataset with proper typing
  const datasetData = testDatasets[datasetID] as FixturaDataset | undefined;

  if (!datasetData) {
    console.warn(`Dataset not found: ${datasetID}`);
    return null; // Skip if dataset doesn't exist
  }

  // Process dataset for this template and variant
  const processedData = processDatasetForTemplate(
    datasetData,
    templateId,
    variant,
    sportName,
  );

  // Calculate duration
  const durationInFrames = calculateDuration(processedData);

  // Create a unique composition ID for Remotion's registry
  const remoteCompositionId = `${templateId}-${variant}-${datasetID}`;

  // at some point lets sort this out to be dynamic
  const VideoRatio = {
    width: 1080,
    height: 1350,
    ratio: 1080 / 1350,
    fps: 30,
  };

  return (
    <Composition
      key={remoteCompositionId}
      id={remoteCompositionId}
      component={templateComponent} // This is likely always the 'Basic' template component
      durationInFrames={durationInFrames}
      fps={VideoRatio.fps}
      width={VideoRatio.width}
      height={VideoRatio.height}
      defaultProps={{
        data: processedData, // Processed data includes datasetID implicitly
      }}
    />
  );
};

// Dev Notes:
// This component is responsible for creating a Remotion composition based on a dataset and template.
// It processes the dataset for the specific template and variant, calculates the duration, and logs debugging information.
// The unique composition ID is created by combining the template ID, variant, and dataset ID for Remotion's registry.
// The actual CompositionID used is the one from the processed dataset, ensuring it matches the expected ID in the data.
// This component is designed to be flexible and reusable across different templates and datasets.
