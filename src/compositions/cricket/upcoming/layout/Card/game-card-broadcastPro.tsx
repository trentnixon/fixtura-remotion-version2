import React from "react";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import type { ColorVariant } from "../../../../../components/typography/AnimatedText";
import { GameCardProps } from "./_types/GameCardProps";
import {
  calculateAnimationDelay,
  calculateAnimationOutFrame,
  FAST_DELAY_MULTIPLIER,
} from "./_utils/calculations";
import { MetadataMedium } from "../../../utils/primitives/metadataMedium";
import { formatGroundLocation } from "../../../utils/utils-text";
import { BroadcastProMatchup } from "../../../../../templates/variants/broadcastPro/components/matchup";
import { BroadcastProFixtureFrame } from "../../../../../templates/variants/broadcastPro/components/fixture";
import { stripGradeNumberFromTeamName } from "../../../utils/utils-text";
import { cellBlur, useBroadcastProTheme } from "../../../utils/broadcastPro";

const formatUpcomingTeamName = (teamName: string): string =>
  stripGradeNumberFromTeamName(teamName);

const HEADER_STRIP_H = 36;

export const GameCardBroadcastPro: React.FC<GameCardProps> = ({
  game,
  index,
  density = "standard",
  gameRowHeight,
}) => {
  const { data } = useVideoDataContext();
  const { timings } = data;
  const { animations } = useAnimationContext();
  const { fontClasses } = useThemeContext();
  const { glass, accent, text } = useBroadcastProTheme();
  const ContainerAnimations = animations.container;

  const delay = calculateAnimationDelay(index, FAST_DELAY_MULTIPLIER);
  const animationOutFrame = calculateAnimationOutFrame(timings);

  const copyFont =
    fontClasses.body?.family ?? fontClasses.subheading?.family ?? "Rajdhani";
  const metaVariant: ColorVariant = "onContainerCopy";
  const metaCopyStyle = { color: text.copy, fontFamily: copyFont };
  const metaMutedStyle = { color: text.muted, fontFamily: copyFont };
  const isCompact = density === "compact";
  const matchupHeight =
    density === "featured" ? 220 : density === "standard" ? 240 : 170;
  const bodyPadding =
    density === "featured" ? "6px 24px" : isCompact ? "4px 16px" : "6px 20px";

  return (
    <div
      className="flex min-h-0 w-full flex-col"
      style={
        gameRowHeight == null
          ? undefined
          : { height: gameRowHeight, flex: `0 0 ${gameRowHeight}px` }
      }
    >
      <AnimatedContainer
        type="full"
        size="full"
        className="flex h-full w-full flex-col rounded-none"
        backgroundColor="none"
        animation={ContainerAnimations.main.itemContainer.containerIn}
        animationDelay={delay}
        exitAnimation={ContainerAnimations.main.itemContainer.containerOut}
        exitFrame={animationOutFrame}
      >
        <BroadcastProFixtureFrame
          accentColor={accent}
          glass={glass}
          className="h-full gap-2"
        >
          <div
            className="grid w-full flex-shrink-0 grid-cols-[1fr_1fr_2fr] items-center gap-3 px-5 py-1.5 md:px-6"
            style={{
              minHeight: HEADER_STRIP_H,
              background: glass.headerGradient,
              ...cellBlur,
            }}
          >
            <MetadataMedium
              value={game.date}
              animation={{ type: "none" }}
              exitAnimation="none"
              className="min-w-0 truncate font-rajdhani font-bold uppercase tracking-wider"
              variant={metaVariant}
              style={metaCopyStyle}
            />
            <MetadataMedium
              value={game.time}
              animation={{ type: "none" }}
              exitAnimation="none"
              className="min-w-0 truncate font-rajdhani font-medium"
              variant={metaVariant}
              style={metaCopyStyle}
            />
            <MetadataMedium
              value={game.gradeName ?? ""}
              animation={{ type: "none" }}
              exitAnimation="none"
              className="min-w-0 truncate text-right font-rajdhani font-semibold uppercase tracking-wider"
              variant={metaVariant}
              style={metaMutedStyle}
            />
          </div>

          <div
            className="flex min-h-0 w-full flex-1 flex-col justify-center"
            style={{
              padding: bodyPadding,
              background: glass.panel,
              borderTop: glass.border,
              ...cellBlur,
            }}
          >
            <BroadcastProMatchup
              tier="fixture"
              home={{
                teamName: formatUpcomingTeamName(game.teamHome),
                logo: game.teamHomeLogo,
              }}
              away={{
                teamName: formatUpcomingTeamName(game.teamAway),
                logo: game.teamAwayLogo,
              }}
              glass={glass}
              delay={delay}
              fontFamily={copyFont}
              fixtureDensity={density}
              containerHeight={matchupHeight}
              animateContent={false}
            />
          </div>

          <div
            className={`flex w-full flex-shrink-0 justify-center px-5 ${isCompact ? "py-1" : "py-2"}`}
            style={{
              background: glass.muted,
              borderTop: glass.border,
            }}
          >
            <MetadataMedium
              value={formatGroundLocation(game.ground)}
              animation={{ type: "none" }}
              exitAnimation="none"
              className="max-w-full truncate text-center font-rajdhani font-semibold uppercase tracking-widest"
              variant={metaVariant}
              style={metaMutedStyle}
            />
          </div>
        </BroadcastProFixtureFrame>
      </AnimatedContainer>
    </div>
  );
};

export default GameCardBroadcastPro;
