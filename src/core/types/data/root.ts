// types/data/root.ts

import { Asset } from "./assets";
import { Render, Account, Timings } from "./common";
import { VideoMeta } from "./videoData";

// Make FixturaDataset generic for the data key
export interface FixturaDataset<T = unknown> {
  id?: string;
  data: T[];
  asset: Asset;
  render: Render;
  account: Account;
  timings: Timings;
  frames: number[];
  videoMeta: VideoMeta;
  errors: unknown[];
}
