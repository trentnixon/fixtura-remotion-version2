export {
  findGeneratedPresetByLegacyIngressId,
  generatedCatalogue,
  getCanonicalEgress,
  isOperatorSelectable,
  operatorPresets,
  rendererAdapterRegistry,
} from "./catalogue";
export {
  buildDiscoveryContract,
  GENERATED_BACKGROUNDS_CONTRACT_VERSION,
  generatedBackgroundsDiscoveryContractSchema,
} from "./discoveryContract";
export type { GeneratedBackgroundsDiscoveryContract } from "./discoveryContract";
export {
  applyCanonicalEgress,
  generatedLegacyIngress,
  legacyIngress,
  matchLegacyIngress,
  normalizeForDisplay,
  passthroughLegacyIngress,
  preserveStickyIngress,
  unsupportedLegacyIngress,
} from "./ingress";
export type {
  DisplaySelection,
  GeneratedIngressMatch,
  LegacyIngressMatchResult,
  LegacyIngressRow,
  LegacyWireObject,
  LegacyWirePayload,
  UnsupportedIngressReason,
} from "./ingress";
export type { GeneratedPresetId } from "./catalogue";
export type {
  DevAppearanceMetadata,
  DevBackgroundWire,
  PassthroughWire,
} from "./types";
export type {
  AuthorControl,
  DiscoveryMetadata,
  GeneratedCatalogueEntry,
  LegacyEgressPayload,
  OperatorControl,
  OperatorVisibilityState,
  PaletteBehaviorState,
  ParticleWireConfig,
  PatternWireConfig,
  ReadabilityPolicyState,
  RendererAdapterKey,
} from "./types";
