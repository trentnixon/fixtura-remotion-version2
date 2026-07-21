import React from "react";
import tinycolor from "tinycolor2";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import {
  resolveBroadcastProTransparentLayers,
  type BroadcastProTransparentLayers,
} from "../../../../../templates/types/TemplateThemeConfig";
import type { ColorVariant } from "../../../../../components/typography/AnimatedText";
import { GameCardProps } from "./_types/GameCardProps";
import {
  calculateAnimationDelay,
  calculateAnimationOutFrame,
  FAST_DELAY_MULTIPLIER,
} from "./_utils/calculations";
import TeamLogo from "../../../utils/primitives/TeamLogo";
import { MetadataMedium } from "../../../utils/primitives/metadataMedium";
import LadderTeamName from "../../../utils/primitives/ladderTeamName";

const HEADER_STRIP_H = 56;
/** Flush strip + glass (stitch); list gap handles separation between fixtures */
const HEADER_GLASS_GAP = 0;

const cellBlur = {
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
} as const;

/** Base color is `mode.container.background` (light=white, dark=black); alphas from theme. */
const glassFromSurface = (
  surface: string,
  layers: BroadcastProTransparentLayers,
) => ({
  panel: tinycolor(surface).setAlpha(layers.glass.panelAlpha).toRgbString(),
  border: `1px solid ${tinycolor(surface).setAlpha(layers.glass.borderAlpha).toRgbString()}`,
  logoWell: tinycolor(surface).setAlpha(layers.logoWell.alpha).toRgbString(),
  headerGradient: `linear-gradient(90deg, ${tinycolor(surface).setAlpha(layers.fixtureHeader.gradientStartAlpha).toRgbString()} 0%, ${tinycolor(surface).setAlpha(layers.fixtureHeader.gradientEndAlpha).toRgbString()} 100%)`,
});

