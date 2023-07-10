import { useSearchParams } from 'react-router-dom';

export default function SortBy() {
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
      {sortBy === 'rating-desc' && (
        <button onClick={handleSortAsc}>Sort by rating &#8593;</button>
      )}
      {sortBy === 'rating-asc' && (
        <button onClick={handleSortDesc}>Sort by rating &#8595;</button>
      )}
    </>
  );
}
