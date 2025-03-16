// Export the main NoiseBackground component
export { NoiseBackground } from "./NoiseBackground";

// Export the config and types
export { NoiseVariant, NOISE_VARIANTS } from "./config";

// Import and re-export the variants
import SubtleNoise from "./variants/SubtleNoise";
import GrainNoise from "./variants/GrainNoise";
import WaveNoise from "./variants/WaveNoise";
import FogNoise from "./variants/FogNoise";
import StaticNoise from "./variants/StaticNoise";

// Export all variants
export { SubtleNoise, GrainNoise, WaveNoise, FogNoise, StaticNoise };
