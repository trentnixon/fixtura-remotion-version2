export {
  SHALLOW_CUT_PERCENT,
  STEEP_CUT_PERCENT,
  SHALLOW_ROW_LEFT,
  SHALLOW_ROW_RIGHT,
  SHALLOW_COLUMN_LEFT,
  SHALLOW_COLUMN_RIGHT,
  SHALLOW_STATUS_BAR,
  SHALLOW_HEADER_TOP,
  SHALLOW_EDGE_STRIP_RIGHT,
  SHALLOW_EDGE_STRIP_LEFT,
  STEEP_LOGO_WELL_LEFT,
  STEEP_LOGO_WELL_RIGHT,
  STEEP_HERO_TOP_LEFT,
  SHALLOW_DIVIDER_LEFT,
  SHALLOW_DIVIDER_RIGHT,
  PADDING_SHALLOW_LEFT,
  PADDING_SHALLOW_RIGHT,
  PADDING_SHALLOW_LEFT_COMPACT,
  PADDING_SHALLOW_ROW_LOGO_FLUSH,
  PADDING_SHALLOW_ROW_LOGO_FLUSH_COMPACT,
  getShallowColumnPadding,
  getShallowEdgeStrip,
  clipPathStyle,
} from "./angles";

export {
  LayeredAngularPanel,
  getLayeredUnderlayColor,
  LAYERED_PANEL_OFFSET_X,
  LAYERED_PANEL_OFFSET_Y,
  LAYERED_PANEL_UNDERLAY_OPACITY,
} from "./LayeredAngularPanel";

export type { LayeredAngularPanelProps } from "./LayeredAngularPanel";

export {
  PANEL_TEXTURE_ANGLE_DEG,
  PANEL_TEXTURE_LINE_SPACING_PX,
  PANEL_TEXTURE_LINE_OPACITY,
  getPanelDiagonalTextureImage,
} from "./panelTexture";

export {
  LayeredAngularHeader,
  HEADER_TITLE_PANEL_WIDTH_PERCENT,
  HEADER_TITLE_PANEL_HEIGHT_RATIO,
  HEADER_NAME_PANEL_HEIGHT_RATIO,
  HEADER_PANEL_GAP_PX,
  HEADER_LAYOUT_INSET_PX,
  HEADER_TEXT_FIT_SAFETY_PX,
  HEADER_TITLE_INNER_PADDING_PX,
  HEADER_NAME_INNER_PADDING_PX,
  HEADER_PANEL_BORDER_WIDTH_PX,
  getHeaderPanelContentWidth,
  getHeaderTitlePanelBackground,
  getHeaderNamePanelBackground,
} from "./LayeredAngularHeader";

export type { LayeredAngularHeaderProps } from "./LayeredAngularHeader";

export {
  LogoWell,
  LOGO_WELL_PADDING_PX,
  LOGO_WELL_MAX_LOGO_RATIO,
  LOGO_WELL_BORDER_WIDTH_PX,
  LOGO_WELL_ACCENT_SIZE_PX,
} from "./LogoWell";

export type { LogoWellProps, LogoWellVariant } from "./LogoWell";
