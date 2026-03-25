import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { SponsorFooter } from "../../../sponsorFooter";
import { AssignSponsors } from "../../../_types/composition-types";
import { TeamLogo } from "../../../utils/primitives/TeamLogo";
import { PlayersDisplayProps } from "./_types/PlayersDisplayProps";
import { PlayerData } from "../../_types/types";
import { truncateText } from "../../layout/_utils/helpers";
import {
  DEFAULT_LOGO_SIZE,
  SMALL_LOGO_SIZE,
} from "../../layout/_utils/constants";
import { getDefaultRestrictions } from "../PlayerRow/_utils/helpers";
import {
  calculatePlayerDelay,
  calculateExitFrame,
} from "../PlayerRow/_utils/calculations";
import {
  getBroadcastProTripleStats,
  type BroadcastProTripleStat,
} from "./_utils/broadcastProStats";

const glassPanelClass =
  "border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl";

/** Fixed height so grid slots #2–#5 stay visually uniform (fits triple stat row). */
const GRID_CARD_HEIGHT_PX = 220;

/** #1 card has more horizontal room — allow longer club/team names before ellipsis. */
const FEATURED_TEAM_NAME_LENGTH_EXTRA = 10;

const statLabelClass =
  "font-rajdhani mb-0.5 text-[10px] font-bold uppercase tracking-widest text-white/55";

const TripleStatsRow: React.FC<{
  triple: BroadcastProTripleStat;
  headingFont: string;
  variant: "featured" | "grid";
}> = ({ triple, headingFont, variant }) => {
  const valueClass =
    variant === "featured"
      ? `${headingFont} text-5xl font-semibold leading-none text-white md:text-6xl`
      : `${headingFont} text-2xl font-semibold leading-none text-white sm:text-3xl`;
  const gapClass = variant === "featured" ? "mt-8 flex flex-wrap gap-10 md:gap-14" : "mt-2 flex flex-wrap gap-3 sm:gap-5";
  const borderPad = variant === "featured" ? "border-l border-white/10 pl-10 md:pl-14" : "border-l border-white/10 pl-3 sm:pl-5";

  return (
    <div className={gapClass}>
      <div>
        <p className={statLabelClass}>{triple.label1}</p>
        <p className={valueClass}>{triple.value1}</p>
      </div>
      <div className={borderPad}>
        <p className={statLabelClass}>{triple.label2}</p>
        <p className={valueClass}>{triple.value2}</p>
      </div>
      <div className={borderPad}>
        <p className={statLabelClass}>{triple.label3}</p>
        <p className={valueClass}>{triple.value3}</p>
      </div>
    </div>
  );
};

