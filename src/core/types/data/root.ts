// types/data/root.ts

import { Asset } from "./assets";
import { Render, Account, timings } from "./common";
import { VideoMeta } from "./videoData";
import { MatchData } from "./match";

// Main data structure that encompasses all
export interface FixturaDataset {
  // Add id property that's being used in the codebase
  id?: string;

  data: MatchData[];
  ASSET: Asset;
  PROMPT: any[];
  RENDER: Render;
  ACCOUNT: Account;
  timings: timings;
  videoMeta: VideoMeta;
}
