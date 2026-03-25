import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import GamesListBroadcastPro from "../GamesList/games-list-broadcastPro";
import { GamesDisplayProps } from "./_types/GamesDisplayProps";
import { calculateDisplayedGames } from "./_utils/calculations";

/**
 * Body area height from `layout.heights.asset`. Fixtures stack at **natural** height
 * (no equal flex rows), **vertically centered** when shorter than the asset; scrolls if needed.
 */
export const FixtureDisplayBroadcastPro: React.FC<GamesDisplayProps> = ({
  games,
  gamesPerScreen,
  screenIndex,
  heights: heightsProp,
}) => {
  const { animations } = useAnimationContext();
  const panelAnimation = animations.container.main.itemContainerOuter;
  const { layout } = useThemeContext();
  const h = layout.heights;
  const bodyContentHeight = heightsProp?.asset ?? h.asset;

  const displayedGames = calculateDisplayedGames(
    games,
    gamesPerScreen,
    screenIndex,
  );

  return (
    <div className="flex h-full w-full flex-col p-0">
      <AnimatedContainer
        type="full"
        className="mx-10 flex flex-1 flex-col overflow-hidden rounded-none md:mx-14"
        backgroundColor="none"
        animation={panelAnimation.containerIn}
        exitAnimation={panelAnimation.containerOut}
      >
        <div
          className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden"
          style={{
            height: bodyContentHeight,
            minHeight: bodyContentHeight,
          }}
        >
          <div className="flex min-h-full w-full flex-col justify-center">
            <GamesListBroadcastPro games={displayedGames} />
          </div>
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default FixtureDisplayBroadcastPro;
