import React from "react";
import GameCardBroadcastPro from "../../layout/Card/game-card-broadcastPro";
import { BROADCAST_PRO_UPCOMING_LIST_GAP_PX } from "../GamesDisplay/_utils/calculations";
import { GamesListProps } from "./_types/GamesListProps";

export const GamesListBroadcastPro: React.FC<GamesListProps> = ({ games }) => {
  return (
    <div
      className="flex w-full max-w-full flex-col"
      style={{ gap: `${BROADCAST_PRO_UPCOMING_LIST_GAP_PX}px` }}
    >
      {games.map((game, index) => (
        <GameCardBroadcastPro key={game.gameID} game={game} index={index} />
      ))}
    </div>
  );
};

export default GamesListBroadcastPro;
