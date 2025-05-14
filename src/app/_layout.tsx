import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
} from '@expo-google-fonts/montserrat'
import {
  Oxanium_500Medium,
  Oxanium_600SemiBold,
  Oxanium_700Bold,
  useFonts,
} from '@expo-google-fonts/oxanium'

import { Loading } from '@/components/loading'
import { AuthContextProvider } from '@/contexts/AuthContext'
import { useAuth } from '@/hooks/useAuth'
import { colors } from '@/styles/colors'
import { Stack } from 'expo-router'

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Oxanium_700Bold,
    Oxanium_600SemiBold,
    Oxanium_500Medium,
    Montserrat_400Regular,
    Montserrat_600SemiBold,
  })

  const { isLoading } = useAuth()
  const backgroundColor = colors.gray[100]

  if (!fontsLoaded || isLoading) {
    return <Loading />
  }

  return (
    <AuthContextProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor,
          },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(system)" />
      </Stack>
    </AuthContextProvider>
  )
}
