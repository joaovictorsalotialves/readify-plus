import { Stack } from 'expo-router'

import { colors } from '@/styles/colors'

import { CountBookReviewContextProvider } from '@/contexts/CountBookReviewContext'
import { CountBooksReadContextProvider } from '@/contexts/CountBooksReadContext'
import { GetBookContextProvider } from '@/contexts/GetBookContext'
import { GetBookReviewsOfBookContextProvider } from '@/contexts/GetBookReviewsOfBookContext'
import { GetBooksIsReadingContextProvider } from '@/contexts/GetBooksIsReadingContext'
import { GetBooksReadedContextProvider } from '@/contexts/GetBooksReadedContext'
import { GetFavoriteBooksContextProvider } from '@/contexts/GetFavoriteBooksContext'
import { GetMostPopularBooksContextProvider } from '@/contexts/GetMostPopularBooksContext'
import { GetRecommendBooksContextProvider } from '@/contexts/GetRecommedBooksContext'
import { GetSimilarBooksContextProvider } from '@/contexts/GetSimilarBooksContext'
import { ReadingContextProvider } from '@/contexts/ReadingContext'
import { SearchBooksContextProvider } from '@/contexts/SearchBooksContext'

export default function Layout() {
  const backgroundColor = colors.gray[100]

  return (
    <GetBookReviewsOfBookContextProvider>
      <GetSimilarBooksContextProvider>
        <ReadingContextProvider>
          <GetMostPopularBooksContextProvider>
            <GetFavoriteBooksContextProvider>
              <GetRecommendBooksContextProvider>
                <GetBooksReadedContextProvider>
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
                </GetBooksReadedContextProvider>
              </GetRecommendBooksContextProvider>
            </GetFavoriteBooksContextProvider>
          </GetMostPopularBooksContextProvider>
        </ReadingContextProvider>
      </GetSimilarBooksContextProvider>
    </GetBookReviewsOfBookContextProvider>
  )
}
