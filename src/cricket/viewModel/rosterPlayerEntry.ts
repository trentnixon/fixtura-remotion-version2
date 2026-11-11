import { parseRosterPlayerEntry as parseRosterPlayerEntryJs } from "../../../design/_shared/view-model/cricket/rosterPlayerEntry.js";

export type CricketRosterBadge = {
  label: string;
  captain: boolean;
};

export type CricketRosterPlayerEntry = {
  emptyRoster: boolean;
  name: string;
  badges: CricketRosterBadge[];
};

export const parseRosterPlayerEntry = (
  raw: string,
): CricketRosterPlayerEntry => parseRosterPlayerEntryJs(raw);
