"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _chunkJWJS6C42js = require('./chunk-JWJS6C42.js');


var _chunkNUR6EFVIjs = require('./chunk-NUR6EFVI.js');


var _chunkHNDIY6ATjs = require('./chunk-HNDIY6AT.js');



var _chunk5OPIAWHPjs = require('./chunk-5OPIAWHP.js');

// src/package/FixturaTemplateScene.tsx
var _react = require('react');

// src/package/previewTemplateComponent.tsx

var _jsxruntime = require('react/jsx-runtime');
var lazyByTemplate = /* @__PURE__ */ new Map();
function getLazyTemplate(templateId) {
  let existing = lazyByTemplate.get(templateId);
  if (!existing) {
    existing = _react.lazy.call(void 0, 
      () => _chunkJWJS6C42js.loadPreviewTemplateComponent.call(void 0, templateId).then((defaultExport) => ({
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
  const meta = _chunkJWJS6C42js.getProductionCompositionMeta.call(void 0, data);
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
    if (_chunk5OPIAWHPjs.isTemplateId.call(void 0, templateId)) {
      void _chunkJWJS6C42js.loadPreviewTemplateComponent.call(void 0, templateId);
    }
  }, [templateId]);
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
    templateId === "Scoreline" ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunkNUR6EFVIjs.ScorelineBundledStyles, {}) : null,
    templateId === "NightSession" ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunkHNDIY6ATjs.NightSessionBundledStyles, {}) : null,
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, TemplateComponent, { data })
  ] });
};







exports.FixturaTemplateScene = FixturaTemplateScene; exports.TEMPLATE_IDS = _chunk5OPIAWHPjs.TEMPLATE_IDS; exports.getProductionCompositionFromData = getProductionCompositionFromData; exports.getProductionCompositionMeta = _chunkJWJS6C42js.getProductionCompositionMeta; exports.isTemplateId = _chunk5OPIAWHPjs.isTemplateId; exports.loadPreviewTemplateComponent = _chunkJWJS6C42js.loadPreviewTemplateComponent;
//# sourceMappingURL=preview.js.map