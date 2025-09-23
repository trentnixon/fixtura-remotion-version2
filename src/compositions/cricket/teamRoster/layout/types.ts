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
  logo: { id: number; url: string; width?: number; height?: number };
}

export interface RosterDataItem {
  date: string;
  type: string;
  round: string;
  gameId: string;
  gender: string;
  ground: string;
  ageGroup: string;
  sponsors: Sponsor[];
  teamAway: string;
  teamHome: string;
  gradeName: string;
  isHomeTeam: boolean;
  teamRoster: string[];
  teamAwayLogo: string;
  teamHomeLogo: string;
}
