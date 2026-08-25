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

const HEADER_STRIP_H = 40;

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

  const headingFont = fontClasses.heading?.family;
  const metaVariant: ColorVariant = "onContainerCopy";
  const metaCopyStyle = { color: text.copy };
  const metaMutedStyle = { color: text.muted };
  const isCompact = density === "compact";
  const matchupHeight =
    density === "featured" ? 330 : density === "standard" ? 240 : 170;
  const bodyPadding =
    density === "featured"
      ? "24px 28px"
      : isCompact
        ? "12px 20px"
        : "18px 24px";

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
          className="h-full"
        >
          <div
            className="grid w-full flex-shrink-0 grid-cols-[1fr_1fr_2fr] items-center gap-3 px-5 py-2 md:px-6"
            style={{
              minHeight: HEADER_STRIP_H,
              background: glass.headerGradient,
              ...cellBlur,
            }}
          >
            <MetadataMedium
              value={game.date}
              animation={{ type: "none" }}
              className="min-w-0 truncate font-bold uppercase tracking-wider"
              variant={metaVariant}
              style={metaCopyStyle}
            />
            <MetadataMedium
              value={game.time}
              animation={{ type: "none" }}
              className="min-w-0 truncate font-medium"
              variant={metaVariant}
              style={metaCopyStyle}
            />
            <MetadataMedium
              value={game.gradeName ?? ""}
              animation={{ type: "none" }}
              className="min-w-0 truncate text-right font-semibold uppercase tracking-wider"
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
                roleLabel: "Home",
              }}
              away={{
                teamName: formatUpcomingTeamName(game.teamAway),
                logo: game.teamAwayLogo,
                roleLabel: "Away",
              }}
              glass={glass}
              delay={delay}
              fontFamily={headingFont}
              fixtureDensity={density}
              containerHeight={matchupHeight}
              animateContent={false}
            />
          </div>

          <div
            className={`flex w-full flex-shrink-0 justify-center px-5 ${isCompact ? "py-1.5" : "py-2.5"}`}
            style={{
              background: glass.muted,
              borderTop: glass.border,
            }}
          >
            <MetadataMedium
              value={formatGroundLocation(game.ground)}
              animation={{ type: "none" }}
              className="max-w-full truncate text-center font-semibold uppercase tracking-widest"
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
