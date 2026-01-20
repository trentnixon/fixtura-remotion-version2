import React from "react";
import * as IconPack1 from "../svg/icon1";

// Icon pack type definition
export type IconPack = {
  Batter1: React.FC<React.SVGProps<SVGSVGElement>>;
  Batter2: React.FC<React.SVGProps<SVGSVGElement>>;
  Bowler1: React.FC<React.SVGProps<SVGSVGElement>>;
  Bowler2: React.FC<React.SVGProps<SVGSVGElement>>;
  AllRounder: React.FC<React.SVGProps<SVGSVGElement>>;
  Man12th: React.FC<React.SVGProps<SVGSVGElement>>;
};

// Icon pack registry - add new packs here
const iconPackRegistry: Record<string, IconPack> = {
  icon1: IconPack1 as IconPack,
  // Add more icon packs here as they are created:
  // icon2: IconPack2 as IconPack,
  // icon3: IconPack3 as IconPack,
};

// Default icon pack name
const DEFAULT_ICON_PACK = "icon1";

// Position to icon name mapping
const positionToIconMap: Record<string, keyof IconPack> = {
  topscorer: "Batter1",
  higheststrikerate: "Batter2",
  mostwickets: "Bowler1",
  besteconomy: "Bowler2",
  topallrounder: "AllRounder",
  bestoftherest: "Man12th",
};

// Helper function to get the appropriate SVG icon component for the position
export const getPositionIcon = (
  position: string,
  iconPackName?: string,
): React.FC<React.SVGProps<SVGSVGElement>> | null => {
  // Use provided pack name or current default
  const packToUse = iconPackName || currentDefaultIconPack;

  // Get the icon pack (fallback to default if not found)
  const iconPack = iconPackRegistry[packToUse] || iconPackRegistry[DEFAULT_ICON_PACK];

  if (!iconPack) {
    console.warn(`Icon pack "${packToUse}" not found, using default "${DEFAULT_ICON_PACK}"`);
    return null;
  }

  // Get the icon name for this position
  const iconName = positionToIconMap[position];

  if (!iconName) {
    return null;
  }

  // Return the icon component from the pack
  return iconPack[iconName] || null;
};

// Helper function to set or get the default icon pack
let currentDefaultIconPack = DEFAULT_ICON_PACK;

export const setDefaultIconPack = (packName: string): void => {
  if (iconPackRegistry[packName]) {
    currentDefaultIconPack = packName;
  } else {
    console.warn(`Icon pack "${packName}" not found in registry`);
  }
};

export const getDefaultIconPack = (): string => {
  return currentDefaultIconPack;
};

// Helper function to register a new icon pack
export const registerIconPack = (packName: string, pack: IconPack): void => {
  iconPackRegistry[packName] = pack;
};
