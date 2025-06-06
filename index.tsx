// Main component export
export { DropShadow as default } from './components/DropShadow'
export { DropShadow } from './components/DropShadow'

// Context and config
export { DropShadowConfig } from './context'

// Hooks
export { useDropShadow } from './hooks/useDropShadow'

// Presets
export { CardShadow, ButtonShadow } from './components/presets'
export { shadowPresets } from './config/presets'


// Type exports
export type {
  DropShadowProps,
  DropShadowConfigProps,
  ShadowConfig,
  ShadowStateConfig,
  TransitionConfig,
  ShadowSize,
  ShadowColor,
  ShadowState,
  ElevationLevel
} from './types'