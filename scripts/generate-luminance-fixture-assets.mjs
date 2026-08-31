/**
 * Generates grayscale luminance fixture assets under public/luminance/.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PNG } from "pngjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "public", "luminance");
const verifyDir = path.join(outDir, "_verify");

const writeGradient = (filePath, fn) => {
  const width = 256;
  const height = 256;
  const png = new PNG({ width, height });

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const value = fn(x, y, width, height);
      const idx = (width * y + x) << 2;
      png.data[idx] = value;
      png.data[idx + 1] = value;
      png.data[idx + 2] = value;
      png.data[idx + 3] = 255;
    }
  }

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, PNG.sync.write(png));
};

fs.mkdirSync(outDir, { recursive: true });

writeGradient(path.join(outDir, "smooth-ramp.png"), (x, _y, width) =>
  Math.round((x / (width - 1)) * 255),
);

writeGradient(path.join(outDir, "high-contrast.png"), (x, _y, width) => {
  const t = x / (width - 1);
  return t < 0.5 ? 20 : 235;
});

writeGradient(path.join(outDir, "fine-noise.png"), (x, y, width) => {
  const base = Math.round((x / (width - 1)) * 200 + 20);
  const noise = ((x * 13 + y * 7) % 17) - 8;
  return Math.min(255, Math.max(0, base + noise));
});

/**
 * Lossless grayscale linework master for protected-brand (F07).
 * Pure black/white strokes sit in protected endpoint bands; mid-gray fills map to club colors.
 */
writeGradient(
  path.join(outDir, "linework-protected.png"),
  (x, y, width, height) => {
    const nx = x / (width - 1);
    const ny = y / (height - 1);
    const midGray = Math.round(40 + nx * 175);

    const onGrid =
      x % 32 === 0 ||
      y % 32 === 0 ||
      Math.abs(x - y) < 2 ||
      Math.abs(x + y - (width - 1)) < 2;
    if (onGrid) {
      return 0;
    }

    const inWhitePanel = nx > 0.72 && nx < 0.92 && ny > 0.15 && ny < 0.35;
    if (inWhitePanel) {
      return 255;
    }

    const nearWhiteStroke =
      Math.abs(ny - 0.75) < 0.008 || Math.abs(nx - 0.55) < 0.006;
    if (nearWhiteStroke) {
      return 255;
    }

    return midGray;
  },
);

writeGradient(path.join(verifyDir, "smooth-ramp.png"), (x, _y, width) =>
  Math.round((x / (width - 1)) * 255),
);

console.log("Generated luminance fixture assets in public/luminance/");
