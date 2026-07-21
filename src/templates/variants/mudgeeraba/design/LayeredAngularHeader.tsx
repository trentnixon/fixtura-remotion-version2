import React, { CSSProperties, ReactNode } from "react";
import tinycolor from "tinycolor2";
import { AnimatedContainer } from "../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import {
  SHALLOW_HEADER_TOP,
  SHALLOW_STATUS_BAR,
  clipPathStyle,
} from "./angles";

/** Title panel width as % of header container. */
export const HEADER_TITLE_PANEL_WIDTH_PERCENT = 92;

/** Title panel height as % of header slot height. */
export const HEADER_TITLE_PANEL_HEIGHT_RATIO = 0.5;

/** Club-name panel height as % of header slot height. */
export const HEADER_NAME_PANEL_HEIGHT_RATIO = 0.26;

/** Vertical gap between title and name panels (no overlap). */
export const HEADER_PANEL_GAP_PX = 10;

/** Horizontal inset from frame edge to panel content (OneColumn + header padding). */
export const HEADER_LAYOUT_INSET_PX = 48;

/** Extra safety margin so fitted text stays inside clipped edges. */
export const HEADER_TEXT_FIT_SAFETY_PX = 16;

/** Inner horizontal padding on the title panel (`px-6`). */
export const HEADER_TITLE_INNER_PADDING_PX = 48;

/** Inner horizontal padding on the name panel (`px-8`). */
export const HEADER_NAME_INNER_PADDING_PX = 64;

/** Accent border width on panel seams (title bottom, name top). */
export const HEADER_PANEL_BORDER_WIDTH_PX = 1;

export const getHeaderPanelContentWidth = (
  compositionWidth: number,
  panelWidthPercent = HEADER_TITLE_PANEL_WIDTH_PERCENT,
  innerHorizontalPaddingPx: number,
  layoutInsetPx = HEADER_LAYOUT_INSET_PX,
  safetyPx = HEADER_TEXT_FIT_SAFETY_PX,
): number => {
  const layoutWidth = Math.max(0, compositionWidth - layoutInsetPx);
  const panelWidth = layoutWidth * (panelWidthPercent / 100);
  return Math.max(
    0,
    Math.floor(panelWidth - innerHorizontalPaddingPx - safetyPx),
  );
};

export const getHeaderTitlePanelBackground = (
  backgroundMain: string,
): string => {
  const base = tinycolor(backgroundMain);
  const top = base.clone().lighten(6).setAlpha(0.88).toRgbString();
  const mid = base.clone().setAlpha(0.76).toRgbString();
  const bottom = base.clone().darken(14).setAlpha(0.58).toRgbString();
  return `linear-gradient(to bottom right, ${top} 0%, ${mid} 52%, ${bottom} 100%)`;
};

export const getHeaderNamePanelBackground = (primary: string): string => {
  const light = tinycolor(primary).lighten(12).toRgbString();
  const mid = tinycolor(primary).toRgbString();
  const dark = tinycolor(primary).darken(16).toRgbString();
  return `linear-gradient(to bottom right, ${light} 0%, ${mid} 50%, ${dark} 100%)`;
};

export interface LayeredAngularHeaderProps {
  height: number;
  title: ReactNode;
  name: ReactNode;
  exitFrame: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Stacked angular header panels with vertical gradients and slide-in animation.
 * Sizing lives on outer wrappers — AnimatedContainer uses size="full" so it does
 * not override explicit panel dimensions.
 */
export const LayeredAngularHeader: React.FC<LayeredAngularHeaderProps> = ({
  height,
  title,
  name,
  exitFrame,
  className = "",
  style,
}) => {
  const { colors, selectedPalette } = useThemeContext();
  const { animations } = useAnimationContext();
  const headerAnimations = animations.container.main.header;

  const titlePanelHeight = Math.round(height * HEADER_TITLE_PANEL_HEIGHT_RATIO);
  const namePanelHeight = Math.round(height * HEADER_NAME_PANEL_HEIGHT_RATIO);
  const titleBackground = getHeaderTitlePanelBackground(
    selectedPalette.background.main,
  );
  const nameBackground = getHeaderNamePanelBackground(colors.primary);
  const borderColor = selectedPalette.text.onBackground.main;
  const panelBorder = `${HEADER_PANEL_BORDER_WIDTH_PX}px solid ${borderColor}`;

  return (
    <div
      className={`flex w-full flex-col items-center justify-center overflow-visible px-4 ${className}`}
      style={{
        height: `${height}px`,
        gap: `${HEADER_PANEL_GAP_PX}px`,
        ...style,
      }}
    >
      <div
        className="relative z-0 w-full shrink-0"
        style={{
          width: `${HEADER_TITLE_PANEL_WIDTH_PERCENT}%`,
          height: `${titlePanelHeight}px`,
        }}
      >
        <AnimatedContainer
          type="basic"
          size="full"
          className="h-full w-full rounded-none overflow-hidden"
          backgroundColor="none"
          animation={headerAnimations.titlePanel.containerIn}
          exitAnimation={headerAnimations.titlePanel.containerOut}
          exitFrame={exitFrame}
          style={{
            background: titleBackground,
            borderBottom: panelBorder,
            ...clipPathStyle(SHALLOW_HEADER_TOP),
          }}
        >
          <div className="flex h-full w-full items-center justify-center overflow-hidden px-6 py-3">
            {title}
          </div>
        </AnimatedContainer>
      </div>

      <div
        className="relative z-10 flex w-full shrink-0 justify-center"
        style={{ maxWidth: `${HEADER_TITLE_PANEL_WIDTH_PERCENT}%` }}
      >
        <div
          className="w-full min-w-[42%] max-w-full"
          style={{ height: `${namePanelHeight}px` }}
        >
          <AnimatedContainer
            type="basic"
            size="full"
            className="h-full w-full rounded-none overflow-hidden"
            backgroundColor="none"
            animation={headerAnimations.namePanel.containerIn}
            exitAnimation={headerAnimations.namePanel.containerOut}
            exitFrame={exitFrame}
            style={{
              background: nameBackground,
              borderTop: panelBorder,
              ...clipPathStyle(SHALLOW_STATUS_BAR),
            }}
          >
            <div className="flex h-full w-full items-center justify-center overflow-hidden px-8 py-2">
              {name}
            </div>
          </AnimatedContainer>
        </div>
      </div>
    </div>
  );
};
