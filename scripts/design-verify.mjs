#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";
import { runDesignVerify } from "../design/_shared/lib/design-verify.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const args = process.argv.slice(2);
const handoff = args.includes("--handoff");
const variantIdx = args.indexOf("--variant");
const assetIdx = args.indexOf("--asset");
const variant = variantIdx >= 0 ? args[variantIdx + 1] : undefined;
const asset = assetIdx >= 0 ? args[assetIdx + 1] : undefined;

const result = runDesignVerify(root, { handoff, variant, asset });

if (!result.ok) {
  for (const error of result.errors) {
    console.error(error);
  }
  process.exit(1);
}

console.log(
  handoff
    ? "design:verify handoff checks passed."
    : "design:verify explore checks passed.",
);
