import {
  isBatter,
  isBowler,
  type PlayerData,
} from "../../../top5/_types/types";

export type ScorelineTop5Stats = {
  figureLabel?: string;
  main: string;
  suffix: string;
  subline: string;
};

export const formatTop5Stats = (player: PlayerData): ScorelineTop5Stats => {
  if (isBatter(player)) {
    const main = player.notOut ? `${player.runs}*` : String(player.runs);
    return {
      main,
      suffix: `(${player.balls})`,
      subline: `SR ${player.SR}`,
    };
  }

  if (isBowler(player)) {
    return {
      figureLabel: "Figures",
      main: `${player.wickets}/${player.runs}`,
      suffix: `(${player.overs})`,
      subline: "",
    };
  }

  return { main: "", suffix: "", subline: "" };
};
