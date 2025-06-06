export const shadowConfigs = {
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