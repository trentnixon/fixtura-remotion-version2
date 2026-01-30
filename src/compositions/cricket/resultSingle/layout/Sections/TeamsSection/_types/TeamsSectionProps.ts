import { Team, TeamLogo as TeamLogoType } from "../../../../types";

export interface TeamsSectionProps {
  type: string;
  homeTeam: Team;
  awayTeam: Team;
  homeTeamLogo?: TeamLogoType;
  awayTeamLogo?: TeamLogoType;
  delay: number;
  outerContainer?: object;
  backgroundColor?: string;
  height?: number;
}
