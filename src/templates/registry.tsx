import { Basic } from "./variants/basic";
import { Brickwork } from "./variants/brickwork";
import { Classic } from "./variants/classic";
import { Sixers } from "./variants/sixers";
import { CNSW } from "./variants/cnsw";
import { Thunder } from "./variants/thunder";
import { TwoColumnClassic } from "./variants/twoColumnClassic";
/**
 * Define template registry key type
 */
export type TemplateId = keyof typeof templateRegistry;

/**
 * Central registry of all available templates
 */
const Variants = [
  "Graphics",
  "Solid",
  "Image",
  "Gradient",
  "Video",
  "Particle",
  "Pattern",
  "Texture",
];
export const templateRegistry = {
  Basic: {
    component: Basic,
    variants: Variants,
  },
  Brickwork: {
    component: Brickwork,
    variants: Variants,
  },
  Classic: {
    component: Classic,
    variants: Variants,
  },
  CNSW: {
    component: CNSW,
    variants: Variants,
  },
  Sixers: {
    component: Sixers,
    variants: Variants,
  },
  Thunder: {
    component: Thunder,
    variants: Variants,
  },
  TwoColumnClassic: {
    component: TwoColumnClassic,
    variants: Variants,
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
