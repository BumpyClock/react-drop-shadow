import React from 'react'
import { DropShadow } from './DropShadow'
import { DropShadowProps } from '../types'

// Export basic presets for common use cases
export const CardShadow: React.FC<Omit<DropShadowProps, 'size'>> = (props) => (
  <DropShadow size="md" {...props} />
)

export const ButtonShadow: React.FC<Omit<DropShadowProps, 'size' | 'animated'>> = (props) => (
  <DropShadow size="sm" animated {...props} />
)