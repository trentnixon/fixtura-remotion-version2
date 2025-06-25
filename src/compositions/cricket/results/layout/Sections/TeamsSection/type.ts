import { Team, TeamLogo as TeamLogoType } from "../../../types";
export interface TeamsSectionProps {
  homeTeam: Team;
  awayTeam: Team;
  homeTeamLogo?: TeamLogoType;
  awayTeamLogo?: TeamLogoType;
  height: number;
  delay: number;
  backgroundColor: string;
}
