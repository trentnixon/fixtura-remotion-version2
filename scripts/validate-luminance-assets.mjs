import fs from "node:fs";
import path from "node:path";
import { Buffer } from "node:buffer";
import { fileURLToPath } from "node:url";
import { PNG } from "pngjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const CHANNEL_EPSILON = 2;
const MIN_HISTOGRAM_SPREAD = 40;

const readPng = (filePath) => PNG.sync.read(fs.readFileSync(filePath));

const hasEmbeddedProfile = (filePath) => {
  const buffer = fs.readFileSync(filePath);
  return buffer.includes(Buffer.from("iCCP"));
};

const validateFile = (filePath) => {
  const errors = [];

  if (hasEmbeddedProfile(filePath)) {
    errors.push("embedded ICC/color profile detected");
  }

  const png = readPng(filePath);
  let min = 255;
  let max = 0;

  for (let index = 0; index < png.data.length; index += 4) {
    const r = png.data[index];
    const g = png.data[index + 1];
    const b = png.data[index + 2];

    if (
      Math.abs(r - g) > CHANNEL_EPSILON ||
      Math.abs(g - b) > CHANNEL_EPSILON
    ) {
      errors.push("channels are not neutral grayscale");
      break;
    }

    min = Math.min(min, r);
    max = Math.max(max, r);
  }

  if (max - min < MIN_HISTOGRAM_SPREAD) {
    errors.push(
      `tonal spread ${max - min} is below minimum ${MIN_HISTOGRAM_SPREAD}`,
    );
  }

  return errors;
};

const collectPngFiles = (directory) => {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return collectPngFiles(fullPath);
    }
    return entry.name.endsWith(".png") ? [fullPath] : [];
  });
};

const targets = process.argv.slice(2);
const files =
  targets.length > 0
    ? targets.flatMap((target) => {
        const resolved = path.resolve(process.cwd(), target);
        if (fs.statSync(resolved).isDirectory()) {
          return collectPngFiles(resolved);
        }
        return [resolved];
      })
    : collectPngFiles(path.join(root, "public", "luminance"));

let failed = false;

for (const filePath of files) {
  const errors = validateFile(filePath);
  if (errors.length > 0) {
    failed = true;
    console.error(`✗ ${path.relative(root, filePath)}`);
    for (const error of errors) {
      console.error(`  - ${error}`);
    }
  } else {
    console.log(`✓ ${path.relative(root, filePath)}`);
  }
}

process.exit(failed ? 1 : 0);
