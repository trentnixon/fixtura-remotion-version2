import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { ScorelineSponsorFooter } from "../../../../../templates/variants/scoreline/components/ScorelineSponsorFooter";
import { csClass } from "../../../utils/scoreline/componentStyles";
import { calculateScorelineInnerDelay } from "../../../utils/scoreline/scorelineInnerAnimationDelays";
import { resolveScorelineLadderBiasTeam } from "../../../utils/scoreline/ladder/resolveScorelineLadderBiasTeam";
import {
  resolveScorelineLadderDensity,
  resolveScorelineLadderShowCreases,
} from "../../../utils/scoreline/ladder/resolveScorelineLadderLayout";
import RowScoreline from "../TeamRows/row-Scoreline";
import { LadderDisplayProps } from "./_types/LadderDisplayProps";
import { getMainContentSectionHeight } from "../../../../../core/utils/layoutHeights";
import { calculateAnimationOutFrame } from "../TeamRows/_utils/calculations";

export const LadderDisplayScoreline: React.FC<LadderDisplayProps> = ({
  ladder,
}) => {
  const { animations } = useAnimationContext();
  const panelAnimation = animations.container.main.itemContainerOuter;
  const innerAnimation = animations.container.main.itemContainerInner;
  const { club, data } = useVideoDataContext();
  const { timings } = data;
  const { League, gradeName, assignSponsors, primaryForScreen, bias } = ladder;
  const { layout, componentStyles } = useThemeContext();
  const { heights } = layout;
  const mainContentHeight = getMainContentSectionHeight(heights);
  const gradeLabel = gradeName?.trim() ?? "";
  const teamCount = League.length;
  const density = resolveScorelineLadderDensity(teamCount);
  const showCreases = resolveScorelineLadderShowCreases(teamCount);
  const animationOutFrame = calculateAnimationOutFrame(timings);

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
          className={`ladder-ledger ${csClass(componentStyles, "scorelineLadderLedger")}`}
          style={{
            height: `${mainContentHeight}px`,
            maxHeight: `${mainContentHeight}px`,
          }}
        >
          <div className="ladder-stack">
            <AnimatedContainer
              type="full"
              size="auto"
              className="w-full min-w-0"
              backgroundColor="none"
              animation={innerAnimation.containerIn}
              animationDelay={calculateScorelineInnerDelay(0, "grade")}
              exitAnimation={innerAnimation.containerOut}
              exitFrame={animationOutFrame}
            >
              <div
                className="ladder-grade"
                data-empty={gradeLabel ? "false" : "true"}
              >
                <h2 className="ladder-grade-name">{gradeLabel}</h2>
              </div>
            </AnimatedContainer>
            <div className="ladder-table">
              <AnimatedContainer
                type="full"
                size="auto"
                className="w-full min-w-0"
                backgroundColor="none"
                animation={innerAnimation.containerIn}
                animationDelay={calculateScorelineInnerDelay(0, "columns")}
                exitAnimation={innerAnimation.containerOut}
                exitFrame={animationOutFrame}
              >
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
              </AnimatedContainer>
              <div
                className="ladder-rows"
                data-density={density}
                data-creases={showCreases ? "true" : "false"}
              >
                {League.map((team, index) => (
                  <RowScoreline
                    key={`${team.position}-${index}`}
                    team={team}
                    index={index}
                    totalTeams={League.length}
                    isBiasTeam={resolveScorelineLadderBiasTeam(
                      team.teamName,
                      bias,
                      club.name,
                    )}
                    LadderRowHeight={0}
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
        sponsorStripKey="scorelineLadderSponsorStrip"
      />
    </div>
  );
};

export default LadderDisplayScoreline;
