import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildDiscoveryContract } from "../src/components/backgrounds/variants/Generated/catalogue/discoveryContract.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const contractPath = path.join(
  root,
  "public/generated-backgrounds/discovery-contract.json",
);
const cmsIngestPath = path.join(
  root,
  "public/generated-backgrounds/cms-ingest.json",
);
const schemaPath = path.join(
  root,
  "schemas/generated-backgrounds/discovery-contract.schema.json",
);

fs.mkdirSync(path.dirname(contractPath), { recursive: true });

const contract = buildDiscoveryContract();
fs.writeFileSync(contractPath, `${JSON.stringify(contract, null, 2)}\n`);

const cmsIngest = {
  contractVersion: contract.contractVersion,
  useBackground: "Animated",
  items: contract.catalogue.presets.map((preset) => ({
    id: preset.id,
    displayName: preset.displayName,
    description: preset.description,
    inventoryKey: preset.inventoryKey,
    wire: preset.defaultConfiguration,
    rendererAdapter: preset.rendererAdapter,
    operatorVisibility: preset.operatorVisibility,
    readabilityPolicy: preset.readabilityPolicy,
    paletteBehavior: preset.paletteBehavior,
    operatorControls: preset.operatorControls,
    authorControls: preset.authorControls,
    discovery: preset.discovery,
  })),
};
fs.writeFileSync(cmsIngestPath, `${JSON.stringify(cmsIngest, null, 2)}\n`);

if (!fs.existsSync(schemaPath)) {
  throw new Error(
    `Missing schema at ${schemaPath}. Commit schemas/generated-backgrounds/discovery-contract.schema.json`,
  );
}

console.log(`Wrote ${path.relative(root, contractPath)}`);
console.log(`Wrote ${path.relative(root, cmsIngestPath)}`);
console.log(`Schema ${path.relative(root, schemaPath)} (source-controlled)`);
