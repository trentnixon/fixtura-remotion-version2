import React from "react";
import { BroadcastProRoundedStatMatrixResultGrid } from "../../../../../templates/variants/broadcastProRounded/components/stat";
import type { BroadcastProRoundedGlassStyle } from "../glass";
import type { BroadcastProRoundedResultStatItem } from "./types";
import type {
  AnimationConfig,
  AnimationType,
} from "../../../../../components/typography/config/animations";

export interface BroadcastProRoundedResultPlayerStatsGridProps {
  items: BroadcastProRoundedResultStatItem[];
  delay: number;
  accentColor: string;
  glass?: BroadcastProRoundedGlassStyle;
  className?: string;
  tier?: "list" | "single";
  exitAnimation?: AnimationType | AnimationConfig;
  exitFrame?: number;
}

/** @deprecated Use `BroadcastProRoundedStatMatrixResultGrid` from template stat components. */
export const BroadcastProRoundedResultPlayerStatsGrid: React.FC<
  BroadcastProRoundedResultPlayerStatsGridProps
> = (props) => <BroadcastProRoundedStatMatrixResultGrid {...props} />;
