import { BiSortDown, BiSortUp, BiSolidStar } from 'react-icons/bi';
import { MdFilterListOff } from 'react-icons/md';

import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/authContext/hook';
import ActionButton from './ActionButton';

export default function SortBy() {
  const { isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy');

  function handleNoSort() {
    searchParams.set('sortBy', 'rate-desc');
    setSearchParams(searchParams);
  }

  function handleSortAsc() {
    searchParams.set('sortBy', 'rate-no');
    setSearchParams(searchParams);
  }

  function handleSortDesc() {
    searchParams.set('sortBy', 'rate-asc');
    setSearchParams(searchParams);
  }

  return (
    <>
      {isAuthenticated && !sortBy && (
        <ActionButton onClick={handleNoSort}>
          Ordenar <MdFilterListOff size={20} />
        </ActionButton>
      )}
      {isAuthenticated && sortBy === 'rate-no' && (
        <ActionButton onClick={handleNoSort}>
          Ordenar <MdFilterListOff size={20} />
        </ActionButton>
      )}
      {isAuthenticated && sortBy === 'rate-asc' && (
        <ActionButton onClick={handleSortAsc}>
          Ordenar por <BiSolidStar size={17} /> <BiSortUp size={20} />
        </ActionButton>
      )}
      {isAuthenticated && sortBy === 'rate-desc' && (
        <ActionButton onClick={handleSortDesc}>
          Ordenar por <BiSolidStar size={17} /> <BiSortDown size={20} />
        </ActionButton>
      )}
    </>
  );
}
