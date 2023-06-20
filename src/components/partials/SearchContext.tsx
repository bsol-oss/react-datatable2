import { createContext } from 'react';

interface SearchContextInterface {
  searchKey: string;
  setSearchKey: (str: string) => void;
}

export const SearchContext = createContext<SearchContextInterface>({
  searchKey: '',
  setSearchKey: () => {
    throw new Error('setSearchKey function has not been implemented');
  },
});
