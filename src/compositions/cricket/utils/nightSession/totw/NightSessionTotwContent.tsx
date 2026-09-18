import React from "react";
import type { TeamOfTheWeekPlayer } from "../../../TeamOfTheWeek/types";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { csClass } from "../../scoreline/componentStyles";
import { resolveTotwDensity } from "../../scoreline/totw/formatTotwStats";
import { NightSessionTotwRow } from "./NightSessionTotwRow";
import { splitTotwPlayerColumns } from "./splitTotwPlayerColumns";
import type { NightSessionRowEnterTiming } from "../nightSessionEnterTiming";

export const NightSessionTotwContent: React.FC<{
  players: TeamOfTheWeekPlayer[];
  categoryLabel: string;
  availableHeight: number;
  animation: React.ComponentProps<typeof NightSessionTotwRow>["animation"];
  exitAnimation: React.ComponentProps<
    typeof NightSessionTotwRow
  >["exitAnimation"];
  exitFrame: number;
  animationDelayForIndex: (index: number) => number;
  enterTiming: NightSessionRowEnterTiming;
}> = ({
  players,
  categoryLabel,
  availableHeight,
  animation,
  exitAnimation,
  exitFrame,
  animationDelayForIndex,
  enterTiming,
}) => {
  const { componentStyles } = useThemeContext();
  const density = resolveTotwDensity(players.length);
  const [leftColumn, rightColumn] = splitTotwPlayerColumns(players);
  const columns = [leftColumn, rightColumn];

  return (
    <main
      className={`totw-ledger ${csClass(componentStyles, "nightSessionTotwLedger")}`}
      style={{ height: availableHeight, maxHeight: availableHeight }}
    >
      <div className="totw-stack">
        <section className="totw-selection totw-unit">
          <header
            className="totw-category totw-unit__rail"
            data-empty={categoryLabel ? "false" : "true"}
          >
            <span className="totw-category-label">Round</span>
            <p className="totw-category-value">{categoryLabel}</p>
          </header>

          <div className="totw-unit__frame">
            <div className="totw-columns gap-12" data-density={density}>
              {columns.map((columnPlayers, columnIndex) => (
                <div
                  key={columnIndex}
                  className="totw-col"
                  data-density={density}
                >
                  {columnPlayers.map((player, rowIndex) => {
                    const globalIndex =
                      columnIndex === 0
                        ? rowIndex
                        : leftColumn.length + rowIndex;
                    const rank = globalIndex + 1;

                    return (
                      <NightSessionTotwRow
                        key={`${player.player}-${player.categoryDetail.position}-${globalIndex}`}
                        player={player}
                        rank={rank}
                        rowIndex={globalIndex}
                        animation={animation}
                        animationDelay={animationDelayForIndex(globalIndex)}
                        exitAnimation={exitAnimation}
                        exitFrame={exitFrame}
                        enterTiming={enterTiming}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default NightSessionTotwContent;
