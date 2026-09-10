import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { ScorelineSponsorFooter } from "../../../../../templates/variants/scoreline/components/ScorelineSponsorFooter";
import { buildSingleItemFooterSponsors } from "../../../../../core/utils/sponsors";
import ScorelineTotwRow from "../../layout/ScorelineTotwRow";
import { TeamOfTheWeekDisplayProps } from "./_types/TeamOfTheWeekDisplayProps";
import { resolveTotwDensity } from "../../../utils/scoreline/totw/formatTotwStats";
import { getMainContentSectionHeight } from "../../../../../core/utils/layoutHeights";

const calculateTotwLayout = (
  availableHeight: number,
  playerCount: number,
): { rowHeight: number } => ({
  rowHeight: Math.floor(availableHeight / Math.max(playerCount, 1)),
});

const TeamOfTheWeekDisplayScoreline: React.FC<TeamOfTheWeekDisplayProps> = ({
  players,
  sponsors,
  title,
}) => {
  const { layout } = useThemeContext();
  const { animations } = useAnimationContext();
  const { heights } = layout;
  const panelAnimation = animations.container.main.parent;
  const containerAnimation = animations.container.main.itemContainer;
  const mainContentHeight = getMainContentSectionHeight(heights);

  const density = resolveTotwDensity(players.length);
  const compact = density !== "normal";
  const { rowHeight } = calculateTotwLayout(mainContentHeight, players.length);
  const categoryValue = title ?? "";

  const footerSponsors = buildSingleItemFooterSponsors({
    fallbackPrimary: sponsors,
  });

  return (
    <>
      <AnimatedContainer
        type="full"
        className="min-h-0 flex-1 overflow-hidden rounded-none"
        backgroundColor="none"
        animation={panelAnimation.containerIn}
        animationDelay={0}
        exitAnimation={panelAnimation.containerOut}
      >
        <main
          className="totw-ledger"
          style={{
            height: `${mainContentHeight}px`,
            maxHeight: `${mainContentHeight}px`,
          }}
        >
          <div className="totw-stack">
            <div className="totw-selection">
              {categoryValue ? (
                <div className="totw-category" data-empty="false">
                  <span className="totw-category-label">Selection</span>
                  <p className="totw-category-value">{categoryValue}</p>
                </div>
              ) : null}
              <div className="totw-rows" data-density={density}>
                {players.map((player, index) => (
                  <AnimatedContainer
                    key={`${player.player}-${player.categoryDetail.position}-${index}`}
                    type="full"
                    className="rounded-none"
                    backgroundColor="none"
                    animation={containerAnimation.containerIn}
                    animationDelay={index * 5}
                    exitAnimation={containerAnimation.containerOut}
                  >
                    <ScorelineTotwRow
                      player={player}
                      index={index}
                      rowHeight={rowHeight}
                      compact={compact}
                      showCrease={index < players.length - 1}
                    />
                  </AnimatedContainer>
                ))}
              </div>
            </div>
          </div>
        </main>
      </AnimatedContainer>
      <ScorelineSponsorFooter sponsors={footerSponsors} />
    </>
  );
};

export default TeamOfTheWeekDisplayScoreline;
