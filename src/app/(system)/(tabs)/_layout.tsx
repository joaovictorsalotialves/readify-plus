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

      <Tabs.Screen
        name="bookshelf/index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="menu-book" size={size} color={color} />
          ),
          title: 'Minha Estante',
        }}
      />

      <Tabs.Screen
        name="detailsbook/[id]"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="search/index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="search" size={size} color={color} />
          ),
          title: 'Pesquisa',
        }}
      />
    </Tabs>
  )
}
