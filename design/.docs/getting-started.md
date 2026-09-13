# Launch design prototypes

## Daily preview

1. Open a terminal at the repo root (`RemotionV2/`).

2. Run:

```bash
npm run design
```

3. Open in your browser:

```
http://localhost:3456/design/
```

4. Pick a template in the side nav (e.g. **Scoreline**) or open a direct asset URL:

```
http://localhost:3456/design/variants/scoreline/cricket/results.html
```

5. Stop the server: `Ctrl+C` in the terminal.

## New template (factory)

1. From repo root:

```bash
npm run design:scaffold -- --label "My Template" --slug my-template --registry MyTemplate
```

2. Start the design server (`npm run design`) and open any asset, e.g.:

```
http://localhost:3456/design/variants/my-template/cricket/results.html
```

3. Validate wiring:

```bash
npm run design:verify
```

See [naming-contract.md](./naming-contract.md) and [.scratch/design-template-factory/spec.md](../../.scratch/design-template-factory/spec.md).

**If hydration fails:** you must run step 2 from the repo root, not from inside `design/`.

**If port 3456 is taken:**

```bash
npx serve . -p 3457
```

Then use `http://localhost:3457/design/` instead.
