import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import { styles } from './styles'

type Props = {
  children: React.ReactNode
}

export function KeyboardAwareContainer({ children }: Props) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        testID="TouchableWithoutFeedback"
      >
        <ScrollView
          contentContainerStyle={styles.context}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>{children}</View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
