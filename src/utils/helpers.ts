import { Game } from '../types/Game';
import { StartFetchTimeout } from '../types/StartFetchTimeout';

export function startFetchTimeout(
  durationInSeconds: number
): StartFetchTimeout {
  const controller = new AbortController();
  const fetchTimeoutId = setTimeout(
    () => controller.abort(),
    durationInSeconds * 1000
  );
  return { fetchTimeoutId, controller };
}

export function getArrayOfUniqueGenres(games: Game[]): string[] {
  return games ? [...new Set(games.map((game) => game.genre))] : [];
}

export function filterGamesByGenre(games: Game[], genre: string): Game[] | [] {
  return genre !== 'All' ? games.filter((game) => game.genre === genre) : games;
}

export function searchGamesByQuery(games: Game[], query: string): Game[] | [] {
  return query.length > 0
    ? games.filter((game) =>
        `${game.title}`.toLowerCase().includes(query.toLowerCase())
      )
    : games;
}

export function isSpecificHttpStatus(response: Response): boolean {
  return (
    response.status === 500 ||
    response.status === 502 ||
    response.status === 503 ||
    response.status === 504 ||
    response.status === 507 ||
    response.status === 508 ||
    response.status === 509
  );
}
