import { ResourceHeader } from '@/components/resource-header'
import { fireEvent, render } from '@testing-library/react-native'
import { router } from 'expo-router'

jest.mock('expo-router', () => ({
  router: {
    back: jest.fn(),
  },
}))

jest.mock('@expo/vector-icons', () => {
  const React = require('react')
  const { Text } = require('react-native')

  return {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    MaterialIcons: (props: any) => <Text {...props}>{props.name}</Text>,
  }
})

describe('ResourceHeader', () => {
  it('should render the icon and title correctly', () => {
    const { getByText, getByTestId } = render(
      <ResourceHeader title="Details" icon="arrow-back" />
    )

    const title = getByText('Details')
    const button = getByTestId('back-button')

    expect(title).toBeTruthy()
    expect(button).toBeTruthy()
  })

  it('should call router.back when icon is pressed', () => {
    const { getByTestId } = render(
      <ResourceHeader title="Details" icon="arrow-back" />
    )

    const button = getByTestId('back-button')
    fireEvent.press(button)

    expect(router.back).toHaveBeenCalled()
  })
})
