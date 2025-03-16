/**
 * NoiseBackground configuration
 *
 * This file defines the available noise variants and their descriptions
 */

export type NoiseVariant =
  | "default"
  | "subtle"
  | "grain"
  | "wave"
  | "fog"
  | "static";

export const NOISE_VARIANTS: Record<
  NoiseVariant,
  { name: string; description: string }
> = {
  default: {
    name: "Default Noise",
    description: "Standard noise pattern with balanced settings",
  },
  subtle: {
    name: "Subtle Noise",
    description: "Very light, barely noticeable noise texture",
  },
  grain: {
    name: "Film Grain",
    description:
      "Pronounced grainy texture resembling film grain or paper texture",
  },
  wave: {
    name: "Wave Noise",
    description: "Flowing, wave-like noise pattern with fluid movement",
  },
  fog: {
    name: "Fog Effect",
    description: "Soft, cloudy noise pattern resembling fog or mist",
  },
  static: {
    name: "TV Static",
    description: "High-contrast, rapidly changing noise resembling TV static",
  },
};
