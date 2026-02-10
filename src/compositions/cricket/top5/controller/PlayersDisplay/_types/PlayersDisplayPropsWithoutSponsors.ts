import { PlayerData } from "../../../_types/types";

/**
 * Props interface for PlayersDisplay components that don't use sponsors
 * (e.g., SixersThunder variant)
 */
export interface PlayersDisplayPropsWithoutSponsors {
  players: PlayerData[];
  title?: string; // Optional title to display
}
