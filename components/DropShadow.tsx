import React, { CSSProperties, useContext, useMemo, useState } from 'react'
import { DropShadowProps } from '../types'
import { DropShadowContext } from '../context'
import { useDropShadow } from '../hooks/useDropShadow'
import { shadowConfigs } from '../config/shadowConfigs'
import { generateCssBoxShadow } from '../utils/shadowGenerator'

/**
 * DropShadow component that wraps elements with customizable drop shadows
 * Uses filter: drop-shadow() for backdrop-blur compatibility and layered effects
 * 
 * @example
 * // Using elevation system (recommended)
 * <DropShadow elevation={4}>
 *   <div>Content with elevation-based layered shadow</div>
 * </DropShadow>
 * 
 * @example
 * // Legacy size-based shadows
 * <DropShadow size="lg" innerShadow>
 *   <div>Content with large shadow and inner shadow</div>
 * </DropShadow>
 * 
 * @example
 * // Colored shadows with animation
 * <DropShadow size="md" color="purple" animated>
 *   <button>Purple shadow button that enhances on hover</button>
 * </DropShadow>
 * 
 * @example
 * // High elevation for modals/overlays
 * <DropShadow elevation={12} animated>
 *   <div>Modal with dramatic shadow</div>
 * </DropShadow>
 */
const DropShadowComponent: React.FC<DropShadowProps> = ({
  children,
  size = 'md',
  color = 'default',
  elevation,
  innerShadow = false,
  animated = false, // eslint-disable-line @typescript-eslint/no-unused-vars
  className = '',
  style = {},
  config,
  states,
  currentState = 'auto',
  transition,
  useCssBoxShadow = false,
  ...props
}) => {
  const context = useContext(DropShadowContext)
  const [isHovered, setIsHovered] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  
  // Resolve configuration
  const resolvedConfig = useMemo(() => {
    if (typeof config === 'string') {
      return context.presets?.[config] || context.config
    }
    return config || context.config
  }, [config, context])
  
  // Determine if we should auto-detect states
  const shouldAutoDetect = resolvedConfig?.autoDetect ?? true
  
  // Auto-detect current state
  const autoState = useMemo(() => {
    if (!shouldAutoDetect || currentState !== 'auto') return 'default'
    if (isActive) return 'active'
    if (isHovered) return 'hover'
    if (isFocused) return 'focus'
    return 'default'
  }, [shouldAutoDetect, currentState, isActive, isHovered, isFocused])
  
  const { shadowStyle } = useDropShadow({
    config: resolvedConfig,
    states,
    currentState: currentState === 'auto' ? autoState : currentState,
    elevation,
    size,
    color
  })
  
  // Determine transition config - memoized
  const transitionConfig = useMemo(() => 
    transition || resolvedConfig?.transition || context.config?.transition || {
      duration: 300,
      ease: 'ease-out'
    }, [transition, resolvedConfig?.transition, context.config?.transition]
  )
  
  // Calculate base style including any inner shadow from props - memoized
  const baseInnerShadow = useMemo(() => 
    innerShadow ? shadowConfigs.innerShadows[size] : undefined, 
    [innerShadow, size]
  )
  
  const baseStyle: CSSProperties = useMemo(() => {
    // Use CSS box-shadow for better performance when specified
    if (useCssBoxShadow && elevation !== undefined) {
      return {
        boxShadow: generateCssBoxShadow(elevation),
        transition: `box-shadow ${transitionConfig.duration}ms ${transitionConfig.ease}`,
        ...style,
      }
    }
    
    // Default filter-based shadows
    return {
      ...shadowStyle,
      boxShadow: shadowStyle.boxShadow || baseInnerShadow,
      transition: `filter ${transitionConfig.duration}ms ${transitionConfig.ease}, box-shadow ${transitionConfig.duration}ms ${transitionConfig.ease}`,
      ...style,
    }
  }, [shadowStyle, baseInnerShadow, transitionConfig, style, useCssBoxShadow, elevation])
  
  // Determine if we need event handlers
  const needsInteractivity = shouldAutoDetect && currentState === 'auto'
  
  // Handle non-interactive case (better performance)
  if (!needsInteractivity) {
    return (
      <div className={className} style={baseStyle} {...props}>
        {children}
      </div>
    )
  }
  
  // Interactive case with event handlers
  return (
    <div
      className={className}
      style={baseStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsActive(false) }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    >
      {children}
    </div>
  )
}

// Memoize the component to prevent unnecessary re-renders
export const DropShadow = React.memo(DropShadowComponent)