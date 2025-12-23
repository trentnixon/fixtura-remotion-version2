import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import { TeamOfTheWeekPlayer } from "./types";
import TeamOfTheWeekDisplayClassic from "./controller/TeamOfTheWeekDisplay/display-Classic";

export const TeamOfTheWeekList: React.FC = () => {
  const { data } = useVideoDataContext();
  const { data: teamOfTheWeekData, videoMeta } = data;
  const sponsors = videoMeta?.club.sponsors || [];

  // If no data is available, show a placeholder
  if (
    !teamOfTheWeekData ||
    !Array.isArray(teamOfTheWeekData) ||
    teamOfTheWeekData.length === 0
  ) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">No Team of the Week Data</h2>
          <p className="text-xl">Check back later for updates</p>
        </div>
      </div>
    );
  }

  // Cast the data to the correct type
  const players = teamOfTheWeekData as unknown as TeamOfTheWeekPlayer[];

  return (
    <TeamOfTheWeekDisplayClassic players={players} sponsors={sponsors.primary} />
  );
};

// Export as Classic for compatibility with template system
export const Classic: React.FC = () => {
  return <TeamOfTheWeekList />;
};

export default Classic;



