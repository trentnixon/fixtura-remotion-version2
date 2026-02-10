import { PlayerData } from "../../../_types/types";
import { Sponsor } from "../../../../../../core/types/data/sponsors";

/**
 * Props interface for PlayersDisplay components
 */
export interface PlayersDisplayProps {
  players: PlayerData[];
  title?: string; // Optional title to display
  sponsors: Sponsor[];
}
