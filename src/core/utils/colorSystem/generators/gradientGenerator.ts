// gradientGenerator.ts
import { GradientOptions } from "../core/types";
import { lightenColor } from "../core/baseManipulation";
import { GRADIENT_DIRECTIONS } from "../config/constants";

// Extended gradient types
export enum GRADIENT_TYPES {
  LINEAR = "linear",
  RADIAL = "radial",
  CONIC = "conic",
  REPEATING_LINEAR = "repeating-linear",
  REPEATING_RADIAL = "repeating-radial",
  REPEATING_CONIC = "repeating-conic",
}

// Additional configuration options
export interface GradientConfig {
  // For radial gradients
  shape?: "circle" | "ellipse";
  position?: string; // e.g., "center", "top left", etc.

  // For conic gradients
  angle?: number; // starting angle in degrees

  // For repeating gradients
  size?: number; // size of each repetition in pixels

  // For mesh gradients
  opacity?: number;

  // For text gradients
  textMode?: boolean;
}

// Extended GradientOptions interface with directional CSS
export interface ExtendedGradientOptions extends GradientOptions {
  css: {
    [key: string]: string;
  };
}

/**
 * Generate gradient background CSS
 * @param color1 First gradient color
 * @param color2 Second gradient color
 * @param direction Gradient direction
 * @returns CSS string for the gradient
 */
export const generateGradientBackground = (
  color1: string,
  color2: string,
  direction = GRADIENT_DIRECTIONS.HORIZONTAL,
): string => {
  return `linear-gradient(${direction}, ${color1}, ${color2})`;
};

/**
 * Generates all gradient directions for a pair of colors
 * @param color1 First color
 * @param color2 Second color
 * @returns Object with all gradient directions
 */
export const generateAllDirectionalGradients = (
  color1: string,
  color2: string,
): { [key: string]: string } => {
  const directionalGradients: { [key: string]: string } = {};

  // Generate gradients for all directions
  Object.entries(GRADIENT_DIRECTIONS).forEach(([key, direction]) => {
    directionalGradients[key] = generateGradientBackground(
      color1,
      color2,
      direction,
    );
  });

  return directionalGradients;
};

/**
 * Generates gradient options for a color or pair of colors
 * @param color1 First color
 * @param color2 Optional second color (if not provided, will use a lighter version of color1)
 * @param direction Gradient direction
 * @returns Gradient options object
 */
export const generateGradientOptions = (
  color1: string,
  color2?: string,
  direction: string = GRADIENT_DIRECTIONS.HORIZONTAL,
): ExtendedGradientOptions => {
  const secondColor = color2 || lightenColor(color1, 20);

  // Generate all directional gradients
  const directionalGradients = generateAllDirectionalGradients(
    color1,
    secondColor,
  );

  return {
    direction,
    type: "linear",
    stops: [color1, secondColor],
    css: directionalGradients,
  };
};

/**
 * Generates a radial gradient
 * @param centerColor Center color
 * @param edgeColor Edge color
 * @param config Optional configuration for shape and position
 * @returns Radial gradient CSS string
 */
export const generateRadialGradient = (
  centerColor: string,
  edgeColor: string,
  config?: { shape?: "circle" | "ellipse"; position?: string },
): string => {
  const shape = config?.shape || "circle";
  const position = config?.position || "center";

  return `radial-gradient(${shape} at ${position}, ${centerColor}, ${edgeColor})`;
};

/**
 * Generates a conic gradient
 * @param colors Array of colors for gradient stops
 * @param startAngle Starting angle in degrees (default: 0)
 * @param position Center position (default: center)
 * @returns Conic gradient CSS string
 */
export const generateConicGradient = (
  colors: string[],
  startAngle: number = 0,
  position: string = "center",
): string => {
  if (colors.length < 2) {
    throw new Error("At least two colors are required for a gradient");
  }

  return `conic-gradient(from ${startAngle}deg at ${position}, ${colors.join(", ")})`;
};

