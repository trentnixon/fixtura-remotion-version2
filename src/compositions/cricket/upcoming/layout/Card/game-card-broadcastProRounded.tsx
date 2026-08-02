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
import { BroadcastProRoundedMatchup } from "../../../../../templates/variants/broadcastProRounded/components/matchup";
import { resolveBroadcastProRoundedEdgeMarkerStyle } from "../../../../../templates/types/broadcast-pro-rounded/marker-notch";
import {
  stripGradeNumberFromTeamName,
  truncateText,
} from "../../../utils/utils-text";
import {
  cellBlur,
  useBroadcastProRoundedTheme,
} from "../../../utils/broadcastProRounded";

const UPCOMING_TEAM_NAME_MAX = 34;

const formatUpcomingTeamName = (teamName: string): string =>
  truncateText(stripGradeNumberFromTeamName(teamName), UPCOMING_TEAM_NAME_MAX);

const HEADER_STRIP_H = 40;
const GROUND_STRIP_H = 36;

export const GameCardBroadcastProRounded: React.FC<GameCardProps> = ({
  game,
  index,
}) => {
  const { data } = useVideoDataContext();
  const { timings } = data;
  const { animations } = useAnimationContext();
  const { fontClasses, layout } = useThemeContext();
  const { glass, accent, text } = useBroadcastProRoundedTheme();
  const cellRadius = layout.borderRadius.container;
  const ContainerAnimations = animations.container;

  const delay = calculateAnimationDelay(index, FAST_DELAY_MULTIPLIER);
  const animationOutFrame = calculateAnimationOutFrame(timings);

  const headingFont = fontClasses.heading?.family;
  const metaVariant: ColorVariant = "onContainerCopy";
  const metaCopyStyle = { color: text.copy };
  const metaMutedStyle = { color: text.muted };

  return (
    <div className="flex w-full flex-col overflow-hidden">
      <AnimatedContainer
        type="full"
        className={`flex w-full flex-col ${layout.spacing?.stack ?? "gap-1"}`}
        backgroundColor="none"
        animation={ContainerAnimations.main.itemContainer.containerIn}
        animationDelay={delay}
        exitAnimation={ContainerAnimations.main.itemContainer.containerOut}
        exitFrame={animationOutFrame}
      >
        {/* Fixture header: date 25% | time 25% | grade 50% */}
        <div
          className={`grid w-full flex-shrink-0 grid-cols-[1fr_1fr_2fr] items-center gap-2 overflow-hidden px-5 py-2 md:px-6 ${cellRadius}`}
          style={{
            minHeight: HEADER_STRIP_H,
            background: glass.headerGradient,
            ...resolveBroadcastProRoundedEdgeMarkerStyle("compact", "primary", {
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
            style={metaCopyStyle}
          />
          <MetadataMedium
            value={game.time}
            animation={{ ...animations.text.main.copyIn, delay: delay + 2 }}
            className="min-w-0 truncate font-medium"
            variant={metaVariant}
            style={metaCopyStyle}
          />
          <MetadataMedium
            value={game.gradeName ?? ""}
            animation={{
              ...animations.text.main.copyIn,
              delay: delay + 3,
            }}
            className="min-w-0 truncate font-bold uppercase tracking-wider"
            variant={metaVariant}
            style={metaCopyStyle}
          />
        </div>

        {/* Glass panel: teams + VS */}
        <div
          className={`flex w-full overflow-hidden px-5 py-3 md:px-6 ${cellRadius}`}
          style={{
            background: glass.panel,
            border: glass.border,
            ...cellBlur,
          }}
        >
          <BroadcastProRoundedMatchup
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
          />
        </div>

        {/* Ground footer */}
        <div
          className={`flex w-full flex-shrink-0 items-center overflow-hidden px-5 py-1.5 md:px-6 ${cellRadius}`}
          style={{
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
            style={metaMutedStyle}
          />
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default GameCardBroadcastProRounded;
