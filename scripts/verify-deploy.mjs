/**
 * Verifies critical public assets are reachable on the deployed Lambda site.
 * Run after `npm run deploy` to catch missing public/ uploads early.
 */

const SERVE_URL =
  process.env.REMOTION_SERVE_URL ??
  "https://remotionlambda-69q0up4r9e.s3.ap-southeast-2.amazonaws.com/sites/fixtura-remotion-v2/index.html";

const siteBase = SERVE_URL.replace(/\/index\.html$/, "");

const requiredAssets = [
  "public/fonts/Heebo/static/Heebo-Regular.ttf",
  "public/fonts/impact/impact.ttf",
];

let failed = false;

for (const asset of requiredAssets) {
  const url = `${siteBase}/${asset}`;
  try {
    const response = await fetch(url, { method: "HEAD" });
    if (!response.ok) {
      console.error(`verify-deploy: ${response.status} ${url}`);
      failed = true;
    } else {
      console.log(`verify-deploy: OK ${asset}`);
    }
  } catch (error) {
    console.error(`verify-deploy: failed to fetch ${url}`, error);
    failed = true;
  }
}

if (failed) {
  console.error(
    "verify-deploy: deployed site is missing required public assets — rerun npm run deploy from RemotionV2",
  );
  process.exit(1);
}

console.log("verify-deploy: all required assets reachable");
