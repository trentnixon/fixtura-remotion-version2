import type { PassthroughWire } from "../../components/backgrounds/variants/Generated/catalogue/types";

export const passthroughDevBackgrounds = [
  { label: "Solid", wire: { useBackground: "Solid" } },
  { label: "Gradient", wire: { useBackground: "Gradient" } },
  { label: "Image", wire: { useBackground: "Image" } },
  { label: "Video", wire: { useBackground: "Video" } },
  { label: "Texture", wire: { useBackground: "Texture" } },
  { label: "Luminance", wire: { useBackground: "Luminance" } },
] as const satisfies ReadonlyArray<{
  readonly label: string;
  readonly wire: PassthroughWire;
}>;

export type PassthroughDevBackgroundLabel =
  (typeof passthroughDevBackgrounds)[number]["label"];
