import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/authContext/hook';

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
        <button onClick={handleSortAsc}>Sort by rate lowest first</button>
      )}
      {sortBy === 'rate-desc' && isAuthenticated && (
        <button onClick={handleSortAsc}>Sort by rate lowest first</button>
      )}
      {sortBy === 'rate-asc' && isAuthenticated && (
        <button onClick={handleSortDesc}>Sort by rate largest first</button>
      )}
    </>
  );
}
