import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Img, staticFile } from "remotion";
import {
  ImageAnimationType,
  ImageAnimationConfig,
  normalizeImageAnimation,
  useDualImageAnimation,
  ImageEasingType,
  ImageSpringConfig,
  IMAGE_SPRING_CONFIGS,
} from "./config";

/**
 * AnimatedImage Component
 *
 * A versatile image component with animation capabilities for Remotion videos.
 * Supports both entry and exit animations, aspect ratio control, and fallback images.
 *
 * @example Basic Usage
 * ```tsx
 <AnimatedImage
    src="path/to/image.jpg"
    alt="Description of image"
    width="100%"
    height="auto"
 />
 * ```
 *
 * @example With Entry Animation
 * ```tsx
 <AnimatedImage
    src="path/to/image.jpg"
    alt="Animated logo"
    width="200px"
    height="200px"
    animation="fadeIn"
    animationDuration={30}
    animationDelay={15}
    animationEasing="easeInOut"
 />
 * ```
 *
 * @example With Entry and Exit Animations
 * ```tsx
 <AnimatedImage
    src="path/to/image.jpg"
    alt="Logo that fades in and out"
    width="200px"
    height="200px"
    animation="fadeIn"
    animationDuration={30}
    animationEasing="easeInOut"
    exitAnimation="fadeOut"
    exitAnimationDuration={30}
    exitAnimationEasing="easeInOut"
    exitFrame={60} // Frame at which exit animation starts
 />
 * ```
 *
 * @example With Complex Animation Configuration
 * ```tsx
 <AnimatedImage
    src="path/to/image.jpg"
    alt="Logo with complex animation"
    width="200px"
    height="200px"
    animation={{
      type: "slideInLeft",
      duration: 30,
      delay: 15,
      easing: "bounce",
      custom: { distance: 200 },
    }}
    exitAnimation={{
      type: "slideOutRight",
      duration: 30,
      easing: "easeInOut",
      custom: { distance: 200 },
    }}
    exitFrame={90}
 />
 * ```
 *
 * @example With Spring Animation
 * ```tsx
 <AnimatedImage
    src="path/to/image.jpg"
    alt="Logo with spring animation"
    width="200px"
    height="200px"
    animation="springScale"
    springConfig={IMAGE_SPRING_CONFIGS.BOUNCY}
 />
 * ```
 *
 * @example With Aspect Ratio Control
 * ```tsx
 <AnimatedImage
    src="path/to/image.jpg"
    alt="Image with controlled aspect ratio"
    width="100%"
    aspectRatio="16:9"
    fit="cover"
    animation="zoomIn"
 />
 * ```
 *
 * @example With Fallback Image
 * ```tsx
 <AnimatedImage
    src="path/to/image.jpg"
    fallbackSrc="path/to/fallback.jpg"
    alt="Image with fallback"
    width="100%"
    height="auto"
 />
 * ```
 *
 * Available Animation Types:
 * | Type           | Description                                      | Pairs With      |
 * |----------------|--------------------------------------------------|-----------------|
 * | none           | No animation                                     | -               |
 * | fadeIn         | Fade in from transparent to opaque               | fadeOut         |
 * | fadeOut        | Fade out from opaque to transparent              | fadeIn          |
 * | zoomIn         | Scale up from smaller size                       | zoomOut         |
 * | zoomOut        | Scale down from larger size                      | zoomIn          |
 * | slideInLeft    | Slide in from the left side                      | slideOutRight   |
 * | slideInRight   | Slide in from the right side                     | slideOutLeft    |
 * | slideInTop     | Slide in from the top                            | slideOutBottom  |
 * | slideInBottom  | Slide in from the bottom                         | slideOutTop     |
 * | slideOutLeft   | Slide out to the left                            | slideInRight    |
 * | slideOutRight  | Slide out to the right                           | slideInLeft     |
 * | slideOutTop    | Slide out to the top                             | slideInBottom   |
 * | slideOutBottom | Slide out to the bottom                          | slideInTop      |
 * | kenBurns       | Subtle zoom and pan effect                       | -               |
 * | pulse          | Pulsating scale effect                           | -               |
 * | rotate         | Continuous rotation                              | -               |
 * | rotateIn       | Rotate from an angle to normal position          | rotateOut       |
 * | rotateOut      | Rotate from normal position to an angle          | rotateIn        |
 * | springScale    | Physics-based spring scaling animation           | -               |
 *
 * Available Easing Types:
 * - linear: Constant speed
 * - ease: Default easing (slow start, fast middle, slow end)
 * - easeIn: Slow start, fast end
 * - easeOut: Fast start, slow end
 * - easeInOut: Slow start and end, fast middle
 * - cubic: More pronounced curve than ease
 * - bounce: Bouncing effect at the end
 * - elastic: Elastic effect at the end
 */

/**
 * Image orientation types
 */
export type ImageOrientation = "landscape" | "portrait" | "square";

