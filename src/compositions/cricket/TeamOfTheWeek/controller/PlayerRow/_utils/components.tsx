import React from "react";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
import { MetadataSmall } from "../../../../utils/primitives/metadataSmall";
import { TeamOfTheWeekStat } from "../../../../utils/primitives/TeamOfTheWeekStat";
import {
  BattingStatDisplayProps,
  BowlingStatDisplayProps,
  StatItemProps,
} from "../_types/StatDisplayProps";
import {
  STAT_SUFFIX_DELAY_OFFSET,
  PLAYER_NAME_DELAY_OFFSET,
} from "./constants";

/**
 * Component to display formatted batting stats
 * Shows runs (with not-out indicator) and balls faced
 */
export const BattingStatDisplay: React.FC<BattingStatDisplayProps> = ({
  batting,
  delay,
}) => {
  const { animations } = useAnimationContext();
  const largeTextAnimation = animations.text.main.copyIn;
  const smallTextAnimation = animations.text.main.copyIn;

  const scoreDisplay = `${batting.runs}${batting.notOut ? "*" : ""}`;
  const ballsDisplay = `(${batting.balls})`;

  return (
    <div className="flex items-baseline gap-1">
      <MetadataSmall
        value={scoreDisplay}
        animation={{ ...largeTextAnimation, delay: delay }}
        variant="onContainerCopy"
        className=""
      />
      <MetadataSmall
        value={ballsDisplay}
        animation={{
          ...smallTextAnimation,
          delay: delay + STAT_SUFFIX_DELAY_OFFSET,
        }}
        variant="onContainerCopy"
        className="text-md"
      />
    </div>
  );
};

/**
 * Component to display formatted bowling stats
 * Shows wickets/runs and overs
 */
export const BowlingStatDisplay: React.FC<BowlingStatDisplayProps> = ({
  bowling,
  delay,
}) => {
  const { animations } = useAnimationContext();
  const largeTextAnimation = animations.text.main.copyIn;
  const smallTextAnimation = animations.text.main.copyIn;

  const wicketsRunsDisplay = `${bowling.wickets}/${bowling.runs}`;
  const oversDisplay = `(${bowling.overs})`;

  return (
    <div className="flex items-baseline gap-1">
      <TeamOfTheWeekStat
        value={wicketsRunsDisplay}
        animation={{ ...largeTextAnimation, delay: delay }}
        variant="onContainerCopy"
        className=""
      />
      <MetadataSmall
        value={oversDisplay}
        animation={{
          ...smallTextAnimation,
          delay: delay + STAT_SUFFIX_DELAY_OFFSET,
        }}
        variant="onContainerCopy"
        className="text-xs"
      />
    </div>
  );
};

/**
 * Helper component for stat items (used for all-rounder score)
 */
export const StatItem: React.FC<StatItemProps> = ({
  label,
  value,
  delay,
}) => {
  const { animations } = useAnimationContext();
  const smallTextAnimation = animations.text.main.copyIn;
  const largeTextAnimation = animations.text.main.copyIn;

  return (
    <div>
      <TeamOfTheWeekStat
        value={label}
        animation={{ ...smallTextAnimation, delay: delay }}
        variant="onContainerTitle"
        className="mb-0.5"
      />
      {" : "}
      <TeamOfTheWeekStat
        value={String(value)}
        animation={{
          ...largeTextAnimation,
          delay: delay + STAT_SUFFIX_DELAY_OFFSET,
        }}
        variant="onContainerTitle"
        className=""
      />
    </div>
  );
};
