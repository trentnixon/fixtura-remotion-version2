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
  /** Last row in the list — disables panel underlay bleed past the container bottom. */
  isLast?: boolean;
}
