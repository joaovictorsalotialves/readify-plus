import React from 'react'
import { Text } from 'react-native'

const MockIcon = (props) => {
  return <Text>{props.name || 'icon'}</Text>
}

export const createIconSet = () => MockIcon
export const createIconSetFromFontello = () => MockIcon
export const createIconSetFromIcoMoon = () => MockIcon
export const MaterialIcons = MockIcon
export const Ionicons = MockIcon
// exporte outros ícones conforme necessário
