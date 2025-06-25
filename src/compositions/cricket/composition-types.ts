export interface AssignSponsors {
  team: {
    away: { name: string };
    home: { name: string };
    logo: {
      url: string;
      width?: number;
      height?: number;
    };
  }[];
  grade: {
    id: number;
    name: string;
    logo: {
      url: string;
      width?: number;
      height?: number;
    };
  }[];
  competition: {
    id: number;
    name: string;
    logo: {
      url: string;
      width?: number;
      height?: number;
    };
  }[];
}
