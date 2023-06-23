import { useEffect, useState } from 'react';
import GameItem from './GameItem';
import styles from './GameList.module.css';
import Loader from './Loader';

interface Game {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
}

export default function GameList() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchGames() {
      setIsLoading(true);
      const res = await fetch(
        'https://games-test-api-81e9fb0d564a.herokuapp.com/api/data',
        {
          method: 'GET',
          headers: {
            'dev-email-address': 'test@gmail.com',
          },
        }
      );
      const data = await res.json();
      console.log(data);
      setGames(data);
      setIsLoading(false);
    }
    fetchGames();
  }, []);

  return (
    <ul className={styles.list}>
      {isLoading ? (
        <Loader />
      ) : (
        games.map((game) => <GameItem game={game} key={game.id} />)
      )}
    </ul>
  );
}
