// types/data/sponsors.ts

import { ImageLogo } from "./common";

/** Guaranteed sponsor DTO from Scheduler sponsors payload v2. */
export interface Sponsor {
  id: number;
  name: string;
  logo: SponsorLogo;
}

export interface SponsorLogo {
  id: number;
  url: string;
  width?: number;
  height?: number;
}

/** Account-level sponsors on videoMeta.club.sponsors */
export interface SponsorsData {
  primary: Sponsor[];
  general: Sponsor[];
  sponsorNum: number;
}

/** Per-row / entity assign buckets (arrays of sponsor DTOs). */
export interface AssignSponsors {
  competition: Sponsor[];
  grade: Sponsor[];
  team: Sponsor[];
}

export interface Club {
  logo: ImageLogo;
  name: string;
  sport: string;
  sponsors: SponsorsData;
  IsAccountClub?: boolean;
}
