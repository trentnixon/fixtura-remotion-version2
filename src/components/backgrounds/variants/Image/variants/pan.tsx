import {
  Img,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";

export const Pan = (props: any) => {
  const { src, width, height } = props;
  const frame = useCurrentFrame();
  const {
    fps,
    width: videoWidth,
    height: videoHeight,
    durationInFrames,
  } = useVideoConfig();

  // Calculate image and video aspect ratios
  const imageAspectRatio = width / height;
  const videoAspectRatio = videoWidth / videoHeight;

  // Determine if image is landscape or portrait (relative to its own dimensions)
  const isImageLandscape = imageAspectRatio > 1;
  console.log(
    `Image aspect ratio: ${imageAspectRatio.toFixed(2)}, Is landscape: ${isImageLandscape}`,
  );

  // Calculate the proper dimensions for the image
  let scaledWidth, scaledHeight;

  if (imageAspectRatio > videoAspectRatio) {
    // Image is wider than the video viewport (relative to aspect ratios)
    scaledHeight = videoHeight * 1.15; // Height is video height + 15%
    scaledWidth = scaledHeight * imageAspectRatio; // Width follows aspect ratio
    console.log(
      `Image wider than viewport: ${scaledWidth.toFixed(0)}x${scaledHeight.toFixed(0)}`,
    );
  } else {
    // Image is taller than the video viewport (relative to aspect ratios)
    scaledWidth = videoWidth * 1.15; // Width is video width + 15%
    scaledHeight = scaledWidth / imageAspectRatio; // Height follows aspect ratio
    console.log(
      `Image taller than viewport: ${scaledWidth.toFixed(0)}x${scaledHeight.toFixed(0)}`,
    );
  }

  // Use the full duration of the video for the animation
  const animationStartFrame = 0;
  const animationEndFrame = durationInFrames;

  // Calculate translation ranges based on how much the image extends beyond the viewport
  const translateXRange = Math.min(
    40,
    (((scaledWidth - videoWidth) / scaledWidth) * 100) / 2,
  );
  const translateYRange = Math.min(
    40,
    (((scaledHeight - videoHeight) / scaledHeight) * 100) / 2,
  );

  // Determine which translation to use based on image orientation
  let transformStyle;

  if (isImageLandscape) {
    // For landscape images, pan horizontally (left to right)
    const translateX = interpolate(
      frame,
      [animationStartFrame, animationEndFrame],
      [-translateXRange, translateXRange],
      {
        easing: Easing.ease,
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    );
    transformStyle = `translateX(${translateX}%)`;
    console.log(
      `Panning horizontally with range: ±${translateXRange.toFixed(1)}%`,
    );
  } else {
    // For portrait images, pan vertically (top to bottom)
    const translateY = interpolate(
      frame,
      [animationStartFrame, animationEndFrame],
      [-translateYRange, translateYRange],
      {
        easing: Easing.ease,
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    );
    transformStyle = `translateY(${translateY}%)`;
    console.log(
      `Panning vertically with range: ±${translateYRange.toFixed(1)}%`,
    );
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          transform: transformStyle,
          width: `${scaledWidth}px`,
          height: `${scaledHeight}px`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Img
          src={src}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // Ensures full coverage
          }}
        />
      </div>
    </div>
  );
};
