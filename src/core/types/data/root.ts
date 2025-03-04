// types/data/root.ts

import { Asset } from "./assets";
import { Render, Account, Timings } from "./common";
import { VideoMeta } from "./videoData";
import { MatchData } from "./match";

// Main data structure that encompasses all
export interface FixturaDataset {
  // Add id property that's being used in the codebase
  id?: string;

  DATA: MatchData[];
  ASSET: Asset;
  PROMPT: any[];
  RENDER: Render;
  ACCOUNT: Account;
  TIMINGS: Timings;
  VIDEOMETA: VideoMeta;
}