/**
 * Image ratio calculation options
 */
export type ImageRatioMode = "auto" | "fixed" | "original";

/**
 * Props for the AnimatedImage component
 */
interface AnimatedImageProps {
  // Source props
  src: string;
  fallbackSrc?: string;
  alt?: string;

  // Size props
  width?: number | string;
  height?: number | string;
  fit?: "fill" | "contain" | "cover" | "none" | "scale-down";

  // Ratio and orientation props
  originalWidth?: number;
  originalHeight?: number;
  ratioMode?: ImageRatioMode;
  aspectRatio?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  preserveRatio?: boolean;

  // Style props
  className?: string;
  style?: React.CSSProperties;
  borderRadius?: string | number;

  // Entry Animation props
  animation?: ImageAnimationType | ImageAnimationConfig;
  animationDelay?: number;
  animationDuration?: number;
  animationEasing?: ImageEasingType;
  springConfig?: ImageSpringConfig;

  // Exit Animation props
  exitAnimation?: ImageAnimationType | ImageAnimationConfig;
  exitAnimationDelay?: number;
  exitAnimationDuration?: number;
  exitAnimationEasing?: ImageEasingType;
  exitSpringConfig?: ImageSpringConfig;
  exitFrame?: number; // Frame at which to start the exit animation

  // Event handlers
  onLoad?: () => void;
  onError?: () => void;

  // Other props
  loading?: "eager" | "lazy";
  draggable?: boolean;
}

/**
 * Calculate aspect ratio from width and height
 */
const calculateAspectRatio = (width: number, height: number): number => {
  return width / height;
};

/**
 * Determine image orientation based on aspect ratio
 */
const getImageOrientation = (aspectRatio: number): ImageOrientation => {
  if (aspectRatio > 1.05) return "landscape";
  if (aspectRatio < 0.95) return "portrait";
  return "square";
};

/**
 * AnimatedImage component with fallback support, animation capabilities, and ratio handling
 */
