// types/data/match.ts

import { AssignSponsors } from "../../../compositions/cricket/composition-types";
import { ImageLogo } from "./common";
import { HomeTeam, AwayTeam } from "./team";

// Match data structure
export interface MatchData {
  date: string;
  type: string;
  round: string;
  gameID: string;
  gender: string;
  ground: string;
  prompt: string;
  result: string;
  status: string;
  ageGroup: string;
  awayTeam: AwayTeam;
  homeTeam: HomeTeam;
  gradeName: string;
  teamAwayLogo: ImageLogo;
  teamHomeLogo: ImageLogo;
  assignSponsors: AssignSponsors;
}
