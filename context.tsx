import React, { createContext, useContext } from 'react'
import { DropShadowContextValue, DropShadowConfigProps } from './types'
import { shadowPresets } from './config/presets'

export const DropShadowContext = createContext<DropShadowContextValue>({})

/**
 * DropShadowConfig component for providing shadow configuration
 */
export const DropShadowConfig: React.FC<DropShadowConfigProps> = ({
  children,
  states,
  transition,
  autoDetect,
  presets = {}
}) => {
  const parentContext = useContext(DropShadowContext)
  
  // Single context value - React is smart enough to handle referential equality
  const contextValue = {
    config: { states, transition, autoDetect },
    presets: { ...shadowPresets, ...parentContext.presets, ...presets }
  }

  return (
    <DropShadowContext.Provider value={contextValue}>
      {children}
    </DropShadowContext.Provider>
  )
}