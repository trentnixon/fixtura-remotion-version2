// src/core/utils/routing.tsx
import React from "react";
import { useVideoDataContext } from "../context/VideoDataContext";
import { normalizeCompositionId } from "./compositionMapping";
import { PlaceholderComponent } from "./PlaceholderComponent";
import { SPORT_COMPOSITION_MODULE_KEYS } from "./compositionSportTypes";
import { resolveCompositionTemplateComponent } from "./compositionRoutingManifest";

import * as CricketCompositions from "../../compositions/cricket";
import * as AFLCompositions from "../../compositions/afl";
import * as NetballCompositions from "../../compositions/netball";

type Sport = "cricket" | "afl" | "netball";
type CompositionId = string;

type SportModuleType = Record<
  string,
  Record<string, React.ComponentType<unknown>> | React.ComponentType<unknown>
>;

const SPORT_MODULES: Record<Sport, SportModuleType> = {
  cricket: CricketCompositions as SportModuleType,
  afl: AFLCompositions as SportModuleType,
  netball: NetballCompositions as SportModuleType,
};

const getCompositionType = (
  sport: Sport,
  compositionId: CompositionId,
): string | undefined => {
  const compositionTypes = SPORT_COMPOSITION_MODULE_KEYS[sport];
  return compositionTypes?.[compositionId];
};

/**
 * Routes to the appropriate composition based on Registry ID, sport, and composition metadata ID.
 */
export const RouteToComposition = (): React.ReactElement => {
  const { data, metadata, appearance, club } = useVideoDataContext();
  const videoMeta = data?.videoMeta;
  if (!videoMeta?.video) {
    return (
      <PlaceholderComponent
        title={metadata?.title}
        compositionId={metadata?.compositionId ?? "Unknown"}
        templateId={appearance?.template?.toLowerCase() || "basic"}
        sport={(club?.sport?.toLowerCase() || "cricket") as Sport}
        reason="Missing videoMeta"
      />
    );
  }
  const videoMetadata = videoMeta.video.metadata;
  const videoAppearance = videoMeta.video.appearance;
  const resolvedMetadata = metadata ?? videoMetadata;
  const resolvedAppearance = appearance ?? videoAppearance;

  const compositionId = normalizeCompositionId(resolvedMetadata.compositionId);
  const registryId = resolvedAppearance.template || "Basic";
  const sport = (videoMeta.club?.sport?.toLowerCase() || "cricket") as Sport;
  const title = resolvedMetadata.title;

  try {
    const sportModule = SPORT_MODULES[sport];
    if (!sportModule) {
      console.warn(`Unknown sport: ${sport}`);
      return (
        <PlaceholderComponent
          title={title}
          compositionId={compositionId}
          templateId={registryId.toLowerCase()}
          sport={sport}
          reason="Missing sportModule"
        />
      );
    }

    const compositionType = getCompositionType(sport, compositionId);
    if (!compositionType) {
      console.warn(
        `Unknown composition ID: ${compositionId} for sport: ${sport}`,
      );
      return (
        <PlaceholderComponent
          title={title}
          compositionId={compositionId}
          templateId={registryId.toLowerCase()}
          sport={sport}
          reason="Missing compositionType"
        />
      );
    }

    const compositionModule = sportModule[compositionType];
    if (!compositionModule) {
      return (
        <PlaceholderComponent
          title={title}
          compositionId={compositionId}
          templateId={registryId.toLowerCase()}
          sport={sport}
          reason="Missing composition module"
        />
      );
    }

    const TemplateComponent = resolveCompositionTemplateComponent(
      compositionModule,
      registryId,
    );
    if (!TemplateComponent) {
      console.warn(
        `Missing template implementation: ${sport}/${compositionType}/${registryId}`,
      );
      return (
        <PlaceholderComponent
          title={title}
          compositionId={compositionId}
          templateId={registryId.toLowerCase()}
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
        templateId={registryId.toLowerCase()}
        sport={sport}
        reason="error in processing"
      />
    );
  }
};
