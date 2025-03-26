import tinycolor from "tinycolor2";

/**
 * Color space conversion and manipulation utilities
 * Provides functions to convert between different color spaces for more accurate
 * color manipulations and perceptually uniform color operations.
 */

/**
 * RGB color representation
 */
export interface RGB {
  r: number; // Red (0-255)
  g: number; // Green (0-255)
  b: number; // Blue (0-255)
}

/**
 * HSL color representation
 */
export interface HSL {
  h: number; // Hue (0-360)
  s: number; // Saturation (0-100)
  l: number; // Lightness (0-100)
}

/**
 * HSV color representation
 */
export interface HSV {
  h: number; // Hue (0-360)
  s: number; // Saturation (0-100)
  v: number; // Value (0-100)
}

/**
 * Lab color representation (CIE L*a*b*)
 * More perceptually uniform than RGB or HSL
 */
export interface Lab {
  l: number; // Lightness (0-100)
  a: number; // Green-Red component
  b: number; // Blue-Yellow component
}

/**
 * LCH color representation (Lightness, Chroma, Hue)
 * Polar form of Lab, similar to how HSL is the polar form of RGB
 * Very perceptually uniform
 */
export interface LCH {
  l: number; // Lightness (0-100)
  c: number; // Chroma (0-100+)
  h: number; // Hue (0-360)
}

/**
 * Convert a color string to RGB
 */
export const toRGB = (color: string): RGB => {
  const result = tinycolor(color).toRgb();
  return {
    r: result.r,
    g: result.g,
    b: result.b,
  };
};

/**
 * Convert a color string to HSL
 */
export const toHSL = (color: string): HSL => {
  const result = tinycolor(color).toHsl();
  return {
    h: result.h,
    s: result.s * 100, // Convert 0-1 to 0-100
    l: result.l * 100, // Convert 0-1 to 0-100
  };
};

/**
 * Convert a color string to HSV
 */
export const toHSV = (color: string): HSV => {
  const result = tinycolor(color).toHsv();
  return {
    h: result.h,
    s: result.s * 100, // Convert 0-1 to 0-100
    v: result.v * 100, // Convert 0-1 to 0-100
  };
};

/**
 * Convert RGB to Lab (CIE L*a*b*)
 * Implementation based on color conversion formulas
 */
