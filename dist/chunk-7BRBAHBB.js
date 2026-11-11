"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }



var _chunkTGUIUP2Jjs = require('./chunk-TGUIUP2J.js');

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
  "NightSession"
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
  const studioGeneratedCompositionId = typeof appearanceType === "string" && _chunkTGUIUP2Jjs.isGeneratedPresetId.call(void 0, appearanceType) ? `${templateId}-generated-${appearanceType}-${compositionId}` : void 0;
  const sponsors = (_a = data.videoMeta.club) == null ? void 0 : _a.sponsors;
  const doesAccountHaveSponsors = Boolean(metadata.includeSponsors) || _chunkTGUIUP2Jjs.hasSponsors.call(void 0, sponsors);
  const durationInFrames = ((_b = data.timings.FPS_INTRO) != null ? _b : 0) + ((_c = data.timings.FPS_MAIN) != null ? _c : 0) + _chunkTGUIUP2Jjs.calculateOutroDurationFromSponsors.call(void 0, sponsors, doesAccountHaveSponsors);
  return {
    templateId,
    remoteCompositionId,
    studioGeneratedCompositionId,
    durationInFrames
  };
}

// src/package/loadPreviewTemplate.ts
var templateLoaders = {
  Basic: () => Promise.resolve().then(() => _interopRequireWildcard(require("./basic-45IYNXYC.js"))).then((m) => ({
    default: m.Basic
  })),
  Brickwork: () => Promise.resolve().then(() => _interopRequireWildcard(require("./brickwork-VBVGS3DQ.js"))).then((m) => ({
    default: m.Brickwork
  })),
  Classic: () => Promise.resolve().then(() => _interopRequireWildcard(require("./classic-M7RK36MN.js"))).then((m) => ({
    default: m.Classic
  })),
  CNSW: () => Promise.resolve().then(() => _interopRequireWildcard(require("./cnsw-YZOXUZU4.js"))).then((m) => ({ default: m.CNSW })),
  CNSWPrivate: () => Promise.resolve().then(() => _interopRequireWildcard(require("./cnsw-private-EPNN74ZU.js"))).then((m) => ({
    default: m.CNSWPrivate
  })),
  Sixers: () => Promise.resolve().then(() => _interopRequireWildcard(require("./sixers-YJ42IOPW.js"))).then((m) => ({ default: m.Sixers })),
  Thunder: () => Promise.resolve().then(() => _interopRequireWildcard(require("./thunder-7BAUL64Q.js"))).then((m) => ({
    default: m.Thunder
  })),
  TwoColumnClassic: () => Promise.resolve().then(() => _interopRequireWildcard(require("./twoColumnClassic-XHDIB55K.js"))).then((m) => ({
    default: m.TwoColumnClassic
  })),
  Mudgeeraba: () => Promise.resolve().then(() => _interopRequireWildcard(require("./mudgeeraba-WYUEFIPY.js"))).then((m) => ({
    default: m.Mudgeeraba
  })),
  BroadcastPro: () => Promise.resolve().then(() => _interopRequireWildcard(require("./broadcastPro-7O7U3Q4F.js"))).then((m) => ({
    default: m.BroadcastPro
  })),
  BroadcastProRounded: () => Promise.resolve().then(() => _interopRequireWildcard(require("./broadcastProRounded-DAT5RTUA.js"))).then((m) => ({
    default: m.BroadcastProRounded
  })),
  Scoreline: () => Promise.resolve().then(() => _interopRequireWildcard(require("./scoreline-TB6NPJMS.js"))).then((m) => ({
    default: m.Scoreline
  })),
  NightSession: () => Promise.resolve().then(() => _interopRequireWildcard(require("./nightSession-QOAEQROD.js"))).then((m) => ({
    default: m.NightSession
  }))
};
function loadPreviewTemplateComponent(templateId) {
  const loader = templateLoaders[templateId];
  return loader().then((m) => m.default);
}






exports.TEMPLATE_IDS = TEMPLATE_IDS; exports.isTemplateId = isTemplateId; exports.getProductionCompositionMeta = getProductionCompositionMeta; exports.loadPreviewTemplateComponent = loadPreviewTemplateComponent;
//# sourceMappingURL=chunk-7BRBAHBB.js.map