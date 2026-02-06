import { TeamData } from "../../../types";

export interface TeamRowProps {
  team: TeamData;
  index: number;
  totalTeams: number;
  isBiasTeam: boolean;
  LadderRowHeight: number;
  wrapperClass?: string;
}
