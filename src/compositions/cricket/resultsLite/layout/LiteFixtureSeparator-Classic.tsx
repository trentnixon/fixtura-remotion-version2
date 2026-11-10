import React from "react";
import { useVideoConfig } from "remotion";
import { AnimatedContainer } from "../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import {
  DEFAULT_SPLIT_EDGE_TOKENS,
  SplitColourEdge,
  type SplitColourEdgeTokens,
} from "../../../../templates/variants/classic/design";
import {
  calculateAnimationOutFrame,
  calculateDelay,
} from "../../results/controller/MatchRow/_utils/calculations";

const MOTIF_SCALE = 0.5;

/** Matches display `px-8` plus separator `mx-8`, then scaled to half width. */
const getClassicLiteSeparatorLengthPx = (compositionWidth: number): number =>
  Math.max(80, (compositionWidth - 128) * MOTIF_SCALE);

const LITE_SEPARATOR_TOKENS: SplitColourEdgeTokens = {
  primaryThicknessPx: Math.max(
    2,
    Math.round(DEFAULT_SPLIT_EDGE_TOKENS.primaryThicknessPx * MOTIF_SCALE),
  ),
  secondaryThicknessPx: Math.max(
    2,
    Math.round(DEFAULT_SPLIT_EDGE_TOKENS.secondaryThicknessPx * MOTIF_SCALE),
  ),
  railGapPx: Math.max(
    1,
    Math.round(DEFAULT_SPLIT_EDGE_TOKENS.railGapPx * MOTIF_SCALE),
  ),
  terminalStepPx: Math.round(
    DEFAULT_SPLIT_EDGE_TOKENS.terminalStepPx * MOTIF_SCALE,
  ),
  offsetPx: DEFAULT_SPLIT_EDGE_TOKENS.offsetPx,
  horizontalLengthPx: DEFAULT_SPLIT_EDGE_TOKENS.horizontalLengthPx,
  verticalLengthPx: Math.round(
    DEFAULT_SPLIT_EDGE_TOKENS.verticalLengthPx * MOTIF_SCALE,
  ),
};

const railBandHeightPx =
  LITE_SEPARATOR_TOKENS.primaryThicknessPx +
  LITE_SEPARATOR_TOKENS.railGapPx +
  LITE_SEPARATOR_TOKENS.secondaryThicknessPx;

/**
 * Paired primary/secondary rails between stacked Classic lite fixtures
 * (same motif as ClassicMainHeader, half size, animated in/out with the screen).
 */
export const LiteFixtureSeparatorClassic: React.FC<{
  fixtureIndex: number;
}> = ({ fixtureIndex }) => {
  const { width } = useVideoConfig();
  const { animations } = useAnimationContext();
  const { data } = useVideoDataContext();
  const lengthPx = getClassicLiteSeparatorLengthPx(width);
  const delay = calculateDelay(fixtureIndex);
  const exitFrame = calculateAnimationOutFrame(data.timings?.FPS_SCORECARD);
  const containerAnimation = animations.container.main.itemContainer;

  return (
    <AnimatedContainer
      type="full"
      className="relative mx-8 flex w-auto shrink-0 items-center justify-center py-6"
      backgroundColor="none"
      animation={containerAnimation.containerIn}
      animationDelay={delay}
      exitAnimation={containerAnimation.containerOut}
      exitFrame={exitFrame}
      aria-hidden
    >
      <div className="relative w-full" style={{ height: railBandHeightPx }}>
        <SplitColourEdge
          orientation="horizontal"
          placement="bottom"
          lengthPx={lengthPx}
          tokens={LITE_SEPARATOR_TOKENS}
          animate
          animationDelay={delay + 2}
        />
      </div>
    </AnimatedContainer>
  );
};
