import React, { CSSProperties, ReactNode } from 'react'
import { m, HTMLMotionProps } from 'motion/react'

type ShadowSize = 'sm' | 'md' | 'lg' | 'xl'
type ShadowColor = 'default' | 'purple' | 'blue' | 'white'
type ElevationLevel = number

export interface DropShadowProps extends Omit<HTMLMotionProps<"div">, 'children'> {
  children: ReactNode
  size?: ShadowSize
  color?: ShadowColor
  elevation?: ElevationLevel
  innerShadow?: boolean
  animated?: boolean
  className?: string
  style?: CSSProperties
}

// Memoization cache for generated shadows
const shadowCache = new Map<string, { filter: string; animatedFilter: string }>()

/**
 * Generates elevation-based layered drop-shadow filters programmatically
 * following Josh Comeau's design principles
 */
function generateElevationShadow(elevation: number): { filter: string; animatedFilter: string } {
  // Return cached result if available
  const cacheKey = `${elevation}`
  const cached = shadowCache.get(cacheKey)
  if (cached) return cached
  
  // Handle zero elevation
  if (elevation === 0) {
    const result = { filter: 'none', animatedFilter: 'none' }
    shadowCache.set(cacheKey, result)
    return result
  }
  
  // Calculate number of shadow layers based on elevation
  // More elevation = more layers for smoother effect
  const maxLayers = Math.min(6, Math.max(2, Math.floor(elevation / 2) + 1))
  
  const baseDropShadows: string[] = []
  const animatedDropShadows: string[] = []
  
  // Generate layered shadows with exponential sizing
  for (let i = 0; i < maxLayers; i++) {
    // Exponential progression: 1px, 2px, 4px, 8px, 16px, 32px
    const layerSize = Math.pow(2, i)
    
    // Scale based on elevation level
    const yOffset = Math.round(layerSize * (elevation / 4))
    const blurRadius = Math.round(layerSize * (elevation / 3))
    
    // Base opacity decreases with elevation for subtlety
    const baseOpacity = Math.max(0.03, 0.075 - (elevation * 0.002))
    const animatedOpacity = Math.max(0.05, 0.1 - (elevation * 0.002))
    
    // Ensure minimum values for visibility
    const finalYOffset = Math.max(1, yOffset)
    const finalBlurRadius = Math.max(layerSize, blurRadius)
    
    // Drop shadow filter format for layered shadows
    baseDropShadows.push(
      `drop-shadow(0 ${finalYOffset}px ${finalBlurRadius}px hsl(0deg 0% 0% / ${baseOpacity}))`
    )
    
    animatedDropShadows.push(
      `drop-shadow(0 ${Math.round(finalYOffset * 1.5)}px ${Math.round(finalBlurRadius * 1.2)}px hsl(0deg 0% 0% / ${animatedOpacity}))`
    )
  }
  
  const result = {
    filter: baseDropShadows.join(' '),
    animatedFilter: animatedDropShadows.join(' ')
  }
  
  // Cache the result
  shadowCache.set(cacheKey, result)
  return result
}

