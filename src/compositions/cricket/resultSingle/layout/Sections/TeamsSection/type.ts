import { Team, TeamLogo } from "../../../types";

export interface TeamsSectionProps {
  homeTeam: Team;
  awayTeam: Team;
  homeTeamLogo: TeamLogo;
  awayTeamLogo: TeamLogo;
  height: number;
  delay: number;
  type: string;
}
