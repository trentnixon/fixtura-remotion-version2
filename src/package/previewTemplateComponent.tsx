import React, { Suspense, lazy, useMemo } from "react";
import type { FixturaDataset } from "../core/types/data/index";
import type { TemplateId } from "../templates/templateIds";
import {
  loadPreviewTemplateComponent,
  type PreviewTemplateComponent,
} from "./loadPreviewTemplate";

const lazyByTemplate = new Map<
  TemplateId,
  React.LazyExoticComponent<PreviewTemplateComponent>
>();

function getLazyTemplate(templateId: TemplateId) {
  let existing = lazyByTemplate.get(templateId);
  if (!existing) {
    existing = lazy(() =>
      loadPreviewTemplateComponent(templateId).then((defaultExport) => ({
        default: defaultExport,
      })),
    );
    lazyByTemplate.set(templateId, existing);
  }
  return existing;
}

const wrapperByTemplate = new Map<TemplateId, PreviewTemplateComponent>();

export function createPreviewTemplateComponent(
  templateId: TemplateId,
): PreviewTemplateComponent {
  const cached = wrapperByTemplate.get(templateId);
  if (cached) {
    return cached;
  }

  const LazyTemplate = getLazyTemplate(templateId);

  const PreviewTemplate: PreviewTemplateComponent = ({ data }) => (
    <Suspense fallback={null}>
      <LazyTemplate data={data} />
    </Suspense>
  );

  wrapperByTemplate.set(templateId, PreviewTemplate);
  return PreviewTemplate;
}

/**
 * Scene shell that lazy-loads the Registry ID chunk for the dataset.
 */
export const LazyFixturaTemplateBody: React.FC<{
  templateId: TemplateId;
  data: FixturaDataset;
}> = ({ templateId, data }) => {
  const Template = useMemo(
    () => createPreviewTemplateComponent(templateId),
    [templateId],
  );
  return <Template data={data} />;
};
