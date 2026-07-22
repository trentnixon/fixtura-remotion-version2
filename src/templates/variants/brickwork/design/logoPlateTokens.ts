/** Official crest — contain with padded neutral plate. */
export type LogoPlateMode = "preserve" | "graphicCrop" | "hero";

export const LOGO_PLATE_PADDING_PX = 8;

export const LOGO_PLATE_HERO_PADDING_PX = 12;

export const getLogoPlateFit = (
  mode: LogoPlateMode,
): "contain" | "cover" => {
  if (mode === "graphicCrop") {
    return "cover";
  }

  return "contain";
};

export const getLogoPlatePadding = (mode: LogoPlateMode): number =>
  mode === "hero" ? LOGO_PLATE_HERO_PADDING_PX : LOGO_PLATE_PADDING_PX;
