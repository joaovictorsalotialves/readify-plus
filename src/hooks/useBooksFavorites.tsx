import { useContext } from 'react'
import { GetFavoriteBooksContext } from '@/contexts/GetFavoriteBooksContext'

export function useBooksFavorites() {
  return useContext(GetFavoriteBooksContext)
}
