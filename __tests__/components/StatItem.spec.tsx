import { StatItem } from '@/components/stat-item'
import { render } from '@testing-library/react-native'
import React from 'react'

describe('StatItem', () => {
  it('should render the label and value correctly', () => {
    const { getByText } = render(<StatItem label="Books Read" value={42} />)

    const label = getByText('Books Read')
    const value = getByText('42')

    expect(label).toBeTruthy()
    expect(value).toBeTruthy()
  })
})
