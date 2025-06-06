import { useState, useContext, useMemo } from 'react'
import { DropShadowContext } from '../context'
import { UseDropShadowOptions, ShadowState, ShadowSize, ShadowColor } from '../types'
import { generateElevationShadow } from '../utils/shadowGenerator'
import { shadowConfigs } from '../config/shadowConfigs'

/**
 * Hook to get shadow styles based on configuration
 */
export const useDropShadow = (options: UseDropShadowOptions = {}) => {
  const context = useContext(DropShadowContext)
  const [detectedState, setDetectedState] = useState<ShadowState>('default')
  
  // Single memo for resolved config and merged states
  const { mergedStates } = useMemo(() => {
    // Resolve config
    const config = typeof options.config === 'string' && context.presets?.[options.config]
      ? context.presets[options.config]
      : options.config
    
    // Merge states
    const states = {
      ...context.config?.states,
      ...(typeof config === 'object' ? config?.states : undefined),
      ...options.states
    }
    
    return { mergedStates: states }
  }, [options.config, options.states, context.presets, context.config?.states])
  
  // Determine current state
  const currentState = options.currentState === 'auto' ? detectedState : (options.currentState || 'default')
  const stateConfig = mergedStates[currentState] || {}
  
  // Single memo for all shadow calculations
  const shadowStyle = useMemo(() => {
    // Extract final values
    const elevation = stateConfig.elevation ?? options.elevation
    const color = stateConfig.color ?? options.color ?? 'default'
    const size = stateConfig.size ?? options.size ?? 'md'
    const blur = stateConfig.blur ?? 1
    const opacity = stateConfig.opacity ?? 1
    const innerShadow = stateConfig.innerShadow
    
    // Calculate filter
    let filter: string
    if (elevation !== undefined) {
      const elevationConfig = generateElevationShadow(elevation, blur)
      filter = elevationConfig.filter
    } else if (color !== 'default') {
      filter = shadowConfigs.colors[color as ShadowColor].filter
    } else {
      filter = shadowConfigs.sizes[size as ShadowSize].filter
    }
    
    // Calculate inner box shadow
    let boxShadow: string | undefined
    if (innerShadow) {
      boxShadow = typeof innerShadow === 'string' 
        ? innerShadow 
        : shadowConfigs.innerShadows[size as ShadowSize]
    }
    
    // Apply opacity if needed
    if (opacity < 1) {
      filter = `${filter} opacity(${opacity})`
    }
    
    return { filter, boxShadow }
  }, [stateConfig, options.elevation, options.color, options.size])
  
  return {
    shadowStyle,
    currentState,
    setDetectedState,
    states: mergedStates
  }
}