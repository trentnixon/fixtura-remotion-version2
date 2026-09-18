import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { NightSessionSponsorFooter } from "../../../../../templates/variants/nightSession/components/NightSessionSponsorFooter";
import { csClass } from "../../../utils/scoreline/componentStyles";
import { useNightSessionEnterTiming } from "../../../utils/nightSession/useNightSessionEnterTiming";
import { NightSessionEnterTimingProvider } from "../../../utils/nightSession/NightSessionEnterTimingContext";
import { resolveScorelineLadderBiasTeam } from "../../../utils/scoreline/ladder/resolveScorelineLadderBiasTeam";
import { NightSessionAnimatedShell } from "../../../utils/nightSession/NightSessionAnimatedShell";
import { resolveScorelineLadderDensity } from "../../../utils/scoreline/ladder/resolveScorelineLadderLayout";
import RowNightSession from "../TeamRows/row-NightSession";
import { LadderDisplayProps } from "./_types/LadderDisplayProps";
import { getMainContentSectionHeight } from "../../../../../core/utils/layoutHeights";
import { calculateAnimationOutFrame } from "../TeamRows/_utils/calculations";

export const LadderDisplayNightSession: React.FC<LadderDisplayProps> = ({
  ladder,
}) => {
  const { animations } = useAnimationContext();
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
  const animationOutFrame = calculateAnimationOutFrame(timings);
  const enterTiming = useNightSessionEnterTiming(teamCount, "FPS_LADDER");

  return (
    <div
      className={csClass(componentStyles, "nightSessionDisplayColumn")}
      style={{ height: `${mainContentHeight + heights.footer}px` }}
    >
      <NightSessionAnimatedShell
        className={csClass(componentStyles, "nightSessionAnimatedShell")}
        exitFrame={animationOutFrame}
      >
        <NightSessionEnterTimingProvider value={enterTiming}>
          <main
            className={`ladder-ledger ${csClass(componentStyles, "nightSessionLadderLedger")}`}
            style={{
              height: `${mainContentHeight}px`,
              maxHeight: `${mainContentHeight}px`,
            }}
          >
            <div className="ladder-stack">
              <section className="ladder-table ladder-unit">
                <AnimatedContainer
                  type="full"
                  size="auto"
                  className="w-full min-w-0"
                  backgroundColor="none"
                  animation={innerAnimation.containerIn}
                  animationDelay={enterTiming.innerDelay(0, "grade")}
                  exitAnimation={innerAnimation.containerOut}
                  exitFrame={animationOutFrame}
                >
                  <header
                    className="ladder-unit__rail ladder-grade"
                    data-empty={gradeLabel ? "false" : "true"}
                  >
                    <h2 className="ladder-grade-name">{gradeLabel}</h2>
                  </header>
                </AnimatedContainer>

                <div className="ladder-unit__frame">
                  <AnimatedContainer
                    type="full"
                    size="auto"
                    className="w-full min-w-0"
                    backgroundColor="none"
                    animation={innerAnimation.containerIn}
                    animationDelay={enterTiming.innerDelay(0, "columns")}
                    exitAnimation={innerAnimation.containerOut}
                    exitFrame={animationOutFrame}
                  >
                    <div className="ladder-columns" aria-hidden>
                      <span>#</span>
                      <span />
                      <span>Team</span>
                      <span className="ladder-columns__stats">
                        <span>P</span>
                        <span>W</span>
                        <span>L</span>
                        <span>B</span>
                        <span>Pts</span>
                      </span>
                    </div>
                  </AnimatedContainer>

                  <div
                    className="ladder-rows"
                    data-ladder-rows
                    data-density={density}
                    data-creases="false"
                  >
                    {League.map((team, index) => (
                      <RowNightSession
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
              </section>
            </div>
          </main>
        </NightSessionEnterTimingProvider>
      </NightSessionAnimatedShell>
      <NightSessionSponsorFooter
        assignSponsors={assignSponsors}
        primaryForScreen={primaryForScreen}
        sponsorStripKey="nightSessionLadderSponsorStrip"
      />
    </div>
  );
};

export default LadderDisplayNightSession;
