import {
  isTemplateId,
  type TemplateId,
} from "../templates/templateRegistrationManifest";
import {
  TEMPLATE_PREVIEW_LOADERS,
  type PreviewTemplateComponent,
} from "../templates/templatePreviewLoaders";

export type { PreviewTemplateComponent };

export function hasPreviewTemplateLoader(
  templateId: string,
): templateId is TemplateId {
  return isTemplateId(templateId) && templateId in TEMPLATE_PREVIEW_LOADERS;
}

/**
 * Loads a single Registry ID implementation chunk (for Player hosts and tests).
 */
export function loadPreviewTemplateComponent(
  templateId: TemplateId,
): Promise<PreviewTemplateComponent> {
  const loader = TEMPLATE_PREVIEW_LOADERS[templateId];
  return loader().then((m) => m.default);
}
