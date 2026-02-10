import { TeamOfTheWeekPlayer } from "../../../types";
import { Sponsor } from "../../../../../../core/types/data/sponsors";

/**
 * Props interface for TeamOfTheWeekDisplay components
 */
export interface TeamOfTheWeekDisplayProps {
  players: TeamOfTheWeekPlayer[];
  sponsors: Sponsor[];
  title?: string; // Optional title prop (used by CNSW variants)
}
