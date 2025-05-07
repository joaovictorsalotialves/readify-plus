import { Stack } from 'expo-router'

import { colors } from '@/styles/colors'

export default function Layout() {
  const backgroundColor = colors.gray[100]

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor,
        },
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(reading)" />
    </Stack>
  )
}
