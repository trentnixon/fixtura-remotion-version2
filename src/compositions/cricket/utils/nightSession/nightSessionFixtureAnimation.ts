import type { ContainerAnimationConfig } from "../../../../components/containers/animations";
import {
  NIGHT_SESSION_FIXTURE_INNER_ENTER_DISTANCE_PX,
  NIGHT_SESSION_FIXTURE_ROW_ENTER_DISTANCE_PX,
} from "./nightSessionAnimationTiming";

export const withNightSessionFixtureRowDistance = (
  config: ContainerAnimationConfig,
): ContainerAnimationConfig => ({
  ...config,
  custom: { distance: NIGHT_SESSION_FIXTURE_ROW_ENTER_DISTANCE_PX },
});

export const withNightSessionFixtureInnerDistance = (
  config: ContainerAnimationConfig,
): ContainerAnimationConfig => ({
  ...config,
  custom: { distance: NIGHT_SESSION_FIXTURE_INNER_ENTER_DISTANCE_PX },
});
