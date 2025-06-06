import React, { CSSProperties, ReactNode } from 'react'
import { m, HTMLMotionProps } from 'motion/react'

type ShadowSize = 'sm' | 'md' | 'lg' | 'xl'
type ShadowColor = 'default' | 'purple' | 'blue' | 'white'

export interface DropShadowProps extends Omit<HTMLMotionProps<"div">, 'children'> {
  children: ReactNode
  size?: ShadowSize
  color?: ShadowColor
  innerShadow?: boolean
  animated?: boolean
  className?: string
  style?: CSSProperties
}

const shadowConfigs = {
  // Size configurations
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
  // Color variations
  colors: {
    default: {
      filter: '', // Uses size-based shadows
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
  // Inner shadow configurations
  innerShadows: {
    sm: 'inset 0 1px 0 rgba(255, 255, 255, 0.5)',
    md: 'inset 0 1px 2px rgba(0, 0, 0, 0.05)',
    lg: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
    xl: 'inset 0 3px 6px rgba(0, 0, 0, 0.08)',
  },
}

/**
 * DropShadow component that wraps elements with customizable drop shadows
 * 
 * @example
 * <DropShadow size="lg" innerShadow>
 *   <div>Content with large shadow and inner shadow</div>
 * </DropShadow>
 * 
 * @example
 * <DropShadow size="md" color="purple" animated>
 *   <button>Purple shadow button that enhances on hover</button>
 * </DropShadow>
 */
export const DropShadow: React.FC<DropShadowProps> = ({
  children,
  size = 'md',
  color = 'default',
  innerShadow = false,
  animated = false,
  className = '',
  style = {},
  ...motionProps
}) => {
  const sizeConfig = shadowConfigs.sizes[size]
  const colorConfig = shadowConfigs.colors[color]
  
  // Determine which filter to use
  const baseFilter = color !== 'default' ? colorConfig.filter : sizeConfig.filter
  const animatedFilter = color !== 'default' 
    ? colorConfig.filter 
    : sizeConfig.animatedFilter
  
  // Get inner shadow if requested
  const boxShadow = innerShadow ? shadowConfigs.innerShadows[size] : undefined
  
  const baseStyle: CSSProperties = {
    filter: baseFilter,
    boxShadow,
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
  return (
    <m.div
      className={className}
      style={baseStyle}
      whileHover={{
        filter: animatedFilter,
        scale: 1.02,
      }}
      transition={{
        filter: { duration: 0.3, ease: 'easeOut' },
        scale: { duration: 0.2, ease: 'easeOut' },
      }}
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