import { Game } from './Game';

export type GameListProps = {
  searchQuery: string;
  selectedGenre: string;
  games: Game[];
};
