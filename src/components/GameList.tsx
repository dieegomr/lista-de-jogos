import { useEffect, useState } from 'react';
import GameItem from './GameItem';
import styles from './GameList.module.css';

export default function GameList() {
  const gamesFake = [
    {
      id: 540,
      title: 'Overwatch 2',
      thumbnail: 'https://www.freetogame.com/g/540/thumbnail.jpg',
      short_description:
        'A hero-focused first-person team shooter from Blizzard Entertainment.',
      game_url: 'https://www.freetogame.com/open/overwatch-2',
      genre: 'Shooter',
      platform: 'PC (Windows)',
      publisher: 'Activision Blizzard',
      developer: 'Blizzard Entertainment',
      release_date: '2022-10-04',
      freetogame_profile_url: 'https://www.freetogame.com/overwatch-2',
    },
    {
      id: 516,
      title: 'PUBG: BATTLEGROUNDS',
      thumbnail: 'https://www.freetogame.com/g/516/thumbnail.jpg',
      short_description:
        'Get into the action in one of the longest running battle royale games PUBG Battlegrounds.',
      game_url: 'https://www.freetogame.com/open/pubg',
      genre: 'Shooter',
      platform: 'PC (Windows)',
      publisher: 'KRAFTON, Inc.',
      developer: 'KRAFTON, Inc.',
      release_date: '2022-01-12',
      freetogame_profile_url: 'https://www.freetogame.com/pubg',
    },
    {
      id: 508,
      title: 'Enlisted',
      thumbnail: 'https://www.freetogame.com/g/508/thumbnail.jpg',
      short_description:
        'Get ready to command your own World War II military squad in Gaijin and Darkflow Software’s MMO squad-based shooter Enlisted. ',
      game_url: 'https://www.freetogame.com/open/enlisted',
      genre: 'Shooter',
      platform: 'PC (Windows)',
      publisher: 'Gaijin Entertainment',
      developer: 'Darkflow Software',
      release_date: '2021-04-08',
      freetogame_profile_url: 'https://www.freetogame.com/enlisted',
    },
    {
      id: 525,
      title: 'MultiVersus',
      thumbnail: 'https://www.freetogame.com/g/525/thumbnail.jpg',
      short_description:
        'The Warner Bros lineup meets Smash in Player First Games’ MultiVersus.',
      game_url: 'https://www.freetogame.com/open/multiversus',
      genre: 'Fighting',
      platform: 'PC (Windows)',
      publisher: 'Warner Bros. Games',
      developer: 'Player First Games',
      release_date: '2022-07-19',
      freetogame_profile_url: 'https://www.freetogame.com/multiversus',
    },
  ];

  const [games, setGames] = useState(gamesFake);

  useEffect(function () {
    async function fetchGames() {
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
    }
    fetchGames();
  }, []);

  return (
    <ul className={styles.list}>
      {games.map((game) => (
        <GameItem game={game} key={game.id} />
      ))}
    </ul>
  );
}
