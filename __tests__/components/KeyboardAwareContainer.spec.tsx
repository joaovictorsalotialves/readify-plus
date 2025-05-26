import { KeyboardAwareContainer } from '@/components/keyboard-aware-container'
import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import { Keyboard, Text } from 'react-native'

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios',
}))

describe('KeyboardAwareContainer', () => {
  it('should render children properly', () => {
    const { getByText } = render(
      <KeyboardAwareContainer>
        <Text>Test Content</Text>
      </KeyboardAwareContainer>
    )

    expect(getByText('Test Content')).toBeTruthy()
  })

  it('should dismiss keyboard when touched outside', () => {
    const dismissSpy = jest.spyOn(Keyboard, 'dismiss')

    const { getByTestId } = render(
      <KeyboardAwareContainer>
        <Text>Dismiss Keyboard</Text>
      </KeyboardAwareContainer>
    )

    fireEvent.press(getByTestId('TouchableWithoutFeedback'))
    expect(dismissSpy).toHaveBeenCalled()
  })
})
