import React from "react";
import GameCardBroadcastPro from "../../layout/Card/game-card-broadcastPro";
import {
  BROADCAST_PRO_UPCOMING_LIST_HEIGHT_PX,
  BROADCAST_PRO_UPCOMING_LIST_ITEM_SPACING_PX,
} from "../GamesDisplay/_utils/calculations";
import { resolveBroadcastProFixtureDensity } from "../../../../../templates/types/broadcast-pro/fixture-density";
import { GamesListProps } from "./_types/GamesListProps";

export const GamesListBroadcastPro: React.FC<GamesListProps> = ({ games }) => {
  const density = resolveBroadcastProFixtureDensity(games.length);
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
        <GameCardBroadcastPro
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

export default GamesListBroadcastPro;
