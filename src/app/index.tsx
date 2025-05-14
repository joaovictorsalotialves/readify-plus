import { Redirect } from 'expo-router'

import { Loading } from '@/components/loading'
import { useAuth } from '@/hooks/useAuth'

export default function Index() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      {!user ? (
        <Redirect href="/(auth)/login" />
      ) : (
        <Redirect href="/(system)/(tabs)/home" />
      )}
    </>
  )
}
