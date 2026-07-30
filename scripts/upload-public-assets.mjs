/**
 * Workaround for Remotion Lambda deploy on Windows:
 * deploy compares S3 keys (/) with local bundle paths (\), then deletes public assets.
 * Re-upload public/ after sites create so fonts and textures stay on the site.
 */

import { createReadStream, existsSync, readFileSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { Upload } from "@aws-sdk/lib-storage";
import { LambdaClientInternals } from "@remotion/lambda-client";
import mime from "mime-types";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");

const loadEnvFile = (filePath) => {
  if (!existsSync(filePath)) {
    return;
  }

  for (const line of readFileSync(filePath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
};

loadEnvFile(join(root, ".env"));

const bucket =
  process.env.REMOTION_BUCKET ?? "remotionlambda-69q0up4r9e";
const siteName =
  process.env.REMOTION_SITE_NAME ?? "fixtura-remotion-v2";
const region = process.env.AWS_REGION ?? "ap-southeast-2";
const keyPrefix = `sites/${siteName}/public`;

const client = LambdaClientInternals.getS3Client({
  region,
  customCredentials: null,
  forcePathStyle: false,
  requestHandler: null,
});

async function walkFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkFiles(absolutePath)));
      continue;
    }
    if (entry.isFile()) {
      files.push(absolutePath);
    }
  }

  return files;
}

const files = await walkFiles(publicDir);
let uploaded = 0;

for (const filePath of files) {
  const relativePath = relative(publicDir, filePath).split(sep).join("/");
  const key = `${keyPrefix}/${relativePath}`;
  const contentType = mime.lookup(key) || "application/octet-stream";

  const upload = new Upload({
    client,
    params: {
      Bucket: bucket,
      Key: key,
      Body: createReadStream(filePath),
      ACL: "public-read",
      ContentType: contentType,
    },
  });

  await upload.done();
  uploaded += 1;
}

console.log(
  `upload-public-assets: uploaded ${uploaded} files to s3://${bucket}/${keyPrefix}/`,
);
