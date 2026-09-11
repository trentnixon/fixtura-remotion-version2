import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { ScorelineSponsorFooter } from "../../../../../templates/variants/scoreline/components/ScorelineSponsorFooter";
import { csClass } from "../../../utils/scoreline/componentStyles";
import { buildSingleItemFooterSponsors } from "../../../../../core/utils/sponsors";
import ScorelineTotwRow from "../../layout/ScorelineTotwRow";
import { TeamOfTheWeekDisplayProps } from "./_types/TeamOfTheWeekDisplayProps";
import { resolveTotwDensity } from "../../../utils/scoreline/totw/formatTotwStats";
import { getMainContentSectionHeight } from "../../../../../core/utils/layoutHeights";
import {
  calculateExitFrame,
  calculatePlayerDelay,
} from "../../../top5/controller/PlayerRow/_utils/calculations";

const TeamOfTheWeekDisplayScoreline: React.FC<TeamOfTheWeekDisplayProps> = ({
  players,
  sponsors,
  title,
}) => {
  const { animations } = useAnimationContext();
  const { data, video } = useVideoDataContext();
  const { timings } = data;
  const panelAnimation = animations.container.main.itemContainerOuter;
  const containerAnimation = animations.container.main.itemContainer;
  const { layout, componentStyles } = useThemeContext();
  const { heights } = layout;
  const mainContentHeight = getMainContentSectionHeight(heights);
  const exitFrame = calculateExitFrame(timings);
  const density = resolveTotwDensity(players.length);
  const categoryLabel = title?.trim() || video.fixtureCategory?.trim() || "";

  const footerSponsors = buildSingleItemFooterSponsors({
    fallbackPrimary: sponsors,
  });

  return (
    <div
      className={csClass(componentStyles, "scorelineDisplayColumn")}
      style={{ height: `${mainContentHeight + heights.footer}px` }}
    >
      <AnimatedContainer
        type="full"
        className={csClass(componentStyles, "scorelineAnimatedShell")}
        backgroundColor="none"
        animation={panelAnimation.containerIn}
        exitAnimation={panelAnimation.containerOut}
      >
        <main
          className={`totw-ledger ${csClass(componentStyles, "scorelineTotwLedger")}`}
          style={{
            height: `${mainContentHeight}px`,
            maxHeight: `${mainContentHeight}px`,
          }}
        >
          <div className="totw-stack">
            <div className="totw-selection">
              <div
                className="totw-category"
                data-empty={categoryLabel ? "false" : "true"}
              >
                <span className="totw-category-label">Grade</span>
                <p className="totw-category-value">{categoryLabel}</p>
              </div>
              <div className="totw-rows" data-density={density}>
                {players.map((player, index) => (
                  <ScorelineTotwRow
                    key={`${player.player}-${player.categoryDetail.position}-${index}`}
                    player={player}
                    animation={containerAnimation.containerIn}
                    animationDelay={calculatePlayerDelay(index)}
                    exitAnimation={containerAnimation.containerOut}
                    exitFrame={exitFrame}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </AnimatedContainer>

      <ScorelineSponsorFooter
        sponsors={footerSponsors}
        sponsorStripKey="scorelineTotwSponsorStrip"
      />
    </div>
  );
};

export default TeamOfTheWeekDisplayScoreline;
