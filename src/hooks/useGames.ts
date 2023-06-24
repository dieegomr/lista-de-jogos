import { useEffect, useState } from 'react';
import { startFetchTimeout } from '../utils/helpers';

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

const BASE_URL = 'https://games-test-api-81e9fb0d564a.herokuapp.com/api';

export function useGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(function () {
    const { fetchTimeoutId, controller } = startFetchTimeout(5);

    async function fetchGames() {
      try {
        setIsLoading(true);
        setError('');
        const res = await fetch(`${BASE_URL}/data`, {
          signal: controller.signal,
          method: 'GET',
          headers: {
            'dev-email-address': 'test@gmail.com',
          },
        });

        clearTimeout(fetchTimeoutId);

        if (
          res.status === 500 ||
          res.status === 502 ||
          res.status === 503 ||
          res.status === 504 ||
          res.status === 507 ||
          res.status === 508 ||
          res.status === 509
        )
          throw new Error(
            'O servidor falhou em responder, tente recarregar a página'
          );

        if (!res.ok)
          throw new Error(
            'O servidor não conseguirá responder por agora, tente voltar novamente mais tarde'
          );

        const data = await res.json();
        console.log(data);
        setGames(data);
        setIsLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          err.name === 'AbortError'
            ? setError('O servidor demorou para responder, tente mais tarde')
            : setError(err.message);
        } else {
          setError(
            'O servidor não conseguirá responder por agora, tente voltar novamente mais tarde'
          );
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchGames();
  }, []);

  return { games, isLoading, error };
}
