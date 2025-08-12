import { interpolate, useCurrentFrame } from "remotion";

export const CNSWSpokesIntro = () => {
  const frame = useCurrentFrame();

  // Define the target heights for the rectangles
  const rect1Height = 1522.53;
  const rect2Height = 1522.53;
  const rect3Height = 1522.53;

  // Interpolate the height from 0 to full height between frames 0 to 25, then shrink from 75 to 90
  const animatedRect1Height = interpolate(
    frame,
    [0, 15, 75, 90],
    [0, rect1Height, rect1Height, 0],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    },
  );
  const animatedRect2Height = interpolate(
    frame,
    [0, 20, 75, 90],
    [0, rect2Height, rect2Height, 0],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    },
  );
  const animatedRect3Height = interpolate(
    frame,
    [0, 25, 75, 90],
    [0, rect3Height, rect3Height, 0],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    },
  );

  // Adjust the y-position to move upwards as the height decreases
  const animatedRect1Y = interpolate(
    frame,
    [0, 15, 75, 90],
    [-355.895, -355.895, -355.895, -355.895 + rect1Height],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    },
  );
  const animatedRect2Y = interpolate(
    frame,
    [0, 20, 75, 90],
    [-129.411, -129.411, -129.411, -129.411 + rect2Height],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    },
  );
  const animatedRect3Y = interpolate(
    frame,
    [0, 25, 75, 90],
    [-525.002, -525.002, -525.002, -525.002 + rect3Height],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    },
  );

  return (
    <svg
      width="1078"
      height="732"
      viewBox="0 0 1078 732"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ zIndex: 10 }}
    >
      <mask
        id="mask0_900_3981"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="1078"
        height="732"
      >
        <rect width="1078" height="732" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_900_3981)">
        <rect
          x="369.135"
          y={animatedRect1Y} // Animate y to make it shrink upwards
          width="40"
          height={animatedRect1Height} // Animate the height
          transform="rotate(-44.3927 369.135 -355.895)"
          fill="white"
        />
        <rect
          x="233.999"
          y={animatedRect2Y} // Animate y to make it shrink upwards
          width="40"
          height={animatedRect2Height} // Animate the height
          transform="rotate(-64.4162 233.999 -129.411)"
          fill="#012956"
        />
        <rect
          x="587.311"
          y={animatedRect3Y} // Animate y to make it shrink upwards
          width="40"
          height={animatedRect3Height} // Animate the height
          transform="rotate(-23.5748 587.311 -525.002)"
          fill="#E4032C"
        />
      </g>
    </svg>
  );
};
