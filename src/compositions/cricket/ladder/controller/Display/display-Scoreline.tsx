import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { ScorelineSponsorFooter } from "../../../../../templates/variants/scoreline/components/ScorelineSponsorFooter";
import RowScoreline from "../TeamRows/row-Scoreline";
import { LadderDisplayProps } from "./_types/LadderDisplayProps";
import { calculateRowDimensions } from "./_utils/calculations";
import { getMainContentSectionHeight } from "../../../../../core/utils/layoutHeights";

const HEADER_EXTRA_FOR_GRADE = 44;
const SCORELINE_MAX_ROW_HEIGHT = 88;

export const LadderDisplayScoreline: React.FC<LadderDisplayProps> = ({
  ladder,
}) => {
  const { animations } = useAnimationContext();
  const panelAnimation = animations.container.main.itemContainerOuter;
  const { League, gradeName, assignSponsors, primaryForScreen } = ladder;
  const { layout } = useThemeContext();
  const { heights } = layout;

  const mainContentHeight = getMainContentSectionHeight(heights);

  const { rowHeight: rawRowHeight } = calculateRowDimensions(
    mainContentHeight,
    League.length,
    HEADER_EXTRA_FOR_GRADE,
    { rowGapPx: 0 },
  );

  const rowHeight = Math.min(rawRowHeight, SCORELINE_MAX_ROW_HEIGHT);

  return (
    <>
      <AnimatedContainer
        type="full"
        className="min-h-0 flex-1 overflow-hidden rounded-none"
        backgroundColor="none"
        animation={panelAnimation.containerIn}
        exitAnimation={panelAnimation.containerOut}
      >
        <main
          className="ladder-ledger"
          style={{
            height: `${mainContentHeight}px`,
            maxHeight: `${mainContentHeight}px`,
          }}
        >
          <div className="ladder-stack">
            {gradeName ? (
              <div className="ladder-grade">
                <h2 className="ladder-grade-name">{gradeName}</h2>
              </div>
            ) : null}
            <div className="ladder-table">
              <div className="ladder-columns" aria-hidden>
                <span>#</span>
                <span />
                <span>Team</span>
                <span>P</span>
                <span>W</span>
                <span>L</span>
                <span>B</span>
                <span>Pts</span>
              </div>
              <div className="ladder-rows">
                {League.map((team, index) => (
                  <RowScoreline
                    key={team.position}
                    team={team}
                    index={index}
                    totalTeams={League.length}
                    isBiasTeam={team.teamName === ladder.bias}
                    LadderRowHeight={rowHeight}
                    compact={false}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </AnimatedContainer>
      <ScorelineSponsorFooter
        assignSponsors={assignSponsors}
        primaryForScreen={primaryForScreen}
      />
    </>
  );
};

export default LadderDisplayScoreline;
