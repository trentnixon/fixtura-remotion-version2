import { generatedCatalogue, operatorPresets } from "./catalogue";
import { legacyIngress } from "./ingress";

export const GENERATED_BACKGROUNDS_CONTRACT_VERSION = "1.0.0" as const;

export type GeneratedBackgroundsDiscoveryContract = {
  readonly contractVersion: typeof GENERATED_BACKGROUNDS_CONTRACT_VERSION;
  readonly generatedAt: string;
  readonly catalogue: {
    readonly presets: typeof generatedCatalogue;
  };
  readonly operatorPresets: readonly string[];
  readonly legacyIngress: typeof legacyIngress;
};

export const buildDiscoveryContract = (
  generatedAt = new Date().toISOString(),
): GeneratedBackgroundsDiscoveryContract => ({
  contractVersion: GENERATED_BACKGROUNDS_CONTRACT_VERSION,
  generatedAt,
  catalogue: { presets: generatedCatalogue },
  operatorPresets: operatorPresets.map((preset) => preset.id),
  legacyIngress,
});

const statusWithReasonSchema = {
  type: "object",
  required: ["status", "reason"],
  properties: {
    status: { const: "resolved-hidden" },
    reason: { type: "string", minLength: 1 },
  },
  additionalProperties: false,
} as const;

const statusWithNoteSchema = {
  type: "object",
  required: ["status", "note"],
  properties: {
    status: { const: "unresolved" },
    note: { type: "string", minLength: 1 },
  },
  additionalProperties: false,
} as const;

export const generatedBackgroundsDiscoveryContractSchema = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://fixtura.com/schemas/generated-backgrounds/discovery-contract.schema.json",
  title: "Fixtura Generated backgrounds discovery contract",
  type: "object",
  required: [
    "contractVersion",
    "generatedAt",
    "catalogue",
    "operatorPresets",
    "legacyIngress",
  ],
  properties: {
    contractVersion: { const: GENERATED_BACKGROUNDS_CONTRACT_VERSION },
    generatedAt: { type: "string", format: "date-time" },
    catalogue: {
      type: "object",
      required: ["presets"],
      properties: {
        presets: {
          type: "array",
          items: { $ref: "#/$defs/catalogueEntry" },
        },
      },
      additionalProperties: false,
    },
    operatorPresets: {
      type: "array",
      items: { type: "string", minLength: 1 },
      uniqueItems: true,
    },
    legacyIngress: {
      type: "array",
      items: { $ref: "#/$defs/legacyIngressRow" },
    },
  },
  additionalProperties: false,
  $defs: {
    legacyEgress: {
      oneOf: [
        {
          type: "object",
          required: ["useBackground", "pattern"],
          properties: {
            useBackground: { const: "Pattern" },
            pattern: { type: "object", required: ["type"] },
          },
          additionalProperties: false,
        },
        {
          type: "object",
          required: ["useBackground", "particle"],
          properties: {
            useBackground: { const: "Particle" },
            particle: { type: "object", required: ["type"] },
          },
          additionalProperties: false,
        },
        {
          type: "object",
          required: ["useBackground", "noise"],
          properties: {
            useBackground: { enum: ["Noise", "Graphics"] },
            noise: {
              type: "object",
              required: ["type"],
              properties: { type: { type: "string", minLength: 1 } },
              additionalProperties: false,
            },
          },
          additionalProperties: false,
        },
      ],
    },
    state: {
      oneOf: [
        {
          type: "object",
          required: ["status"],
          properties: { status: { const: "resolved-visible" } },
          additionalProperties: false,
        },
        statusWithReasonSchema,
        statusWithNoteSchema,
        {
          type: "object",
          required: ["status", "policy"],
          properties: {
            status: { const: "resolved" },
            policy: { type: "string" },
          },
        },
        {
          type: "object",
          required: ["status", "mode"],
          properties: {
            status: { const: "resolved" },
            mode: { enum: ["active-palette", "fixed", "mixed"] },
          },
        },
      ],
    },
    catalogueEntry: {
      type: "object",
      required: [
        "id",
        "displayName",
        "description",
        "inventoryKey",
        "rendererAdapter",
        "defaultConfiguration",
        "operatorVisibility",
        "readabilityPolicy",
        "paletteBehavior",
        "operatorControls",
        "authorControls",
        "legacyIngressIds",
        "discovery",
      ],
      properties: {
        id: { type: "string", minLength: 1 },
        displayName: { type: "string", minLength: 1 },
        description: { type: "string", minLength: 1 },
        inventoryKey: { type: "string", minLength: 1 },
        rendererAdapter: {
          enum: [
            "pattern-tiled",
            "particle-field",
            "grid-noise",
            "particle-noise",
            "svg-geometric",
            "svg-spokes",
          ],
        },
        defaultConfiguration: { $ref: "#/$defs/legacyEgress" },
        operatorVisibility: { $ref: "#/$defs/state" },
        readabilityPolicy: { $ref: "#/$defs/state" },
        paletteBehavior: { $ref: "#/$defs/state" },
        operatorControls: { type: "array" },
        authorControls: { type: "array" },
        legacyIngressIds: {
          type: "array",
          items: { type: "string", minLength: 1 },
          uniqueItems: true,
        },
        discovery: { type: "object", required: ["motionClass", "tags"] },
      },
    },
    legacyIngressMatch: {
      type: "object",
      required: ["useBackground"],
      properties: {
        useBackground: { type: "string" },
        pattern: { $ref: "#/$defs/familyMatch" },
        particle: { $ref: "#/$defs/familyMatch" },
        noise: { $ref: "#/$defs/familyMatch" },
      },
      additionalProperties: false,
    },
    familyMatch: {
      type: "object",
      properties: { type: { type: "string" } },
      additionalProperties: false,
    },
    legacyIngressRow: {
      oneOf: [
        {
          type: "object",
          required: ["id", "match", "matchKind", "outcome", "presetId"],
          properties: {
            id: { type: "string", minLength: 1 },
            match: { $ref: "#/$defs/legacyIngressMatch" },
            matchKind: { enum: ["exact", "missing-type"] },
            outcome: { const: "generated" },
            presetId: { type: "string", minLength: 1 },
            note: { type: "string" },
          },
          additionalProperties: false,
        },
        {
          type: "object",
          required: ["id", "match", "matchKind", "outcome"],
          properties: {
            id: { type: "string", minLength: 1 },
            match: { $ref: "#/$defs/legacyIngressMatch" },
            matchKind: {
              enum: ["exact", "missing-family", "unknown-type", "unknown-wire"],
            },
            outcome: { enum: ["passthrough", "unsupported"] },
            note: { type: "string" },
          },
          additionalProperties: false,
        },
      ],
    },
  },
} as const;
