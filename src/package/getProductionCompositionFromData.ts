import type { FixturaDataset } from "../core/types/data/index";
import { getProductionCompositionMeta } from "../core/preview/getProductionCompositionMeta";
import { createPreviewTemplateComponent } from "./previewTemplateComponent";
import type { FixturaTemplateComponent } from "../core/preview/getProductionCompositionFromData";
import type { ProductionCompositionFromData } from "../core/preview/getProductionCompositionFromData";

/**
 * Package preview resolver: composition metadata plus a lazy template wrapper
 * (per-Registry-ID chunks via dynamic import).
 */
export function getProductionCompositionFromData(
  data: FixturaDataset,
): ProductionCompositionFromData {
  const meta = getProductionCompositionMeta(data);
  const TemplateComponent = createPreviewTemplateComponent(
    meta.templateId,
  ) as FixturaTemplateComponent;

  return {
    TemplateComponent,
    remoteCompositionId: meta.remoteCompositionId,
    studioGeneratedCompositionId: meta.studioGeneratedCompositionId,
    durationInFrames: meta.durationInFrames,
  };
}
