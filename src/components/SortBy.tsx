import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/authContext/hook';
import ActionButton from './ActionButton';

export default function SortBy() {
  const { isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy');

  function handleSortAsc() {
    searchParams.set('sortBy', 'rate-asc');
    setSearchParams(searchParams);
  }

  function handleSortDesc() {
    searchParams.set('sortBy', 'rate-desc');
    setSearchParams(searchParams);
  }

  return (
    <>
      {!sortBy && isAuthenticated && (
        <ActionButton onClick={handleSortAsc}>
          Sort by rate lowest first
        </ActionButton>
      )}
      {(!sortBy && isAuthenticated) ||
        (sortBy === 'rate-desc' && isAuthenticated && (
          <ActionButton onClick={handleSortAsc}>
            Sort by rate lowest first
          </ActionButton>
        ))}
      {sortBy === 'rate-asc' && isAuthenticated && (
        <ActionButton onClick={handleSortDesc}>
          Sort by rate largest first
        </ActionButton>
      )}
    </>
  );
}