/**
 * Generates a repeating linear gradient
 * @param colors Array of colors for gradient stops
 * @param size Size of each repetition in pixels
 * @param direction Gradient direction
 * @returns Repeating linear gradient CSS string
 */
export const generateRepeatingLinearGradient = (
  colors: string[],
  size: number = 20,
  direction = GRADIENT_DIRECTIONS.HORIZONTAL,
): string => {
  if (colors.length < 2) {
    throw new Error("At least two colors are required for a gradient");
  }

  const stops = colors
    .map((color, index) => {
      const start = index * size + "px";
      const end = (index + 1) * size + "px";
      return `${color} ${start}, ${color} ${end}`;
    })
    .join(", ");

  return `repeating-linear-gradient(${direction}, ${stops})`;
};

/**
 * Generates a repeating radial gradient
 * @param colors Array of colors for gradient stops
 * @param size Size of each repetition in pixels
 * @param config Optional configuration for shape and position
 * @returns Repeating radial gradient CSS string
 */
export const generateRepeatingRadialGradient = (
  colors: string[],
  size: number = 20,
  config?: { shape?: "circle" | "ellipse"; position?: string },
): string => {
  if (colors.length < 2) {
    throw new Error("At least two colors are required for a gradient");
  }

  const shape = config?.shape || "circle";
  const position = config?.position || "center";

  const stops = colors
    .map((color, index) => {
      const start = index * size + "px";
      const end = (index + 1) * size + "px";
      return `${color} ${start}, ${color} ${end}`;
    })
    .join(", ");

  return `repeating-radial-gradient(${shape} at ${position}, ${stops})`;
};

/**
 * Generates a multi-stop gradient
 * @param colors Array of colors for gradient stops
 * @param direction Gradient direction
 * @returns Multi-stop gradient CSS string
 */
export const generateMultiStopGradient = (
  colors: string[],
  direction = GRADIENT_DIRECTIONS.HORIZONTAL,
): string => {
  if (colors.length < 2) {
    throw new Error("At least two colors are required for a gradient");
  }

  return `linear-gradient(${direction}, ${colors.join(", ")})`;
};

/**
 * Generates a gradient with specified stop positions
 * @param colorStops Array of color stops with positions
 * @param direction Gradient direction
 * @returns Positioned gradient CSS string
 */
export const generatePositionedGradient = (
  colorStops: Array<{ color: string; position: number }>,
  direction = GRADIENT_DIRECTIONS.HORIZONTAL,
): string => {
  if (colorStops.length < 2) {
    throw new Error("At least two color stops are required for a gradient");
  }

  const stops = colorStops
    .map((stop) => `${stop.color} ${stop.position}%`)
    .join(", ");

  return `linear-gradient(${direction}, ${stops})`;
};

/**
 * Generates a mesh gradient by overlaying multiple gradients
 * @param gradientLayers Array of gradient configurations
 * @returns CSS string for layered mesh gradient
 */
export const generateMeshGradient = (
  gradientLayers: Array<{
    colors: string[];
    direction: string;
    opacity?: number;
  }>,
): string => {
  if (gradientLayers.length < 2) {
    throw new Error(
      "At least two gradient layers are needed for a mesh gradient",
    );
  }

  const gradients = gradientLayers
    .map((layer) => {
      const colors = layer.colors.map((color) => {
        // Add opacity if specified
        if (layer.opacity !== undefined && !color.includes("rgba")) {
          // Convert hex or named color to rgba
          return convertToRgba(color, layer.opacity);
        }
        return color;
      });

      return `linear-gradient(${layer.direction}, ${colors.join(", ")})`;
    })
    .join(", ");

  return gradients;
};

/**
 * Helper function to convert a color to rgba format
 * @param color Color string (hex or named)
 * @param opacity Opacity value (0-1)
 * @returns rgba color string
 */
const convertToRgba = (color: string, opacity: number): string => {
  // This is a simplified conversion - would need a more robust implementation
  // for production code that handles all color formats
  return `${color.replace(")", `, ${opacity})`).replace("rgb", "rgba")}`;
};

