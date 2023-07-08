import { ReactNode, useEffect, useState } from 'react';
import { Game } from '../../types/Game';
import { isSpecificHttpStatus, startFetchTimeout } from '../../utils/helpers';
import { GamesContext } from '.';

interface GamesProviderProps {
  children: ReactNode;
}

const BASE_URL = 'https://games-test-api-81e9fb0d564a.herokuapp.com/api';
const SPECIFIC_STATUS_ERROR_MESSAGE =
  'O servidor falhou em responder, tente recarregar a página';
const OTHER_STATUS_ERROR_MESSAGE =
  'O servidor não conseguirá responder por agora, tente voltar novamente mais tarde';
const FETCH_TIMEOUT_ERROR_MESSAGE =
  'O servidor demorou para responder, tente mais tarde';

export function GamesProvider({ children }: GamesProviderProps) {
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

        if (isSpecificHttpStatus(res))
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

  return (
    <GamesContext.Provider
      value={{
        games,
        isLoading,
        error,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
}
