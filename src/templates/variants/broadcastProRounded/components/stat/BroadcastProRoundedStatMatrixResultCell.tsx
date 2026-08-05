import React from "react";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { ResultPlayerName } from "../../../../../compositions/cricket/utils/primitives/ResultPlayerName";
import { BroadcastProRoundedGlassPanel } from "../../../../../compositions/cricket/utils/broadcastProRounded/results/BroadcastProRoundedGlassPanel";
import { csClass } from "../../../../../compositions/cricket/utils/broadcastProRounded/componentStyles";
import { useBroadcastProRoundedTheme } from "../../../../../compositions/cricket/utils/broadcastProRounded";
import type { BroadcastProRoundedGlassStyle } from "../../../../../compositions/cricket/utils/broadcastProRounded/glass";
import type {
  AnimationConfig,
  AnimationType,
} from "../../../../../components/typography/config/animations";
import { BroadcastProRoundedStatMatrixCompact } from "./BroadcastProRoundedStatMatrixCompact";
import { resultContainerDelay } from "../../../../../compositions/cricket/utils/broadcastProRounded/results/matchContentHelpers";

export interface BroadcastProRoundedStatMatrixResultCellProps {
  playerName: string;
  statValue: string;
  highlight?: boolean;
  delay: number;
  accentColor: string;
  glass?: BroadcastProRoundedGlassStyle;
  className?: string;
  tier?: "list" | "single";
  exitAnimation?: AnimationType | AnimationConfig;
  exitFrame?: number;
}

const SINGLE_CELL_CLASS =
  "!flex !flex-col !items-start !justify-start gap-0 !py-3 !px-4";
const SINGLE_PLAYER_NAME_CLASS =
  "!text-[38px] font-semibold !leading-none tracking-wide !opacity-100 -mt-1.5";
const SINGLE_STAT_PRIMARY_CLASS =
  "font-teko !text-[62px] !font-normal !tracking-wide !leading-none";
const SINGLE_STAT_SUFFIX_CLASS =
  "font-teko !text-[32px] font-normal !tracking-wider !leading-none opacity-70";
const LIST_STAT_PRIMARY_CLASS =
  "font-teko !text-[32px] !font-normal !tracking-tight !leading-tight";
const LIST_STAT_SUFFIX_CLASS =
  "font-teko !text-[26px] font-normal !tracking-tight !leading-tight opacity-70";

export const BroadcastProRoundedStatMatrixResultCell: React.FC<
  BroadcastProRoundedStatMatrixResultCellProps
> = ({
  playerName,
  statValue,
  highlight = false,
  delay,
  accentColor,
  glass,
  className = "",
  tier = "list",
  exitAnimation,
  exitFrame,
}) => {
  const { animations } = useAnimationContext();
  const { componentStyles, fontClasses, fonts } = useThemeContext();
  const { text, accent: themeAccent } = useBroadcastProRoundedTheme();
  const copyIn = animations.text.main.copyIn;
  const cellClass = csClass(
    componentStyles,
    "broadcastProRoundedStatMatrixResultCell",
  );
  const nameClass = csClass(
    componentStyles,
    "broadcastProRoundedStatMatrixResultName",
  );
  const valueClass = csClass(
    componentStyles,
    "broadcastProRoundedStatMatrixResultValue",
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
    <div className={isSingle ? "w-full" : valueClass}>
      <BroadcastProRoundedStatMatrixCompact
        value={statValue}
        animation={{ ...copyIn, delay: delay + 3 }}
        exitAnimation={exitAnimation}
        exitFrame={exitFrame}
        colorVariant={highlight ? "onContainerTitle" : "onContainerCopy"}
        fontFamily={headingFont}
        className={
          isSingle ? SINGLE_STAT_PRIMARY_CLASS : LIST_STAT_PRIMARY_CLASS
        }
        suffixClassName={
          isSingle ? SINGLE_STAT_SUFFIX_CLASS : LIST_STAT_SUFFIX_CLASS
        }
        primaryStyle={{
          color: highlight ? accentColor || themeAccent : text.copy,
        }}
        suffixStyle={{
          color: highlight ? accentColor || themeAccent : text.muted,
        }}
      />
    </div>
  );

  const nameBlock = (
    <ResultPlayerName
      value={playerName}
      animation={{ ...copyIn, delay }}
      exitAnimation={exitAnimation}
      exitFrame={exitFrame}
      variant="onContainerCopy"
      className={resolvedNameClass}
      style={{ color: text.copy }}
    />
  );

  return (
    <BroadcastProRoundedGlassPanel
      glass={glass}
      className={`${cellClass} ${isSingle ? SINGLE_CELL_CLASS : ""} ${className}`.trim()}
      animationDelay={resultContainerDelay(delay)}
      exitFrame={exitFrame}
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
    </BroadcastProRoundedGlassPanel>
  );
};
