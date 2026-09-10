import fs from "fs";
import path from "path";

const root = process.cwd();

const assets = [
  { html: "design/variants/scoreline/cricket/upcoming.html", css: "scoreline-upcoming.css" },
  { html: "design/variants/scoreline/cricket/ladder.html", css: "scoreline-ladder.css" },
  { html: "design/variants/scoreline/cricket/top5-batting.html", css: "scoreline-top5.css" },
  { html: "design/variants/scoreline/cricket/top5-bowling.html", css: "scoreline-top5.css", skipWrite: true },
  { html: "design/variants/scoreline/cricket/team-roster.html", css: "scoreline-team-roster.css" },
  {
    html: "design/variants/scoreline/cricket/team-of-the-week.html",
    css: "scoreline-team-of-the-week.css",
  },
];

const headLinks = (cssFile) => `    <link rel="stylesheet" href="/design/_shared/scoreline-polish.css" />
    <link rel="stylesheet" href="/design/_shared/${cssFile}" />
    <link rel="stylesheet" href="/design/_shared/scoreline-preview.css" />
    <script src="https://cdn.tailwindcss.com"></script>
    <script type="module">
      import { applyVariantFonts } from "/design/_shared/fonts.js";

      const fontFamily = await applyVariantFonts("scoreline");

      tailwind.config = {
        theme: {
          extend: {
            fontFamily,
          },
        },
      };
    </script>
`;

for (const asset of assets) {
  const htmlPath = path.join(root, asset.html);
  let html = fs.readFileSync(htmlPath, "utf8");
  const start = html.indexOf("<style>");
  const end = html.indexOf("</style>");
  if (start === -1 || end === -1) {
    console.log("skip (no style)", asset.html);
    continue;
  }

  let css = html.slice(start + 7, end).trim();
  const label = asset.css.replace("scoreline-", "").replace(".css", "");
  const header = `/* Scoreline ${label} layout — synced with src/templates/variants/scoreline/styles/${asset.css} */\n\n`;
  const fullCss = header + css;

  if (!asset.skipWrite) {
    fs.writeFileSync(path.join(root, "design/_shared", asset.css), fullCss);
    const remotionCss = fullCss.replace(
      "background: var(--paper);",
      "background: transparent;\n  /* Remotion: overlay-only — template background shows through */",
    );
    fs.writeFileSync(
      path.join(root, "src/templates/variants/scoreline/styles", asset.css),
      remotionCss,
    );
  }

  html = html.replace(
    /<link rel="stylesheet" href="\/design\/_shared\/scoreline-polish\.css" \/>[\s\S]*?<\/style>\s*/,
    `${headLinks(asset.css)}\n`,
  );
  fs.writeFileSync(htmlPath, html);
  console.log("updated", asset.html);
}
