import { TeamLogo as TeamLogoType } from "../../../../_types/types";

export interface TeamLayoutProps {
  teamHome: string;
  teamAway: string;
  teamHomeLogo: TeamLogoType | null;
  teamAwayLogo: TeamLogoType | null;
  delay: number;
  vsAdditionalInfo?: string; // Optional string to display under VS
  backgroundColor?: string;
  logoPosition?: "center" | "split" | "together";
}
