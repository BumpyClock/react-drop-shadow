import { GeneratedShadow } from '../types'

// Simple memoization cache for generated shadows
const shadowCache = new Map<string, GeneratedShadow>()

/**
 * Generates a performant CSS box-shadow for initial render
 */
export function generateCssBoxShadow(elevation: number): string {
  if (elevation === 0) return 'none'
  
  // Single optimized box-shadow for performance
  const yOffset = Math.round(elevation * 0.5)
  const blur = Math.round(elevation * 1.5)
  const spread = Math.round(elevation * -0.1)
  const opacity = 0.15 - (elevation * 0.003)
  
  return `0 ${yOffset}px ${blur}px ${spread}px rgba(0, 0, 0, ${opacity})`
}

/**
 * Generates elevation-based layered drop-shadow filters programmatically
 * following Josh Comeau's design principles
 */
export function generateElevationShadow(elevation: number, blur: number = 1): GeneratedShadow {
  // Return cached result if available
  const cacheKey = `${elevation}-${blur}`
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
  
  // Optimized shadow generation with balanced quality
  for (let i = 0; i < maxLayers; i++) {
    const progress = i / (maxLayers - 1)
    
    // Progressive shadow distribution for natural depth
    const yOffset = Math.round(elevation * (0.15 + progress * 0.85))
    const blurRadius = Math.round(elevation * blur * (0.3 + progress * 1.2))
    const opacity = 0.14 - (progress * 0.09)
    
    baseDropShadows.push(
      `drop-shadow(0 ${yOffset}px ${blurRadius}px rgba(0, 0, 0, ${opacity}))`
    )
  }
  
  // Animated shadows: use fewer layers for performance
  if (maxLayers <= 2) {
    animatedDropShadows.push(...baseDropShadows.map((shadow, i) => {
      const factor = 1.2 + i * 0.1
      return shadow.replace(/(\d+)px/g, (match, num) => `${Math.round(parseInt(num) * factor)}px`)
    }))
  } else {
    // For higher layer counts, use simplified animated shadow
    animatedDropShadows.push(
      `drop-shadow(0 ${Math.round(elevation * 0.6)}px ${Math.round(elevation * blur * 1.3)}px rgba(0, 0, 0, 0.16))`,
      `drop-shadow(0 ${Math.round(elevation * 1.2)}px ${Math.round(elevation * blur * 2)}px rgba(0, 0, 0, 0.08))`
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