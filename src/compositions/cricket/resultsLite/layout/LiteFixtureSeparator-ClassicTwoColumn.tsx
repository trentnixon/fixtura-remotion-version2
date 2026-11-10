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
import { getTwoColumnLiteContentWidthPx } from "./_utils/classicTwoColumnLiteMetrics";

const MOTIF_SCALE = 0.5;

const getClassicTwoColumnLiteSeparatorLengthPx = (
  compositionWidth: number,
): number =>
  Math.max(80, getTwoColumnLiteContentWidthPx(compositionWidth) * MOTIF_SCALE);

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

export const LiteFixtureSeparatorClassicTwoColumn: React.FC<{
  fixtureIndex: number;
}> = ({ fixtureIndex }) => {
  const { width } = useVideoConfig();
  const { animations } = useAnimationContext();
  const { data } = useVideoDataContext();
  const lengthPx = getClassicTwoColumnLiteSeparatorLengthPx(width);
  const delay = calculateDelay(fixtureIndex);
  const exitFrame = calculateAnimationOutFrame(data.timings?.FPS_SCORECARD);
  const containerAnimation = animations.container.main.itemContainer;

  return (
    <AnimatedContainer
      type="full"
      className="relative flex w-full shrink-0 items-center justify-center py-4"
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
