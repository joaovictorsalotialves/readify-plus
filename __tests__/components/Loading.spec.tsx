import { render } from '@testing-library/react-native'
import React from 'react'
import { ActivityIndicator, Image } from 'react-native'

import { Loading } from '@/components/loading'
import { colors } from '@/styles/colors'

describe('Loading', () => {
  it('should render the logo and activity indicator', () => {
    const { getByTestId, getByRole, UNSAFE_getByType } = render(<Loading />)

    // Verifica o container
    const container = getByTestId('loading-indicator')
    expect(container).toBeTruthy()

    // Verifica o ActivityIndicator
    const indicator = UNSAFE_getByType(ActivityIndicator)
    expect(indicator.props.size).toBe('large')
    expect(indicator.props.color).toBe(colors.gray[100])

    // Verifica a imagem
    const image = UNSAFE_getByType(Image)
    expect(image.props.source).toEqual(require('@/assets/logo_small.png'))
  })
})
