import React from "react";
import GameCardBroadcastProRounded from "../../layout/Card/game-card-broadcastProRounded";
import {
  BROADCAST_PRO_UPCOMING_LIST_HEIGHT_PX,
  BROADCAST_PRO_UPCOMING_LIST_ITEM_SPACING_PX,
} from "../GamesDisplay/_utils/calculations";
import { resolveBroadcastProRoundedFixtureDensity } from "../../../../../templates/types/broadcast-pro-rounded/fixture-density";
import { GamesListProps } from "./_types/GamesListProps";

export const GamesListBroadcastProRounded: React.FC<GamesListProps> = ({
  games,
}) => {
  const density = resolveBroadcastProRoundedFixtureDensity(games.length);
  const listHeight = BROADCAST_PRO_UPCOMING_LIST_HEIGHT_PX[density];
  const cardHeight =
    (listHeight -
      BROADCAST_PRO_UPCOMING_LIST_ITEM_SPACING_PX *
        Math.max(games.length - 1, 0)) /
    Math.max(games.length, 1);

  return (
    <div
      className="flex w-full max-w-full flex-col"
      style={{
        height: listHeight,
        gap: BROADCAST_PRO_UPCOMING_LIST_ITEM_SPACING_PX,
      }}
    >
      {games.map((game, index) => (
        <GameCardBroadcastProRounded
          key={game.gameID}
          game={game}
          index={index}
          density={density}
          gameRowHeight={cardHeight}
        />
      ))}
    </div>
  );
};

export default GamesListBroadcastProRounded;
