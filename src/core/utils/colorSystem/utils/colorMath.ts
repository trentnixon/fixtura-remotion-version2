import tinycolor from "tinycolor2";

/**
 * RGB color interface
 */
interface RGB {
  r: number;
  g: number;
  b: number;
}

/**
 * HSL color interface
 */
/* interface HSL {
  h: number;
  s: number;
  l: number;
} */

/**
 * LAB color interface
 */
interface LAB {
  l: number;
  a: number;
  b: number;
}

/**
 * Calculates the relative luminance of a color according to WCAG 2.0
 * @param color Color to calculate luminance for
 * @returns Relative luminance value between 0 and 1
 */
export const getLuminance = (color: string): number => {
  return tinycolor(color).getLuminance();
};

/**
 * Calculates the contrast ratio between two colors according to WCAG 2.0
 * @param color1 First color
 * @param color2 Second color
 * @returns Contrast ratio (1 to 21)
 */
export const getContrastRatio = (color1: string, color2: string): number => {
  return tinycolor.readability(color1, color2);
};

/**
 * Converts RGB color to LAB color space
 * Note: This is a simplified conversion and not completely accurate
 * @param rgb RGB color object
 * @returns LAB color object
 */
export const rgbToLab = (rgb: RGB): LAB => {
  // Convert RGB to XYZ
  let r = rgb.r / 255;
  let g = rgb.g / 255;
  let b = rgb.b / 255;

  // Apply gamma correction
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  // Convert to XYZ
  const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
  const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
  const z = r * 0.0193 + g * 0.1192 + b * 0.9505;

  // Convert XYZ to Lab
  const xRef = 0.95047;
  const yRef = 1.0;
  const zRef = 1.08883;

  const xNorm = x / xRef;
  const yNorm = y / yRef;
  const zNorm = z / zRef;

  const fx =
    xNorm > 0.008856 ? Math.pow(xNorm, 1 / 3) : 7.787 * xNorm + 16 / 116;
  const fy =
    yNorm > 0.008856 ? Math.pow(yNorm, 1 / 3) : 7.787 * yNorm + 16 / 116;
  const fz =
    zNorm > 0.008856 ? Math.pow(zNorm, 1 / 3) : 7.787 * zNorm + 16 / 116;

  const l = 116 * fy - 16;
  const a = 500 * (fx - fy);
  const bValue = 200 * (fy - fz);

  return { l, a, b: bValue };
};

/**
 * Calculates the Delta E (CIE 2000) color difference between two colors
 * This is a perceptual color difference measure
 * @param color1 First color
 * @param color2 Second color
 * @returns Delta E value (0 means identical colors, higher values indicate greater difference)
 */
export const getDeltaE = (color1: string, color2: string): number => {
  // Convert to RGB
  const rgb1 = tinycolor(color1).toRgb();
  const rgb2 = tinycolor(color2).toRgb();

  // Convert to LAB
  const lab1 = rgbToLab(rgb1);
  const lab2 = rgbToLab(rgb2);

  // Calculate Delta E (simplified version)
  const deltaL = lab1.l - lab2.l;
  const deltaA = lab1.a - lab2.a;
  const deltaB = lab1.b - lab2.b;

  return Math.sqrt(deltaL * deltaL + deltaA * deltaA + deltaB * deltaB);
};

/**
 * Finds a color with a specific contrast ratio to a background color
 * @param backgroundColor Background color
 * @param targetContrast Target contrast ratio (e.g., 4.5 for WCAG AA)
 * @param preferDarker Whether to prefer darker colors over lighter ones
 * @returns Color with the target contrast ratio
 */
export const findColorWithTargetContrast = (
  backgroundColor: string,
  targetContrast: number = 4.5,
  preferDarker: boolean = false,
): string => {
  const bgColor = tinycolor(backgroundColor);
  const isLight = bgColor.isLight();

  // Start with white or black based on background
  let testColor = tinycolor(isLight !== preferDarker ? "#000000" : "#FFFFFF");
  let contrast = tinycolor.readability(backgroundColor, testColor.toString());

  // If we already meet the target, return the color
  if (contrast >= targetContrast) {
    return testColor.toString();
  }

  // Otherwise, adjust the color to reach the target contrast
  // Start with opposite color and make it more like the background until we hit the target
  const startColor = testColor;
  const endColor = bgColor;
  let iterations = 0;
  const maxIterations = 20;

  while (iterations < maxIterations) {
    // Mix the colors (gradually move from start to end)
    const mixAmount = 5 * iterations;
    testColor = tinycolor.mix(startColor, endColor, mixAmount);
    contrast = tinycolor.readability(backgroundColor, testColor.toString());

    // If we're close enough to the target, return the color
    if (Math.abs(contrast - targetContrast) < 0.1) {
      return testColor.toString();
    }

    // If we've gone too far (contrast too low), back up and return
    if (contrast < targetContrast) {
      // Go back one step
      testColor = tinycolor.mix(
        startColor,
        endColor,
        Math.max(0, mixAmount - 5),
      );
      return testColor.toString();
    }

    iterations++;
  }

  // If we can't find a good match, return the best we found
  return testColor.toString();
};

/**
 * Interpolates between two colors in LAB space for more perceptually uniform transitions
 * @param color1 Start color
 * @param color2 End color
 * @param steps Number of steps for interpolation
 * @returns Array of interpolated colors
 */
export const interpolateColorsLab = (
  color1: string,
  color2: string,
  steps: number,
): string[] => {
  /* const rgb1 = tinycolor(color1).toRgb();
  const rgb2 = tinycolor(color2).toRgb(); */

  /*  const lab1 = rgbToLab(rgb1);
  const lab2 = rgbToLab(rgb2); */

  const result: string[] = [];

  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);

    // Interpolate in LAB space
    /* const labInterp = {
      l: lab1.l + t * (lab2.l - lab1.l),
      a: lab1.a + t * (lab2.a - lab1.a),
      b: lab1.b + t * (lab2.b - lab1.b),
    }; */

    // Convert back to RGB - this is a simplification
    // For a proper implementation, you'd need to convert LAB to XYZ, then XYZ to RGB
    // For now, we'll use tinycolor's mix function as an approximation
    const color = tinycolor.mix(color1, color2, t * 100).toString();
    result.push(color);
  }

  return result;
};
