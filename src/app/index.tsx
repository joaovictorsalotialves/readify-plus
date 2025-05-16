import { Redirect } from 'expo-router'

import { Loading } from '@/components/loading'
import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'

export default function Index() {
  const { user, auth, isLoading } = useAuth()

  useEffect(() => {
    auth()
  })

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
