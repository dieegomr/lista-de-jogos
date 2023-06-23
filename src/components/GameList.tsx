import GameItem from './GameItem';
import styles from './GameList.module.css';

export default function GameList() {
  const game = {
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
  };
  return (
    <div className={styles.list}>
      <GameItem game={game} />
      <GameItem game={game} />
      <GameItem game={game} />
      <GameItem game={game} />
    </div>
  );
}
