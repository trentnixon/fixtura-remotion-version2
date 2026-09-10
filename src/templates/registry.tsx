import { Basic } from "./variants/basic";
import { Brickwork } from "./variants/brickwork";
import { Classic } from "./variants/classic";
import { Sixers } from "./variants/sixers";
import { CNSW } from "./variants/cnsw";
import { Thunder } from "./variants/thunder";
import { TwoColumnClassic } from "./variants/twoColumnClassic";
import { CNSWPrivate } from "./variants/cnsw-private";
import { Mudgeeraba } from "./variants/mudgeeraba";
import { BroadcastPro } from "./variants/broadcastPro";
import { BroadcastProRounded } from "./variants/broadcastProRounded";
import { Scoreline } from "./variants/scoreline";
/**
 * Define template registry key type
 */
export type TemplateId = keyof typeof templateRegistry;

/**
 * Central registry of all available templates
 */
const Variants = [
  "Solid",
  "Image",
  "Gradient",
  "Video",
  "Texture",
  "Luminance",
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
  CNSWPrivate: {
    component: CNSWPrivate,
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
  Mudgeeraba: {
    component: Mudgeeraba,
    variants: Variants,
  },
  BroadcastPro: {
    component: BroadcastPro,
    variants: Variants,
  },
  BroadcastProRounded: {
    component: BroadcastProRounded,
    variants: Variants,
  },
  Scoreline: {
    component: Scoreline,
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
