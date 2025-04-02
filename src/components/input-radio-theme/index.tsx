import { MaterialIcons } from '@expo/vector-icons'
import { Pressable, View } from 'react-native'

import { colors } from '@/styles/colors'
import { styles } from './styles'

type InputRadioProps = {
  options: string[]
  theme: string
  setTheme: React.Dispatch<React.SetStateAction<string>>
}

export function InputRadioTheme({ options, theme, setTheme }: InputRadioProps) {
  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <Pressable
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={index}
          onPress={() => setTheme(option)}
          style={styles.buttonRadio}
        >
          <View
            style={[
              styles.option,
              option === 'dark' ? styles.optionDark : styles.optionLight,
            ]}
          >
            {theme === option && (
              <MaterialIcons
                name="check"
                color={option === 'dark' ? colors.gray[100] : colors.gray[900]}
                size={20}
              />
            )}
          </View>
        </Pressable>
      ))}
    </View>
  )
}
