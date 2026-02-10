import { PlayerData } from "../../../_types/types";

/**
 * Props interface for PlayerRow components
 */
export interface PlayerRowProps {
  player: PlayerData;
  index: number;
  rowHeight: number;
}
