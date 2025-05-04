import {View} from 'react-native'

import { KeyboardAwareContainer } from '@/components/keyboard-aware-container'
import { NavigationHeader } from '../../_components/navigation-header'
import { SearchButton } from '../../_components/search-button'
import { GridBooks } from '../../_components/grid-books'

import { systemStyles } from '../../_styles/styles'
import { styles } from './styles'

import { books } from '@/utils/mocks/books'

export default function Catalog() {
  return (
    <KeyboardAwareContainer>
    <View style={systemStyles.container}>
      <NavigationHeader />

      <View style={styles.body}>
              <SearchButton />


             {<GridBooks title="Livros" data={books} />}
      </View>


    </View>
      </KeyboardAwareContainer>
    )
}      