import type { CSSProperties } from "react";

/** Tabular lining numerals for aligned score / points columns. */
export const CLASSIC_TABULAR_NUMS_STYLE = {
  fontVariantNumeric: "tabular-nums" as const,
};

export const CLASSIC_HERO_NUMBER_CLASSES =
  "tabular-nums font-black tracking-tight leading-none";

export const CLASSIC_STAT_SUFFIX_CLASSES =
  "tabular-nums font-normal tracking-tight leading-none";

export const CLASSIC_MICRO_LABEL_CLASSES =
  "tabular-nums font-medium tracking-tight leading-none uppercase";

export const getClassicTabularNumsStyle = (): CSSProperties =>
  CLASSIC_TABULAR_NUMS_STYLE;
