/**
 * NoiseBackground configuration
 */

export type NoiseVariant =
  | "floatingParticles"
  | "pulsingCircles"
  | "digitalRain"
  | "spokes";

export const NOISE_VARIANTS: Record<
  NoiseVariant,
  { name: string; description: string }
> = {
  floatingParticles: {
    name: "Floating Particles",
    description: "A gentle, slow-moving field of 3D particles.",
  },
  pulsingCircles: {
    name: "Pulsing Circles",
    description: "A 2D grid of soft, pulsing circles.",
  },
  digitalRain: {
    name: "Digital Rain",
    description: "A matrix-style effect with falling lines.",
  },
  spokes: {
    name: "Spokes Graphics",
    description:
      "Animated spokes with gradient background, featuring intro and content animations with smooth transitions.",
  },
};
