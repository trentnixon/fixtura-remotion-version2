// types/data/sponsors.ts

import { ImageLogo } from "./common";

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

export interface SponsorsData {
  primary: Sponsor[];
  default: Record<string, Sponsor[]>;
}

export interface Sponsor {
  id: number;
  isPrimary: boolean;
  isActive: boolean;
  isArticle: boolean;
  isVideo: boolean;
  url: string;

  tagline: string;
  description: string | null;
  name: string;
  logo: Logo;
}

export interface Logo {
  id: number;
  url: string;
  width: number;
  height: number;
}

// Club structure
export interface Club {
  logo: ImageLogo;
  name: string;
  sport: string;
  sponsors: SponsorsData;
  IsAccountClub?: boolean;
}
