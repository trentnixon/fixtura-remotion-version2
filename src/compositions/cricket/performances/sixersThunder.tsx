import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import NoPlayersData from "./modules/NoPlayersData/no-data";
import {
  TransitionDirection,
  TransitionSeriesWrapper,
  TransitionType,
} from "../../../components/transitions";
import { useAnimationContext } from "../../../core/context/AnimationContext";
import { transformPerformanceData } from "./utils/dataTransformer";
import { SponsorFooter } from "../sponsorFooter/index";
import { AssignSponsors } from "../composition-types";
import { useThemeContext } from "../../../core/context/ThemeContext";
import PerformancesDisplaySixersThunder from "./controller/PerformancesDisplay/display-SixersThunder";

export const PerformancesListSixersThunder: React.FC = () => {
  const { data, contentLayout, metadata } = useVideoDataContext();
  const { data: performancesData, timings } = data;
  const { animations } = useAnimationContext();
  const { layout } = useThemeContext();
  const { heights } = layout;
  const transitionConfig = animations.transition.Main;

  // Extract metadata from video data
  const fixturesLayout = contentLayout.divideFixturesBy || {};

  // Get items per screen from contentLayout - match upcoming pattern exactly
  const fixturesConfig = fixturesLayout as unknown as {
    CricketBattingPerformances?: number;
    CricketBowlingPerformances?: number;
  };

  let itemsPerScreen: number;
  if (
    fixturesConfig &&
    typeof fixturesConfig.CricketBattingPerformances === "number" &&
    fixturesConfig.CricketBattingPerformances > 0
  ) {
    itemsPerScreen = fixturesConfig.CricketBattingPerformances;
  } else if (
    fixturesConfig &&
    typeof fixturesConfig.CricketBowlingPerformances === "number" &&
    fixturesConfig.CricketBowlingPerformances > 0
  ) {
    itemsPerScreen = fixturesConfig.CricketBowlingPerformances;
  } else {
    itemsPerScreen = 5; // Default fallback
  }

  // Get frame duration from metadata if available
  // Use FPS_PREFORMANCECARD for performances composition
  const frameOptions = metadata.frames || [300];
  // Use || instead of ?? to handle 0 values (match upcoming pattern)
  let displayDurationPerScreen =
    timings?.FPS_PREFORMANCECARD || frameOptions[0] || 300;

  // Ensure duration is always positive (defensive check)
  if (
    typeof displayDurationPerScreen !== "number" ||
    displayDurationPerScreen <= 0
  ) {
    console.warn(
      "[PerformancesListSixersThunder] Invalid durationInFrames:",
      displayDurationPerScreen,
      "using default 300",
    );
    displayDurationPerScreen = 300;
  }

  // If no data is available, show a placeholder
  if (
    !performancesData ||
    !Array.isArray(performancesData) ||
    performancesData.length === 0
  ) {
    return <NoPlayersData />;
  }

  const compositionId = data.videoMeta?.video?.metadata?.compositionId || "";

  // Transform data based on composition type
  const transformedData = transformPerformanceData(
    performancesData as unknown[],
    compositionId,
  );

  // Calculate how many screens we need based on items per screen
  const totalScreens = Math.ceil(transformedData.length / itemsPerScreen);

  // Ensure we have at least one screen
  if (totalScreens <= 0) {
    console.warn(
      "[PerformancesListSixersThunder] No screens to display, returning placeholder",
    );
    return <NoPlayersData />;
  }

  // Debug logging (remove in production)
  console.log("[PerformancesListSixersThunder] Debug:", {
    totalItems: transformedData.length,
    itemsPerScreen,
    totalScreens,
    compositionId,
    displayDurationPerScreen,
  });

  // Final validation - ensure duration is still valid before creating sequences
  const finalDuration = Math.max(1, Math.floor(displayDurationPerScreen));

  // Create sequence data for each screen
  const sequences = Array.from({ length: totalScreens }, (_, index) => ({
    content: (
      <PerformancesDisplaySixersThunder
        performances={transformedData}
        itemsPerScreen={itemsPerScreen}
        screenIndex={index}
      />
    ),
    durationInFrames: finalDuration,
  }));

  // Debug logging for sequences (remove in production)
  console.log("[PerformancesListSixersThunder] Sequences created:", {
    totalScreens,
    sequencesCount: sequences.length,
    sequences: sequences.map((seq, idx) => ({
      screenIndex: idx,
      durationInFrames: seq.durationInFrames,
    })),
  });

  // Merge and transform assignSponsors from all performances (global level)
  // Transform from performance format to SponsorFooter expected format
  const mergedAssignSponsors = transformedData.reduce(
    (acc, performance) => {
      const { assignSponsors } = performance;
      if (!assignSponsors) return acc;

      // Collect unique grades and competitions
      const grades = acc.grade || [];
      const competitions = acc.competition || [];
      const teams = acc.team || [];

      // Add grade if it exists and is unique
      if (assignSponsors.grade && assignSponsors.grade.id) {
        const gradeExists = grades.some(
          (g) => g.id === assignSponsors.grade.id,
        );
        if (!gradeExists) {
          grades.push({
            id: assignSponsors.grade.id,
            name: assignSponsors.grade.name,
            logo: { url: "" }, // Performance data doesn't include logos
          });
        }
      }

      // Add competition if it exists and is unique
      if (assignSponsors.competition && assignSponsors.competition.id) {
        const compExists = competitions.some(
          (c) => c.id === assignSponsors.competition.id,
        );
        if (!compExists) {
          competitions.push({
            id: assignSponsors.competition.id,
            name: assignSponsors.competition.name,
            logo: { url: "" }, // Performance data doesn't include logos
          });
        }
      }

      // Add team if it exists (Team is an object, not array in performance data)
      if (assignSponsors.Team && assignSponsors.Team.name) {
        const teamExists = teams.some(
          (t) => t.home?.name === assignSponsors.Team.name,
        );
        if (!teamExists) {
          teams.push({
            home: { name: assignSponsors.Team.name },
            away: { name: "" },
            logo: { url: "" }, // Performance data doesn't include logos
          });
        }
      }

      return {
        grade: grades,
        competition: competitions,
        team: teams,
      };
    },
    { grade: [], competition: [], team: [] } as AssignSponsors,
  );

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1">
        <TransitionSeriesWrapper
          sequences={sequences}
          transitionType={transitionConfig.type as TransitionType}
          direction={transitionConfig.direction as TransitionDirection}
          timing={{
            type: "linear",
            durationInFrames: transitionConfig.durationInFrames,
          }}
        />
      </div>
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter
          assignSponsors={mergedAssignSponsors as unknown as AssignSponsors}
        />
      </div>
    </div>
  );
};

// Export as SixersThunder for compatibility with original template
export const SixersThunder: React.FC = () => {
  return <PerformancesListSixersThunder />;
};

export default SixersThunder;
