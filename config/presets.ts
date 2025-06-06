import { ShadowConfig } from '../types'

// Default shadow presets
export const shadowPresets: Record<string, ShadowConfig> = {
  card: {
    states: {
      default: { elevation: 2 },
      hover: { elevation: 4 },
      active: { elevation: 1 },
      disabled: { elevation: 0, opacity: 0.5 }
    },
    transition: { duration: 200, ease: 'ease-out' },
    autoDetect: true
  },
  button: {
    states: {
      default: { elevation: 1 },
      hover: { elevation: 3 },
      active: { elevation: 0 },
      focus: { elevation: 2, color: 'blue' },
      disabled: { elevation: 0, opacity: 0.3 }
    },
    transition: { duration: 150, ease: 'ease-out' },
    autoDetect: true
  },
  modal: {
    states: {
      default: { elevation: 12 },
      entering: { elevation: 8 },
      exiting: { elevation: 16 }
    },
    transition: { duration: 300, ease: 'ease-in-out' }
  },
  floating: {
    states: {
      default: { elevation: 6 },
      hover: { elevation: 8 },
      animating: { elevation: 10, blur: 1.2 }
    },
    transition: { duration: 250, ease: 'ease-out' },
    autoDetect: true
  }
}