import styles from './GameItem.module.css';

interface Props {
  game: {
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
  };
}

export default function GameItem({ game }: Props) {
  const { thumbnail, title, short_description: description, genre } = game;

  return (
    <div className={styles.game}>
      <img src={thumbnail} className={styles.img} />
      <div className={styles.body}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <h3 className={styles.genre}>{genre}</h3>
      </div>
    </div>
  );
}
