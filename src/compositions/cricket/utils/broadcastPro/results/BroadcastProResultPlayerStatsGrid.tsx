import React from "react";
import { BroadcastProStatMatrixResultGrid } from "../../../../../templates/variants/broadcastPro/components/stat";
import type { BroadcastProGlassStyle } from "../glass";
import type { BroadcastProResultStatItem } from "./types";

export interface BroadcastProResultPlayerStatsGridProps {
  items: BroadcastProResultStatItem[];
  delay: number;
  accentColor: string;
  glass?: BroadcastProGlassStyle;
  className?: string;
  tier?: "list" | "single";
}

/** @deprecated Use `BroadcastProStatMatrixResultGrid` from template stat components. */
export const BroadcastProResultPlayerStatsGrid: React.FC<
  BroadcastProResultPlayerStatsGridProps
> = (props) => <BroadcastProStatMatrixResultGrid {...props} />;
