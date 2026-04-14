import type React from "react";
import { templateRegistry, TemplateId } from "../../templates/registry";
import { FixturaDataset } from "../types/data/index";

export type FixturaTemplateComponent = React.ComponentType<{
  data: FixturaDataset;
}>;

export type ProductionCompositionFromData = {
  TemplateComponent: FixturaTemplateComponent;
  remoteCompositionId: string;
  durationInFrames: number;
};

/**
 * Shared resolution for CLI/Lambda (`ProductionRoot`) and package previews (`FixturaTemplateScene`).
 */
export function getProductionCompositionFromData(
  data: FixturaDataset,
): ProductionCompositionFromData {
  const videoType = data.videoMeta.video;
  const { appearance, templateVariation, metadata } = videoType;

  const templateId = appearance.template || null;
  const useBackground = templateVariation.useBackground || "Solid";
  const compositionId = metadata.compositionId || null;

  if (!templateId) {
    throw new Error("No template ID provided for production render");
  }

  if (!useBackground) {
    throw new Error("No useBackground provided for production render");
  }

  if (!compositionId) {
    throw new Error("No composition ID provided for production render");
  }

  const TemplateComponent =
    templateRegistry[templateId as TemplateId].component;
  const remoteCompositionId = `${templateId}-${useBackground}-${compositionId}`;
  const durationInFrames =
    (data.timings.FPS_INTRO ?? 0) +
    (data.timings.FPS_MAIN ?? 0) +
    (data.videoMeta.video.metadata.includeSponsors
      ? (data.timings.FPS_OUTRO ?? 0)
      : 30);

  return {
    TemplateComponent,
    remoteCompositionId,
    durationInFrames,
  };
}
