import React from "react";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { ResultPlayerName } from "../../../../../compositions/cricket/utils/primitives/ResultPlayerName";
import { BroadcastProGlassPanel } from "../../../../../compositions/cricket/utils/broadcastPro/results/BroadcastProGlassPanel";
import { csClass } from "../../../../../compositions/cricket/utils/broadcastPro/componentStyles";
import type { BroadcastProGlassStyle } from "../../../../../compositions/cricket/utils/broadcastPro/glass";
import { BroadcastProStatMatrixCompact } from "./BroadcastProStatMatrixCompact";

export interface BroadcastProStatMatrixResultCellProps {
  playerName: string;
  statValue: string;
  highlight?: boolean;
  delay: number;
  accentColor: string;
  glass?: BroadcastProGlassStyle;
  className?: string;
  tier?: "list" | "single";
}

const SINGLE_CELL_CLASS =
  "!flex !flex-col !items-start !justify-start gap-0 !py-3 !px-4";
const SINGLE_PLAYER_NAME_CLASS =
  "!text-4xl font-semibold !leading-none tracking-wide !opacity-100 -mt-1.5";
const SINGLE_STAT_PRIMARY_CLASS =
  "font-teko !text-6xl font-bold !tracking-wide !leading-none";
const SINGLE_STAT_SUFFIX_CLASS =
  "font-teko !text-3xl font-normal !tracking-wider !leading-none opacity-70";

export const BroadcastProStatMatrixResultCell: React.FC<
  BroadcastProStatMatrixResultCellProps
> = ({
  playerName,
  statValue,
  highlight = false,
  delay,
  accentColor,
  glass,
  className = "",
  tier = "list",
}) => {
  const { animations } = useAnimationContext();
  const { componentStyles, fontClasses, fonts } = useThemeContext();
  const copyIn = animations.text.main.copyIn;
  const cellClass = csClass(
    componentStyles,
    "broadcastProStatMatrixResultCell",
  );
  const nameClass = csClass(
    componentStyles,
    "broadcastProStatMatrixResultName",
  );
  const valueClass = csClass(
    componentStyles,
    "broadcastProStatMatrixResultValue",
  );
  const headingFont =
    fontClasses?.heading?.family ?? fonts?.title?.family ?? "Teko";
  const isSingle = tier === "single";
  const resolvedNameClass = [
    nameClass,
    isSingle ? SINGLE_PLAYER_NAME_CLASS : "",
  ]
    .filter(Boolean)
    .join(" ");

  const statBlock = (
    <div
      className={isSingle ? "w-full" : valueClass}
      style={highlight ? { color: accentColor } : undefined}
    >
      <BroadcastProStatMatrixCompact
        value={statValue}
        animation={{ ...copyIn, delay: delay + 2 }}
        colorVariant={highlight ? "onContainerTitle" : "onContainerCopy"}
        fontFamily={headingFont}
        className={isSingle ? SINGLE_STAT_PRIMARY_CLASS : undefined}
        suffixClassName={isSingle ? SINGLE_STAT_SUFFIX_CLASS : undefined}
      />
    </div>
  );

  const nameBlock = (
    <ResultPlayerName
      value={playerName}
      animation={{ ...copyIn, delay }}
      variant="onContainerCopy"
      className={resolvedNameClass}
    />
  );

  return (
    <BroadcastProGlassPanel
      glass={glass}
      className={`${cellClass} ${isSingle ? SINGLE_CELL_CLASS : ""} ${className}`.trim()}
    >
      {isSingle ? (
        <>
          {statBlock}
          {nameBlock}
        </>
      ) : (
        <>
          {nameBlock}
          {statBlock}
        </>
      )}
    </BroadcastProGlassPanel>
  );
};
