import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/authContext/hook';

export default function SortBy() {
  const { isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy');

  function handleSortAsc() {
    searchParams.set('sortBy', 'rating-asc');
    setSearchParams(searchParams);
  }

  function handleSortDesc() {
    searchParams.set('sortBy', 'rating-desc');
    setSearchParams(searchParams);
  }

  return (
    <>
      {!sortBy && isAuthenticated && (
        <button onClick={handleSortAsc}>Sort by rating &#8593;</button>
      )}
      {sortBy === 'rating-desc' && isAuthenticated && (
        <button onClick={handleSortAsc}>Sort by rating &#8593;</button>
      )}
      {sortBy === 'rating-asc' && isAuthenticated && (
        <button onClick={handleSortDesc}>Sort by rating &#8595;</button>
      )}
    </>
  );
}
