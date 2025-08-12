// D:/htdoc/Fixtura/Creators/RemotionV2/src/components/backgrounds/variants/Image/ImageBackground.presets.ts

/**
 * This file contains a collection of preset configurations for the ImageBackground component.
 * These presets are designed to match the data structure found in the project's test data,
 * ensuring compatibility with the `adaptImageConfig` function.
 *
 * To use a preset, you can spread it into the `image` property of your
 * template variation data.
 */

export const imageBackgroundPresets = {
  // --- Ken Burns Effect Variations ---
  kenBurns_gentle_left_vignette: {
    url: null, ratio: null, width: null, height: null, type: 'kenBurns',
    direction: 'left', overlayStyle: 'vignette', gradientType: 'linear', overlayOpacity: 0.4,
  },
  kenBurns_fast_right_solid: {
    url: null, ratio: null, width: null, height: null, type: 'kenBurns',
    direction: 'right', overlayStyle: 'solid', gradientType: 'linear', overlayOpacity: 0.2,
  },
  kenBurns_slow_up_gradient: {
    url: null, ratio: null, width: null, height: null, type: 'kenBurns',
    direction: 'up', overlayStyle: 'gradient', gradientType: 'linear', overlayOpacity: 0.5,
  },
  kenBurns_subtle_down_none: {
    url: null, ratio: null, width: null, height: null, type: 'kenBurns',
    direction: 'down', overlayStyle: 'none', gradientType: 'linear', overlayOpacity: 0,
  },
  kenBurns_moody_left_vignette: {
    url: null, ratio: null, width: null, height: null, type: 'kenBurns',
    direction: 'left', overlayStyle: 'vignette', gradientType: 'radial', overlayOpacity: 0.7,
  },

  // --- Focus/Blur Effect Variations ---
  focus_dramatic_in_solid: {
    url: null, ratio: null, width: null, height: null, type: 'focusBlur',
    direction: 'in', overlayStyle: 'solid', gradientType: 'linear', overlayOpacity: 0.3,
  },
  focus_gentle_out_none: {
    url: null, ratio: null, width: null, height: null, type: 'focusBlur',
    direction: 'out', overlayStyle: 'none', gradientType: 'linear', overlayOpacity: 0,
  },
  focus_pulse_vignette: {
    url: null, ratio: null, width: null, height: null, type: 'focusBlur',
    direction: 'pulse', overlayStyle: 'vignette', gradientType: 'radial', overlayOpacity: 0.5,
  },
  focus_quick_in_gradient: {
    url: null, ratio: null, width: null, height: null, type: 'focusBlur',
    direction: 'in', overlayStyle: 'gradient', gradientType: 'linear', overlayOpacity: 0.4,
  },
  focus_dreamy_out_radial: {
    url: null, ratio: null, width: null, height: null, type: 'focusBlur',
    direction: 'out', overlayStyle: 'gradient', gradientType: 'radial', overlayOpacity: 0.6,
  },

  // --- Breathing Effect Variations ---
  breathing_gentle_none: {
    url: null, ratio: null, width: null, height: null, type: 'breathing',
    direction: null, overlayStyle: 'none', gradientType: 'linear', overlayOpacity: 0,
  },
  breathing_strong_vignette: {
    url: null, ratio: null, width: null, height: null, type: 'breathing',
    direction: null, overlayStyle: 'vignette', gradientType: 'radial', overlayOpacity: 0.6,
  },
  breathing_fast_solid: {
    url: null, ratio: null, width: null, height: null, type: 'breathing',
    direction: null, overlayStyle: 'solid', gradientType: 'linear', overlayOpacity: 0.1,
  },
  breathing_slow_gradient: {
    url: null, ratio: null, width: null, height: null, type: 'breathing',
    direction: null, overlayStyle: 'gradient', gradientType: 'linear', overlayOpacity: 0.4,
  },
  breathing_subtle_radial: {
    url: null, ratio: null, width: null, height: null, type: 'breathing',
    direction: null, overlayStyle: 'gradient', gradientType: 'radial', overlayOpacity: 0.3,
  },

  // --- Static (None) Effect Variations ---
  static_vignette: {
    url: null, ratio: null, width: null, height: null, type: 'none',
    direction: null, overlayStyle: 'vignette', gradientType: 'radial', overlayOpacity: 0.5,
  },
  static_gradient: {
    url: null, ratio: null, width: null, height: null, type: 'none',
    direction: null, overlayStyle: 'gradient', gradientType: 'linear', overlayOpacity: 0.6,
  },
  static_solid: {
    url: null, ratio: null, width: null, height: null, type: 'none',
    direction: null, overlayStyle: 'solid', gradientType: 'linear', overlayOpacity: 0.2,
  },
  static_radial_gradient: {
    url: null, ratio: null, width: null, height: null, type: 'none',
    direction: null, overlayStyle: 'gradient', gradientType: 'radial', overlayOpacity: 0.7,
  },
  static_none: {
    url: null, ratio: null, width: null, height: null, type: 'none',
    direction: null, overlayStyle: 'none', gradientType: 'linear', overlayOpacity: 0,
  },

  // --- Zoom Effect Variations ---
  zoom_slow_in_none: {
    url: null, ratio: null, width: null, height: null, type: 'zoom',
    direction: 'in', overlayStyle: 'none', gradientType: 'linear', overlayOpacity: 0,
  },
  zoom_fast_out_vignette: {
    url: null, ratio: null, width: null, height: null, type: 'zoom',
    direction: 'out', overlayStyle: 'vignette', gradientType: 'radial', overlayOpacity: 0.4,
  },
  zoom_dramatic_in_solid: {
    url: null, ratio: null, width: null, height: null, type: 'zoom',
    direction: 'in', overlayStyle: 'solid', gradientType: 'linear', overlayOpacity: 0.3,
  },
  zoom_subtle_out_gradient: {
    url: null, ratio: null, width: null, height: null, type: 'zoom',
    direction: 'out', overlayStyle: 'gradient', gradientType: 'linear', overlayOpacity: 0.5,
  },
  zoom_in_vignette: {
    url: null, ratio: null, width: null, height: null, type: 'zoom',
    direction: 'in', overlayStyle: 'vignette', gradientType: 'radial', overlayOpacity: 0.6,
  },

  // --- Pan Effect Variations ---
  pan_slow_left_none: {
    url: null, ratio: null, width: null, height: null, type: 'pan',
    direction: 'left', overlayStyle: 'none', gradientType: 'linear', overlayOpacity: 0,
  },
  pan_fast_right_solid: {
    url: null, ratio: null, width: null, height: null, type: 'pan',
    direction: 'right', overlayStyle: 'solid', gradientType: 'linear', overlayOpacity: 0.1,
  },
  pan_up_gradient: {
    url: null, ratio: null, width: null, height: null, type: 'pan',
    direction: 'up', overlayStyle: 'gradient', gradientType: 'linear', overlayOpacity: 0.4,
  },
  pan_down_vignette: {
    url: null, ratio: null, width: null, height: null, type: 'pan',
    direction: 'down', overlayStyle: 'vignette', gradientType: 'radial', overlayOpacity: 0.5,
  },
  pan_left_solid: {
    url: null, ratio: null, width: null, height: null, type: 'pan',
    direction: 'left', overlayStyle: 'solid', gradientType: 'linear', overlayOpacity: 0.2,
  },
};

export type ImageBackgroundPresetName = keyof typeof imageBackgroundPresets;