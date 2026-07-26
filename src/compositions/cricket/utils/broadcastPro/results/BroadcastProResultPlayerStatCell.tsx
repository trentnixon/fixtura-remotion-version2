import React from "react";
import { BroadcastProStatMatrixResultCell } from "../../../../../templates/variants/broadcastPro/components/stat";
import type { BroadcastProGlassStyle } from "../glass";
import type { BroadcastProResultStatItem } from "./types";

export interface BroadcastProResultPlayerStatCellProps
  extends BroadcastProResultStatItem {
  delay: number;
  accentColor: string;
  glass?: BroadcastProGlassStyle;
  className?: string;
}

/** @deprecated Use `BroadcastProStatMatrixResultCell` from template stat components. */
export const BroadcastProResultPlayerStatCell: React.FC<
  BroadcastProResultPlayerStatCellProps
> = (props) => <BroadcastProStatMatrixResultCell {...props} />;
