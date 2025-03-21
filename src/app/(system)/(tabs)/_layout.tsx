import { MaterialIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

import { colors } from '@/styles/colors'

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.gray[200],
          height: 60,
        },
        tabBarActiveTintColor: colors.blue,
        tabBarInactiveTintColor: colors.gray[400],
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
          title: 'Home',
        }}
      />
    </Tabs>
  )
}
