/**
 * Diagnose webpack wasm-hash crash:
 *   TypeError: Cannot read properties of undefined (reading 'length')
 *
 * When the crash happens, stale filesystem cache entries can deserialize
 * context records with `hash: undefined`. Webpack then calls hash.update(undefined).
 *
 * This script temporarily patches webpack's FileSystemInfo to log the symlink
 * context path(s) involved right before bundling.
 *
 * Usage (run while the crash is reproducible, BEFORE clearing cache):
 *   node scripts/diagnose-webpack-hash-crash.mjs
 *   node scripts/diagnose-webpack-hash-crash.mjs -- npx remotion studio
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fsiPath = path.join(root, "node_modules", "webpack", "lib", "FileSystemInfo.js");

const MARKER = "FIXTURA_DIAGNOSTIC_PATCH";

const patchSource = `
\t\t\t(target, push, callback) => {
\t\t\t\tthis._getUnresolvedContextTsh(target, (err, entry) => {
\t\t\t\t\tif (err) return callback(err);
\t\t\t\t\tif (entry) {
\t\t\t\t\t\tif (entry.hash === undefined) {
\t\t\t\t\t\t\tconsole.error("[webpack-hash-diagnostic] context symlink target with undefined hash:", target);
\t\t\t\t\t\t\tconsole.error("[webpack-hash-diagnostic] entry keys:", Object.keys(entry));
\t\t\t\t\t\t}
\t\t\t\t\t\thashes.push(entry.hash);
`;

const originalNeedle = `\t\t\t(target, push, callback) => {
\t\t\t\tthis._getUnresolvedContextTsh(target, (err, entry) => {
\t\t\t\t\tif (err) return callback(err);
\t\t\t\t\tif (entry) {
\t\t\t\t\t\thashes.push(entry.hash);`;

const args = process.argv.slice(2);
const dashIndex = args.indexOf("--");
const bundleArgs =
  dashIndex >= 0 ? args.slice(dashIndex + 1) : ["npx", "remotion", "bundle"];

if (!fs.existsSync(fsiPath)) {
  console.error("webpack FileSystemInfo.js not found:", fsiPath);
  process.exit(1);
}

const original = fs.readFileSync(fsiPath, "utf8");
if (original.includes(MARKER)) {
  console.error("Diagnostic patch already applied. Restore webpack first (reinstall) or remove marker.");
  process.exit(1);
}

if (!original.includes(originalNeedle)) {
  console.error(
    "Could not locate _resolveContextTsh hook in webpack FileSystemInfo.js.",
  );
  console.error("Installed webpack version may differ from expected layout.");
  process.exit(1);
}

const patched = original.replace(
  originalNeedle,
  `${patchSource.split("\n").join("\n")}\n\t\t\t\t\t// ${MARKER}`,
);

fs.writeFileSync(fsiPath, patched, "utf8");
console.log("Applied webpack diagnostic patch.");
console.log("Cache location:", path.join(root, "node_modules", ".cache", "webpack"));
console.log("Running:", bundleArgs.join(" "));

const result = spawnSync(bundleArgs[0], bundleArgs.slice(1), {
  cwd: root,
  stdio: "inherit",
  shell: true,
  env: process.env,
});

fs.writeFileSync(fsiPath, original, "utf8");
console.log("Restored webpack FileSystemInfo.js.");

process.exit(result.status ?? 1);
