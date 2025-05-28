import { GetBookCategoriesContext } from '@/contexts/GetBookCategoriesContext'
import { useContext } from 'react'

export function useBookCategories() {
  const context = useContext(GetBookCategoriesContext)

  return context
}
