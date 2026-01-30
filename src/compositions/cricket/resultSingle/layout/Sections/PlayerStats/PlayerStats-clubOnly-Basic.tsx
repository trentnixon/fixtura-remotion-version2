import React from "react";
import { Team, BattingPerformance, BowlingPerformance } from "../../../types";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
import { computePartialTwoDayVisibility } from "./_utils/visibility";
import { ResultPlayerName } from "../../../../utils/primitives/ResultPlayerName";
import { ResultPlayerScore } from "../../../../utils/primitives/ResultPlayerScore";
import { getClubTeamPlayers } from "../../MatchCard/_utils/calculations";
import { PlayerStatsClubOnlyProps, StatItemProps, StatSectionProps, TeamStatsProps } from "./_types/PlayerStatsProps";
import { truncateText } from "./_utils/helpers";

const StatItem: React.FC<StatItemProps> = ({
    playerName,
    statValue,
    delay,
    index,
    textColor,
}) => {
    const { animations } = useAnimationContext();
    const TextAnimations = animations.text.main;

    return (
        <div className="flex justify-between items-center py-1">
            <ResultPlayerName
                value={truncateText(playerName, 25)}
                variant={textColor}
                animation={{
                    ...TextAnimations.copyIn,
                    delay: delay + 10 + index,
                }}
            />

            <ResultPlayerScore
                value={statValue}
                variant={textColor}
                animation={{
                    ...TextAnimations.copyIn,
                    delay: delay + 10 + index,
                }}
            />
        </div>
    );
};

const StatSection: React.FC<StatSectionProps> = ({
    players,
    isBatting,
    delay,
    backgroundColor,
    textColor,
}) => {
    const { layout } = useThemeContext();
    if (players.length === 0) return null;

    return (
        <div
            className={`flex-1 py-1 px-4 ${layout.borderRadius.container}`}
            style={{ background: backgroundColor }}
        >
            {players.map((player, i) => {
                const statValue = isBatting
                    ? `${(player as BattingPerformance).runs}${(player as BattingPerformance).notOut ? "*" : ""} (${(player as BattingPerformance).balls})`
                    : `${(player as BowlingPerformance).wickets}/${(player as BowlingPerformance).runs} (${(player as BowlingPerformance).overs})`;

                return (
                    <StatItem
                        key={`${isBatting ? "bat" : "bowl"}-${i}`}
                        playerName={player.player}
                        statValue={statValue}
                        delay={delay}
                        index={i}
                        textColor={textColor}
                    />
                );
            })}
        </div>
    );
};

const TeamStats: React.FC<TeamStatsProps> = ({
    team,
    delay,
    maxPlayersPerStat,
    className = "",
    showBatting = true,
    showBowling = true,
}) => {
    const { selectedPalette } = useThemeContext();

    const batters = team.battingPerformances
        ? team.battingPerformances.slice(0, maxPlayersPerStat)
        : [];
    const bowlers = team.bowlingPerformances
        ? team.bowlingPerformances.slice(0, maxPlayersPerStat)
        : [];

    return (
        <div className={`flex-1 px-2 py-0 flex flex-row gap-4 ${className}`}>
            {showBatting && (
                <StatSection
                    players={batters}
                    isBatting={true}
                    delay={delay}
                    backgroundColor={
                        selectedPalette.container.backgroundTransparent.strong
                    }
                    textColor={"onContainerCopy"}
                />
            )}

            {showBowling && (
                <StatSection
                    players={bowlers}
                    isBatting={false}
                    delay={delay + 2}
                    backgroundColor={
                        selectedPalette.container.backgroundTransparent.strong
                    }
                    textColor={"onContainerCopy"}
                />
            )}
        </div>
    );
};

export const PlayerStatsClubOnlyBasic: React.FC<PlayerStatsClubOnlyProps> = ({
    match,
    height,
    delay,
    maxPlayersPerStat = 3,
    matchType,
    matchStatus,
}) => {
    const { animations } = useAnimationContext();

    // Get club team players
    const clubTeamPlayers = getClubTeamPlayers(match);

    // Determine which team is the club team
    const clubTeam = match.homeTeam.isClubTeam ? match.homeTeam : match.awayTeam.isClubTeam ? match.awayTeam : null;

    if (!clubTeamPlayers || !clubTeam) {
        return null; // Don't render if no club team found
    }

    // Create a club team object with only club team players
    const clubTeamWithFilteredPlayers: Team = {
        ...clubTeam,
        battingPerformances: clubTeamPlayers.battingPerformances,
        bowlingPerformances: clubTeamPlayers.bowlingPerformances,
    };

    // Determine visibility flags for club team
    const clubBatted = clubTeamPlayers.battingPerformances.length > 0;
    const { flags } = computePartialTwoDayVisibility({
        matchType,
        matchStatus,
        homeBatted: clubBatted,
        awayBatted: false, // Only showing club team
    });
    const { homeShowBatting, homeShowBowling } = flags;

    return (
        <AnimatedContainer
            type="full"
            className="w-full p-1"
            backgroundColor="none"
            style={{
                height: `${height}px`,
            }}
            animation={animations.container.main.itemContainer.containerIn}
            animationDelay={delay}
        >
            <div className="flex w-full h-full justify-center items-center">
                <TeamStats
                    team={clubTeamWithFilteredPlayers}
                    delay={delay}
                    maxPlayersPerStat={maxPlayersPerStat}
                    showBatting={homeShowBatting}
                    showBowling={homeShowBowling}
                />
            </div>
        </AnimatedContainer>
    );
};

export default PlayerStatsClubOnlyBasic;
