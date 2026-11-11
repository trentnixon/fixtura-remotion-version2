import type React from "react";
import { templateRegistry, type TemplateId } from "../../templates/registry";
import { FixturaDataset } from "../types/data/index";
import { getProductionCompositionMeta } from "./getProductionCompositionMeta";

export type FixturaTemplateComponent = React.ComponentType<{
  data: FixturaDataset;
}>;

export type ProductionCompositionFromData = {
  TemplateComponent: FixturaTemplateComponent;
  /** CLI/Lambda ID: `${templateId}-${useBackground}-${compositionId}` */
  remoteCompositionId: string;
  /**
   * Studio generated-preset ID, when `appearance.type` is a catalogue preset:
   * `${templateId}-generated-${presetId}-${compositionId}`
   */
  studioGeneratedCompositionId?: string;
  durationInFrames: number;
};

/**
 * Shared resolution for CLI/Lambda (`ProductionRoot`). Loads templates via the central registry.
 */
export function getProductionCompositionFromData(
  data: FixturaDataset,
): ProductionCompositionFromData {
  const meta = getProductionCompositionMeta(data);
  const TemplateComponent =
    templateRegistry[meta.templateId as TemplateId].component;

  return {
    TemplateComponent,
    remoteCompositionId: meta.remoteCompositionId,
    studioGeneratedCompositionId: meta.studioGeneratedCompositionId,
    durationInFrames: meta.durationInFrames,
  };
}
