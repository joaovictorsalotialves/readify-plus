import { colors } from '@/styles/colors'
import { Stack } from 'expo-router'

import { GetBookCategoriesContextProvider } from '@/contexts/GetBookCategoriesContext'
import { GetWritersContextProvider } from '@/contexts/GetWritersContext'
import { RegisterContextProvider } from '@/contexts/RegisterContext'

export default function Layout() {
  const backgroundColor = colors.gray[100]

  return (
    <GetBookCategoriesContextProvider>
      <GetWritersContextProvider>
        <RegisterContextProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor,
              },
            }}
          >
            <Stack.Screen name="login/index" />
            <Stack.Screen name="password-recovery/index" />
            <Stack.Screen name="password-confirmation/index" />
            <Stack.Screen name="password-reset/index" />
            <Stack.Screen name="register-user/index" />
            <Stack.Screen name="register-preferences/index" />
          </Stack>
        </RegisterContextProvider>
      </GetWritersContextProvider>
    </GetBookCategoriesContextProvider>
  )
}
