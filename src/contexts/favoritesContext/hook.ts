import { useContext } from 'react';
import { FavoritesContext } from '.';

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error('Favorite context was used outside the FavoritesProvider');
  return context;
}
