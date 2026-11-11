/**
 * Registry ID list for publish-surface code splitting (no variant imports).
 */
export const TEMPLATE_IDS = [
  "Basic",
  "Brickwork",
  "Classic",
  "CNSW",
  "CNSWPrivate",
  "Sixers",
  "Thunder",
  "TwoColumnClassic",
  "Mudgeeraba",
  "BroadcastPro",
  "BroadcastProRounded",
  "Scoreline",
  "NightSession",
] as const;

export type TemplateId = (typeof TEMPLATE_IDS)[number];

export function isTemplateId(id: string): id is TemplateId {
  return (TEMPLATE_IDS as readonly string[]).includes(id);
}
