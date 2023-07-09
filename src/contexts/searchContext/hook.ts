import { useContext } from 'react';
import { SearchContext, SearchContextType } from '.';

export function useSearchQuery() {
  const context = useContext(SearchContext);
  if (context === undefined)
    throw new Error('Search context was used outside the SearchProvider');
  return context as SearchContextType;
}
