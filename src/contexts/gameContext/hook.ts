import { useContext } from 'react';
import { GamesContext } from '.';

export function useGames() {
  const context = useContext(GamesContext);
  if (!context)
    throw new Error('Games context was used outside the GamesProvider');
  return context;
}
