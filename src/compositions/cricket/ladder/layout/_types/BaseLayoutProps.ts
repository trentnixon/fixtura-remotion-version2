import { TeamData } from "../../types";

export interface BaseLayoutProps {
  team: TeamData;
  delay: number;
  LadderRowHeight: number;
  place: number;
  bgColorClass?: string;
}
