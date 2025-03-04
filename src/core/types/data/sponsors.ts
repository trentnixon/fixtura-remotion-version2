// types/data/sponsors.ts

import { ImageLogo } from "./common";
import { TeamsAssignSponsors } from "./team";

// Grade structure for assign sponsors
export interface GradeAssignSponsors {
  id: number;
  name: string;
}

// Competition structure for assign sponsors
export interface CompetitionAssignSponsors {
  id: number;
  name: string;
}

// Assign sponsors structure
export interface AssignSponsors {
  Teams: TeamsAssignSponsors;
  grade: GradeAssignSponsors;
  competition: CompetitionAssignSponsors;
}

// Sponsor structure
export interface Sponsor {
  logo: ImageLogo;
  name: string;
  sponsorId: number;
  position?: number;
  level?: string;
  allocationName?: string;
}

// Default sponsors structure
export interface DefaultSponsors {
  primary_sponsor: Sponsor;
  general_sponsors: Sponsor[];
}

// Club sponsors structure
export interface ClubSponsors {
  grade: Sponsor[];
  default: DefaultSponsors;
}

// Club structure
export interface Club {
  Logo: ImageLogo;
  Name: string;
  Sport: string;
  Sponsors: ClubSponsors;
}
