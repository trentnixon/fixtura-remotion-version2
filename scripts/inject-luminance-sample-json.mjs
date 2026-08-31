/**
 * Injects a luminance templateVariation block into every Cricket sample JSON
 * (parity with image/texture account assignment).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const samplesDir = path.resolve(__dirname, "../testData/samples/Cricket");

const luminanceBlock = {
  name: "Test 001",
  // Local Studio: resolves via staticFile(luminance/_verify/test001.png).
  // Production accounts send a CDN url here (same pattern as texture.url).
  url: null,
  asset: "_verify/test001.png",
  map: {
    kind: "theme",
    preset: "brand",
  },
  protection: "none",
  position: "center",
  size: "cover",
  opacity: 1,
};

const files = fs
  .readdirSync(samplesDir)
  .filter((name) => name.endsWith(".json"));

for (const file of files) {
  const filePath = path.join(samplesDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const variation = data?.videoMeta?.video?.templateVariation;
  if (!variation || typeof variation !== "object") {
    console.warn(`skip ${file}: no templateVariation`);
    continue;
  }
  variation.luminance = { ...luminanceBlock };
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`✓ ${file}`);
}
