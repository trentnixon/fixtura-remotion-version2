import React from "react";
import { useVideoConfig } from "remotion";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import Ground from "../Meta/Ground";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import TeamLogo from "../../../utils/primitives/TeamLogo";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { GameCardProps } from "./_types/GameCardProps";
import {
  calculateAnimationDelay,
  calculateAnimationOutFrame,
  FAST_DELAY_MULTIPLIER,
} from "./_utils/calculations";
import { MetadataMedium } from "../../../utils/primitives/metadataMedium";
import { useFontFamily } from "../../../utils/primitives/_utils/helpers";
import { formatGroundLocation } from "../../../utils/utils-text";
import { useFittedFontSize } from "../../../../../components/typography/utils/useFittedFontSize";
import { AnimationConfig } from "../../../../../components/typography/config/animations";
import {
  LayeredAngularPanel,
  LogoWell,
  PADDING_SHALLOW_ROW_LOGO_FLUSH,
  SHALLOW_COLUMN_LEFT,
  SHALLOW_COLUMN_RIGHT,
  SHALLOW_EDGE_STRIP_LEFT,
  SHALLOW_EDGE_STRIP_RIGHT,
  getLayeredUnderlayColor,
  showAngularEdgeAccents,
  clipPathStyle,
} from "../../../../../templates/variants/mudgeeraba/design";

const EDGE_COLOR_HOME = "rgb(34, 197, 94)"; // green
const EDGE_COLOR_AWAY = "rgb(239, 68, 68)"; // red
const TEAM_PANEL_HEIGHT_PX = 150;
/** Cap for short team names — text-4xl scale; dynamic fit shrinks long names */
const TEAM_NAME_MAX_FONT_PX = 36;
const TEAM_NAME_MIN_FONT_PX = 20;
const TEAM_NAME_LINE_HEIGHT = 1.375; // leading-snug
const TEAM_NAME_MAX_LINES = 2;
const FIXTURE_HORIZONTAL_MARGIN_PX = 64; // GamesDisplay mx-8
const TEAM_PANEL_GAP_PX = 8; // gap-2
const LOGO_TEXT_GAP_PX = 12; // mr-3 / ml-3
const TEAM_TEXT_HORIZONTAL_PADDING_PX = 16; // px-2
const PANEL_EDGE_PADDING_PX = 40; // pl-10 / pr-10
const MUDGEERABA_COPY_FONT = "Heebo";
/** Mirror of row logo flush — steepRight well sits on the outer edge */
const PADDING_SHALLOW_ROW_LOGO_FLUSH_RIGHT = "pl-10 pr-0";

/** Text column width inside one home/away panel (logo + padding excluded). */
export const getMudgeerabaFixtureTeamNameFitWidth = (
  compositionWidth: number,
): number => {
  const panelWidth =
    (compositionWidth - FIXTURE_HORIZONTAL_MARGIN_PX - TEAM_PANEL_GAP_PX) / 2;

  return Math.max(
    0,
    panelWidth -
      TEAM_PANEL_HEIGHT_PX -
      LOGO_TEXT_GAP_PX -
      TEAM_TEXT_HORIZONTAL_PADDING_PX -
      PANEL_EDGE_PADDING_PX,
  );
};

type MudgeerabaFixtureTeamNameProps = {
  name: string;
  animation: AnimationConfig;
  fitWidth: number;
  textAlign: "left" | "right";
};

const MudgeerabaFixtureTeamName: React.FC<MudgeerabaFixtureTeamNameProps> = ({
  name,
  animation,
  fitWidth,
  textAlign,
}) => {
  const fontFamily = useFontFamily() ?? MUDGEERABA_COPY_FONT;
  const alignClass = textAlign === "right" ? "text-right" : "text-left";

  const fittedFontSize = useFittedFontSize({
    text: name,
    fontFamily,
    fontWeight: 400,
    textTransform: "none",
    letterSpacing: "0.05em",
    maxFontSize: TEAM_NAME_MAX_FONT_PX,
    minFontSize: TEAM_NAME_MIN_FONT_PX,
    withinWidth: fitWidth,
    withinHeight: TEAM_PANEL_HEIGHT_PX - 20,
    lineHeightRatio: TEAM_NAME_LINE_HEIGHT,
    maxLines: TEAM_NAME_MAX_LINES,
  });

  return (
    <MetadataMedium
      value={name}
      animation={animation}
      className={`block w-full text-balance ${alignClass}`}
      variant="onContainerCopy"
      style={{ fontSize: fittedFontSize ?? TEAM_NAME_MAX_FONT_PX }}
    />
  );
};

