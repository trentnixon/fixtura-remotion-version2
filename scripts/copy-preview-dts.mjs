import { copyFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const src = join(root, "src", "package", "preview.public.d.ts");
const dest = join(root, "dist", "preview.d.ts");

mkdirSync(dirname(dest), { recursive: true });
if (!existsSync(src)) {
  console.error("Missing:", src);
  process.exit(1);
}
copyFileSync(src, dest);
console.log("Copied preview.d.ts to dist/");