const shadowConfigs = {
  // Legacy size configurations (using filter: drop-shadow)
  sizes: {
    sm: {
      filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.05))',
      animatedFilter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.08))',
    },
    md: {
      filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.07)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.06))',
      animatedFilter: 'drop-shadow(0 6px 8px rgba(0, 0, 0, 0.1)) drop-shadow(0 3px 5px rgba(0, 0, 0, 0.08))',
    },
    lg: {
      filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.1)) drop-shadow(0 4px 6px rgba(0, 0, 0, 0.05))',
      animatedFilter: 'drop-shadow(0 12px 20px rgba(0, 0, 0, 0.15)) drop-shadow(0 6px 8px rgba(0, 0, 0, 0.08))',
    },
    xl: {
      filter: 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.1)) drop-shadow(0 10px 10px rgba(0, 0, 0, 0.04))',
      animatedFilter: 'drop-shadow(0 25px 30px rgba(0, 0, 0, 0.15)) drop-shadow(0 12px 12px rgba(0, 0, 0, 0.06))',
    },
  },
  // Color variations with elevation support
  colors: {
    default: {
      filter: '', // Uses elevation or size-based shadows
    },
    purple: {
      filter: 'drop-shadow(0 10px 15px rgba(147, 51, 234, 0.25)) drop-shadow(0 4px 6px rgba(147, 51, 234, 0.1))',
    },
    blue: {
      filter: 'drop-shadow(0 10px 15px rgba(59, 130, 246, 0.25)) drop-shadow(0 4px 6px rgba(59, 130, 246, 0.1))',
    },
    white: {
      filter: 'drop-shadow(0 0 0 2px rgba(255, 255, 255, 0.8))',
    },
  },
  // Inner shadow configurations (uses box-shadow for inner effects)
  innerShadows: {
    sm: 'inset 0 1px 0 rgba(255, 255, 255, 0.5)',
    md: 'inset 0 1px 2px rgba(0, 0, 0, 0.05)',
    lg: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
    xl: 'inset 0 3px 6px rgba(0, 0, 0, 0.08)',
  },
}

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
export const DropShadow: React.FC<DropShadowProps> = ({
  children,
  size = 'md',
  color = 'default',
  elevation,
  innerShadow = false,
  animated = false,
  className = '',
  style = {},
  ...motionProps
}) => {
  // Priority: elevation > color > size
  const useElevation = elevation !== undefined
  const useColorShadow = !useElevation && color !== 'default'
  
  let baseFilter: string
  let animatedFilter: string
  
  if (useElevation) {
    // Use programmatically generated elevation-based filter shadows
    const elevationConfig = generateElevationShadow(elevation)
    baseFilter = elevationConfig.filter
    animatedFilter = elevationConfig.animatedFilter
  } else if (useColorShadow) {
    // Use colored shadows (filter)
    const colorConfig = shadowConfigs.colors[color]
    baseFilter = colorConfig.filter
    animatedFilter = colorConfig.filter
  } else {
    // Use legacy size-based shadows (filter)
    const sizeConfig = shadowConfigs.sizes[size]
    baseFilter = sizeConfig.filter
    animatedFilter = sizeConfig.animatedFilter
  }
  
  // Get inner shadow if requested (uses box-shadow for inner effects)
  const innerBoxShadow = innerShadow ? shadowConfigs.innerShadows[size] : undefined
  
  const baseStyle: CSSProperties = {
    filter: baseFilter,
    boxShadow: innerBoxShadow,
    ...style,
  }
  
  // If not animated, return a simple div
  if (!animated) {
    return (
      <div className={className} style={baseStyle}>
        {children}
      </div>
    )
  }
  
  // Return an animated motion div
  const hoverStyle = {
    filter: animatedFilter,
    scale: 1.02,
  }
  
  const transitionConfig = {
    filter: { duration: 0.3, ease: 'easeOut' },
    scale: { duration: 0.2, ease: 'easeOut' },
  }
  
  return (
    <m.div
      className={className}
      style={baseStyle}
      whileHover={hoverStyle}
      transition={transitionConfig}
      {...motionProps}
    >
      {children}
    </m.div>
  )
}

// Export specific presets for common use cases
export const FloatingNavShadow: React.FC<Omit<DropShadowProps, 'size' | 'innerShadow'>> = (props) => (
  <DropShadow size="lg" innerShadow {...props} />
)

export const CardShadow: React.FC<Omit<DropShadowProps, 'size'>> = (props) => (
  <DropShadow size="md" {...props} />
)

export const ButtonShadow: React.FC<Omit<DropShadowProps, 'size' | 'animated'>> = (props) => (
  <DropShadow size="sm" animated {...props} />
)

export const PipShadow: React.FC<Omit<DropShadowProps, 'size' | 'innerShadow'>> = (props) => (
  <DropShadow size="sm" innerShadow {...props} />
)

// Helper function to combine multiple filter values
export const combineFilters = (...filters: string[]): string => {
  return filters.filter(Boolean).join(' ')
}

export default DropShadow