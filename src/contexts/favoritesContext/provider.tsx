import { ReactNode, useEffect, useState } from 'react';
import { Game } from '../../types/Game';
import { FavoritesContext } from '.';
import { child, get, ref, remove, set } from 'firebase/database';
import { database, databaseRef } from '../../firebase';
import { useAuth } from '../authContext/hook';

interface FavoritesProviderProps {
  children: ReactNode;
}

const FAVORITES_INITIAL_STATE = [] as Game[];

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Game[]>(FAVORITES_INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { user } = useAuth();

  useEffect(
    function () {
      async function fetchFavoriteGames() {
        setIsLoading(true);
        setError('');
        get(child(databaseRef, `favorites/${user?.uid}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              setFavorites(Object.values(snapshot.val()));
            } else {
              console.log('No data available');
            }
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => setIsLoading(false));
      }
      fetchFavoriteGames();
    },
    [user?.uid]
  );

  async function addFavoriteGame(game: Game) {
    set(ref(database, `favorites/${user?.uid}/${game.id}`), {
      id: game.id,
      title: game.title,
      description: game.short_description,
      genre: game.genre,
      thumbnail: game.thumbnail,
    });

    setFavorites((favorites) => [...favorites, game]);
  }

  async function removeFavoriteGame(id: number) {
    remove(ref(database, `favorites/${user?.uid}/${id}`));
    setFavorites((favorites) => favorites.filter((game) => game.id !== id));
  }

  function resetFavoriteGames() {
    setFavorites(FAVORITES_INITIAL_STATE);
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavoriteGame,
        removeFavoriteGame,
        resetFavoriteGames,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
