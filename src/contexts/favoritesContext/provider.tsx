import { ReactNode, useEffect, useState } from 'react';
import { FavoritesContext } from '.';
import { child, get, ref, remove, set } from 'firebase/database';
import { database, databaseRef } from '../../firebase';
import { useAuth } from '../authContext/hook';
import { useGames } from '../gameContext/hook';

interface FavoritesProviderProps {
  children: ReactNode;
}

export interface FavoriteGames {
  gameId: number;
}

const FAVORITES_INITIAL_STATE = [] as FavoriteGames[];

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favoritesGameIdArray, setFavorites] = useState<FavoriteGames[]>(
    FAVORITES_INITIAL_STATE
  );
  const [error, setError] = useState('');
  const { games } = useGames();

  const { user, isAuthenticated } = useAuth();

  const favoriteGamesObjArray = games.filter((game) => {
    return favoritesGameIdArray
      .map((favoriteGame) => favoriteGame.gameId)
      .includes(game.id);
  });

  useEffect(
    function () {
      setError('');
      async function fetchFavoriteGames() {
        get(child(databaseRef, `favorites/${user?.uid}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              setFavorites(Object.values(snapshot.val()));
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
    })
      .then(() => {
        setFavorites((favorites) => [...favorites, { gameId }]);
      })
      .catch(() => {
        setError(
          'Não foi possível adicionar aos favoritos, tente novamente mais tarde'
        );
      });
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
    const foundGame = favoritesGameIdArray.find(
      (favoriteGame) => favoriteGame.gameId === gameId
    );
    return !!foundGame;
  }

  return (
    <FavoritesContext.Provider
      value={{
        favoriteGamesObjArray,
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
