import { createContext } from 'react';
import { FilterInterface } from '../../const/types';

interface SearchContextInterface {
  searchKey: string;
  setSearchKey: (str: string) => void;
}

interface PaginationContextInterface {
  totalCount: number;
  setTotalCount: (num: number) => void;
}

interface FilterContextInterface {
  filterTerm: FilterInterface;
  setFilterTerm: (filter: FilterInterface) => void;
}

interface SelectedRecordContextInterface {
  selectedRecords: number;
  setSelectedRecords: (num: number) => void;
}

export const FilterContext = createContext<FilterContextInterface>({
  filterTerm: { offset: 0, rows: 10, field: '', sort: '', searchTerm: '' },
  setFilterTerm() {
    throw new Error('setFilterTerm function has not been implemented');
  },
});

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

export const PagesContext = createContext({
  pages: [],
});
