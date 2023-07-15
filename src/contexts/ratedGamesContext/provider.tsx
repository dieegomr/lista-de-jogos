import { ReactNode, useEffect, useState } from 'react';
import { FavoritesContext } from '.';
import { child, get, ref, set, update } from 'firebase/database';
import { database, databaseRef } from '../../firebase';
import { useAuth } from '../authContext/hook';

interface RatedGamesProviderProps {
  children: ReactNode;
}

export interface RatedGameType {
  gameId: number;
  rate: number;
}

const RATED_GAMES_INITIAL_STATE = [] as RatedGameType[];

export function RatedGamesProvider({ children }: RatedGamesProviderProps) {
  const [ratedGames, setRatedGames] = useState<RatedGameType[]>(
    RATED_GAMES_INITIAL_STATE
  );
  const [error, setError] = useState('');

  const { user, isAuthenticated } = useAuth();

  useEffect(
    function () {
      setError('');
      async function fetchRatedGames() {
        get(child(databaseRef, `rated_games/${user?.uid}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              setRatedGames(Object.values(snapshot.val()));
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
      if (isAuthenticated) fetchRatedGames();
    },
    [isAuthenticated, user?.uid]
  );

  async function rateGame(ratedGame: RatedGameType) {
    const isRated = ratedGames.find(
      (game) => game.gameId === ratedGame.gameId
    )?.rate;
    if (!isRated) {
      set(ref(database, `rated_games/${user?.uid}/${ratedGame.gameId}`), {
        gameId: ratedGame.gameId,
        rate: ratedGame.rate,
      })
        .then(() => {
          setRatedGames((ratedGames) => [...ratedGames, ratedGame]);
        })
        .catch(() => {
          setError(
            'Não foi possível dar a nota para esse jogo. Tente novamente mais tarde'
          );
        });
    } else {
      update(
        ref(database, `rated_games/${user?.uid}/${ratedGame.gameId}`),
        ratedGame
      )
        .then(() => {
          const updatedRatedMovie = ratedGames.map((game) => {
            if (game.gameId === ratedGame.gameId) {
              return { ...game, rate: ratedGame.rate };
            } else {
              return game;
            }
          });
          setRatedGames(updatedRatedMovie);
        })
        .catch(() => {
          setError(
            'Não foi possível dar a nota para esse jogo. Tente novamente mais tarde'
          );
        });
    }
  }

  function getRate(gameId: number) {
    const rate = ratedGames.find((game) => game.gameId === gameId)?.rate || 0;
    return rate;
  }

  function resetRatedGames() {
    setRatedGames(RATED_GAMES_INITIAL_STATE);
  }

  return (
    <FavoritesContext.Provider
      value={{ ratedGames, rateGame, getRate, resetRatedGames, error }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
