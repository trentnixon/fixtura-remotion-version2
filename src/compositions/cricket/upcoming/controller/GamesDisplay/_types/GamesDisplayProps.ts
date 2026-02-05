import { GameData } from "../../../types";

export interface GamesDisplayProps {
  games: GameData[];
  gamesPerScreen: number;
  screenIndex: number;
  heights?: {
    asset: number;
    [key: string]: number;
  };
}
