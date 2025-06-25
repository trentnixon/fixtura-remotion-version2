import { FixturaDataset } from "../../data/root";
import { ImageLogo } from "../../data/common";
import { HomeTeam, AwayTeam } from "../../data/team";
import { UserTheme } from "../../data/userTheme";
import { Video } from "../../data/videoData";

export interface CricketResultsData {
  data: CricketResult[];
  theme: UserTheme;
  video: Video;
  fixtureCategory: string;
  groupingCategory: string;
}

export interface CricketResult {
  gameID: string;
  status: string;
  homeTeam: HomeTeam;
  awayTeam: AwayTeam;
  teamHomeLogo: ImageLogo;
  teamAwayLogo: ImageLogo;
  date: string;
  type: string;
  ground: string;
  round: string;
  gender: string;
  ageGroup: string;
  gradeName: string;
  assignSponsors: {
    competition: unknown[]; // Can be typed more strictly if needed
    grade: unknown[];
    team: unknown[];
  };
  result: string;
  prompt: string;
}

export type CricketResultsDataset = FixturaDataset<CricketResult>;
