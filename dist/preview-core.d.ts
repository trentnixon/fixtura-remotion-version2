import type { ComponentType } from "react";

export type FixturaDataset = Record<string, unknown>;

export type ProductionCompositionMeta = {
  templateId: TemplateId;
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

export declare const TEMPLATE_IDS: readonly TemplateId[];

export declare function isTemplateId(id: string): id is TemplateId;

export declare function getProductionCompositionMeta(
  data: FixturaDataset,
): ProductionCompositionMeta;

export type PreviewTemplateComponent = ComponentType<{
  data: FixturaDataset;
}>;

export declare function loadPreviewTemplateComponent(
  templateId: TemplateId,
): Promise<PreviewTemplateComponent>;
