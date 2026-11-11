import { copyFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const copies = [
  {
    src: join(root, "src", "package", "preview.public.d.ts"),
    dest: join(root, "dist", "preview.d.ts"),
  },
  {
    src: join(root, "src", "package", "preview-core.public.d.ts"),
    dest: join(root, "dist", "preview-core.d.ts"),
  },
];

for (const { src, dest } of copies) {
  mkdirSync(dirname(dest), { recursive: true });
  if (!existsSync(src)) {
    console.error("Missing:", src);
    process.exit(1);
  }
  copyFileSync(src, dest);
}

const templateCopies = [
  {
    src: join(root, "src", "package", "templates", "scoreline.public.d.ts"),
    dest: join(root, "dist", "templates", "scoreline.d.ts"),
  },
  {
    src: join(root, "src", "package", "templates", "night-session.public.d.ts"),
    dest: join(root, "dist", "templates", "night-session.d.ts"),
  },
  {
    src: join(root, "src", "package", "templates", "mudgeeraba.public.d.ts"),
    dest: join(root, "dist", "templates", "mudgeeraba.d.ts"),
  },
];

for (const { src, dest } of templateCopies) {
  mkdirSync(dirname(dest), { recursive: true });
  if (!existsSync(src)) {
    console.error("Missing:", src);
    process.exit(1);
  }
  copyFileSync(src, dest);
}

console.log("Copied preview, preview-core, and template entry .d.ts files to dist/");