/**
 * Generates CSS for gradient text
 * @param gradient Gradient CSS string
 * @returns Object with CSS properties for gradient text
 */
export const generateGradientText = (
  gradient: string,
): Record<string, string> => {
  return {
    background: gradient,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  };
};

/**
 * Generates a hard-stop gradient
 * @param colors Array of colors
 * @param positions Array of positions (percentage values)
 * @param direction Gradient direction
 * @returns Hard-stop gradient CSS string
 */
export const generateHardStopGradient = (
  colors: string[],
  positions: number[],
  direction = GRADIENT_DIRECTIONS.HORIZONTAL,
): string => {
  if (colors.length !== positions.length || colors.length < 2) {
    throw new Error(
      "Colors and positions arrays must have the same length and contain at least 2 items",
    );
  }

  const stops = colors
    .map((color, index) => {
      return `${color} ${positions[index]}%`;
    })
    .join(", ");

  return `linear-gradient(${direction}, ${stops})`;
};

/**
 * Generates a gradient with background image overlay
 * @param gradient Gradient CSS string
 * @param imageUrl URL of the background image
 * @returns Combined background CSS string
 */
export const generateGradientImageOverlay = (
  gradient: string,
  imageUrl: string,
): string => {
  return `${gradient}, url('${imageUrl}')`;
};

/**
 * Creates CSS for gradient borders
 * @param gradient Gradient CSS string
 * @param borderWidth Border width in pixels
 * @returns Object with CSS properties for gradient border
 */
export const generateGradientBorder = (
  gradient: string,
  borderWidth: number = 1,
): Record<string, string> => {
  return {
    border: `${borderWidth}px solid transparent`,
    borderImage: `${gradient} 1`,
    WebkitBorderImage: `${gradient} 1`,
  };
};

/**
 * Creates an advanced gradient options object
 * @param colors Array of colors
 * @param type Gradient type
 * @param config Configuration options
 * @returns Advanced gradient options object with CSS
 */
