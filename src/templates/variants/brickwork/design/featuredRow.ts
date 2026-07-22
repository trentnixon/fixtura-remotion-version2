import type { ColorVariant } from "../../../../components/typography/AnimatedText";
import type { BrickworkColourRoles } from "./colours";

/** Extra height for index-0 featured rows (redistributed from other rows). */
export const FEATURED_ROW_HEIGHT_BONUS_PX = 14;

export const isFeaturedRow = (index: number): boolean => index === 0;

export const getFeaturedRowHeight = (
  baseRowHeight: number,
  index: number,
  totalRows: number,
): number => {
  if (totalRows <= 1) {
    return isFeaturedRow(index)
      ? baseRowHeight + FEATURED_ROW_HEIGHT_BONUS_PX
      : baseRowHeight;
  }

  const perRowReduction =
    FEATURED_ROW_HEIGHT_BONUS_PX / Math.max(1, totalRows - 1);

  return isFeaturedRow(index)
    ? baseRowHeight + FEATURED_ROW_HEIGHT_BONUS_PX
    : baseRowHeight - perRowReduction;
};

export interface FeaturedRowSurfaces {
  rowSurface: string;
  logoColumnSurface: string;
  statSurface: string;
  statTextVariant: ColorVariant;
}

export const getFeaturedRowSurfaces = (
  roles: BrickworkColourRoles,
  featured: boolean,
): FeaturedRowSurfaces => {
  if (!featured) {
    return {
      rowSurface: roles.neutral.surface,
      logoColumnSurface: roles.neutral.surfaceContrast,
      statSurface: roles.neutral.surface,
      statTextVariant: "onContainerCopy",
    };
  }

  return {
    rowSurface: roles.neutral.surfaceFeatured,
    logoColumnSurface: roles.neutral.surfaceContrast,
    statSurface: roles.primary.block,
    statTextVariant: "onContainerTitle",
  };
};
