import {
  TEMPLATE_IDS,
  getProductionCompositionMeta,
  isTemplateId,
  loadPreviewTemplateComponent
} from "./chunk-DKALZAZL.mjs";
import {
  ScorelineBundledStyles
} from "./chunk-7DM3J7LM.mjs";
import {
  NightSessionBundledStyles
} from "./chunk-OWK4QLQ5.mjs";
import "./chunk-DAUNLCV7.mjs";

// src/package/FixturaTemplateScene.tsx
import { useEffect } from "react";

// src/package/previewTemplateComponent.tsx
import { Suspense, lazy, useMemo } from "react";
import { jsx } from "react/jsx-runtime";
var lazyByTemplate = /* @__PURE__ */ new Map();
function getLazyTemplate(templateId) {
  let existing = lazyByTemplate.get(templateId);
  if (!existing) {
    existing = lazy(
      () => loadPreviewTemplateComponent(templateId).then((defaultExport) => ({
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
  const PreviewTemplate = ({ data }) => /* @__PURE__ */ jsx(Suspense, { fallback: null, children: /* @__PURE__ */ jsx(LazyTemplate, { data }) });
  wrapperByTemplate.set(templateId, PreviewTemplate);
  return PreviewTemplate;
}

// src/package/getProductionCompositionFromData.ts
function getProductionCompositionFromData(data) {
  const meta = getProductionCompositionMeta(data);
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
import { Fragment, jsx as jsx2, jsxs } from "react/jsx-runtime";
var FixturaTemplateScene = ({
  data
}) => {
  const { TemplateComponent } = getProductionCompositionFromData(data);
  const templateId = data.videoMeta.video.appearance.template;
  useEffect(() => {
    if (isTemplateId(templateId)) {
      void loadPreviewTemplateComponent(templateId);
    }
  }, [templateId]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    templateId === "Scoreline" ? /* @__PURE__ */ jsx2(ScorelineBundledStyles, {}) : null,
    templateId === "NightSession" ? /* @__PURE__ */ jsx2(NightSessionBundledStyles, {}) : null,
    /* @__PURE__ */ jsx2(TemplateComponent, { data })
  ] });
};
export {
  FixturaTemplateScene,
  TEMPLATE_IDS,
  getProductionCompositionFromData,
  getProductionCompositionMeta,
  isTemplateId,
  loadPreviewTemplateComponent
};
//# sourceMappingURL=preview.mjs.map