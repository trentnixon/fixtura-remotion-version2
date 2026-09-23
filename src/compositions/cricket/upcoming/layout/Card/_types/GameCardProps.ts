import { GameData } from "../../../_types/types";
import type { BroadcastProFixtureDensity } from "../../../../../../templates/types/broadcast-pro/fixture-density";
import type { BroadcastProRoundedFixtureDensity } from "../../../../../../templates/types/broadcast-pro-rounded/fixture-density";

export interface GameCardProps {
  game: GameData;
  index: number;
  /** Per-card height from display calculations (e.g. Broadcast Pro fixture block). */
  gameRowHeight?: number;
  density?: BroadcastProFixtureDensity | BroadcastProRoundedFixtureDensity;
}
