import { TeamOfTheWeekPlayer } from "../../../types";

/**
 * Extended PlayerRowProps for variants that require a delay prop
 * (e.g., CNSW variants that calculate delay externally)
 */
export interface PlayerRowPropsWithDelay {
  player: TeamOfTheWeekPlayer;
  index: number;
  rowHeight: number;
  delay: number;
}