const FeaturedCard: React.FC<{
  player: PlayerData;
  delay: number;
  exitFrame: number;
}> = ({ player, delay, exitFrame }) => {
  const { fontClasses } = useThemeContext();
  const { animations } = useAnimationContext();
  const containerAnimation = animations.container.main.itemContainer;
  const restrictions = getDefaultRestrictions();
  const triple = getBroadcastProTripleStats(player);
  const headingFont = fontClasses.heading?.family ?? "font-teko";

  const name = truncateText(player.name, restrictions.nameLength).toUpperCase();
  const team = truncateText(
    player.playedFor,
    restrictions.teamLength + FEATURED_TEAM_NAME_LENGTH_EXTRA,
  ).toUpperCase();

  return (
    <div className="overflow-hidden">
      <AnimatedContainer
        type="full"
        className="rounded-none"
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
        exitFrame={exitFrame}
      >
        <div className={`relative flex flex-col overflow-hidden ${glassPanelClass}`}>
          <div className="absolute left-0 top-0 bg-white/5 px-3 py-1">
            <span className={`${headingFont} text-2xl italic text-white/40`}>
              #1
            </span>
          </div>
          <div className="flex items-center gap-8 px-8 pb-8 pt-14 pr-4">
            <div className="flex h-44 w-44 shrink-0 items-center justify-center border border-white/10 bg-white/5 shadow-inner">
              <TeamLogo
                logo={player.teamLogo}
                teamName={player.playedFor}
                delay={delay + 5}
                size={DEFAULT_LOGO_SIZE}
                fit="contain"
                imgStyle={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <h2
                className={`${headingFont} text-lift text-6xl font-semibold uppercase leading-none tracking-normal text-white md:text-7xl`}
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
              >
                {name}
              </h2>
              <p className="font-rajdhani mt-1 text-xl font-semibold uppercase tracking-[0.2em] text-white/70">
                {team}
              </p>
              <TripleStatsRow triple={triple} headingFont={headingFont} variant="featured" />
            </div>
          </div>
        </div>
      </AnimatedContainer>
    </div>
  );
};

const GridCard: React.FC<{
  player: PlayerData;
  rank: number;
  index: number;
  exitFrame: number;
}> = ({ player, rank, index, exitFrame }) => {
  const { fontClasses } = useThemeContext();
  const { animations } = useAnimationContext();
  const containerAnimation = animations.container.main.itemContainer;
  const delay = calculatePlayerDelay(index);
  const restrictions = getDefaultRestrictions();
  const triple = getBroadcastProTripleStats(player);
  const headingFont = fontClasses.heading?.family ?? "font-teko";

  const name = truncateText(player.name, restrictions.nameLength).toUpperCase();
  const team = truncateText(player.playedFor, restrictions.teamLength).toUpperCase();

  return (
    <div className="overflow-hidden">
      <AnimatedContainer
        type="full"
        className="rounded-none"
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
        exitFrame={exitFrame}
      >
        <div
          className={`relative flex shrink-0 items-stretch gap-3 overflow-hidden p-4 pt-9 sm:gap-4 sm:p-5 sm:pt-10 ${glassPanelClass}`}
          style={{
            height: GRID_CARD_HEIGHT_PX,
            minHeight: GRID_CARD_HEIGHT_PX,
            maxHeight: GRID_CARD_HEIGHT_PX,
          }}
        >
          <div className="absolute left-0 top-0 bg-white/5 px-3 py-1">
            <span
              className={`${headingFont} text-2xl italic text-white/40`}
            >
              #{rank}
            </span>
          </div>
          <div className="flex h-20 w-20 shrink-0 items-center justify-center self-center border border-white/5 bg-white/5 sm:h-24 sm:w-24">
            <TeamLogo
              logo={player.teamLogo}
              teamName={player.playedFor}
              delay={delay + 5}
              size={SMALL_LOGO_SIZE}
              fit="contain"
              imgStyle={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-center">
            <h3
              className={`${headingFont} text-lift line-clamp-2 text-2xl font-medium uppercase leading-tight text-white sm:text-3xl`}
              style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
            >
              {name}
            </h3>
            <p className="font-rajdhani mt-0.5 text-[11px] font-bold uppercase leading-tight tracking-[0.15em] text-white/60 sm:text-xs">
              {team}
            </p>
            <TripleStatsRow triple={triple} headingFont={headingFont} variant="grid" />
          </div>
        </div>
      </AnimatedContainer>
    </div>
  );
};

const PlayersDisplayBroadcastPro: React.FC<PlayersDisplayProps> = ({
  players,
  sponsors,
}) => {
  const { animations } = useAnimationContext();
  const { data } = useVideoDataContext();
  const { timings } = data;
  const panelAnimation = animations.container.main.itemContainerOuter;
  const { layout } = useThemeContext();
  const { heights } = layout;

  const exitFrame = calculateExitFrame(timings);

  const [featured, ...rest] = players;
  const gridPlayers = rest.slice(0, 4);

  return (
    <div className="flex h-full w-full flex-col p-0">
      <AnimatedContainer
        type="full"
        className="mx-6 flex flex-1 flex-col overflow-hidden rounded-none md:mx-10"
        backgroundColor="none"
        animation={panelAnimation.containerIn}
        exitAnimation={panelAnimation.containerOut}
      >
        <div
          className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden py-2"
          style={{
            height: heights.asset,
            maxHeight: heights.asset,
            minHeight: heights.asset,
          }}
        >
          <div className="flex min-h-full w-full flex-col justify-center gap-4">
            {featured ? (
              <FeaturedCard
                player={featured}
                delay={calculatePlayerDelay(0)}
                exitFrame={exitFrame}
              />
            ) : null}

            {gridPlayers.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {gridPlayers.map((player, i) => (
                  <GridCard
                    key={`${player.name}-${i + 2}`}
                    player={player}
                    rank={i + 2}
                    index={i + 1}
                    exitFrame={exitFrame}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </AnimatedContainer>
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter assignSponsors={sponsors as unknown as AssignSponsors} />
      </div>
    </div>
  );
};

export default PlayersDisplayBroadcastPro;
