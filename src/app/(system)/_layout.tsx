import { Stack } from 'expo-router'

import { colors } from '@/styles/colors'

import { CountBookReviewContextProvider } from '@/contexts/CountBookReviewContext'
import { CountBooksReadContextProvider } from '@/contexts/CountBooksReadContext'
import { GetBookContextProvider } from '@/contexts/GetBookContext'
import { GetBooksIsReadingContextProvider } from '@/contexts/GetBooksIsReadingContext'
import { SearchBooksContextProvider } from '@/contexts/SearchBooksContext'

export default function Layout() {
  const backgroundColor = colors.gray[100]

  return (
    <SearchBooksContextProvider>
      <GetBookContextProvider>
        <CountBookReviewContextProvider>
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
        </CountBookReviewContextProvider>
      </GetBookContextProvider>
    </SearchBooksContextProvider>
  )
}
