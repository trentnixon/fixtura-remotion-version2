import { isGeneratedPresetId } from "./variants/Generated/catalogue";
import {
  matchLegacyIngress,
  normalizeForDisplay,
  type DisplaySelection,
  type LegacyIngressMatchResult,
  type LegacyWirePayload,
} from "./variants/Generated/catalogue";
import {
  resolveValidatedBackgroundRoute,
  type ValidatedBackgroundRoute,
} from "./resolveValidatedBackgroundRoute";
import type { TemplateId } from "../../templates/templateIds";

export type ResolvedBackgroundIngress = {
  readonly match: LegacyIngressMatchResult;
  readonly route: ValidatedBackgroundRoute;
  readonly display: DisplaySelection;
  /**
   * Sticky legacy `useBackground` for production composition IDs (ADR-0002).
   * Not the operator-facing Generated category label.
   */
  readonly legacyUseBackgroundForCompositionId: string;
};

const readLegacyUseBackground = (wire: LegacyWirePayload): string => {
  if (
    typeof wire === "object" &&
    wire !== null &&
    "useBackground" in wire &&
    typeof wire.useBackground === "string" &&
    wire.useBackground.length > 0
  ) {
    return wire.useBackground;
  }

  return "Solid";
};

/**
 * Single ingress port: legacy wire → catalogue match, validated render route, and display metadata.
 */
export const resolveBackgroundIngress = (
  wire: LegacyWirePayload,
): ResolvedBackgroundIngress => {
  const match = matchLegacyIngress(wire);
  const route = resolveValidatedBackgroundRoute(match);
  const display = normalizeForDisplay(match);

  return {
    match,
    route,
    display,
    legacyUseBackgroundForCompositionId: readLegacyUseBackground(wire),
  };
};

export type ProductionCompositionIds = {
  readonly remoteCompositionId: string;
  readonly studioGeneratedCompositionId?: string;
};

/**
 * CLI/Lambda and Studio production composition IDs (legacy wire + optional Studio generated alias).
 */
export const buildProductionCompositionIds = (input: {
  templateId: TemplateId | string;
  compositionId: string;
  legacyUseBackground: string;
  appearanceType?: unknown;
}): ProductionCompositionIds => {
  const useBackground = input.legacyUseBackground || "Solid";
  const remoteCompositionId = `${input.templateId}-${useBackground}-${input.compositionId}`;

  const appearanceType = input.appearanceType;
  const studioGeneratedCompositionId =
    typeof appearanceType === "string" && isGeneratedPresetId(appearanceType)
      ? `${input.templateId}-generated-${appearanceType}-${input.compositionId}`
      : undefined;

  return { remoteCompositionId, studioGeneratedCompositionId };
};

/** Remotion `<Composition id>` list for a production dataset (dual-register when needed). */
export const listProductionCompositionIds = (
  ids: ProductionCompositionIds,
): readonly string[] => {
  const { remoteCompositionId, studioGeneratedCompositionId } = ids;
  if (
    studioGeneratedCompositionId &&
    studioGeneratedCompositionId !== remoteCompositionId
  ) {
    return [remoteCompositionId, studioGeneratedCompositionId];
  }
  return [remoteCompositionId];
};

export {
  resolveBackgroundRenderPlan,
  type BackgroundRenderPlan,
} from "./resolveBackgroundRenderPlan";
