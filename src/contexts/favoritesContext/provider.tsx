import { ReactNode, useEffect, useState } from 'react';
import { FavoritesContext } from '.';
import { child, get, ref, remove, set } from 'firebase/database';
import { database, databaseRef } from '../../firebase';
import { useAuth } from '../authContext/hook';

interface FavoritesProviderProps {
  children: ReactNode;
}

interface FavoriteGames {
  gameId: number;
}

const FAVORITES_INITIAL_STATE = [] as FavoriteGames[];

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<FavoriteGames[]>(
    FAVORITES_INITIAL_STATE
  );
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

  console.log(favorites);

  async function addFavoriteGame(gameId: number) {
    set(ref(database, `favorites/${user?.uid}/${gameId}`), {
      gameId: gameId,
    });

    setFavorites((favorites) => [...favorites, { gameId }]);
  }

  async function removeFavoriteGame(id: number) {
    remove(ref(database, `favorites/${user?.uid}/${id}`));
    setFavorites((favorites) =>
      favorites.filter((favoriteGame) => favoriteGame.gameId !== id)
    );
  }

  function resetFavoriteGames() {
    setFavorites(FAVORITES_INITIAL_STATE);
  }

  function isGameFavorite(gameId: number) {
    const foundGame = favorites.find(
      (favoriteGame) => favoriteGame.gameId === gameId
    );
    return !!foundGame;
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