export const GameCardMudgeeraba: React.FC<GameCardProps> = ({
  game,
  index,
}) => {
  const { data } = useVideoDataContext();
  const { timings } = data;
  const { animations } = useAnimationContext();
  const { selectedPalette, colors } = useThemeContext();
  const { width: compositionWidth } = useVideoConfig();
  const teamNameFitWidth =
    getMudgeerabaFixtureTeamNameFitWidth(compositionWidth);

  const ContainerAnimations = animations.container;
  const delay = calculateAnimationDelay(index, FAST_DELAY_MULTIPLIER);
  const animationOutFrame = calculateAnimationOutFrame(timings);
  const teamBg = selectedPalette.container.backgroundTransparent.high;
  const underlayColor = getLayeredUnderlayColor(colors.primary);

  const teamPanelStyle: React.CSSProperties = {
    height: `${TEAM_PANEL_HEIGHT_PX}px`,
    minHeight: `${TEAM_PANEL_HEIGHT_PX}px`,
  };

  const renderTeamLogo = (
    logo: GameCardProps["game"]["teamHomeLogo"],
    teamName: string,
    logoDelay: number,
    variant: "steepLeft" | "steepRight",
    className: string,
  ) => (
    <LogoWell
      variant={variant}
      size={TEAM_PANEL_HEIGHT_PX}
      fullBleed
      className={`shrink-0 ${className}`}
    >
      {logo ? (
        <TeamLogo
          logo={logo}
          teamName={teamName}
          delay={logoDelay}
          size={TEAM_PANEL_HEIGHT_PX}
          fit="cover"
          imgStyle={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        <div className="w-full h-full bg-gray-300/20" />
      )}
    </LogoWell>
  );

  return (
    <div className="overflow-visible">
      <AnimatedContainer
        type="full"
        className="w-full overflow-visible rounded-none"
        backgroundColor="none"
        animation={ContainerAnimations.main.itemContainer.containerIn}
        animationDelay={delay}
        exitAnimation={ContainerAnimations.main.itemContainer.containerOut}
        exitFrame={animationOutFrame}
      >
        {/* Grade Section - Top */}
        <Ground
          ground={game.gradeName}
          delay={delay}
          backgroundColor="transparent"
        />

        {/* Location and time under the grade (tight to grade) */}
        <div className="flex items-center justify-center gap-3 py-0.5 text-center w-full">
          <MetadataMedium
            value={formatGroundLocation(game.ground)}
            animation={{ ...animations.text.main.copyIn, delay: delay + 20 }}
            className="text-center"
            variant="onContainerCopyNoBg"
          />
          <MetadataMedium
            value={game.date}
            animation={{ ...animations.text.main.copyIn, delay: delay + 20 }}
            className="text-center"
            variant="onContainerCopyNoBg"
          />
          <MetadataMedium
            value={game.time}
            animation={{ ...animations.text.main.copyIn, delay: delay + 20 }}
            className="text-center"
            variant="onContainerCopyNoBg"
          />
        </div>

        {/* Home / away — steep logo wells (matches ladder + Top 5) */}
        <div className="flex w-full relative overflow-visible gap-2">
          <LayeredAngularPanel
            clipPath={SHALLOW_COLUMN_LEFT}
            surfaceColor={teamBg}
            underlayColor={underlayColor}
            className="flex flex-1 w-full min-w-0 relative"
            style={teamPanelStyle}
            surfaceClassName={`flex items-stretch w-full overflow-hidden relative ${PADDING_SHALLOW_ROW_LOGO_FLUSH}`}
          >
            {showAngularEdgeAccents() && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundColor: EDGE_COLOR_HOME,
                  ...clipPathStyle(SHALLOW_EDGE_STRIP_RIGHT),
                }}
                aria-hidden
              />
            )}
            {renderTeamLogo(
              game.teamHomeLogo,
              game.teamHome,
              delay + 10,
              "steepLeft",
              "mr-3",
            )}
            <div className="relative z-10 flex flex-1 items-center justify-start min-w-0 px-2">
              <MudgeerabaFixtureTeamName
                name={game.teamHome}
                fitWidth={teamNameFitWidth}
                textAlign="left"
                animation={{
                  ...animations.text.main.copyIn,
                  delay: delay + 15,
                }}
              />
            </div>
          </LayeredAngularPanel>

          <LayeredAngularPanel
            clipPath={SHALLOW_COLUMN_RIGHT}
            surfaceColor={teamBg}
            underlayColor={underlayColor}
            className="flex flex-1 w-full min-w-0 relative"
            style={teamPanelStyle}
            surfaceClassName={`flex items-stretch w-full overflow-hidden relative ${PADDING_SHALLOW_ROW_LOGO_FLUSH_RIGHT}`}
          >
            {showAngularEdgeAccents() && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundColor: EDGE_COLOR_AWAY,
                  ...clipPathStyle(SHALLOW_EDGE_STRIP_LEFT),
                }}
                aria-hidden
              />
            )}
            <div className="relative z-10 flex flex-1 items-center justify-end min-w-0 px-2">
              <MudgeerabaFixtureTeamName
                name={game.teamAway}
                fitWidth={teamNameFitWidth}
                textAlign="right"
                animation={{
                  ...animations.text.main.copyIn,
                  delay: delay + 30,
                }}
              />
            </div>
            {renderTeamLogo(
              game.teamAwayLogo,
              game.teamAway,
              delay + 25,
              "steepRight",
              "ml-3",
            )}
          </LayeredAngularPanel>
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default GameCardMudgeeraba;
