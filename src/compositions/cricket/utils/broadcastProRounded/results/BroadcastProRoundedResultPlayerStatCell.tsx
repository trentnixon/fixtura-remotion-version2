import React from "react";
import { BroadcastProRoundedStatMatrixResultCell } from "../../../../../templates/variants/broadcastProRounded/components/stat";
import type { BroadcastProRoundedGlassStyle } from "../glass";
import type { BroadcastProRoundedResultStatItem } from "./types";

export interface BroadcastProRoundedResultPlayerStatCellProps
  extends BroadcastProRoundedResultStatItem {
  delay: number;
  accentColor: string;
  glass?: BroadcastProRoundedGlassStyle;
  className?: string;
}

/** @deprecated Use `BroadcastProRoundedStatMatrixResultCell` from template stat components. */
export const BroadcastProRoundedResultPlayerStatCell: React.FC<
  BroadcastProRoundedResultPlayerStatCellProps
> = (props) => <BroadcastProRoundedStatMatrixResultCell {...props} />;
