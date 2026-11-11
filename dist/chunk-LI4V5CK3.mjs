import {
  buildProductionCompositionIds,
  calculateOutroDurationFromSponsors,
  hasSponsors,
  isTemplateId
} from "./chunk-S5B7PBPK.mjs";

// src/core/preview/getProductionCompositionMeta.ts
function getProductionCompositionMeta(data) {
  var _a, _b, _c;
  const videoType = data.videoMeta.video;
  const { appearance, templateVariation, metadata } = videoType;
  const templateId = appearance.template || null;
  const compositionId = metadata.compositionId || null;
  const legacyUseBackground = templateVariation.useBackground || "Solid";
  if (!templateId) {
    throw new Error("No template ID provided for production render");
  }
  if (!legacyUseBackground) {
    throw new Error("No useBackground provided for production render");
  }
  if (!compositionId) {
    throw new Error("No composition ID provided for production render");
  }
  if (!isTemplateId(templateId)) {
    throw new Error(`Unknown template ID: ${templateId}`);
  }
  const { remoteCompositionId, studioGeneratedCompositionId } = buildProductionCompositionIds({
    templateId,
    compositionId,
    legacyUseBackground,
    appearanceType: appearance.type
  });
  const sponsors = (_a = data.videoMeta.club) == null ? void 0 : _a.sponsors;
  const doesAccountHaveSponsors = Boolean(metadata.includeSponsors) || hasSponsors(sponsors);
  const durationInFrames = ((_b = data.timings.FPS_INTRO) != null ? _b : 0) + ((_c = data.timings.FPS_MAIN) != null ? _c : 0) + calculateOutroDurationFromSponsors(sponsors, doesAccountHaveSponsors);
  return {
    templateId,
    remoteCompositionId,
    studioGeneratedCompositionId,
    durationInFrames
  };
}

// src/templates/templatePreviewLoaders.ts
var TEMPLATE_PREVIEW_LOADERS = {
  Basic: () => import("./basic-VT7ZCWOE.mjs").then((m) => ({ default: m.Basic })),
  Brickwork: () => import("./brickwork-YS5DS4AT.mjs").then((m) => ({ default: m.Brickwork })),
  Classic: () => import("./classic-QEGPMMVN.mjs").then((m) => ({ default: m.Classic })),
  CNSW: () => import("./cnsw-KCDYJUQT.mjs").then((m) => ({ default: m.CNSW })),
  CNSWPrivate: () => import("./cnsw-private-VRFMEV5B.mjs").then((m) => ({
    default: m.CNSWPrivate
  })),
  Sixers: () => import("./sixers-ZWGGJMG2.mjs").then((m) => ({ default: m.Sixers })),
  Thunder: () => import("./thunder-QXXTKF7J.mjs").then((m) => ({ default: m.Thunder })),
  TwoColumnClassic: () => import("./twoColumnClassic-X5W6GD7D.mjs").then((m) => ({
    default: m.TwoColumnClassic
  })),
  Mudgeeraba: () => import("./mudgeeraba-LMFJLIZR.mjs").then((m) => ({
    default: m.Mudgeeraba
  })),
  BroadcastPro: () => import("./broadcastPro-I7SWJWID.mjs").then((m) => ({
    default: m.BroadcastPro
  })),
  BroadcastProRounded: () => import("./broadcastProRounded-R6JAQPLL.mjs").then((m) => ({
    default: m.BroadcastProRounded
  })),
  Scoreline: () => import("./scoreline-GG2NPXA6.mjs").then((m) => ({ default: m.Scoreline })),
  NightSession: () => import("./nightSession-H2633YLL.mjs").then((m) => ({
    default: m.NightSession
  }))
};

// src/package/loadPreviewTemplate.ts
function loadPreviewTemplateComponent(templateId) {
  const loader = TEMPLATE_PREVIEW_LOADERS[templateId];
  return loader().then((m) => m.default);
}

export {
  getProductionCompositionMeta,
  loadPreviewTemplateComponent
};
//# sourceMappingURL=chunk-LI4V5CK3.mjs.map