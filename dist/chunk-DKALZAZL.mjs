import {
  calculateOutroDurationFromSponsors,
  hasSponsors,
  isGeneratedPresetId,
} from "./chunk-DAUNLCV7.mjs";

// src/templates/templateIds.ts
var TEMPLATE_IDS = [
  "Basic",
  "Brickwork",
  "Classic",
  "CNSW",
  "CNSWPrivate",
  "Sixers",
  "Thunder",
  "TwoColumnClassic",
  "Mudgeeraba",
  "BroadcastPro",
  "BroadcastProRounded",
  "Scoreline",
  "NightSession",
];
function isTemplateId(id) {
  return TEMPLATE_IDS.includes(id);
}

// src/core/preview/getProductionCompositionMeta.ts
function getProductionCompositionMeta(data) {
  var _a, _b, _c;
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
      : void 0;
  const sponsors = (_a = data.videoMeta.club) == null ? void 0 : _a.sponsors;
  const doesAccountHaveSponsors =
    Boolean(metadata.includeSponsors) || hasSponsors(sponsors);
  const durationInFrames =
    ((_b = data.timings.FPS_INTRO) != null ? _b : 0) +
    ((_c = data.timings.FPS_MAIN) != null ? _c : 0) +
    calculateOutroDurationFromSponsors(sponsors, doesAccountHaveSponsors);
  return {
    templateId,
    remoteCompositionId,
    studioGeneratedCompositionId,
    durationInFrames,
  };
}

// src/package/loadPreviewTemplate.ts
var templateLoaders = {
  Basic: () =>
    import("./basic-2OV7AM7X.mjs").then((m) => ({
      default: m.Basic,
    })),
  Brickwork: () =>
    import("./brickwork-FKWBZ2AO.mjs").then((m) => ({
      default: m.Brickwork,
    })),
  Classic: () =>
    import("./classic-TLLJXXI7.mjs").then((m) => ({
      default: m.Classic,
    })),
  CNSW: () => import("./cnsw-3YHKEDII.mjs").then((m) => ({ default: m.CNSW })),
  CNSWPrivate: () =>
    import("./cnsw-private-L7VCTST6.mjs").then((m) => ({
      default: m.CNSWPrivate,
    })),
  Sixers: () =>
    import("./sixers-2KFHFXLW.mjs").then((m) => ({ default: m.Sixers })),
  Thunder: () =>
    import("./thunder-UMUKEJDQ.mjs").then((m) => ({
      default: m.Thunder,
    })),
  TwoColumnClassic: () =>
    import("./twoColumnClassic-DG2UGT7F.mjs").then((m) => ({
      default: m.TwoColumnClassic,
    })),
  Mudgeeraba: () =>
    import("./mudgeeraba-JFHNPILT.mjs").then((m) => ({
      default: m.Mudgeeraba,
    })),
  BroadcastPro: () =>
    import("./broadcastPro-5BDSZXH4.mjs").then((m) => ({
      default: m.BroadcastPro,
    })),
  BroadcastProRounded: () =>
    import("./broadcastProRounded-O7LQVGTN.mjs").then((m) => ({
      default: m.BroadcastProRounded,
    })),
  Scoreline: () =>
    import("./scoreline-72KSFPDZ.mjs").then((m) => ({
      default: m.Scoreline,
    })),
  NightSession: () =>
    import("./nightSession-VIDZEUYA.mjs").then((m) => ({
      default: m.NightSession,
    })),
};
function loadPreviewTemplateComponent(templateId) {
  const loader = templateLoaders[templateId];
  return loader().then((m) => m.default);
}

export {
  TEMPLATE_IDS,
  isTemplateId,
  getProductionCompositionMeta,
  loadPreviewTemplateComponent,
};
//# sourceMappingURL=chunk-DKALZAZL.mjs.map
