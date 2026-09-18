import { readFileSync } from "node:fs";
import { defineConfig } from "tsup";

const pkg = JSON.parse(readFileSync("package.json", "utf8")) as {
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
};

const external = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
];

export default defineConfig({
  entry: ["src/package/preview.ts"],
  format: ["cjs", "esm"],
  // Declaration emit is maintained in src/package/preview.public.d.ts (tsup cannot emit .d.ts
  // for this graph without TS4023 errors in template/background modules).
  dts: false,
  // Do not unlink dist outputs before build. On Windows, preview.js/.map are often locked
  // (Remotion Studio, watchers, AV) and tsup's pre-clean hits EPERM. Overwrite in place instead.
  clean: false,
  sourcemap: true,
  outDir: "dist",
  external,
});
