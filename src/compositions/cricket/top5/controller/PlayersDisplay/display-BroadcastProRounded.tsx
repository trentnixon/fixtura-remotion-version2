import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { SponsorFooter } from "../../../sponsorFooter";
import { AssignSponsors } from "../../../_types/composition-types";
import { BroadcastProRoundedCrestWell } from "../../../../../templates/variants/broadcastProRounded/components/crest";
import { BroadcastProRoundedStatMatrixTriple } from "../../../../../templates/variants/broadcastProRounded/components/stat";
import {
  BroadcastProRoundedGlassPanel,
  BroadcastProRoundedPlayerRankBadge,
  useBroadcastProRoundedPlayerRankingTheme,
  buildBroadcastProRoundedTop5StatMatrixCells,
} from "../../../utils/broadcastProRounded";
import { PlayersDisplayProps } from "./_types/PlayersDisplayProps";
import { PlayerData } from "../../_types/types";
import { truncateText } from "../../layout/_utils/helpers";
import { getDefaultRestrictions } from "../PlayerRow/_utils/helpers";
import {
  calculatePlayerDelay,
  calculateExitFrame,
} from "../PlayerRow/_utils/calculations";
import {
  getCompositionSectionHeight,
  getMainContentSectionHeight,
} from "../../../../../core/utils/layoutHeights";

const GRID_CARD_HEIGHT_PX = 215;
const FEATURED_TEAM_NAME_LENGTH_EXTRA = 10;

