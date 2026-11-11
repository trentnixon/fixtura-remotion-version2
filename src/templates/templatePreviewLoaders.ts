import type { ComponentType } from "react";
import type { FixturaDataset } from "../core/types/data/index";
import type { TemplateId } from "./templateRegistrationManifest";

export type PreviewTemplateComponent = ComponentType<{
  data: FixturaDataset;
}>;

type TemplateModuleLoader = () => Promise<{
  default: PreviewTemplateComponent;
}>;

/**
 * Lazy import map for Player / preview hosts — one loader per Registry ID.
 * Keys must match {@link TEMPLATE_REGISTRATION_MANIFEST} (enforced in tests).
 */
export const TEMPLATE_PREVIEW_LOADERS: Record<TemplateId, TemplateModuleLoader> =
  {
    Basic: () =>
      import("./variants/basic").then((m) => ({ default: m.Basic })),
    Brickwork: () =>
      import("./variants/brickwork").then((m) => ({ default: m.Brickwork })),
    Classic: () =>
      import("./variants/classic").then((m) => ({ default: m.Classic })),
    CNSW: () => import("./variants/cnsw").then((m) => ({ default: m.CNSW })),
    CNSWPrivate: () =>
      import("./variants/cnsw-private").then((m) => ({
        default: m.CNSWPrivate,
      })),
    Sixers: () =>
      import("./variants/sixers").then((m) => ({ default: m.Sixers })),
    Thunder: () =>
      import("./variants/thunder").then((m) => ({ default: m.Thunder })),
    TwoColumnClassic: () =>
      import("./variants/twoColumnClassic").then((m) => ({
        default: m.TwoColumnClassic,
      })),
    Mudgeeraba: () =>
      import("./variants/mudgeeraba").then((m) => ({
        default: m.Mudgeeraba,
      })),
    BroadcastPro: () =>
      import("./variants/broadcastPro").then((m) => ({
        default: m.BroadcastPro,
      })),
    BroadcastProRounded: () =>
      import("./variants/broadcastProRounded").then((m) => ({
        default: m.BroadcastProRounded,
      })),
    Scoreline: () =>
      import("./variants/scoreline").then((m) => ({ default: m.Scoreline })),
    NightSession: () =>
      import("./variants/nightSession").then((m) => ({
        default: m.NightSession,
      })),
  };
