import { Redirect } from 'expo-router'

import { Loading } from '@/components/loading'
import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'

export default function Index() {
  const { user, auth, isLoading } = useAuth()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    auth()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  if (!user) {
    return <Redirect href="/(auth)/login" />
  }

  return <Redirect href="/(system)/(tabs)/home" />
}
