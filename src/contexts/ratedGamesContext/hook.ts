import { useContext } from 'react';
import { FavoritesContext } from '.';

export function useRatedGames() {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error(
      'RatedGames context was used outside the RatedGamesProvider'
    );
  return context;
}
