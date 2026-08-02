import React from "react";
import { BroadcastProRoundedStatMatrixTriple } from "../../../../../templates/variants/broadcastProRounded/components/stat";
import type { BroadcastProRoundedGlassStyle } from "../glass";
import type { BroadcastProRoundedTextOnContainer } from "../themeColors";
import type {
  BroadcastProRoundedPlayerRankingLayout,
  BroadcastProRoundedTripleStat,
} from "./types";
import type { BroadcastProRoundedStatMatrixCell } from "../../../../../templates/types/broadcast-pro-rounded/stat-matrix";

export interface BroadcastProRoundedPlayerTripleStatsRowProps {
  triple: BroadcastProRoundedTripleStat;
  layout: BroadcastProRoundedPlayerRankingLayout;
  headingFont: string;
  cs: (key: string) => string;
  text: BroadcastProRoundedTextOnContainer;
  glass: BroadcastProRoundedGlassStyle;
  accent: string;
}

const layoutToTier = (
  layout: BroadcastProRoundedPlayerRankingLayout,
): "featuredTriple" | "gridTriple" | "performancesTriple" => {
  if (layout === "featured") return "featuredTriple";
  if (layout === "gridPerformances") return "performancesTriple";
  return "gridTriple";
};

const tripleToCells = (
  triple: BroadcastProRoundedTripleStat,
): BroadcastProRoundedStatMatrixCell[] => [
  { label: triple.label1, value: triple.value1 },
  { label: triple.label2, value: triple.value2 },
  { label: triple.label3, value: triple.value3 },
];

/** @deprecated Use `BroadcastProRoundedStatMatrixTriple` from template stat components. */
export const BroadcastProRoundedPlayerTripleStatsRow: React.FC<
  BroadcastProRoundedPlayerTripleStatsRowProps
> = ({ triple, layout, headingFont, text, glass, accent }) => (
  <BroadcastProRoundedStatMatrixTriple
    cells={tripleToCells(triple)}
    tier={layoutToTier(layout)}
    headingFont={headingFont}
    text={text}
    glass={glass}
    accent={accent}
  />
);
