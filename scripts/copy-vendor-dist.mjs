import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));

const src = resolve(process.env.REMOTION_VENDOR_SRC ?? join(root, "dist"));
const defaultDest = join(
  root,
  "..",
  "..",
  "Fixtura.com.au",
  "application",
  "src",
  "vendor",
  "fixtura-remotion-assets",
);
const dest = resolve(process.env.REMOTION_VENDOR_DEST ?? defaultDest);

const inCi = process.env.CI === "true" || process.env.CI === "1";
const force = process.env.REMOTION_VENDOR_COPY === "1";

if (inCi && !force) {
  console.log("copy-vendor: skipped (CI; set REMOTION_VENDOR_COPY=1 to run)");
  process.exit(0);
}

if (!existsSync(src)) {
  console.error("copy-vendor: missing source dist:", src);
  process.exit(1);
}

const rootExtensions = new Set([".mjs", ".js", ".map"]);
const templatesSrc = join(src, "templates");
const templatesDest = join(dest, "templates");

mkdirSync(dest, { recursive: true });
mkdirSync(templatesDest, { recursive: true });

let copied = 0;

for (const name of readdirSync(src)) {
  const ext = name.includes(".") ? name.slice(name.lastIndexOf(".")) : "";
  if (!rootExtensions.has(ext)) {
    continue;
  }
  copyFileSync(join(src, name), join(dest, name));
  copied += 1;
}

if (existsSync(templatesSrc)) {
  for (const name of readdirSync(templatesSrc)) {
    copyFileSync(join(templatesSrc, name), join(templatesDest, name));
    copied += 1;
  }
}

console.log(`copy-vendor: OK (${copied} files → ${dest})`);
