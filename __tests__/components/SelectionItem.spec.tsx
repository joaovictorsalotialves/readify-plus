import { SelectionItem } from '@/components/selection-item'
import { colors } from '@/styles/colors'
import { render } from '@testing-library/react-native'
import { StyleSheet } from 'react-native'

const mockOnSelect = jest.fn()

describe('SelectionItem', () => {
  it('should apply selected item styles correctly', () => {
    const { getByTestId, getByText } = render(
      <SelectionItem
        label="Selected"
        onSelect={mockOnSelect}
        isSelected={true}
      />
    )

    const button = getByTestId('selection-item-Selected')
    const text = getByText('Selected')

    const buttonStyle = StyleSheet.flatten(button.props.style)
    const textStyle = StyleSheet.flatten(text.props.style)

    expect(buttonStyle.backgroundColor).toBe(colors.blue)
    expect(textStyle.color).toBe(colors.gray[100])
  })

  it('should apply unselected item styles correctly', () => {
    const { getByTestId, getByText } = render(
      <SelectionItem
        label="Not selected"
        onSelect={mockOnSelect}
        isSelected={false}
      />
    )

    const button = getByTestId('selection-item-Not selected')
    const text = getByText('Not selected')

    const buttonStyle = StyleSheet.flatten(button.props.style)
    const textStyle = StyleSheet.flatten(text.props.style)

    expect(buttonStyle.backgroundColor).toBe(colors.gray[100])
    expect(textStyle.color).toBe(colors.blue)
  })
})
