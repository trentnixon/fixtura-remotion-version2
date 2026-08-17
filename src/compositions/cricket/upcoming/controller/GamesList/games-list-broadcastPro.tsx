import React from "react";
import GameCardBroadcastPro from "../../layout/Card/game-card-broadcastPro";
import {
  BROADCAST_PRO_UPCOMING_LIST_DIVIDER_HEIGHT_PX,
  BROADCAST_PRO_UPCOMING_LIST_DIVIDER_WIDTH_PX,
  BROADCAST_PRO_UPCOMING_LIST_ITEM_SPACING_PX,
} from "../GamesDisplay/_utils/calculations";
import { useBroadcastProTheme } from "../../../utils/broadcastPro";
import { GamesListProps } from "./_types/GamesListProps";

export const GamesListBroadcastPro: React.FC<GamesListProps> = ({ games }) => {
  const { accent } = useBroadcastProTheme();

  return (
    <div className="flex w-full max-w-full flex-col">
      {games.map((game, index) => (
        <React.Fragment key={game.gameID}>
          <GameCardBroadcastPro game={game} index={index} />
          {index < games.length - 1 && (
            <div
              className="flex w-full flex-shrink-0 items-center justify-center"
              style={{ height: `${BROADCAST_PRO_UPCOMING_LIST_ITEM_SPACING_PX}px` }}
              aria-hidden
            >
              <div
                style={{
                  width: `${BROADCAST_PRO_UPCOMING_LIST_DIVIDER_WIDTH_PX}px`,
                  height: `${BROADCAST_PRO_UPCOMING_LIST_DIVIDER_HEIGHT_PX}px`,
                  backgroundColor: accent,
                  opacity: 0.55,
                }}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default GamesListBroadcastPro;
