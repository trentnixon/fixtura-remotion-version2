import type { DesignPalette } from "../../../../core/utils/designPalettes/types";
import type { ValidatedBackgroundRoute } from "../../resolveValidatedBackgroundRoute";
import type { RendererAdapterKey } from "./catalogue/types";
import type { NoiseVariant } from "../NoiseBackground/config";

export type GeneratedRenderPlan =
  | {
      readonly kind: "pattern";
      readonly adapter: RendererAdapterKey;
      readonly presetId: string;
    }
  | {
      readonly kind: "particle";
      readonly adapter: RendererAdapterKey;
      readonly presetId: string;
    }
  | {
      readonly kind: "noise";
      readonly adapter: RendererAdapterKey;
      readonly presetId: string;
      readonly variant: NoiseVariant;
      readonly baseColor: string;
      readonly noiseColor: string;
    };

const defaultPaletteColors = {
  baseColor: "#0f172a",
  noiseColor: "#64748b",
} as const;

export const resolveGeneratedRenderPlan = (
  route: ValidatedBackgroundRoute,
  palette?: DesignPalette,
): GeneratedRenderPlan | undefined => {
  const baseColor =
    palette?.background.main ?? defaultPaletteColors.baseColor;
  const noiseColor =
    palette?.background.accent ?? defaultPaletteColors.noiseColor;

  switch (route.kind) {
    case "pattern":
      return {
        kind: "pattern",
        adapter: route.adapter,
        presetId: route.presetId,
      };
    case "particle":
      return {
        kind: "particle",
        adapter: route.adapter,
        presetId: route.presetId,
      };
    case "noise":
      return {
        kind: "noise",
        adapter: route.adapter,
        presetId: route.presetId,
        variant: route.variant,
        baseColor,
        noiseColor,
      };
    default:
      return undefined;
  }
};