export const GameCardBroadcastPro: React.FC<GameCardProps> = ({
  game,
  index,
  gameRowHeight,
}) => {
  const { data } = useVideoDataContext();
  const { timings } = data;
  const { animations } = useAnimationContext();
  const {
    fontClasses,
    selectedPalette,
    colors,
    broadcastProTransparentLayers,
    broadcastProGlassOpacity,
  } = useThemeContext();

  const ContainerAnimations = animations.container;

  const delay = calculateAnimationDelay(index, FAST_DELAY_MULTIPLIER);
  const animationOutFrame = calculateAnimationOutFrame(timings);

  const accent = colors?.primary ?? selectedPalette.container.accent;
  const headingFont = fontClasses.heading?.family;

  const surfaceBase = selectedPalette.container.background;
  const transparentLayers = resolveBroadcastProTransparentLayers({
    broadcastProGlassOpacity,
    broadcastProTransparentLayers,
  });
  const glass = glassFromSurface(surfaceBase, transparentLayers);

  const glassPanelHeight =
    gameRowHeight != null
      ? Math.max(gameRowHeight - HEADER_STRIP_H - HEADER_GLASS_GAP, 96)
      : null;
  const logoBox =
    glassPanelHeight != null
      ? Math.min(
          Math.max(glassPanelHeight - 32, 48),
          Math.max(72, Math.floor(glassPanelHeight * 0.42)),
        )
      : 80;
  const compact = glassPanelHeight != null ? glassPanelHeight < 140 : false;
  const teamNameClass = compact ? "text-4xl" : "text-5xl";
  const vsClass = compact ? "text-3xl" : "text-4xl";

  const labelVariant: ColorVariant = "onContainerCopy";
  const metaVariant: ColorVariant = "onContainerCopy";

  return (
    <div className="flex w-full flex-shrink-0 flex-col overflow-hidden">
      <AnimatedContainer
        type="full"
        className="flex w-full flex-shrink-0 flex-col gap-0 overflow-hidden rounded-none"
        backgroundColor="none"
        animation={ContainerAnimations.main.itemContainer.containerIn}
        animationDelay={delay}
        exitAnimation={ContainerAnimations.main.itemContainer.containerOut}
        exitFrame={animationOutFrame}
      >
        {/* Fixture header: date / time / ground */}
        <div
          className="flex w-full flex-shrink-0 items-center justify-between px-8 py-3 md:px-10"
          style={{
            height: HEADER_STRIP_H,
            minHeight: HEADER_STRIP_H,
            background: glass.headerGradient,
            borderLeftWidth: 4,
            borderLeftStyle: "solid",
            borderLeftColor: accent,
            ...cellBlur,
          }}
        >
          <div className="flex min-w-0 flex-1 items-center gap-6">
            <MetadataMedium
              value={game.date}
              animation={{ ...animations.text.main.copyIn, delay }}
              className="truncate font-bold uppercase tracking-wider"
              variant={metaVariant}
            />
            <span
              className="h-6 w-px flex-shrink-0 opacity-30"
              style={{ background: selectedPalette.text.onBackground.main }}
            />
            <MetadataMedium
              value={game.time}
              animation={{ ...animations.text.main.copyIn, delay: delay + 2 }}
              className="truncate font-medium"
              variant={metaVariant}
            />
          </div>
          <div className="ml-4 min-w-0 flex-shrink-0 text-right">
            <MetadataMedium
              value={game.ground}
              animation={{ ...animations.text.main.copyIn, delay: delay + 4 }}
              className="truncate font-semibold uppercase tracking-widest"
              variant={metaVariant}
            />
          </div>
        </div>

        {/* Glass panel: teams + VS */}
        <div
          className="flex w-full min-w-0 flex-shrink-0 items-center justify-between gap-8 px-8 py-8 md:gap-10 md:px-10"
          style={{
            background: glass.panel,
            border: glass.border,
            ...cellBlur,
          }}
        >
          {/* Home */}
          <div className="flex min-w-0 flex-1 items-center gap-8">
            <div
              className="flex flex-shrink-0 items-center justify-center rounded-sm"
              style={{
                width: logoBox,
                height: logoBox,
                background: glass.logoWell,
              }}
            >
              <TeamLogo
                logo={game.teamHomeLogo}
                teamName={game.teamHome}
                delay={delay + 6}
                fit="contain"
                imgStyle={{
                  width: "85%",
                  height: "85%",
                  objectFit: "contain",
                }}
              />
            </div>
            <div className="flex min-w-0 flex-col items-start gap-1">
              <MetadataMedium
                value="Home"
                animation={{ ...animations.text.main.copyIn, delay: delay + 8 }}
                className="text-sm font-bold uppercase tracking-widest opacity-80"
                variant={labelVariant}
              />
              <LadderTeamName
                value={game.teamHome}
                variant={labelVariant}
                textAlign="left"
                delay={delay + 10}
                letterAnimation="none"
                className={`${teamNameClass} font-normal uppercase leading-none tracking-wide`}
                fontFamily={headingFont}
              />
            </div>
          </div>

          <div
            className="flex flex-shrink-0 items-center justify-center px-8 md:px-10"
            style={{ fontFamily: headingFont }}
          >
            <span
              className={`${vsClass} font-bold italic`}
              style={{ color: accent }}
            >
              VS
            </span>
          </div>

          {/* Away */}
          <div className="flex min-w-0 flex-1 items-center justify-end gap-8 text-right">
            <div className="flex min-w-0 flex-col items-end gap-1">
              <MetadataMedium
                value="Away"
                animation={{ ...animations.text.main.copyIn, delay: delay + 8 }}
                className="text-sm font-bold uppercase tracking-widest opacity-80"
                variant={labelVariant}
              />
              <LadderTeamName
                value={game.teamAway}
                variant={labelVariant}
                textAlign="right"
                delay={delay + 10}
                letterAnimation="none"
                className={`${teamNameClass} font-normal uppercase leading-none tracking-wide`}
                fontFamily={headingFont}
              />
            </div>
            <div
              className="flex flex-shrink-0 items-center justify-center rounded-sm"
              style={{
                width: logoBox,
                height: logoBox,
                background: glass.logoWell,
              }}
            >
              <TeamLogo
                logo={game.teamAwayLogo}
                teamName={game.teamAway}
                delay={delay + 6}
                fit="contain"
                imgStyle={{
                  width: "85%",
                  height: "85%",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default GameCardBroadcastPro;
