// src/core/utils/routing.tsx
import React from "react";
import { useVideoDataContext } from "../context/VideoDataContext";
import { normalizeCompositionId } from "./compositionMapping";
import { PlaceholderComponent } from "./PlaceholderComponent";

// Import composition types (these will be dynamically loaded)
import * as CricketCompositions from "../../compositions/cricket";
import * as AFLCompositions from "../../compositions/afl";
import * as NetballCompositions from "../../compositions/netball";

// Types
type Sport = "cricket" | "afl" | "netball";
type TemplateId = string;
type CompositionId = string;

interface CompositionTypeMap {
  [key: string]: string;
}

interface SportCompositionTypes {
  [key: string]: CompositionTypeMap;
}

// Common composition types across sport

// Sport-specific composition types
const SPORT_COMPOSITION_TYPES: SportCompositionTypes = {
  cricket: {
    CricketLadder: "CricketLadder",
    Top5BattingList: "top5",
    Top5BowlingList: "top5",
    WeekendResults: "results",
    UpcomingFixtures: "upcoming",
    RosterPoster: "roster",
  },
  afl: {
    AFLLadder: "ladder",
    AFLTop5: "top5",
    AFLResults: "results",
    AFLUpcoming: "upcoming",
    AFLSingleGameResult: "singleGameResult",
  },
  netball: {
    NetballLadder: "ladder",
    NetballTop5: "top5",
    NetballResults: "results",
    NetballUpcoming: "upcoming",
    NetballSingleGameResult: "singleGameResult",
  },
};

// Registry of sport modules
const SPORT_MODULES: Record<Sport, any> = {
  cricket: CricketCompositions,
  afl: AFLCompositions,
  netball: NetballCompositions,
};

/**
 * Gets the appropriate composition type for a given sport and composition ID
 */
const getCompositionType = (
  sport: Sport,
  compositionId: CompositionId,
): string | undefined => {
  const compositionTypes = SPORT_COMPOSITION_TYPES[sport];
  return compositionTypes?.[compositionId];
};

/**
 * Gets the appropriate template component for a given composition
 */
const getTemplateComponent = (
  sportModule: any,
  compositionType: string,
  templateId: TemplateId,
): React.ComponentType | undefined => {
  const compositionModule = sportModule[compositionType];
  if (!compositionModule) return undefined;

  return (
    compositionModule[templateId] ||
    compositionModule[templateId.toLowerCase()] ||
    compositionModule.basic
  );
};

/**
 * Routes to the appropriate composition based on template, sport, and composition ID
 */
export const routeToComposition = (): React.ReactElement => {
  const { data } = useVideoDataContext();
  const { videoMeta } = data;
  const { metadata, appearance } = videoMeta.video;

  const compositionId = normalizeCompositionId(metadata.compositionId);
  const templateId = appearance.template?.toLowerCase() || "basic";
  const sport = (videoMeta.club?.Sport?.toLowerCase() || "cricket") as Sport;
  const title = metadata.title;

  try {
    // Get the sport module
    const sportModule = SPORT_MODULES[sport];
    if (!sportModule) {
      console.warn(`Unknown sport: ${sport}`);
      return (
        <PlaceholderComponent
          title={title}
          compositionId={compositionId}
          templateId={templateId}
          sport={sport}
        />
      );
    }

    // Get the composition type
    const compositionType = getCompositionType(sport, compositionId);
    if (!compositionType) {
      console.warn(
        `Unknown composition ID: ${compositionId} for sport: ${sport}`,
      );
      return (
        <PlaceholderComponent
          title={title}
          compositionId={compositionId}
          templateId={templateId}
          sport={sport}
        />
      );
    }

    // Get the template component
    const TemplateComponent = getTemplateComponent(
      sportModule,
      compositionType,
      templateId,
    );
    if (!TemplateComponent) {
      console.warn(
        `Missing template implementation: ${sport}/${compositionType}/${templateId}`,
      );
      return (
        <PlaceholderComponent
          title={title}
          compositionId={compositionId}
          templateId={templateId}
          sport={sport}
        />
      );
    }

    return <TemplateComponent />;
  } catch (error) {
    console.error("Error in composition routing:", error);
    return (
      <PlaceholderComponent
        title={title}
        compositionId={compositionId}
        templateId={templateId}
        sport={sport}
      />
    );
  }
};
