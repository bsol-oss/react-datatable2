import { createContext } from 'react';

interface SearchContextInterface {
  searchKey: string;
  setSearchKey: (str: string) => void;
}

interface PaginationContextInterface {
  totalCount: number;
  setTotalCount: (num: number) => void;
}

interface SelectedRecordContextInterface {
  selectedRecords: number;
  setSelectedRecords: (num: number) => void;
}

export const SearchContext = createContext<SearchContextInterface>({
  searchKey: '',
  setSearchKey: () => {
    throw new Error('setSearchKey function has not been implemented');
  },
});

export const PaginationContext = createContext<PaginationContextInterface>({
  totalCount: 0,
  setTotalCount: () => {
    throw new Error('totalCount function has not been implemented');
  },
});

export const SelectedRecordsContext =
  createContext<SelectedRecordContextInterface>({
    selectedRecords: 0,
    setSelectedRecords: () => {
      throw new Error('record function has not been implemented');
    },
  });
