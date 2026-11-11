import {
  buildProductionCompositionIds,
  calculateOutroDurationFromSponsors,
  hasSponsors,
  isTemplateId,
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
  const { remoteCompositionId, studioGeneratedCompositionId } =
    buildProductionCompositionIds({
      templateId,
      compositionId,
      legacyUseBackground,
      appearanceType: appearance.type,
    });
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

// src/templates/templatePreviewLoaders.ts
var TEMPLATE_PREVIEW_LOADERS = {
  Basic: () =>
    import("./basic-BL324T6M.mjs").then((m) => ({ default: m.Basic })),
  Brickwork: () =>
    import("./brickwork-N7GXLXUN.mjs").then((m) => ({ default: m.Brickwork })),
  Classic: () =>
    import("./classic-CBBM3SCD.mjs").then((m) => ({ default: m.Classic })),
  CNSW: () => import("./cnsw-CHQFY4PW.mjs").then((m) => ({ default: m.CNSW })),
  CNSWPrivate: () =>
    import("./cnsw-private-BDFM5UFF.mjs").then((m) => ({
      default: m.CNSWPrivate,
    })),
  Sixers: () =>
    import("./sixers-S6C2N4VF.mjs").then((m) => ({ default: m.Sixers })),
  Thunder: () =>
    import("./thunder-4NZ2VUZ3.mjs").then((m) => ({ default: m.Thunder })),
  TwoColumnClassic: () =>
    import("./twoColumnClassic-74TTMQHJ.mjs").then((m) => ({
      default: m.TwoColumnClassic,
    })),
  Mudgeeraba: () =>
    import("./mudgeeraba-2HUKEUWI.mjs").then((m) => ({
      default: m.Mudgeeraba,
    })),
  BroadcastPro: () =>
    import("./broadcastPro-XZTMYVNM.mjs").then((m) => ({
      default: m.BroadcastPro,
    })),
  BroadcastProRounded: () =>
    import("./broadcastProRounded-LKA5ZHQ3.mjs").then((m) => ({
      default: m.BroadcastProRounded,
    })),
  Scoreline: () =>
    import("./scoreline-Z57PEACQ.mjs").then((m) => ({ default: m.Scoreline })),
  NightSession: () =>
    import("./nightSession-KCUWLCK3.mjs").then((m) => ({
      default: m.NightSession,
    })),
};

// src/package/loadPreviewTemplate.ts
function loadPreviewTemplateComponent(templateId) {
  const loader = TEMPLATE_PREVIEW_LOADERS[templateId];
  return loader().then((m) => m.default);
}

export { getProductionCompositionMeta, loadPreviewTemplateComponent };
//# sourceMappingURL=chunk-27I5QZ6Q.mjs.map
