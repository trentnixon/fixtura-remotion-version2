import { isGeneratedPresetId } from "../../components/backgrounds/variants/Generated/catalogue";
import { isTemplateId } from "../../templates/templateIds";
import { FixturaDataset } from "../types/data/index";
import { calculateOutroDurationFromSponsors } from "../utils/sponsors";
import { hasSponsors } from "../utils/general";
import type { TemplateId } from "../../templates/templateIds";

export type ProductionCompositionMeta = {
  templateId: TemplateId;
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
 * Resolves composition IDs and duration without loading template implementations.
 * Used by the @fixtura/remotion-assets preview-core publish entry.
 */
export function getProductionCompositionMeta(
  data: FixturaDataset,
): ProductionCompositionMeta {
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

  if (!isTemplateId(templateId)) {
    throw new Error(`Unknown template ID: ${templateId}`);
  }

  const remoteCompositionId = `${templateId}-${useBackground}-${compositionId}`;

  const appearanceType = appearance.type;
  const studioGeneratedCompositionId =
    typeof appearanceType === "string" && isGeneratedPresetId(appearanceType)
      ? `${templateId}-generated-${appearanceType}-${compositionId}`
      : undefined;

  const sponsors = data.videoMeta.club?.sponsors;
  const doesAccountHaveSponsors =
    Boolean(metadata.includeSponsors) || hasSponsors(sponsors);
  const durationInFrames =
    (data.timings.FPS_INTRO ?? 0) +
    (data.timings.FPS_MAIN ?? 0) +
    calculateOutroDurationFromSponsors(sponsors, doesAccountHaveSponsors);

  return {
    templateId,
    remoteCompositionId,
    studioGeneratedCompositionId,
    durationInFrames,
  };
}
