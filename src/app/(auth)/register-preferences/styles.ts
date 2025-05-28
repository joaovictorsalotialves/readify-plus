import { fonts } from '@/styles/fonts'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  subtitle: { ...fonts.heading.lg, marginBottom: 20 },
  context: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
})

export { styles }
