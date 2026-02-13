import { TeamData } from "../../../types";

export interface TeamRowProps {
  team: TeamData;
  index: number;
  totalTeams: number;
  isBiasTeam: boolean;
  LadderRowHeight: number;
  wrapperClass?: string;
  /** When true, use tighter padding, smaller logo and font so more rows fit */
  compact?: boolean;
}
