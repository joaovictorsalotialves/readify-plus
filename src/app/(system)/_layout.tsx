import { colors } from '@/styles/colors'
import { Stack } from 'expo-router'

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
      <Stack.Screen name="home/index" />
    </Stack>
  )
}
