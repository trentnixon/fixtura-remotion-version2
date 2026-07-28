/**
 * Clears webpack/remotion filesystem caches.
 * Corrupted cache can crash bundling with:
 *   TypeError: Cannot read properties of undefined (reading 'length') at wasm-hash.js
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cacheDir = path.join(root, "node_modules", ".cache");

if (fs.existsSync(cacheDir)) {
  fs.rmSync(cacheDir, { recursive: true, force: true });
  console.log(`Removed ${cacheDir}`);
} else {
  console.log("No webpack cache to clear.");
}
