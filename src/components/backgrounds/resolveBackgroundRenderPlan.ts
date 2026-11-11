import type { DesignPalette } from "../../core/utils/designPalettes/types";
import type { LegacyWirePayload } from "./variants/Generated/catalogue";
import {
  resolveBackgroundIngress,
  type ResolvedBackgroundIngress,
} from "./backgroundPort";
import type { ValidatedBackgroundRoute } from "./resolveValidatedBackgroundRoute";
import {
  resolveLuminanceRenderPlan,
  type LuminanceRenderPlan,
  type LuminanceRenderBackend,
} from "./variants/Luminance/resolveLuminanceRenderPlan";
import {
  resolveGeneratedRenderPlan,
  type GeneratedRenderPlan,
} from "./variants/Generated/resolveGeneratedRenderPlan";

export type BackgroundRenderPlan = {
  ingress: ResolvedBackgroundIngress;
  route: ValidatedBackgroundRoute;
  luminance?: LuminanceRenderPlan;
  generated?: GeneratedRenderPlan;
};

export type ResolveBackgroundRenderPlanInput = {
  wire: LegacyWirePayload;
  palette?: DesignPalette;
  luminanceBackend?: LuminanceRenderBackend;
};

/**
 * Ingress route plus optional pure render plans (Luminance today; Generated presets stay on route adapters).
 */
export const resolveBackgroundRenderPlan = (
  input: ResolveBackgroundRenderPlanInput,
): BackgroundRenderPlan => {
  const ingress = resolveBackgroundIngress(input.wire);
  const plan: BackgroundRenderPlan = {
    ingress,
    route: ingress.route,
  };

  const wireRecord =
    input.wire && typeof input.wire === "object"
      ? (input.wire as Record<string, unknown>)
      : {};

  if (ingress.route.kind === "luminance" && input.palette) {
    plan.luminance = resolveLuminanceRenderPlan({
      templateLuminance: wireRecord.luminance,
      palette: input.palette,
      backend: input.luminanceBackend,
    });
  }

  plan.generated = resolveGeneratedRenderPlan(ingress.route, input.palette);

  return plan;
};
