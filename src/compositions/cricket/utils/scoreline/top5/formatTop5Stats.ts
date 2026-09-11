import {
  isBatter,
  isBowler,
  type PlayerData,
} from "../../../top5/_types/types";

export type ScorelineTop5Stats = {
  figureLabel?: string;
  main: string;
  suffix: string;
  suffixClassName: "leader-balls" | "leader-overs" | "";
  subline: string;
};

export const formatTop5Stats = (player: PlayerData): ScorelineTop5Stats => {
  if (isBatter(player)) {
    const main = player.notOut ? `${player.runs}*` : String(player.runs);
    const subline = player.SR > 0 ? `SR ${player.SR}` : "";

    return {
      main,
      suffix: `(${player.balls})`,
      suffixClassName: "leader-balls",
      subline,
    };
  }

  if (isBowler(player)) {
    return {
      figureLabel: "Figures",
      main: `${player.wickets}/${player.runs}`,
      suffix: `(${player.overs})`,
      suffixClassName: "leader-overs",
      subline: "",
    };
  }

  return { main: "", suffix: "", suffixClassName: "", subline: "" };
};
