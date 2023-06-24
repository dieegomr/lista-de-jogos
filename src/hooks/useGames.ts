import { useEffect, useState } from 'react';
import { startFetchTimeout } from '../utils/helpers';
import { Game } from '../types/Game';

const BASE_URL = 'https://games-test-api-81e9fb0d564a.herokuapp.com/api';
const SPECIFIC_STATUS_ERROR_MESSAGE =
  'O servidor falhou em responder, tente recarregar a página';
const OTHER_STATUS_ERROR_MESSAGE =
  'O servidor não conseguirá responder por agora, tente voltar novamente mais tarde';
const FETCH_TIMEOUT_ERROR_MESSAGE =
  'O servidor demorou para responder, tente mais tarde';

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
          throw new Error(SPECIFIC_STATUS_ERROR_MESSAGE);

        if (!res.ok) throw new Error(OTHER_STATUS_ERROR_MESSAGE);

        const data = await res.json();

        setGames(data);
        setIsLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          err.name === 'AbortError'
            ? setError(FETCH_TIMEOUT_ERROR_MESSAGE)
            : setError(err.message);
        } else {
          setError(OTHER_STATUS_ERROR_MESSAGE);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchGames();
  }, []);

  return { games, isLoading, error };
}
