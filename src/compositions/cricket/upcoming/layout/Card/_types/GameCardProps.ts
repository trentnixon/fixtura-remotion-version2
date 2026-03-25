import { GameData } from "../../../_types/types";

export interface GameCardProps {
  game: GameData;
  index: number;
  /** Per-card height from display calculations (e.g. Broadcast Pro fixture block). */
  gameRowHeight?: number;
}
