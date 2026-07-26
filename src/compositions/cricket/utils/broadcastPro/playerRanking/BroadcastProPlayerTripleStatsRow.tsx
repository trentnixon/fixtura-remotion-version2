import React from "react";
import { BroadcastProStatMatrixTriple } from "../../../../../templates/variants/broadcastPro/components/stat";
import type { BroadcastProGlassStyle } from "../glass";
import type { BroadcastProTextOnContainer } from "../themeColors";
import type {
  BroadcastProPlayerRankingLayout,
  BroadcastProTripleStat,
} from "./types";
import type { BroadcastProStatMatrixCell } from "../../../../../templates/types/broadcast-pro/stat-matrix";

export interface BroadcastProPlayerTripleStatsRowProps {
  triple: BroadcastProTripleStat;
  layout: BroadcastProPlayerRankingLayout;
  headingFont: string;
  cs: (key: string) => string;
  text: BroadcastProTextOnContainer;
  glass: BroadcastProGlassStyle;
  accent: string;
}

const layoutToTier = (
  layout: BroadcastProPlayerRankingLayout,
): "featuredTriple" | "gridTriple" | "performancesTriple" => {
  if (layout === "featured") return "featuredTriple";
  if (layout === "gridPerformances") return "performancesTriple";
  return "gridTriple";
};

const tripleToCells = (
  triple: BroadcastProTripleStat,
): BroadcastProStatMatrixCell[] => [
  { label: triple.label1, value: triple.value1 },
  { label: triple.label2, value: triple.value2 },
  { label: triple.label3, value: triple.value3 },
];

/** @deprecated Use `BroadcastProStatMatrixTriple` from template stat components. */
export const BroadcastProPlayerTripleStatsRow: React.FC<
  BroadcastProPlayerTripleStatsRowProps
> = ({ triple, layout, headingFont, text, glass, accent }) => (
  <BroadcastProStatMatrixTriple
    cells={tripleToCells(triple)}
    tier={layoutToTier(layout)}
    headingFont={headingFont}
    text={text}
    glass={glass}
    accent={accent}
  />
);
