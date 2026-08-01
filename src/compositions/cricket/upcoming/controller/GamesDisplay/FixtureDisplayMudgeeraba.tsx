import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { SponsorFooter } from "../../../sponsorFooter";
import { AssignSponsors } from "../../../_types/composition-types";
import GamesListMudgeeraba from "../GamesList/games-list-Mudgeeraba";
import { GamesDisplayProps } from "./_types/GamesDisplayProps";
import {
  calculateDisplayedGames,
  mergeAssignSponsors,
} from "./_utils/calculations";
import { getMainContentSectionHeight } from "../../../../../core/utils/layoutHeights";

export const GamesDisplayMudgeeraba: React.FC<GamesDisplayProps> = ({
  games,
  gamesPerScreen,
  screenIndex,
}) => {
  const { animations } = useAnimationContext();
  const { layout } = useThemeContext();
  const { heights } = layout;
  const ContainerAnimations = animations.container;

  const displayedGames = calculateDisplayedGames(
    games,
    gamesPerScreen,
    screenIndex,
  );

  const mainContentHeight = getMainContentSectionHeight(heights);
  const mergedAssignSponsors = mergeAssignSponsors(displayedGames);

  return (
    <div className="flex h-full w-full flex-col p-0">
      <div
        className="flex w-full flex-col justify-center overflow-hidden"
        style={{
          height: `${mainContentHeight}px`,
          maxHeight: `${mainContentHeight}px`,
        }}
      >
        <AnimatedContainer
          type="full"
          className={`flex flex-col mx-8 overflow-hidden ${layout.borderRadius.container}`}
          backgroundColor="none"
          animation={ContainerAnimations.main.parent.containerIn}
          animationDelay={0}
          exitAnimation={ContainerAnimations.main.parent.containerOut}
        >
          <div className="flex-1 overflow-hidden">
            <GamesListMudgeeraba games={displayedGames} />
          </div>
        </AnimatedContainer>
      </div>
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter
          assignSponsors={mergedAssignSponsors as unknown as AssignSponsors}
        />
      </div>
    </div>
  );
};

export default GamesDisplayMudgeeraba;
