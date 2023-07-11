import { BiSortDown, BiSortUp, BiSolidStar } from 'react-icons/bi';

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
          Sort By <BiSolidStar size={17} /> <BiSortDown size={20} />
        </ActionButton>
      )}
      {(!sortBy && isAuthenticated) ||
        (sortBy === 'rate-desc' && isAuthenticated && (
          <ActionButton onClick={handleSortAsc}>
            Sort By <BiSolidStar size={17} /> <BiSortDown size={20} />
          </ActionButton>
        ))}
      {sortBy === 'rate-asc' && isAuthenticated && (
        <ActionButton onClick={handleSortDesc}>
          Sort By <BiSolidStar size={17} />
          <BiSortUp size={20} />
        </ActionButton>
      )}
    </>
  );
}