export const rgbToLab = (rgb: RGB): Lab => {
  // First convert RGB to XYZ
  let r = rgb.r / 255;
  let g = rgb.g / 255;
  let b = rgb.b / 255;

  // Apply gamma correction
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  // Convert to XYZ using sRGB reference values
  const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
  const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
  const z = r * 0.0193 + g * 0.1192 + b * 0.9505;

  // Convert XYZ to Lab
  // Using D65 reference white point
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
 * Convert Lab to LCH
 */
export const labToLCH = (lab: Lab): LCH => {
  const c = Math.sqrt(lab.a * lab.a + lab.b * lab.b);

  let h = Math.atan2(lab.b, lab.a) * (180 / Math.PI);
  if (h < 0) {
    h += 360;
  }

  return {
    l: lab.l,
    c,
    h,
  };
};

/**
 * Convert LCH to Lab
 */
export const lchToLab = (lch: LCH): Lab => {
  const hRad = lch.h * (Math.PI / 180);
  const a = lch.c * Math.cos(hRad);
  const b = lch.c * Math.sin(hRad);

  return {
    l: lch.l,
    a,
    b,
  };
};

/**
 * Convert a color string to Lab
 */
export const toLab = (color: string): Lab => {
  return rgbToLab(toRGB(color));
};

/**
 * Convert a color string to LCH
 */
export const toLCH = (color: string): LCH => {
  return labToLCH(toLab(color));
};

/**
 * Convert Lab to RGB string
 */
export const labToRGBString = (lab: Lab): string => {
  // Convert Lab to XYZ
  const y = (lab.l + 16) / 116;
  const x = lab.a / 500 + y;
  const z = y - lab.b / 200;

  const y3 = Math.pow(y, 3);
  const x3 = Math.pow(x, 3);
  const z3 = Math.pow(z, 3);

  const xNorm = x3 > 0.008856 ? x3 : (x - 16 / 116) / 7.787;
  const yNorm = y3 > 0.008856 ? y3 : (y - 16 / 116) / 7.787;
  const zNorm = z3 > 0.008856 ? z3 : (z - 16 / 116) / 7.787;

  // Convert to XYZ using D65 reference white point
  const xRef = 0.95047;
  const yRef = 1.0;
  const zRef = 1.08883;

  const X = xNorm * xRef;
  const Y = yNorm * yRef;
  const Z = zNorm * zRef;

  // Convert XYZ to RGB
  let r = X * 3.2406 + Y * -1.5372 + Z * -0.4986;
  let g = X * -0.9689 + Y * 1.8758 + Z * 0.0415;
  let b = X * 0.0557 + Y * -0.204 + Z * 1.057;

  // Apply gamma correction
  r = r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r;
  g = g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : 12.92 * g;
  b = b > 0.0031308 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : 12.92 * b;

  // Clamp and convert to 0-255 range
  r = Math.max(0, Math.min(1, r)) * 255;
  g = Math.max(0, Math.min(1, g)) * 255;
  b = Math.max(0, Math.min(1, b)) * 255;

  // Return as RGB string
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
};

/**
 * Convert LCH to RGB string
 */
export const lchToRGBString = (lch: LCH): string => {
  return labToRGBString(lchToLab(lch));
};

/**
 * Modify a color in LCH space
 * This provides more perceptually uniform adjustments
 */
export const modifyColorInLCH = (
  color: string,
  modifications: {
    lightness?: number;
    chroma?: number;
    hue?: number;
  },
): string => {
  const lch = toLCH(color);

  const newLCH = {
    l: modifications.lightness !== undefined ? modifications.lightness : lch.l,
    c: modifications.chroma !== undefined ? modifications.chroma : lch.c,
    h: modifications.hue !== undefined ? modifications.hue : lch.h,
  };

  return lchToRGBString(newLCH);
};

/**
 * Increase or decrease lightness in LCH space (perceptually uniform)
 */
export const changeLightness = (color: string, amount: number): string => {
  const lch = toLCH(color);
  return lchToRGBString({
    ...lch,
    l: Math.max(0, Math.min(100, lch.l + amount)),
  });
};

/**
 * Increase or decrease chroma (saturation) in LCH space (perceptually uniform)
 */
export const changeChroma = (color: string, amount: number): string => {
  const lch = toLCH(color);
  return lchToRGBString({
    ...lch,
    c: Math.max(0, lch.c + amount),
  });
};

/**
 * Shift the hue in LCH space (perceptually uniform)
 */
export const shiftHue = (color: string, degrees: number): string => {
  const lch = toLCH(color);
  let newHue = lch.h + degrees;

  // Normalize to 0-360
  newHue = ((newHue % 360) + 360) % 360;

  return lchToRGBString({
    ...lch,
    h: newHue,
  });
};

/**
 * Calculate perceptual difference between two colors
 * Returns a Delta E value using CIEDE2000 algorithm (simplified implementation)
 * Lower values mean colors are more similar
 */
export const getColorDifference = (color1: string, color2: string): number => {
  const lab1 = toLab(color1);
  const lab2 = toLab(color2);

  // Simple Euclidean distance in Lab space
  // This is a simplified approach - a full CIEDE2000 implementation would be more accurate
  const deltaL = lab1.l - lab2.l;
  const deltaA = lab1.a - lab2.a;
  const deltaB = lab1.b - lab2.b;

  return Math.sqrt(deltaL * deltaL + deltaA * deltaA + deltaB * deltaB);
};

/**
 * Create a palette of perceptually uniform colors
 * Useful for data visualization where perceptual uniformity is important
 */
export const createPerceptuallyUniformPalette = (
  baseColor: string,
  steps: number,
): string[] => {
  const baseLCH = toLCH(baseColor);
  const result: string[] = [];

  // Create a palette by varying lightness and hue in LCH space
  for (let i = 0; i < steps; i++) {
    const hueShift = (360 / steps) * i;
    const lightness = Math.max(
      30,
      Math.min(90, baseLCH.l + (i - steps / 2) * 5),
    );

    result.push(
      lchToRGBString({
        l: lightness,
        c: baseLCH.c,
        h: (baseLCH.h + hueShift) % 360,
      }),
    );
  }

  return result;
};
