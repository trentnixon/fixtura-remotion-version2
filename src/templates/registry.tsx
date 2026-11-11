import {
  TEMPLATE_REGISTRATION_MANIFEST,
  type TemplateId,
} from "./templateRegistrationManifest";
import { TEMPLATE_SHELL_COMPONENTS } from "./templateShellComponents";

export type { TemplateId };

const Variants = [
  "Solid",
  "Image",
  "Gradient",
  "Video",
  "Texture",
  "Luminance",
] as const;

/**
 * Central registry of all available templates (shell + background variant list).
 */
export const templateRegistry = Object.fromEntries(
  TEMPLATE_REGISTRATION_MANIFEST.map(({ registryId }) => [
    registryId,
    {
      component: TEMPLATE_SHELL_COMPONENTS[registryId],
      variants: [...Variants],
    },
  ]),
) as Record<
  TemplateId,
  {
    component: (typeof TEMPLATE_SHELL_COMPONENTS)[TemplateId];
    variants: (typeof Variants)[number][];
  }
>;

export const getTemplate = (id: TemplateId) => templateRegistry[id] || null;

export const isValidTemplate = (id: string): id is TemplateId =>
  id in templateRegistry;
