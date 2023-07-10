import { ReactNode, useEffect, useState } from 'react';
import { Game } from '../../types/Game';
import { FavoritesContext } from '.';
import { child, get, ref, remove, set } from 'firebase/database';
import { database, databaseRef } from '../../firebase';

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(function () {
    async function fetchFavoriteGames() {
      try {
        setIsLoading(true);
        setError('');
        get(child(databaseRef, 'favorites/'))
          .then((snapshot) => {
            if (snapshot.exists()) {
              setFavorites(Object.values(snapshot.val()));
            } else {
              console.log('No data available');
            }
          })
          .catch((error) => {
            console.error(error);
          });

        setIsLoading(false);
      } catch (err: unknown) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFavoriteGames();
  }, []);

  async function addFavoriteGame(game: Game) {
    set(ref(database, 'favorites/' + game.id), {
      id: game.id,
      title: game.title,
      description: game.short_description,
      genre: game.genre,
      image: game.thumbnail,
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
