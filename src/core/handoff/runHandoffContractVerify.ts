import type { BindMapInput } from "./bindMapContract";
import { verifyBindMapHtmlContract } from "./bindMapContract";
import { verifyCanvasDatasetContract } from "./canvasDatasetContract";

export type HandoffAssetContractInput = {
  variantSlug: string;
  assetSlug: string;
  compositionId: string;
  html: string;
  bindMap: BindMapInput;
  /** When false, skip scalar bind ↔ HTML checks (e.g. legacy bind-only variants). */
  verifyBindScalars?: boolean;
};

/**
 * Per-asset design ↔ Remotion contract checks (bind map scalars + canvas data-* dataset).
 */
export const runHandoffContractVerify = (
  input: HandoffAssetContractInput,
): string[] => {
  const errors: string[] = [];
  const prefix = `${input.variantSlug}/${input.assetSlug}`;

  if (input.verifyBindScalars !== false) {
    errors.push(
      ...verifyBindMapHtmlContract(input.html, input.bindMap).map(
        (message) => `${prefix}: ${message}`,
      ),
    );
  }

  errors.push(
    ...verifyCanvasDatasetContract(input.html, input.compositionId).map(
      (message) => `${prefix}: ${message}`,
    ),
  );

  return errors;
};
