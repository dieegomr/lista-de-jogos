import { ReactNode, useState } from 'react';
import { Game } from '../../types/Game';
import { FavoritesContext } from '.';
import { ref, remove, set } from 'firebase/database';
import { database } from '../../firebase';

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Game[]>([]);

  async function addFavoriteGame(game: Game) {
    set(ref(database, 'favorites/' + game.id), {
      id: game.id,
      title: game.title,
      description: game.short_description,
      genre: game.genre,
    });

    setFavorites((favorites) => [...favorites, game]);
  }

  async function removeFavoriteGame(id: number) {
    remove(ref(database, 'favorites/' + id));
    setFavorites((favorites) => favorites.filter((game) => game.id !== id));
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavoriteGame, removeFavoriteGame }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
