import { ReactNode, useEffect, useState } from 'react';
import { FavoritesContext } from '.';
import { child, get, ref, remove, set } from 'firebase/database';
import { database, databaseRef } from '../../firebase';
import { useAuth } from '../authContext/hook';

interface FavoritesProviderProps {
  children: ReactNode;
}

const FAVORITES_INITIAL_STATE = [] as number[];

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<number[]>(FAVORITES_INITIAL_STATE);
  const [error, setError] = useState('');

  const { user, isAuthenticated } = useAuth();

  useEffect(
    function () {
      async function fetchFavoriteGames() {
        get(child(databaseRef, `favorites/${user?.uid}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              setFavorites(Object.values(snapshot.val()));
            } else {
              console.log('No data available');
            }
          })
          .catch((error) => {
            setError('Algo inesperado ocorreu');
            console.error(error);
          });
      }
      if (isAuthenticated) fetchFavoriteGames();
    },
    [isAuthenticated, user?.uid]
  );

  async function addFavoriteGame(gameId: number) {
    set(ref(database, `favorites/${user?.uid}/${gameId}`), {
      gameId: gameId,
    });

    setFavorites((favorites) => [...favorites, gameId]);
  }

  async function removeFavoriteGame(id: number) {
    remove(ref(database, `favorites/${user?.uid}/${id}`));
    setFavorites((favorites) =>
      favorites.filter((favoriteGameId) => favoriteGameId !== id)
    );
  }

  function resetFavoriteGames() {
    setFavorites(FAVORITES_INITIAL_STATE);
  }

  function isGameFavorite(gameId: number) {
    return favorites.map((favoriteGameId) => favoriteGameId).includes(gameId);
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavoriteGame,
        removeFavoriteGame,
        resetFavoriteGames,
        isGameFavorite,
        error,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
