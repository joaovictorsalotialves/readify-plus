import { Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { CreateBookReviewContextProvider } from '@/contexts/CreateBookReviewContext'
import { colors } from '@/styles/colors'

export default function Layout() {
  const backgroundColor = colors.gray[100]

  return (
    <CreateBookReviewContextProvider>
      <GestureHandlerRootView>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor,
            },
          }}
        >
          <Stack.Screen name="read/[bookId]" />
          <Stack.Screen name="avaliation/[bookId]" />
        </Stack>
      </GestureHandlerRootView>
    </CreateBookReviewContextProvider>
  )
}
