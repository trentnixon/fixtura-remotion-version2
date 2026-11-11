import type { TeamOfTheWeekPlayer } from "../../../TeamOfTheWeek/types";
import { splitTotwPlayerColumns as splitTotwPlayerColumnsCore } from "../../../../../cricket/viewModel/totwPlayerColumns";

export const splitTotwPlayerColumns = (
  players: TeamOfTheWeekPlayer[],
): [TeamOfTheWeekPlayer[], TeamOfTheWeekPlayer[]] =>
  splitTotwPlayerColumnsCore(players);
