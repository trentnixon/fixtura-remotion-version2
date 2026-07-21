import React, { useMemo } from "react";
import tinycolor from "tinycolor2";
import { getVariantStyles } from "../../../../../components/typography/config/variants";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { TeamLogo } from "../../../utils/primitives/TeamLogo";
import LadderTeamName from "../../../utils/primitives/ladderTeamName";
import { RosterPlayerName } from "../../../utils/primitives/RosterPlayerName";
import { formatDate, truncateText } from "../../../utils/utils-text";
import { truncatePlayerName, getTeamPerspective } from "../../layout/utils";
import { RosterDisplayProps } from "./_types/RosterDisplayProps";
import {
  DEFAULT_CONTAINER_ANIMATION,
  DEFAULT_CONTAINER_EXIT_ANIMATION,
} from "./_utils/animations";
import { getAvailableHeightReservingFooter } from "./_utils/helpers";
import { computeBroadcastProRosterPlayerListMetrics } from "./_utils/broadcastProRosterListMetrics";
import { MAX_PLAYER_NAME_LENGTH } from "../../layout/RosterPlayerList/_utils/constants";
import {
  resolveBroadcastProTransparentLayers,
  type BroadcastProTransparentLayers,
} from "../../../../../templates/types/TemplateThemeConfig";
import type { ComponentStyles } from "../../../../../core/context/types/ThemeContextTypes";

const cellBlur = {
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
} as const;

const glassFromSurface = (
  surface: string,
  layers: BroadcastProTransparentLayers,
) => ({
  panel: tinycolor(surface).setAlpha(layers.glass.panelAlpha).toRgbString(),
  border: `1px solid ${tinycolor(surface).setAlpha(layers.glass.borderAlpha).toRgbString()}`,
  /** Same as upcoming `game-card-broadcastPro`: mode-aware logo wells on container surface. */
  logoWell: tinycolor(surface).setAlpha(layers.logoWell.alpha).toRgbString(),
});

/** Teko caps sit high in the em box; nudges copy toward optical vertical center (not on AnimatedText — `animStyles` can override `transform`). */
const TEKO_ROSTER_TEXT_NUDGE_EM = 0.06;

const rosterTekoOpticalNudge: React.CSSProperties = {
  transform: `translateY(${TEKO_ROSTER_TEXT_NUDGE_EM}em)`,
};

const rosterCellTextStyle = (fontSizePx: number): React.CSSProperties => ({
  fontSize: fontSizePx,
  lineHeight: 1,
  margin: 0,
  padding: 0,
});

const formatRosterIndex = (i: number): string => String(i + 1).padStart(2, "0");

/** Resolve Broadcast Pro `componentStyles` by key (falls back to empty). */
const rosterClass = (styles: ComponentStyles, key: string): string =>
  styles[key]?.className ?? "";

const MetaRow: React.FC<{
  label: string;
  value: string;
  glass: { panel: string; border: string };
  rowClassName: string;
  labelClassName: string;
  valueClassName: string;
  labelColor: string;
  valueColor: string;
}> = ({
  label,
  value,
  glass,
  rowClassName,
  labelClassName,
  valueClassName,
  labelColor,
  valueColor,
}) => (
  <div
    className={rowClassName}
    style={{
      ...cellBlur,
      backgroundColor: glass.panel,
      border: glass.border,
    }}
  >
    <div className="min-w-0">
      <span className={labelClassName} style={{ color: labelColor }}>
        {label}
      </span>
      <span className={valueClassName} style={{ color: valueColor }}>
        {value}
      </span>
    </div>
  </div>
);

