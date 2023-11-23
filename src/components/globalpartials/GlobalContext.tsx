import { createContext } from 'react';

import { FilterInterface } from '../../const/types';

interface FilterContextInterface {
  filterTerm: FilterInterface;
  setFilterTerm: (filter: FilterInterface) => void;
}

interface TableStatusContextInterface {
  tableWidth: number;
  setTableWidth: (num: number) => void;
  totalCount: number;
  setTotalCount: (num: number) => void;
  selectedRows: Record<string, boolean>;
  setSelectedRows: (arr: Record<string, boolean>) => void;
  isLoading: boolean;
  setIsLoading: (status: boolean) => void;
  error: boolean;
  setError: (msg: string) => void;
}

export const FilterContext = createContext<FilterContextInterface>({
  filterTerm: {
    offset: 1,
    rows: 10,
    field: '',
    sort: '',
    searchTerm: '',
    individualSearchTerm: {},
  },
  setFilterTerm() {
    throw new Error('setFilterTerm function has not been implemented');
  },
});

export const TableStatusContext = createContext<TableStatusContextInterface>({
  tableWidth: 0,
  setTableWidth: () => {
    throw new Error('record function has not been implemented');
  },
  totalCount: 0,
  setTotalCount: () => {
    throw new Error('totalCount function has not been implemented');
  },
  selectedRows: {},
  setSelectedRows() {
    throw new Error('selectedrows function has not been implemented');
  },
  isLoading: false,
  setIsLoading: () => {
    throw new Error('isLoading function has not been implemented');
  },
  error: false,
  setError: () => {
    throw new Error('error function has not been implemented');
  },
});
