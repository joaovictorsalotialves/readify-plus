import { ScrollView, View } from 'react-native'

import { Card } from '../../_components/card'
import { FeaturedBooks } from '../../_components/featured-books'
import { NavigationHeader } from '../../_components/navigation-header'

import { systemStyles } from '../../_styles/styles'
import { styles } from './styles'

import { books } from '@/utils/mocks/books'

export default function Home() {
  return (
    <View style={systemStyles.container}>
      <NavigationHeader />

      <View style={styles.body}>
        <View style={styles.context}>
          <Card info="20" label="Quantidade de livros lidas em 2025" />
          <Card info="12" label="Quantidade de comentários em 2025" />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.contextGallery}>
            <FeaturedBooks title="Continuar lendo" data={books.slice(0, 3)} />
            <FeaturedBooks title="Sugestões de leitura" data={books} />
            <FeaturedBooks title="Lançamentos" data={books} />
          </View>
        </ScrollView>
      </View>
    </View>
  )
}
