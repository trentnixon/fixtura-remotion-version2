import { Basic } from "./variants/basic";
/**
 * Define template registry key type
 */
export type TemplateId = keyof typeof templateRegistry;

/**
 * Central registry of all available templates
 */
export const templateRegistry = {
  Basic: {
    component: Basic,
    variants: ["Graphics", "Solid", "Image", "Gradient", "Video"],
    config: {
      // Template-specific configuration
    },
  },
};

/**
 * Helper function to get a template by ID
 */
export const getTemplate = (id: TemplateId) => templateRegistry[id] || null;

/**
 * Helper function to check if a template exists
 */
export const isValidTemplate = (id: string): id is TemplateId =>
  id in templateRegistry;
