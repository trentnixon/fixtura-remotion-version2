# Releasing `@fixtura/remotion-assets`

1. Run `npm run build:package` (or rely on `prepack` when using `npm pack` / `npm publish`).
2. Commit `dist/` together with source changes (Strategy A — see `.comms/REMOTION_PACKAGE_HOWTO.md`).
3. Tag: `git tag v0.1.x` and `git push origin v0.1.x`.
4. In the Fixtura app: `"@fixtura/remotion-assets": "github:trentnixon/fixtura-remotion-version2#v0.1.x"`, then `npm install`.
5. App peer deps: `react`, `react-dom`, `remotion@4.0.314`, `@remotion/player@4.0.314`.

**Types:** `dist/preview.d.ts` is copied from `src/package/preview.public.d.ts` because full `tsup` declaration emit hits TS4023 across templates. `FixturaDataset` is typed loosely as `Record<string, unknown>` in that file; align payloads with this repo’s `FixturaDataset` at runtime.
