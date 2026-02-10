import { PlayerData } from "../../_types/types";

/**
 * Props interface for PlayerRow layout components
 */
export interface PlayerRowLayoutProps {
  player: PlayerData;
  index: number;
  rowHeight: number;
  delay: number;
}

/**
 * Props interface for PlayerRow layout components that require restrictions
 */
export interface PlayerRowLayoutPropsWithRestrictions extends PlayerRowLayoutProps {
  restrictions: { nameLength: number; teamLength: number };
}
