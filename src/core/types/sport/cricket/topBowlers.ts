import { ImageLogo } from "../../data/common";
import { FixturaDataset } from "../../data/root";
import { AssignSponsors, Sponsor } from "../../data/sponsors";

export interface TopBowler {
  name: string;
  runs: number;
  overs: string;
  prompt: string;
  wickets: number;
  teamLogo: ImageLogo;
  playedFor: string;
  gradeName?: string;
  assignSponsors: AssignSponsors;
  primaryForScreen?: Sponsor[];
}

export type TopBowlersDataset = FixturaDataset<TopBowler>;
