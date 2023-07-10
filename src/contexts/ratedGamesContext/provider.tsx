import { ReactNode, useEffect, useState } from 'react';
import { FavoritesContext } from '.';
import { child, get, ref, set } from 'firebase/database';
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

  async function addRatedGame(ratedGame: RatedGameType) {
    set(ref(database, 'ratedGames/' + ratedGame.gameId), {
      gameId: ratedGame.gameId,
      rate: ratedGame.rate,
    });

    setRatedGames((ratedGames) => [...ratedGames, ratedGame]);
  }

  function getRate(gameId: number) {
    const rate = ratedGames.find((game) => game.gameId === gameId)?.rate || 0;
    return rate;
  }

  return (
    <FavoritesContext.Provider value={{ ratedGames, addRatedGame, getRate }}>
      {children}
    </FavoritesContext.Provider>
  );
}
