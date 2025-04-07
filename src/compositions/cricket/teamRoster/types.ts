export interface Sponsor {
  Logo: string;
  Name: string;
  width: number;
  height: number;
  isPrimary: boolean;
  URL?: string; // Optional as seen in videoMeta.club.Sponsors
}

export interface RosterDataItem {
  date: string;
  type: string;
  round: string;
  gameId: string;
  gender: string;
  ground: string;
  ageGroup: string;
  sponsors: Sponsor[]; // Note: This seems specific to the fixture in the data array, not the main club sponsors
  teamAway: string;
  teamHome: string;
  gradeName: string;
  isHomeTeam: boolean;
  teamRoster: string[]; // Array of player names
  teamAwayLogo: string;
  teamHomeLogo: string;
}

// If the entire data structure from the context is needed, define it too
// For now, focusing on the item within the 'data' array
