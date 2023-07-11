import { ReactNode, useEffect, useState } from 'react';
import { FavoritesContext } from '.';
import { child, get, ref, set, update } from 'firebase/database';
import { database, databaseRef } from '../../firebase';

interface RatedGamesProviderProps {
  children: ReactNode;
}

export interface RatedGameType {
  gameId: number;
  rate: number;
}

export function RatedGamesProvider({ children }: RatedGamesProviderProps) {
  const [ratedGames, setRatedGames] = useState<RatedGameType[]>([]);

  useEffect(function () {
    async function fetchRatedGames() {
      try {
        get(child(databaseRef, 'ratedGames/'))
          .then((snapshot) => {
            if (snapshot.exists()) {
              setRatedGames(Object.values(snapshot.val()));
            } else {
              console.log('No data available');
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (err: unknown) {
        console.log(err);
      }
    }
    fetchRatedGames();
  }, []);

  async function rateGame(ratedGame: RatedGameType) {
    const isRated = ratedGames.find(
      (game) => game.gameId === ratedGame.gameId
    )?.rate;
    if (!isRated) {
      set(ref(database, 'ratedGames/' + ratedGame.gameId), {
        gameId: ratedGame.gameId,
        rate: ratedGame.rate,
      });
      setRatedGames((ratedGames) => [...ratedGames, ratedGame]);
    } else {
      update(ref(database, 'ratedGames/' + ratedGame.gameId), ratedGame);
      const updatedRatedMovie = ratedGames.map((game) => {
        if (game.gameId === ratedGame.gameId) {
          return { ...game, rate: ratedGame.rate };
        } else {
          return game;
        }
      });
      setRatedGames(updatedRatedMovie);
    }
  }

  function getRate(gameId: number) {
    const rate = ratedGames.find((game) => game.gameId === gameId)?.rate || 0;
    return rate;
  }

  console.log('ratedGames', ratedGames);

  return (
    <FavoritesContext.Provider value={{ ratedGames, rateGame, getRate }}>
      {children}
    </FavoritesContext.Provider>
  );
}
