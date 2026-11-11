import { resolveRosterDensity as resolveRosterDensityJs } from "../../../design/_shared/view-model/cricket/rosterDensity.js";

export type CricketRosterDensity = "normal" | "compact" | "tight";

export const resolveRosterDensity = (count: number): CricketRosterDensity =>
  resolveRosterDensityJs(count);
