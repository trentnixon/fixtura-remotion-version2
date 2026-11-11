import type { ComponentType } from "react";
import type { FixturaDataset } from "../core/types/data/index";
import { isTemplateId, type TemplateId } from "../templates/templateIds";

export type PreviewTemplateComponent = ComponentType<{
  data: FixturaDataset;
}>;

type TemplateModuleLoader = () => Promise<{
  default: PreviewTemplateComponent;
}>;

const templateLoaders: Record<TemplateId, TemplateModuleLoader> = {
  Basic: () =>
    import("../templates/variants/basic").then((m) => ({
      default: m.Basic,
    })),
  Brickwork: () =>
    import("../templates/variants/brickwork").then((m) => ({
      default: m.Brickwork,
    })),
  Classic: () =>
    import("../templates/variants/classic").then((m) => ({
      default: m.Classic,
    })),
  CNSW: () =>
    import("../templates/variants/cnsw").then((m) => ({ default: m.CNSW })),
  CNSWPrivate: () =>
    import("../templates/variants/cnsw-private").then((m) => ({
      default: m.CNSWPrivate,
    })),
  Sixers: () =>
    import("../templates/variants/sixers").then((m) => ({ default: m.Sixers })),
  Thunder: () =>
    import("../templates/variants/thunder").then((m) => ({
      default: m.Thunder,
    })),
  TwoColumnClassic: () =>
    import("../templates/variants/twoColumnClassic").then((m) => ({
      default: m.TwoColumnClassic,
    })),
  Mudgeeraba: () =>
    import("../templates/variants/mudgeeraba").then((m) => ({
      default: m.Mudgeeraba,
    })),
  BroadcastPro: () =>
    import("../templates/variants/broadcastPro").then((m) => ({
      default: m.BroadcastPro,
    })),
  BroadcastProRounded: () =>
    import("../templates/variants/broadcastProRounded").then((m) => ({
      default: m.BroadcastProRounded,
    })),
  Scoreline: () =>
    import("../templates/variants/scoreline").then((m) => ({
      default: m.Scoreline,
    })),
  NightSession: () =>
    import("../templates/variants/nightSession").then((m) => ({
      default: m.NightSession,
    })),
};

export function hasPreviewTemplateLoader(
  templateId: string,
): templateId is TemplateId {
  return isTemplateId(templateId) && templateId in templateLoaders;
}

/**
 * Loads a single Registry ID implementation chunk (for Player hosts and tests).
 */
export function loadPreviewTemplateComponent(
  templateId: TemplateId,
): Promise<PreviewTemplateComponent> {
  const loader = templateLoaders[templateId];
  return loader().then((m) => m.default);
}
