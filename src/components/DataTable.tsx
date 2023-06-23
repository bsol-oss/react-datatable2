import React, { ReactNode, useState } from 'react';
import { Box, Container } from '@chakra-ui/react';
import {
  PaginationContext,
  SelectedRecordsContext,
  FilterContext,
} from './globalpartials/GlobalContext';
import { FilterInterface } from '../const/types';

interface Props {
  children: ReactNode;
}

const DataTable = ({ children }: Props) => {
  const [totalCount, setTotalCount] = useState<number>(0);
  const [selectedRecords, setSelectedRecords] = useState<number>(0);

  const [filterTerm, setFilterTerm] = useState<FilterInterface>({
    offset: 0,
    rows: 10,
    field: '',
    sort: '',
    searchTerm: '',
  });

  return (
    <Container
      maxW="100%"
      py={{ base: '4', md: '8' }}
      px={{ base: '0', md: 8 }}
    >
      <Box
        bg="bg.surface"
        boxShadow={{ base: 'none', md: 'sm' }}
        borderRadius={{ base: 'none', md: 'lg' }}
      >
        <FilterContext.Provider value={{ filterTerm, setFilterTerm }}>
          <PaginationContext.Provider value={{ totalCount, setTotalCount }}>
            <SelectedRecordsContext.Provider
              value={{ selectedRecords, setSelectedRecords }}
            >
              {children}
            </SelectedRecordsContext.Provider>
          </PaginationContext.Provider>
        </FilterContext.Provider>
      </Box>
    </Container>
  );
};

export default DataTable;
