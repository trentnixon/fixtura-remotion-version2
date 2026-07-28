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
import { BroadcastProMatchup } from "../../../../../templates/variants/broadcastPro/components/matchup";
import { resolveBroadcastProEdgeMarkerStyle } from "../../../../../templates/types/broadcast-pro/marker-notch";
import {
  stripGradeNumberFromTeamName,
  truncateText,
} from "../../../utils/utils-text";
import { cellBlur, useBroadcastProTheme } from "../../../utils/broadcastPro";

const UPCOMING_TEAM_NAME_MAX = 34;

const formatUpcomingTeamName = (teamName: string): string =>
  truncateText(stripGradeNumberFromTeamName(teamName), UPCOMING_TEAM_NAME_MAX);

const HEADER_STRIP_H = 40;
const GROUND_STRIP_H = 36;
/** Flush strips + glass; list gap handles separation between fixtures */
const STRIP_GLASS_GAP = 0;

export const GameCardBroadcastPro: React.FC<GameCardProps> = ({
  game,
  index,
  gameRowHeight,
}) => {
  const { data } = useVideoDataContext();
  const { timings } = data;
  const { animations } = useAnimationContext();
  const { fontClasses } = useThemeContext();
  const { glass, accent } = useBroadcastProTheme();
  const ContainerAnimations = animations.container;

  const delay = calculateAnimationDelay(index, FAST_DELAY_MULTIPLIER);
  const animationOutFrame = calculateAnimationOutFrame(timings);

  const headingFont = fontClasses.heading?.family;

  const glassPanelHeight =
    gameRowHeight != null
      ? Math.max(
          gameRowHeight - HEADER_STRIP_H - GROUND_STRIP_H - STRIP_GLASS_GAP,
          96,
        )
      : null;
  const compact = glassPanelHeight != null ? glassPanelHeight < 140 : false;

  const metaVariant: ColorVariant = "onContainerCopy";

  return (
    <div
      className="flex w-full flex-shrink-0 flex-col overflow-hidden"
      style={
        gameRowHeight != null
          ? {
              height: `${gameRowHeight}px`,
              minHeight: `${gameRowHeight}px`,
              maxHeight: `${gameRowHeight}px`,
            }
          : undefined
      }
    >
      <AnimatedContainer
        type="full"
        className="flex h-full w-full flex-shrink-0 flex-col gap-0 overflow-hidden rounded-none"
        backgroundColor="none"
        animation={ContainerAnimations.main.itemContainer.containerIn}
        animationDelay={delay}
        exitAnimation={ContainerAnimations.main.itemContainer.containerOut}
        exitFrame={animationOutFrame}
      >
        {/* Fixture header: date 25% | time 25% | grade 50% */}
        <div
          className="grid w-full flex-shrink-0 grid-cols-[1fr_1fr_2fr] items-center gap-2 px-5 py-2 md:px-6"
          style={{
            height: HEADER_STRIP_H,
            minHeight: HEADER_STRIP_H,
            background: glass.headerGradient,
            ...resolveBroadcastProEdgeMarkerStyle("compact", "primary", {
              accentColor: accent,
              mutedColor: accent,
            }),
            ...cellBlur,
          }}
        >
          <MetadataMedium
            value={game.date}
            animation={{ ...animations.text.main.copyIn, delay }}
            className="min-w-0 truncate font-bold uppercase tracking-wider"
            variant={metaVariant}
          />
          <MetadataMedium
            value={game.time}
            animation={{ ...animations.text.main.copyIn, delay: delay + 2 }}
            className="min-w-0 truncate font-medium"
            variant={metaVariant}
          />
          <MetadataMedium
            value={game.gradeName ?? ""}
            animation={{
              ...animations.text.main.copyIn,
              delay: delay + 3,
            }}
            className="min-w-0 truncate font-bold uppercase tracking-wider"
            variant={metaVariant}
          />
        </div>

        {/* Glass panel: teams + VS */}
        <div
          className="flex min-h-0 w-full flex-1 flex-shrink-0 px-5 py-3 md:px-6"
          style={{
            background: glass.panel,
            border: glass.border,
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
            compact={compact}
            containerHeight={glassPanelHeight ?? undefined}
            fontFamily={headingFont}
          />
        </div>

        {/* Ground footer */}
        <div
          className="flex w-full flex-shrink-0 items-center px-5 py-1.5 md:px-6"
          style={{
            height: GROUND_STRIP_H,
            minHeight: GROUND_STRIP_H,
            background: glass.muted,
            borderTop: glass.border
              ? "1px solid rgba(255,255,255,0.08)"
              : undefined,
            ...cellBlur,
          }}
        >
          <MetadataMedium
            value={game.ground}
            animation={{ ...animations.text.main.copyIn, delay: delay + 4 }}
            className="truncate font-semibold uppercase tracking-widest"
            variant={metaVariant}
          />
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default GameCardBroadcastPro;
