import { colors } from '@/styles/colors'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.blue,
  },
  logo: {
    height: 180,
    width: 180,
  },
})
