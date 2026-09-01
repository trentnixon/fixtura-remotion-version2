import React from "react";
import {
  REACTIVE_PATH_ORBITS,
  REACTIVE_PATH_ORBIT_CENTER,
  REACTIVE_PATH_ROUTES,
  type ReactivePathPalette,
  type ReactivePathVariantKey,
  pointOnRoute,
  resolveRoute,
  routeProgress,
  strokeFor,
} from "./variants";

type ReactivePathOverlayProps = {
  variant: ReactivePathVariantKey;
  palette: ReactivePathPalette;
  width: number;
  height: number;
  loopProgress: number;
};

const renderOrbits = (
  palette: ReactivePathPalette,
  centerX: number,
  centerY: number,
  loopProgress: number,
) =>
  REACTIVE_PATH_ORBITS.map((orbit, index) => {
    const circumference = 2 * Math.PI * orbit.radius;
    const dashLength = circumference * orbit.dashRatio;
    const gapLength = circumference - dashLength;
    const dashOffset =
      loopProgress * circumference * orbit.direction + index * 48;

    return (
      <circle
        key={orbit.radius}
        cx={centerX}
        cy={centerY}
        r={orbit.radius}
        fill="none"
        stroke={strokeFor(palette, orbit.color)}
        strokeWidth={orbit.strokeWidth}
        strokeLinecap="round"
        strokeDasharray={`${dashLength} ${gapLength}`}
        strokeDashoffset={dashOffset}
        opacity={0.72}
      />
    );
  });

const renderRouteTracks = (
  palette: ReactivePathPalette,
  width: number,
  height: number,
  opacity = 0.22,
) =>
  REACTIVE_PATH_ROUTES.map((route, index) => {
    const resolved = resolveRoute(route, width, height);

    return (
      <line
        key={`track-${index}`}
        x1={resolved.x1}
        y1={resolved.y1}
        x2={resolved.x2}
        y2={resolved.y2}
        stroke={strokeFor(palette, route.color)}
        strokeWidth={1}
        opacity={opacity}
      />
    );
  });

const renderHits = (
  palette: ReactivePathPalette,
  width: number,
  height: number,
  loopProgress: number,
) => {
  const hitPulse = 0.5 + Math.sin(loopProgress * Math.PI * 2 * 4) * 0.5;

  return (
    <>
      {renderRouteTracks(palette, width, height, 0.3)}
      {REACTIVE_PATH_ROUTES.flatMap((route, routeIndex) =>
        [0, 0.33].map((hitPhase) => {
          const travel = routeProgress(route, loopProgress + hitPhase);
          const point = pointOnRoute(route, width, height, travel);
          const localPulse =
            0.45 + Math.sin((loopProgress + hitPhase) * Math.PI * 2 * 3) * 0.55;
          const radius = 5 + localPulse * 6 + hitPulse * 2;

          return (
            <g key={`${routeIndex}-${hitPhase}`}>
              <circle
                cx={point.x}
                cy={point.y}
                r={radius * 1.9}
                fill={palette.accent}
                opacity={0.1 + localPulse * 0.14}
              />
              <circle
                cx={point.x}
                cy={point.y}
                r={radius}
                fill={hitPhase === 0 ? palette.accent : palette.line}
                opacity={0.55 + localPulse * 0.4}
              />
            </g>
          );
        }),
      )}
    </>
  );
};

export const ReactivePathOverlay: React.FC<ReactivePathOverlayProps> = ({
  variant,
  palette,
  width,
  height,
  loopProgress,
}) => {
  const centerX = width * REACTIVE_PATH_ORBIT_CENTER.x;
  const centerY = height * REACTIVE_PATH_ORBIT_CENTER.y;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ position: "absolute", inset: 0 }}
    >
      {variant === "hits"
        ? renderHits(palette, width, height, loopProgress)
        : renderOrbits(palette, centerX, centerY, loopProgress)}
    </svg>
  );
};
