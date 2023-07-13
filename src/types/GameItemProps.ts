import { ReactNode } from 'react';
import { Game } from './Game';

export type GameItemProps = {
  game: Game;
  children: ReactNode;
};
