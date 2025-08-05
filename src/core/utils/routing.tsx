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

// Define a more specific type for the sport modules, using unknown instead of any
type SportModuleType = Record<
  string,
  | Record<string, React.ComponentType<unknown>> // Use unknown for template maps
  | React.ComponentType<unknown> // Use unknown for direct components
>;

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
    CricketUpcoming: "CricketUpcoming",
    CricketTop5Batting: "CricketTop5",
    CricketTop5Bowling: "CricketTop5",
    CricketResultSingle: "CricketResultSingle",
    CricketRoster: "CricketRoster",
    CricketResults: "CricketResults",
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

// Registry of sport modules - Use the specific type
const SPORT_MODULES: Record<Sport, SportModuleType> = {
  // Use type assertion to handle potential structural mismatches if necessary,
  // especially if index files export both direct components and template maps.
  cricket: CricketCompositions as SportModuleType,
  afl: AFLCompositions as SportModuleType,
  netball: NetballCompositions as SportModuleType,
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
  sportModule: SportModuleType,
  compositionType: string,
  templateId: TemplateId,
): React.ComponentType | undefined => {
  const compositionModule = sportModule[compositionType];
  if (!compositionModule) return undefined;

  if (typeof compositionModule === "function") {
    console.warn(
      `Composition ${compositionType} seems to be a direct component export, not a template map.`,
    );
    // Decide how to handle direct components; assuming they are not meant for templated routing here
    return undefined;
  }

  // Proceed assuming it's a Record<string, React.ComponentType<unknown>>

  const TemplateComponent =
    compositionModule[templateId] ||
    compositionModule[templateId.toLowerCase()];

  // Cast the component back to ComponentType<any> or a more specific type if needed for rendering
  // Or simply return it if the JSX renderer can handle ComponentType<unknown> (often it can)
  return TemplateComponent as React.ComponentType | undefined; // Cast if necessary, or check JSX compatibility
};

/**
 * Routes to the appropriate composition based on template, sport, and composition ID
 */
export const RouteToComposition = (): React.ReactElement => {
  const { data } = useVideoDataContext();
  const { videoMeta } = data;
  const { metadata, appearance } = videoMeta.video;

  const compositionId = normalizeCompositionId(metadata.compositionId);
  const templateId = appearance.template?.toLowerCase() || "basic";
  const sport = (videoMeta.club?.sport?.toLowerCase() || "cricket") as Sport;
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
          reason="Missing sportModule"
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
          reason="Missing compositionType"
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
          reason="Missing TemplateComponent"
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
        reason="error in processing"
      />
    );
  }
};
