# Launch design prototypes

1. Open a terminal at the repo root (`RemotionV2/`).

2. Run:

```bash
npm run design
```

3. Open in your browser:

```
http://localhost:3456/design/
```

4. Click **Broadcast Pro** in the side nav (or go directly to Results):

```
http://localhost:3456/design/variants/broadcast-pro/cricket/results.html
```

5. Stop the server: `Ctrl+C` in the terminal.

**If hydration fails:** you must run step 2 from the repo root, not from inside `design/`.

**If port 3456 is taken:**

```bash
npx serve . -p 3457
```

Then use `http://localhost:3457/design/` instead.
