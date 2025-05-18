import { Stack } from 'expo-router'

import { colors } from '@/styles/colors'

import { CountBooksReadContextProvider } from '@/contexts/CountBooksReadContext'
import { GetBooksIsReadingContextProvider } from '@/contexts/GetBooksIsReadingContext'

export default function Layout() {
  const backgroundColor = colors.gray[100]

  return (
    <CountBooksReadContextProvider>
      <GetBooksIsReadingContextProvider>
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
      </GetBooksIsReadingContextProvider>
    </CountBooksReadContextProvider>
  )
}
