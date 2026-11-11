import type { ComponentType, FC } from "react";

/**
 * Dataset passed to template renders. Matches `FixturaDataset` in this repo; kept loose here so
 * the package build does not need to emit types for the full data graph.
 */
export type FixturaDataset = Record<string, unknown>;

export type FixturaTemplateSceneProps = {
  data: FixturaDataset;
};

export declare const FixturaTemplateScene: FC<FixturaTemplateSceneProps>;

export type FixturaTemplateComponent = ComponentType<{
  data: FixturaDataset;
}>;

export type ProductionCompositionFromData = {
  TemplateComponent: FixturaTemplateComponent;
  remoteCompositionId: string;
  studioGeneratedCompositionId?: string;
  durationInFrames: number;
};

export type TemplateId =
  | "Basic"
  | "Brickwork"
  | "Classic"
  | "CNSW"
  | "CNSWPrivate"
  | "Sixers"
  | "Thunder"
  | "TwoColumnClassic"
  | "Mudgeeraba"
  | "BroadcastPro"
  | "BroadcastProRounded"
  | "Scoreline"
  | "NightSession";

export type ProductionCompositionMeta = {
  templateId: TemplateId;
  remoteCompositionId: string;
  studioGeneratedCompositionId?: string;
  durationInFrames: number;
};

export declare function getProductionCompositionMeta(
  data: FixturaDataset,
): ProductionCompositionMeta;

export declare function getProductionCompositionFromData(
  data: FixturaDataset,
): ProductionCompositionFromData;

export declare const TEMPLATE_IDS: readonly TemplateId[];

export declare function isTemplateId(id: string): id is TemplateId;

export type PreviewTemplateComponent = ComponentType<{
  data: FixturaDataset;
}>;

export declare function loadPreviewTemplateComponent(
  templateId: TemplateId,
): Promise<PreviewTemplateComponent>;