const FeaturedCard: React.FC<{
  player: PlayerData;
  delay: number;
  exitFrame: number;
}> = ({ player, delay, exitFrame }) => {
  const { animations } = useAnimationContext();
  const containerAnimation = animations.container.main.itemContainer;
  const { layout } = useThemeContext();
  const { glass, text, accent, headingFont, cs, selectedPalette } =
    useBroadcastProRoundedPlayerRankingTheme();
  const restrictions = getDefaultRestrictions();
  const statCells = buildBroadcastProRoundedTop5StatMatrixCells(player);

  const name = truncateText(player.name, restrictions.nameLength).toUpperCase();
  const team = truncateText(
    player.playedFor,
    restrictions.teamLength + FEATURED_TEAM_NAME_LENGTH_EXTRA,
  ).toUpperCase();

  return (
    <div className="overflow-hidden">
      <AnimatedContainer
        type="full"
        className={layout.borderRadius.container}
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
        exitFrame={exitFrame}
      >
        <BroadcastProRoundedGlassPanel
          glass={glass}
          className={cs("broadcastProRoundedPlayerRankingFeaturedInner")}
        >
          <BroadcastProRoundedPlayerRankBadge
            rank={1}
            placement="left"
            isFeatured
            className={cs("broadcastProRoundedPlayerRankingRankBadgeFeaturedLeft")}
            glass={glass}
            text={text}
            accent={accent}
            selectedPalette={selectedPalette}
            headingFont={headingFont}
          />
          <div className={cs("broadcastProRoundedPlayerRankingFeaturedBody")}>
            <BroadcastProRoundedCrestWell
              tier="featured"
              logo={player.teamLogo}
              teamName={player.playedFor}
              delay={delay + 5}
              glass={glass}
              showBorder
            />
            <div className="min-w-0 flex-1">
              <h2
                className={`${headingFont} ${cs("broadcastProRoundedPlayerRankingNameFeatured")}`}
                style={{
                  color: text.copy,
                  textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                }}
              >
                {name}
              </h2>
              <p
                className={cs("broadcastProRoundedPlayerRankingTeamFeatured")}
                style={{ color: text.secondary }}
              >
                {team}
              </p>
              <BroadcastProRoundedStatMatrixTriple
                cells={statCells}
                tier="featuredTriple"
                headingFont={headingFont}
                text={text}
                glass={glass}
                accent={accent}
              />
            </div>
          </div>
        </BroadcastProRoundedGlassPanel>
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
  const { animations } = useAnimationContext();
  const containerAnimation = animations.container.main.itemContainer;
  const delay = calculatePlayerDelay(index);
  const { layout } = useThemeContext();
  const { glass, text, accent, headingFont, cs, selectedPalette } =
    useBroadcastProRoundedPlayerRankingTheme();
  const restrictions = getDefaultRestrictions();
  const statCells = buildBroadcastProRoundedTop5StatMatrixCells(player);

  const name = truncateText(player.name, restrictions.nameLength).toUpperCase();
  const team = truncateText(
    player.playedFor,
    restrictions.teamLength,
  ).toUpperCase();

  return (
    <div className="overflow-hidden">
      <AnimatedContainer
        type="full"
        className={layout.borderRadius.container}
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
        exitFrame={exitFrame}
      >
        <BroadcastProRoundedGlassPanel
          glass={glass}
          className={cs("broadcastProRoundedPlayerRankingGridCard")}
          style={{
            height: GRID_CARD_HEIGHT_PX,
            minHeight: GRID_CARD_HEIGHT_PX,
            maxHeight: GRID_CARD_HEIGHT_PX,
          }}
        >
          <BroadcastProRoundedPlayerRankBadge
            rank={rank}
            placement="left"
            isFeatured={false}
            className={cs("broadcastProRoundedPlayerRankingRankBadgeGridLeft")}
            glass={glass}
            text={text}
            accent={accent}
            selectedPalette={selectedPalette}
            headingFont={headingFont}
          />
          <BroadcastProRoundedCrestWell
            tier="grid"
            logo={player.teamLogo}
            teamName={player.playedFor}
            delay={delay + 5}
            glass={glass}
            showBorder
          />
          <div className="flex min-w-0 flex-1 flex-col justify-center overflow-visible">
            <h3
              className={`${headingFont} ${cs("broadcastProRoundedPlayerRankingNameGridTop5")} shrink-0`}
              style={{
                color: text.copy,
                textShadow: "0 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              {name}
            </h3>
            <p
              className={cs("broadcastProRoundedPlayerRankingTeamGridTop5")}
              style={{ color: text.muted }}
            >
              {team}
            </p>
            <BroadcastProRoundedStatMatrixTriple
              cells={statCells}
              tier="gridTriple"
              headingFont={headingFont}
              text={text}
              glass={glass}
              accent={accent}
            />
          </div>
        </BroadcastProRoundedGlassPanel>
      </AnimatedContainer>
    </div>
  );
};

const PlayersDisplayBroadcastProRounded: React.FC<PlayersDisplayProps> = ({
  players,
  sponsors,
}) => {
  const { animations } = useAnimationContext();
  const { data } = useVideoDataContext();
  const { timings } = data;
  const panelAnimation = animations.container.main.itemContainerOuter;
  const { layout } = useThemeContext();
  const { heights } = layout;
  const { cs } = useBroadcastProRoundedPlayerRankingTheme();
  const mainContentHeight = getMainContentSectionHeight(heights);
  const compositionHeight = getCompositionSectionHeight(heights);

  const exitFrame = calculateExitFrame(timings);
  const [featured, ...rest] = players;
  const gridPlayers = rest.slice(0, 4);

  return (
    <div
      className="flex w-full flex-col p-0"
      style={{ height: `${compositionHeight}px` }}
    >
      <AnimatedContainer
        type="full"
        className={cs("broadcastProRoundedPlayerRankingAnimatedContainer")}
        backgroundColor="none"
        animation={panelAnimation.containerIn}
        exitAnimation={panelAnimation.containerOut}
        style={{ height: `${mainContentHeight}px` }}
      >
        <div className={cs("broadcastProRoundedPlayerRankingScrollShell")}>
          <div className={cs("broadcastProRoundedPlayerRankingContentStack")}>
            {featured ? (
              <FeaturedCard
                player={featured}
                delay={calculatePlayerDelay(0)}
                exitFrame={exitFrame}
              />
            ) : null}

            {gridPlayers.length > 0 ? (
              <div className={cs("broadcastProRoundedPlayerRankingGridTop5")}>
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
      <div className="flex-shrink-0" style={{ height: `${heights.footer}px` }}>
        <SponsorFooter assignSponsors={sponsors as unknown as AssignSponsors} />
      </div>
    </div>
  );
};

export default PlayersDisplayBroadcastProRounded;
