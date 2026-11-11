import type { ComponentType } from "react";
import type { FixturaDataset } from "../core/types/data/index";
import type { TemplateId } from "./templateRegistrationManifest";
import { Basic } from "./variants/basic";
import { Brickwork } from "./variants/brickwork";
import { Classic } from "./variants/classic";
import { Sixers } from "./variants/sixers";
import { CNSW } from "./variants/cnsw";
import { Thunder } from "./variants/thunder";
import { TwoColumnClassic } from "./variants/twoColumnClassic";
import { CNSWPrivate } from "./variants/cnsw-private";
import { Mudgeeraba } from "./variants/mudgeeraba";
import { BroadcastPro } from "./variants/broadcastPro";
import { BroadcastProRounded } from "./variants/broadcastProRounded";
import { Scoreline } from "./variants/scoreline";
import { NightSession } from "./variants/nightSession";

export type TemplateShellComponent = ComponentType<{ data: FixturaDataset }>;

/**
 * Eager shell components for Studio / ProductionRoot — keyed by Registry ID.
 * Keys must match {@link TEMPLATE_REGISTRATION_MANIFEST} (enforced in tests).
 */
export const TEMPLATE_SHELL_COMPONENTS: Record<
  TemplateId,
  TemplateShellComponent
> = {
  Basic,
  Brickwork,
  Classic,
  CNSW,
  CNSWPrivate,
  Sixers,
  Thunder,
  TwoColumnClassic,
  Mudgeeraba,
  BroadcastPro,
  BroadcastProRounded,
  Scoreline,
  NightSession,
};
