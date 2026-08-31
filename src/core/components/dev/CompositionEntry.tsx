// src/core/components/dev/CompositionEntry.tsx
import React from "react";
import { Composition } from "remotion";
import type {
  DevAppearanceMetadata,
  DevBackgroundWire,
} from "../../../components/backgrounds/variants/Generated/catalogue/types";
import type { GeneratedPresetId } from "../../../components/backgrounds/variants/Generated/catalogue/catalogue";
import { FixturaDataset } from "../../types/data/index";
import { testDatasets } from "../../../../testData/index";
import {
  processDatasetForTemplate,
  calculateDuration,
} from "../../utils/datasetProcessing";

type GeneratedCompositionEntryProps = {
  templateId: string;
  sportName: string;
  datasetID: string;
  templateComponent: React.ComponentType<{ data: FixturaDataset }>;
  presetId: GeneratedPresetId;
  legacyEgress: DevBackgroundWire;
};

type PassthroughCompositionEntryProps = {
  templateId: string;
  sportName: string;
  datasetID: string;
  templateComponent: React.ComponentType<{ data: FixturaDataset }>;
  legacyEgress: DevBackgroundWire;
  devLabel: string;
};

export type CompositionEntryProps =
  | GeneratedCompositionEntryProps
  | PassthroughCompositionEntryProps;

const isGeneratedEntry = (
  props: CompositionEntryProps,
): props is GeneratedCompositionEntryProps => "presetId" in props;

export const CompositionEntry: React.FC<CompositionEntryProps> = (props) => {
  const { templateId, sportName, datasetID, templateComponent } = props;

  const datasetData = testDatasets[datasetID] as FixturaDataset | undefined;

  if (!datasetData) {
    console.warn(`Dataset not found: ${datasetID}`);
    return null;
  }

  const devAppearance: DevAppearanceMetadata = isGeneratedEntry(props)
    ? { kind: "generated", presetId: props.presetId }
    : { kind: "passthrough", label: props.devLabel };

  const legacyEgress = props.legacyEgress;

  const processedData = processDatasetForTemplate(
    datasetData,
    templateId,
    sportName,
    legacyEgress,
    devAppearance,
  );

  const durationInFrames = calculateDuration(processedData);

  const remoteCompositionId = isGeneratedEntry(props)
    ? `${templateId}-generated-${props.presetId}-${datasetID}`
    : `${templateId}-${props.devLabel}-${datasetID}`;

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
      component={templateComponent}
      durationInFrames={durationInFrames}
      fps={VideoRatio.fps}
      width={VideoRatio.width}
      height={VideoRatio.height}
      defaultProps={{
        data: processedData,
      }}
    />
  );
};
