"use strict";Object.defineProperty(exports, "__esModule", {value: true});




var _chunkFXYHRXCYjs = require('./chunk-FXYHRXCY.js');


var _chunkNUR6EFVIjs = require('./chunk-NUR6EFVI.js');


var _chunkKBS4BULMjs = require('./chunk-KBS4BULM.js');
require('./chunk-TGUIUP2J.js');

// src/package/FixturaTemplateScene.tsx
var _react = require('react');

// src/package/previewTemplateComponent.tsx

var _jsxruntime = require('react/jsx-runtime');
var lazyByTemplate = /* @__PURE__ */ new Map();
function getLazyTemplate(templateId) {
  let existing = lazyByTemplate.get(templateId);
  if (!existing) {
    existing = _react.lazy.call(void 0, 
      () => _chunkFXYHRXCYjs.loadPreviewTemplateComponent.call(void 0, templateId).then((defaultExport) => ({
        default: defaultExport
      }))
    );
    lazyByTemplate.set(templateId, existing);
  }
  return existing;
}
var wrapperByTemplate = /* @__PURE__ */ new Map();
function createPreviewTemplateComponent(templateId) {
  const cached = wrapperByTemplate.get(templateId);
  if (cached) {
    return cached;
  }
  const LazyTemplate = getLazyTemplate(templateId);
  const PreviewTemplate = ({ data }) => /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _react.Suspense, { fallback: null, children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, LazyTemplate, { data }) });
  wrapperByTemplate.set(templateId, PreviewTemplate);
  return PreviewTemplate;
}

// src/package/getProductionCompositionFromData.ts
function getProductionCompositionFromData(data) {
  const meta = _chunkFXYHRXCYjs.getProductionCompositionMeta.call(void 0, data);
  const TemplateComponent = createPreviewTemplateComponent(
    meta.templateId
  );
  return {
    TemplateComponent,
    remoteCompositionId: meta.remoteCompositionId,
    studioGeneratedCompositionId: meta.studioGeneratedCompositionId,
    durationInFrames: meta.durationInFrames
  };
}

// src/package/FixturaTemplateScene.tsx

var FixturaTemplateScene = ({
  data
}) => {
  const { TemplateComponent } = getProductionCompositionFromData(data);
  const templateId = data.videoMeta.video.appearance.template;
  _react.useEffect.call(void 0, () => {
    if (_chunkFXYHRXCYjs.isTemplateId.call(void 0, templateId)) {
      void _chunkFXYHRXCYjs.loadPreviewTemplateComponent.call(void 0, templateId);
    }
  }, [templateId]);
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
    templateId === "Scoreline" ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunkNUR6EFVIjs.ScorelineBundledStyles, {}) : null,
    templateId === "NightSession" ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunkKBS4BULMjs.NightSessionBundledStyles, {}) : null,
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, TemplateComponent, { data })
  ] });
};







exports.FixturaTemplateScene = FixturaTemplateScene; exports.TEMPLATE_IDS = _chunkFXYHRXCYjs.TEMPLATE_IDS; exports.getProductionCompositionFromData = getProductionCompositionFromData; exports.getProductionCompositionMeta = _chunkFXYHRXCYjs.getProductionCompositionMeta; exports.isTemplateId = _chunkFXYHRXCYjs.isTemplateId; exports.loadPreviewTemplateComponent = _chunkFXYHRXCYjs.loadPreviewTemplateComponent;
//# sourceMappingURL=preview.js.map