// src/core/utils/routing.tsx
import React from "react";
import { FixturaDataset } from "../types/data/index";
import { normalizeCompositionId } from "./compositionMapping";

// Import composition types (these will be dynamically loaded)
import * as CricketCompositions from "../../compositions/cricket";
import * as AFLCompositions from "../../compositions/afl";
import * as NetballCompositions from "../../compositions/netball";

// Common composition types across sports
const COMMON_COMPOSITION_TYPES = {
  Ladder: "ladder",
  Top5: "top5",
  Results: "results",
  Upcoming: "upcoming",
  SingleGameResult: "singleGameResult",
};

// Sport-specific composition types
const SPORT_COMPOSITION_TYPES = {
  cricket: {
    ...COMMON_COMPOSITION_TYPES,
    Top5BattingList: "top5",
    Top5BowlingList: "top5",
    WeekendResults: "results",
    UpcomingFixtures: "upcoming",
    RosterPoster: "roster",
  },
  afl: {
    ...COMMON_COMPOSITION_TYPES,
    AFLLadder: "ladder",
    AFLTop5: "top5",
    AFLResults: "results",
    AFLUpcoming: "upcoming",
    AFLSingleGameResult: "singleGameResult",
  },
  netball: {
    ...COMMON_COMPOSITION_TYPES,
    NetballLadder: "ladder",
    NetballTop5: "top5",
    NetballResults: "results",
    NetballUpcoming: "upcoming",
    NetballSingleGameResult: "singleGameResult",
  },
};

// Registry of sport modules
const SPORT_MODULES: Record<string, any> = {
  cricket: CricketCompositions,
  afl: AFLCompositions,
  netball: NetballCompositions,
};

/**
 * Routes to the appropriate composition based on template, sport, and composition ID
 */
export const routeToComposition = (data: FixturaDataset) => {
  // Extract key information from data
  const { videoMeta, data: CompositionData } = data;
  let compositionId = videoMeta.video.metadata.compositionId;
  const templateId =
    videoMeta.video.appearance.template?.toLowerCase() || "basic";
  const templateVariation = videoMeta.video.templateVariation || {};
  const sport = videoMeta.Club?.Sport?.toLowerCase() || "cricket";

  // Normalize the composition ID to handle compound formats
  compositionId = normalizeCompositionId(compositionId);

  try {
    // Get the sport module
    const sportModule = SPORT_MODULES[sport];
    if (!sportModule) {
      console.warn(`Unknown sport: ${sport}`);
      return renderPlaceholder(data, compositionId, templateId, sport);
    }

    // Get the composition type from the mapping for this sport
    const compositionTypes =
      SPORT_COMPOSITION_TYPES[sport as keyof typeof SPORT_COMPOSITION_TYPES] ||
      {};

    const compositionType =
      compositionTypes[compositionId as keyof typeof compositionTypes];

    if (!compositionType) {
      console.warn(
        `Unknown composition ID: ${compositionId} for sport: ${sport}`,
      );
      return renderPlaceholder(data, compositionId, templateId, sport);
    }

    //console.log(`Resolved composition type: ${compositionType}`);

    // Get the composition module
    const compositionModule = sportModule[compositionType];
    if (!compositionModule) {
      console.warn(`Missing composition module: ${sport}/${compositionType}`);
      return renderPlaceholder(data, compositionId, templateId, sport);
    }

    // Get the template-specific implementation
    // First try the exact template ID, then fallback to lowercase, then to basic
    const TemplateComponent =
      compositionModule[templateId] ||
      compositionModule[templateId.toLowerCase()] ||
      compositionModule.basic;

    if (!TemplateComponent) {
      console.warn(
        `Missing template implementation: ${sport}/${compositionType}/${templateId}`,
      );
      return renderPlaceholder(data, compositionId, templateId, sport);
    }

    /*   console.log(
          `Rendering component: ${sport}/${compositionType}/${templateId}`,
        ); */

    // Return the component with the data and template variation
    return (
      <TemplateComponent
        data={CompositionData}
        templateVariation={templateVariation}
      />
    );
  } catch (error) {
    console.error("Error in composition routing:", error);
    return renderPlaceholder(data, compositionId, templateId, sport);
  }
};

////////////////////////////////////////////////////////////////////////////////
// Utils
////////////////////////////////////////////////////////////////////////////////

// Helper function to create placeholder component
function renderPlaceholder(
  data: FixturaDataset,
  compositionId: string,
  templateId: string,
  sport: string,
) {
  return (
    <PlaceholderComponent
      data={data}
      compositionId={compositionId}
      templateId={templateId}
      sport={sport}
    />
  );
}

// Placeholder component for missing compositions with simplified structure
const PlaceholderComponent: React.FC<{
  data: FixturaDataset;
  compositionId: string;
  templateId: string;
  sport: string;
}> = ({ data, compositionId, templateId, sport }) => {
  const baseStyle = {
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    color: "#ffffff",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: "20px",
    textAlign: "center" as const,
  };

  return (
    <div style={baseStyle}>
      <h1 style={{ fontSize: "3em", marginBottom: "20px" }}>
        {data.videoMeta.video.metadata.title || "Composition"}
      </h1>
      <p style={{ fontSize: "1.5em", marginBottom: "10px" }}>
        Missing Composition Implementation
      </p>
      <p style={{ fontSize: "1.2em", marginBottom: "5px" }}>Sport: {sport}</p>
      <p style={{ fontSize: "1.2em", marginBottom: "5px" }}>
        Template: {templateId}
      </p>
      <p style={{ fontSize: "1.2em", marginBottom: "5px" }}>
        Composition: {compositionId}
      </p>
    </div>
  );
};