const AnimatedImageBase: React.FC<AnimatedImageProps> = ({
  // Source props
  src,
  fallbackSrc = staticFile("placeholder-image.jpg"),
  alt = "",

  // Size props
  width,
  height,
  fit = "cover",

  // Ratio and orientation props
  originalWidth,
  originalHeight,
  ratioMode = "auto",
  aspectRatio,
  maxWidth,
  maxHeight,
  preserveRatio = true,

  // Style props
  className = "",
  style = {},
  borderRadius,

  // Animation props
  animation = "none",
  animationDelay = 0,
  animationDuration = 30,
  animationEasing = { type: "inOut", base: "ease" },
  springConfig = IMAGE_SPRING_CONFIGS.DEFAULT,

  // Exit Animation props
  exitAnimation = "none",
  exitAnimationDelay = 0,
  exitAnimationDuration = 30,
  exitAnimationEasing = { type: "inOut", base: "ease" },
  exitSpringConfig = IMAGE_SPRING_CONFIGS.DEFAULT,
  exitFrame = 0,

  // Event handlers
  onLoad,
  onError,

  // Other props
  //loading = "eager",
  draggable = false,
}) => {
  // State to track if the primary image has loaded or errored
  //const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
    aspectRatio: number;
    orientation: ImageOrientation;
  } | null>(null);

  // Reset states when src changes
  useEffect(() => {
    //setIsLoaded(false);
    setHasError(false);
    setImageDimensions(null);
  }, [src]);

  // Calculate dimensions and orientation when original dimensions are provided
  useEffect(() => {
    if (originalWidth && originalHeight) {
      const ratio = calculateAspectRatio(originalWidth, originalHeight);
      const orientation = getImageOrientation(ratio);

      setImageDimensions({
        width: originalWidth,
        height: originalHeight,
        aspectRatio: ratio,
        orientation,
      });
    }
  }, [originalWidth, originalHeight]);

  // Determine which source to use
  const imageSrc = hasError && fallbackSrc ? fallbackSrc : src;

  // Memoize animation configurations to prevent unnecessary recalculations
  const animationConfig = useMemo(
    () =>
      normalizeImageAnimation(
        animation,
        animationDelay,
        animationDuration,
        animationEasing,
        springConfig,
      ),
    [
      animation,
      animationDelay,
      animationDuration,
      animationEasing,
      springConfig,
    ],
  );

  // Memoize exit animation configurations
  const exitAnimationConfig = useMemo(
    () =>
      normalizeImageAnimation(
        exitAnimation,
        exitAnimationDelay,
        exitAnimationDuration,
        exitAnimationEasing,
        exitSpringConfig,
      ),
    [
      exitAnimation,
      exitAnimationDelay,
      exitAnimationDuration,
      exitAnimationEasing,
      exitSpringConfig,
    ],
  );

  // Get animation styles using the dual animation hook
  const animationStyles = useDualImageAnimation(
    animationConfig,
    exitAnimationConfig,
    exitFrame,
  );

  // Get current frame to determine which animation to apply
  //const frame = useCurrentFrame();

  // Handle image load event with useCallback
  const handleLoad = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      const img = event.currentTarget;

      // If we don't have original dimensions, get them from the loaded image
      if (!imageDimensions) {
        const ratio = calculateAspectRatio(img.naturalWidth, img.naturalHeight);
        const orientation = getImageOrientation(ratio);

        setImageDimensions({
          width: img.naturalWidth,
          height: img.naturalHeight,
          aspectRatio: ratio,
          orientation,
        });
      }

      //setIsLoaded(true);
      if (onLoad) onLoad();
    },
    [imageDimensions, onLoad],
  );

  // Handle image error event with useCallback
  const handleError = useCallback(() => {
    setHasError(true);
    if (onError) onError();
  }, [onError]);

  // Calculate style based on ratio mode and dimensions with useCallback
  const calculateStyles = useCallback((): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      borderRadius: borderRadius,
      objectFit: fit,
    };

    // If we have no dimensions yet, return base styles with better defaults
    if (!imageDimensions && !aspectRatio) {
      return {
        ...baseStyles,
        width: width || "auto",
        height: height || "auto",
        maxWidth: maxWidth || "100%",
        maxHeight: maxHeight || "100%",
      };
    }

    // Calculate aspect ratio
    let calculatedRatio: number;

    if (typeof aspectRatio === "number") {
      calculatedRatio = aspectRatio;
    } else if (typeof aspectRatio === "string" && aspectRatio.includes(":")) {
      const [w, h] = aspectRatio.split(":").map(Number);
      calculatedRatio = w / h;
    } else if (imageDimensions) {
      calculatedRatio = imageDimensions.aspectRatio;
    } else {
      calculatedRatio = 16 / 9; // Default fallback ratio
    }

    // Apply styles based on ratio mode
    switch (ratioMode) {
      case "fixed":
        // Use the provided aspect ratio
        return {
          ...baseStyles,
          width,
          height,
          maxWidth,
          maxHeight,
          aspectRatio: `${calculatedRatio}`,
        };

      case "original":
        // Use the original image dimensions
        if (imageDimensions) {
          return {
            ...baseStyles,
            width: width || "auto",
            height: height || "auto",
            maxWidth: maxWidth || "100%",
            maxHeight: maxHeight || "100%",
            aspectRatio: preserveRatio ? `${calculatedRatio}` : undefined,
          };
        }
        break;

      case "auto":
      default: {
        // Automatically determine the best approach
        // Don't force 100% width when width is explicitly "auto"
        const finalWidth = width === "auto" ? "auto" : width || "100%";
        return {
          ...baseStyles,
          width: finalWidth,
          height: height || "auto",
          maxWidth: maxWidth || "100%",
          maxHeight: maxHeight || "100%",
          aspectRatio: preserveRatio ? `${calculatedRatio}` : undefined,
        };
      }
    }

    // Default fallback
    return {
      ...baseStyles,
      width,
      height,
      maxWidth,
      maxHeight,
    };
  }, [
    aspectRatio,
    borderRadius,
    fit,
    height,
    imageDimensions,
    maxHeight,
    maxWidth,
    preserveRatio,
    ratioMode,
    width,
  ]);

  // Memoize the combined styles to prevent recalculation on every render
  const combinedStyle = useMemo(
    () => ({
      ...calculateStyles(),
      ...style,
      ...animationStyles,
    }),
    [calculateStyles, style, animationStyles],
  );

  // Add debug info to alt text if in development
  const debugAlt = useMemo(
    () =>
      process.env.NODE_ENV === "development" && imageDimensions
        ? `${alt} (${imageDimensions.width}x${imageDimensions.height}, ${imageDimensions.orientation})`
        : alt,
    [alt, imageDimensions],
  );

  return (
    <Img
      src={imageSrc || "./assets/images/logos/DefaultLogo.png"}
      alt={debugAlt}
      className={className}
      style={combinedStyle}
      onLoad={handleLoad}
      onError={handleError}
      draggable={draggable}
    />
  );
};

// Wrap the component with React.memo for performance optimization
export const AnimatedImage = React.memo(AnimatedImageBase);

/**
 * Preload an image to ensure it's ready when needed
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

/**
 * Preload multiple images to ensure they're ready when needed
 */
export const preloadImages = (srcs: string[]): Promise<void[]> => {
  return Promise.all(srcs.map((src) => preloadImage(src)));
};

/**
 * Get image dimensions from a URL
 */
export const getImageDimensions = (
  src: string,
): Promise<{
  width: number;
  height: number;
  aspectRatio: number;
  orientation: ImageOrientation;
}> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const aspectRatio = calculateAspectRatio(
        img.naturalWidth,
        img.naturalHeight,
      );
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
        aspectRatio,
        orientation: getImageOrientation(aspectRatio),
      });
    };
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};