export const createAdvancedGradient = (
  colors: string[],
  type: GRADIENT_TYPES = GRADIENT_TYPES.LINEAR,
  config: GradientConfig = {},
): ExtendedGradientOptions => {
  const css: { [key: string]: string } = {};
  const mainDirection = config.position || GRADIENT_DIRECTIONS.HORIZONTAL;

  // Generate the main CSS based on the type
  let mainCss = "";
  switch (type) {
    case GRADIENT_TYPES.LINEAR:
      // For linear gradients, generate all directions
      Object.entries(GRADIENT_DIRECTIONS).forEach(([key, direction]) => {
        css[key] = generateMultiStopGradient(colors, direction);
      });
      mainCss = generateMultiStopGradient(colors, mainDirection);
      break;
    case GRADIENT_TYPES.RADIAL:
      // For radial gradients, use the same configuration for all directions
      // but change the position based on the direction name
      Object.keys(GRADIENT_DIRECTIONS).forEach((key) => {
        const shape = (config.shape as "circle" | "ellipse") || "circle";
        let position = config.position || "center";

        // Adjust position based on direction key if no position is specified
        if (!config.position) {
          switch (key) {
            case "HORIZONTAL":
              position = "right center";
              break;
            case "HORIZONTAL_REVERSE":
              position = "left center";
              break;
            case "VERTICAL":
              position = "center bottom";
              break;
            case "VERTICAL_REVERSE":
              position = "center top";
              break;
            case "DIAGONAL":
              position = "bottom right";
              break;
            case "DIAGONAL_REVERSE":
              position = "top left";
              break;
            default:
              position = "center";
          }
        }

        css[key] = generateRadialGradient(
          colors[0],
          colors[colors.length - 1],
          {
            shape,
            position,
          },
        );
      });
      mainCss = generateRadialGradient(colors[0], colors[colors.length - 1], {
        shape: config.shape as "circle" | "ellipse",
        position: config.position,
      });
      break;
    case GRADIENT_TYPES.CONIC:
      // For conic gradients, adjust the angle based on the direction
      Object.keys(GRADIENT_DIRECTIONS).forEach((key) => {
        let angle = config.angle || 0;

        // Adjust angle based on direction key
        switch (key) {
          case "HORIZONTAL":
            angle = 90;
            break;
          case "HORIZONTAL_REVERSE":
            angle = 270;
            break;
          case "VERTICAL":
            angle = 180;
            break;
          case "VERTICAL_REVERSE":
            angle = 0;
            break;
          case "DIAGONAL":
            angle = 135;
            break;
          case "DIAGONAL_REVERSE":
            angle = 315;
            break;
          default:
            angle = config.angle || 0;
        }

        css[key] = generateConicGradient(
          colors,
          angle,
          config.position || "center",
        );
      });
      mainCss = generateConicGradient(colors, config.angle, config.position);
      break;
    case GRADIENT_TYPES.REPEATING_LINEAR:
      // For repeating linear gradients, generate all directions
      Object.entries(GRADIENT_DIRECTIONS).forEach(([key, direction]) => {
        css[key] = generateRepeatingLinearGradient(
          colors,
          config.size,
          direction,
        );
      });
      mainCss = generateRepeatingLinearGradient(
        colors,
        config.size,
        mainDirection,
      );
      break;
    case GRADIENT_TYPES.REPEATING_RADIAL:
      // Similar approach as with radial gradients
      Object.keys(GRADIENT_DIRECTIONS).forEach((key) => {
        const shape = (config.shape as "circle" | "ellipse") || "circle";
        let position = config.position || "center";

        // Adjust position based on direction key if no position is specified
        if (!config.position) {
          switch (key) {
            case "HORIZONTAL":
              position = "right center";
              break;
            case "HORIZONTAL_REVERSE":
              position = "left center";
              break;
            case "VERTICAL":
              position = "center bottom";
              break;
            case "VERTICAL_REVERSE":
              position = "center top";
              break;
            case "DIAGONAL":
              position = "bottom right";
              break;
            case "DIAGONAL_REVERSE":
              position = "top left";
              break;
            default:
              position = "center";
          }
        }

        css[key] = generateRepeatingRadialGradient(colors, config.size, {
          shape,
          position,
        });
      });
      mainCss = generateRepeatingRadialGradient(colors, config.size, {
        shape: config.shape as "circle" | "ellipse",
        position: config.position,
      });
      break;
    case GRADIENT_TYPES.REPEATING_CONIC:
      // For repeating conic gradients, adjust the angle based on the direction
      Object.keys(GRADIENT_DIRECTIONS).forEach((key) => {
        let angle = config.angle || 0;

        // Adjust angle based on direction key
        switch (key) {
          case "HORIZONTAL":
            angle = 90;
            break;
          case "HORIZONTAL_REVERSE":
            angle = 270;
            break;
          case "VERTICAL":
            angle = 180;
            break;
          case "VERTICAL_REVERSE":
            angle = 0;
            break;
          case "DIAGONAL":
            angle = 135;
            break;
          case "DIAGONAL_REVERSE":
            angle = 315;
            break;
          default:
            angle = config.angle || 0;
        }

        css[key] =
          `repeating-conic-gradient(from ${angle}deg at ${config.position || "center"}, ${colors.join(", ")})`;
      });
      mainCss = `repeating-conic-gradient(from ${config.angle || 0}deg at ${config.position || "center"}, ${colors.join(", ")})`;
      break;
    default:
      // Default to multi-stop linear gradient for all directions
      Object.entries(GRADIENT_DIRECTIONS).forEach(([key, direction]) => {
        css[key] = generateMultiStopGradient(colors, direction);
      });
      mainCss = generateMultiStopGradient(colors);
  }

  // Add the main CSS as the default property
  css.DEFAULT = mainCss;

  return {
    type: type as unknown as "linear" | "radial",
    stops: colors,
    direction: mainDirection,
    css,
    ...(config.textMode && {
      textCss: Object.entries(css).reduce(
        (acc, [key, value]) => {
          acc[key] = generateGradientText(value);
          return acc;
        },
        {} as Record<string, Record<string, string>>,
      ),
    }),
  };
};
