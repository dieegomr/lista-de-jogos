import { Game } from './Game';

export type FilterProps = {
  games: Game[];
  selectedGenre: string;
  setSelectedGenre: React.Dispatch<React.SetStateAction<string>>;
};
