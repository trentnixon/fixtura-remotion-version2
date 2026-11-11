"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }




var _chunk5OPIAWHPjs = require('./chunk-5OPIAWHP.js');

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
  if (!_chunk5OPIAWHPjs.isTemplateId.call(void 0, templateId)) {
    throw new Error(`Unknown template ID: ${templateId}`);
  }
  const { remoteCompositionId, studioGeneratedCompositionId } = _chunk5OPIAWHPjs.buildProductionCompositionIds.call(void 0, {
    templateId,
    compositionId,
    legacyUseBackground,
    appearanceType: appearance.type
  });
  const sponsors = (_a = data.videoMeta.club) == null ? void 0 : _a.sponsors;
  const doesAccountHaveSponsors = Boolean(metadata.includeSponsors) || _chunk5OPIAWHPjs.hasSponsors.call(void 0, sponsors);
  const durationInFrames = ((_b = data.timings.FPS_INTRO) != null ? _b : 0) + ((_c = data.timings.FPS_MAIN) != null ? _c : 0) + _chunk5OPIAWHPjs.calculateOutroDurationFromSponsors.call(void 0, sponsors, doesAccountHaveSponsors);
  return {
    templateId,
    remoteCompositionId,
    studioGeneratedCompositionId,
    durationInFrames
  };
}

// src/templates/templatePreviewLoaders.ts
var TEMPLATE_PREVIEW_LOADERS = {
  Basic: () => Promise.resolve().then(() => _interopRequireWildcard(require("./basic-HGOL7K2W.js"))).then((m) => ({ default: m.Basic })),
  Brickwork: () => Promise.resolve().then(() => _interopRequireWildcard(require("./brickwork-A6UJMCO7.js"))).then((m) => ({ default: m.Brickwork })),
  Classic: () => Promise.resolve().then(() => _interopRequireWildcard(require("./classic-XZ4ADVAL.js"))).then((m) => ({ default: m.Classic })),
  CNSW: () => Promise.resolve().then(() => _interopRequireWildcard(require("./cnsw-G5DADGIW.js"))).then((m) => ({ default: m.CNSW })),
  CNSWPrivate: () => Promise.resolve().then(() => _interopRequireWildcard(require("./cnsw-private-HHF3M7LT.js"))).then((m) => ({
    default: m.CNSWPrivate
  })),
  Sixers: () => Promise.resolve().then(() => _interopRequireWildcard(require("./sixers-IFOFUVN5.js"))).then((m) => ({ default: m.Sixers })),
  Thunder: () => Promise.resolve().then(() => _interopRequireWildcard(require("./thunder-DKMNBHDU.js"))).then((m) => ({ default: m.Thunder })),
  TwoColumnClassic: () => Promise.resolve().then(() => _interopRequireWildcard(require("./twoColumnClassic-GSNZ3EYY.js"))).then((m) => ({
    default: m.TwoColumnClassic
  })),
  Mudgeeraba: () => Promise.resolve().then(() => _interopRequireWildcard(require("./mudgeeraba-XATPXG65.js"))).then((m) => ({
    default: m.Mudgeeraba
  })),
  BroadcastPro: () => Promise.resolve().then(() => _interopRequireWildcard(require("./broadcastPro-N6URVRFM.js"))).then((m) => ({
    default: m.BroadcastPro
  })),
  BroadcastProRounded: () => Promise.resolve().then(() => _interopRequireWildcard(require("./broadcastProRounded-ID2F3BIC.js"))).then((m) => ({
    default: m.BroadcastProRounded
  })),
  Scoreline: () => Promise.resolve().then(() => _interopRequireWildcard(require("./scoreline-NCZSGS4C.js"))).then((m) => ({ default: m.Scoreline })),
  NightSession: () => Promise.resolve().then(() => _interopRequireWildcard(require("./nightSession-LOQCBV5M.js"))).then((m) => ({
    default: m.NightSession
  }))
};

// src/package/loadPreviewTemplate.ts
function loadPreviewTemplateComponent(templateId) {
  const loader = TEMPLATE_PREVIEW_LOADERS[templateId];
  return loader().then((m) => m.default);
}




exports.getProductionCompositionMeta = getProductionCompositionMeta; exports.loadPreviewTemplateComponent = loadPreviewTemplateComponent;
//# sourceMappingURL=chunk-ZKJ53LW7.js.map