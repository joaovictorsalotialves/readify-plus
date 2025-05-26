import { Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { colors } from '@/styles/colors'

export default function Layout() {
  const backgroundColor = colors.gray[100]

  return (
    <GestureHandlerRootView>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor,
          },
        }}
      >
        <Stack.Screen name="read/[id]" />
      </Stack>
    </GestureHandlerRootView>
  )
}
