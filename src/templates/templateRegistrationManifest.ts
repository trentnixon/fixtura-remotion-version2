/**
 * Authoritative Template (Registry ID) registration: composition export keys,
 * preview lazy-chunk publish surface, and membership in TEMPLATE_IDS.
 */
export type TemplateRegistrationManifestEntry = {
  registryId: string;
  compositionExportKey: string;
  legacyCompositionExportKeys?: readonly string[];
  /**
   * Optional extra publish chunk under `dist/templates/{distFileStem}.*`
   * (see `tsup.config.ts` entry keys).
   */
  previewPublishChunk?: {
    distFileStem: string;
  };
};

export const TEMPLATE_REGISTRATION_MANIFEST = [
  { registryId: "Basic", compositionExportKey: "basic" },
  {
    registryId: "Brickwork",
    compositionExportKey: "brickwork",
    legacyCompositionExportKeys: ["brickWork"],
  },
  { registryId: "Classic", compositionExportKey: "classic" },
  { registryId: "CNSW", compositionExportKey: "cnsw" },
  {
    registryId: "CNSWPrivate",
    compositionExportKey: "cnswprivate",
    legacyCompositionExportKeys: ["cnswPrivate"],
  },
  { registryId: "Sixers", compositionExportKey: "sixers" },
  { registryId: "Thunder", compositionExportKey: "thunder" },
  {
    registryId: "TwoColumnClassic",
    compositionExportKey: "twocolumnclassic",
    legacyCompositionExportKeys: ["classicTwoColumn", "classicTwoColumns"],
  },
  {
    registryId: "Mudgeeraba",
    compositionExportKey: "mudgeeraba",
    previewPublishChunk: { distFileStem: "mudgeeraba" },
  },
  {
    registryId: "BroadcastPro",
    compositionExportKey: "broadcastpro",
    legacyCompositionExportKeys: ["broadcastPro"],
  },
  {
    registryId: "BroadcastProRounded",
    compositionExportKey: "broadcastprorounded",
    legacyCompositionExportKeys: ["broadcastProRounded"],
  },
  {
    registryId: "Scoreline",
    compositionExportKey: "scoreline",
    previewPublishChunk: { distFileStem: "scoreline" },
  },
  {
    registryId: "NightSession",
    compositionExportKey: "nightsession",
    legacyCompositionExportKeys: ["nightSession"],
    previewPublishChunk: { distFileStem: "night-session" },
  },
] as const satisfies readonly TemplateRegistrationManifestEntry[];

export type TemplateId =
  (typeof TEMPLATE_REGISTRATION_MANIFEST)[number]["registryId"];

export const TEMPLATE_IDS: readonly TemplateId[] =
  TEMPLATE_REGISTRATION_MANIFEST.map((entry) => entry.registryId);

export function isTemplateId(id: string): id is TemplateId {
  return (TEMPLATE_IDS as readonly string[]).includes(id);
}

/** dist/templates stems declared on the manifest (must match `tsup` publish entries). */
export function listPreviewPublishChunkDistStems(): string[] {
  return TEMPLATE_REGISTRATION_MANIFEST.filter(
    (entry): entry is (typeof TEMPLATE_REGISTRATION_MANIFEST)[number] & {
      previewPublishChunk: { distFileStem: string };
    } => Boolean(entry.previewPublishChunk),
  ).map((entry) => entry.previewPublishChunk.distFileStem);
}
