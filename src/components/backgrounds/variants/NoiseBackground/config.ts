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
  | "static"
  | "floatingParticles"
  | "dynamicParticles"
  | "triangleSwarm"
  | "pulsingCircles"
  | "digitalRain"
  | "gradientGrid"
  | "graphics"
  | "geometric"
  | "spokes";

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
  floatingParticles: {
    name: "Floating Particles",
    description: "A gentle, slow-moving field of 3D particles.",
  },
  dynamicParticles: {
    name: "Dynamic Particles",
    description: "An energetic field of 3D particles with more movement.",
  },
  triangleSwarm: {
    name: "Triangle Swarm",
    description: "A 3D field of floating, animated triangles.",
  },
  pulsingCircles: {
    name: "Pulsing Circles",
    description: "A 2D grid of soft, pulsing circles.",
  },
  digitalRain: {
    name: "Digital Rain",
    description: "A matrix-style effect with falling lines.",
  },
  gradientGrid: {
    name: "Gradient Grid",
    description: "A noise grid with a smooth color gradient.",
  },
  graphics: {
    name: "Animated Graphics",
    description:
      "Animated SVG graphics with various geometric patterns and shapes.",
  },
  geometric: {
    name: "Geometric Graphics",
    description:
      "Animated geometric shapes including triangles, squares, and circles with smooth rotations and scaling animations.",
  },
  spokes: {
    name: "Spokes Graphics",
    description:
      "Animated spokes with gradient background, featuring intro and content animations with smooth transitions.",
  },
};