const RosterDisplayBroadcastPro: React.FC<RosterDisplayProps> = ({
  roster,
}) => {
  const {
    layout,
    selectedPalette,
    colors,
    fonts,
    fontClasses,
    componentStyles,
    broadcastProTransparentLayers,
    broadcastProGlassOpacity,
    broadcastProRosterListSizing,
  } = useThemeContext();
  const availableHeight = getAvailableHeightReservingFooter(layout.heights);
  const cs = (key: string) => rosterClass(componentStyles, key);
  /** Remotion: explicit family so Teko loads (see `theme/tokens.ts` fonts + `font-teko` in classes). */
  const titleFontFamily =
    fontClasses?.heading?.family ?? fonts?.title?.family ?? "Teko";

  const surfaceBase = selectedPalette.container.background;
  const transparentLayers = resolveBroadcastProTransparentLayers({
    broadcastProGlassOpacity,
    broadcastProTransparentLayers,
  });
  const glass = glassFromSurface(surfaceBase, transparentLayers);
  const accent = colors?.primary ?? selectedPalette.container.accent;

  /** Palette-driven copy (light/dark via `templateVariation.mode` + color system). */
  const oc = selectedPalette.text.onContainer;
  const textOnContainer = {
    title:
      getVariantStyles("onContainerTitle", selectedPalette).color ?? oc.title,
    copy: getVariantStyles("onContainerCopy", selectedPalette).color ?? oc.copy,
    muted:
      getVariantStyles("onContainerMuted", selectedPalette).color ?? oc.muted,
    secondary:
      getVariantStyles("onContainerSecondary", selectedPalette).color ??
      oc.secondary,
    accent:
      getVariantStyles("onContainerAccent", selectedPalette).color ?? oc.accent,
  };

  const { accountHolder, against } = getTeamPerspective(roster);
  const accountLabel = roster.isHomeTeam ? "HOME TEAM" : "AWAY TEAM";
  const opponentLabel = roster.isHomeTeam ? "AWAY TEAM" : "HOME TEAM";

  const playerListMetrics = useMemo(
    () =>
      computeBroadcastProRosterPlayerListMetrics(
        availableHeight,
        roster.teamRoster.length,
        broadcastProRosterListSizing,
      ),
    [availableHeight, roster.teamRoster.length, broadcastProRosterListSizing],
  );

  return (
    <div className={cs("broadcastProRosterRoot")}>
      <AnimatedContainer
        type="full"
        className={`${cs("broadcastProRosterAnimatedContainer")} ${layout.borderRadius.container}`}
        backgroundColor="none"
        animation={DEFAULT_CONTAINER_ANIMATION}
        animationDelay={0}
        exitAnimation={DEFAULT_CONTAINER_EXIT_ANIMATION}
      >
        <div
          className={cs("broadcastProRosterContentShell")}
          style={{
            height: `${availableHeight}px`,
            maxHeight: `${availableHeight}px`,
          }}
        >
          <div className={cs("broadcastProRosterGrid")}>
            {/* Left: line-up + numbered list only */}
            <div className={cs("broadcastProRosterLineupColumn")}>
              <div className="flex min-h-0 flex-1 gap-2">
                <div
                  className={cs("broadcastProRosterPlayerList")}
                  style={{ gap: playerListMetrics.gapPx }}
                >
                  {roster.teamRoster.map((player, index) => {
                    const num = formatRosterIndex(index);
                    const numColor =
                      index === 0
                        ? textOnContainer.accent
                        : textOnContainer.muted;
                    return (
                      <div
                        key={index}
                        className={cs("broadcastProRosterRow")}
                        style={{
                          minHeight: Math.max(
                            1,
                            Math.round(playerListMetrics.rowPx),
                          ),
                        }}
                      >
                        <div
                          className={cs("broadcastProRosterPlayerNumber")}
                          style={{
                            ...cellBlur,
                            width: playerListMetrics.numColWidthPx,
                            minHeight: "100%",
                            backgroundColor: glass.panel,
                            border: glass.border,
                          }}
                        >
                          {/* Full-size inner flex so glyphs center in the glass box (not top of a stretched line box). */}
                          <div
                            style={{
                              display: "flex",
                              boxSizing: "border-box",
                              height: "100%",
                              width: "100%",
                              minHeight: 0,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <span
                              style={{
                                ...rosterCellTextStyle(
                                  playerListMetrics.numFontPx,
                                ),
                                ...rosterTekoOpticalNudge,
                                color: numColor,
                                fontFamily: titleFontFamily,
                                fontWeight: 400,
                                fontVariantNumeric: "tabular-nums",
                              }}
                            >
                              {num}
                            </span>
                          </div>
                        </div>
                        <div
                          className={cs("broadcastProRosterNameCell")}
                          style={{
                            ...cellBlur,
                            minHeight: "100%",
                            backgroundColor: glass.panel,
                            border: glass.border,
                            paddingLeft: playerListMetrics.cellPaddingXPx,
                            paddingRight: playerListMetrics.cellPaddingXPx,
                            paddingTop: playerListMetrics.cellPaddingYPx,
                            paddingBottom: playerListMetrics.cellPaddingYPx,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              minHeight: 0,
                              flex: 1,
                              width: "100%",
                              alignItems: "center",
                              justifyContent: "flex-start",
                            }}
                          >
                            <div style={rosterTekoOpticalNudge}>
                              <RosterPlayerName
                                value={truncatePlayerName(
                                  player.toUpperCase(),
                                  MAX_PLAYER_NAME_LENGTH,
                                )}
                                fontFamily={titleFontFamily}
                                style={{
                                  ...rosterCellTextStyle(
                                    playerListMetrics.nameFontPx,
                                  ),
                                  fontWeight: 400,
                                  display: "block",
                                }}
                                variant="onContainerCopy"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div
                  className={cs("broadcastProRosterAccentStrip")}
                  style={{
                    background: `linear-gradient(180deg, ${tinycolor(accent).setAlpha(0.95).toRgbString()} 0%, ${tinycolor(accent).setAlpha(0.35).toRgbString()} 50%, ${tinycolor(accent).setAlpha(0.15).toRgbString()} 100%)`,
                  }}
                  aria-hidden
                />
              </div>
            </div>

            {/* Right: account team (above) + vs / opponent + meta */}
            <div className={cs("broadcastProRosterSidebar")}>
              <div
                className={cs("broadcastProRosterTeamCardHome")}
                style={{
                  ...cellBlur,
                  backgroundColor: glass.panel,
                  border: glass.border,
                }}
              >
                <div
                  className={cs("broadcastProRosterTeamLogoWellHome")}
                  style={{ backgroundColor: glass.logoWell }}
                >
                  <TeamLogo
                    logo={{
                      url: accountHolder.logoUrl,
                      width: 112,
                      height: 112,
                    }}
                    teamName={accountHolder.name}
                    size={32}
                    delay={0}
                  />
                </div>
                <LadderTeamName
                  value={truncateText(accountHolder.name, 42).toUpperCase()}
                  variant="onContainerTitle"
                  fontFamily={titleFontFamily}
                  letterAnimation="none"
                  delay={0}
                  textAlign="center"
                  className={cs("broadcastProRosterTeamTitleHome")}
                />
                <span
                  className={cs("broadcastProRosterTeamLabelHome")}
                  style={{ color: textOnContainer.secondary }}
                >
                  {accountLabel}
                </span>
              </div>

              <div
                className={cs("broadcastProRosterTeamCardAway")}
                style={{
                  ...cellBlur,
                  backgroundColor: glass.panel,
                  border: glass.border,
                }}
              >
                <div
                  className={cs("broadcastProRosterVersus")}
                  style={{ color: textOnContainer.muted }}
                >
                  VERSUS
                </div>
                <div
                  className={cs("broadcastProRosterTeamLogoWellAway")}
                  style={{ backgroundColor: glass.logoWell }}
                >
                  <TeamLogo
                    logo={{
                      url: against.logoUrl,
                      width: 96,
                      height: 96,
                    }}
                    teamName={against.name}
                    size={28}
                    delay={0}
                  />
                </div>
                <LadderTeamName
                  value={truncateText(against.name, 36).toUpperCase()}
                  variant="onContainerTitle"
                  fontFamily={titleFontFamily}
                  letterAnimation="none"
                  delay={0}
                  textAlign="center"
                  className={cs("broadcastProRosterTeamTitleAway")}
                />
                <span
                  className={cs("broadcastProRosterTeamLabelAway")}
                  style={{ color: textOnContainer.secondary }}
                >
                  {opponentLabel}
                </span>
              </div>

              <div className={cs("broadcastProRosterMetaStack")}>
                <MetaRow
                  label="LOCATION"
                  value={truncateText(roster.ground, 80).toUpperCase()}
                  glass={glass}
                  rowClassName={cs("broadcastProRosterMetaRow")}
                  labelClassName={cs("broadcastProRosterMetaLabel")}
                  valueClassName={cs("broadcastProRosterMetaValue")}
                  labelColor={textOnContainer.muted}
                  valueColor={textOnContainer.copy}
                />
                <MetaRow
                  label="GRADE"
                  value={roster.gradeName.toUpperCase()}
                  glass={glass}
                  rowClassName={cs("broadcastProRosterMetaRow")}
                  labelClassName={cs("broadcastProRosterMetaLabel")}
                  valueClassName={cs("broadcastProRosterMetaValue")}
                  labelColor={textOnContainer.muted}
                  valueColor={textOnContainer.copy}
                />
                <MetaRow
                  label="DATE"
                  value={formatDate(roster.date).toUpperCase()}
                  glass={glass}
                  rowClassName={cs("broadcastProRosterMetaRow")}
                  labelClassName={cs("broadcastProRosterMetaLabel")}
                  valueClassName={cs("broadcastProRosterMetaValue")}
                  labelColor={textOnContainer.muted}
                  valueColor={textOnContainer.copy}
                />
              </div>
            </div>
          </div>
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default RosterDisplayBroadcastPro;
