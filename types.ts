import { CSSProperties, HTMLAttributes, ReactNode } from 'react'

export type ShadowSize = 'sm' | 'md' | 'lg' | 'xl'
export type ShadowColor = 'default' | 'purple' | 'blue' | 'white'
export type ElevationLevel = number
export type ShadowState = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'animating' | string

// State configuration for shadows
export interface ShadowStateConfig {
  elevation?: ElevationLevel
  color?: ShadowColor
  size?: ShadowSize
  opacity?: number
  blur?: number
  innerShadow?: boolean | string
}

// Transition configuration
export interface TransitionConfig {
  duration?: number // in ms
  ease?: string // CSS easing function
}

// Configuration for shadow states and transitions
export interface ShadowConfig {
  states: Record<ShadowState, ShadowStateConfig>
  transition?: TransitionConfig
  autoDetect?: boolean // Enable automatic hover/focus/active detection
}

// Context for DropShadowConfig
export interface DropShadowContextValue {
  config?: ShadowConfig
  presets?: Record<string, ShadowConfig>
}

// Config provider props
export interface DropShadowConfigProps extends ShadowConfig {
  children: ReactNode
  presets?: Record<string, ShadowConfig>
}

export interface DropShadowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: ReactNode
  size?: ShadowSize
  color?: ShadowColor
  elevation?: ElevationLevel
  innerShadow?: boolean
  animated?: boolean
  className?: string
  style?: CSSProperties
  // New props for state management
  config?: ShadowConfig | string // Can be a config object or preset name
  states?: Record<ShadowState, ShadowStateConfig> // Inline state definitions
  currentState?: ShadowState | 'auto' // Manual state control or auto-detection
  transition?: TransitionConfig // Custom transition for this instance
  useCssBoxShadow?: boolean // Performance option to use CSS box-shadow instead of filters
}

// Hook options
export interface UseDropShadowOptions {
  config?: ShadowConfig | string
  states?: Record<ShadowState, ShadowStateConfig>
  currentState?: ShadowState
  elevation?: ElevationLevel
  size?: ShadowSize
  color?: ShadowColor
}

// Shadow generation result
export interface GeneratedShadow {
  filter: string
  animatedFilter: string
}