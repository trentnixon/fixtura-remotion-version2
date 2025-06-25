import { ImageLogo } from "../../data/common";
import { FixturaDataset } from "../../data/root";

export interface TopBowler {
  name: string;
  runs: number;
  overs: string;
  prompt: string;
  wickets: number;
  teamLogo: ImageLogo;
  playedFor: string;
  assignSponsors: {
    team: { name: string };
    grade: { id: number; name: string };
    competition: { id: number; name: string };
  };
}

export type TopBowlersDataset = FixturaDataset<TopBowler>;
