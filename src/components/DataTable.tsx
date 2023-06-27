import React, { ReactNode, useState } from 'react';
import { Box, Container } from '@chakra-ui/react';
import {
  FilterContext,
  TableStatusContext,
} from './globalpartials/GlobalContext';
import { FilterInterface } from '../const/types';

interface Props {
  children: ReactNode;
}

const DataTable = ({ children }: Props) => {
  const [totalCount, setTotalCount] = useState<number>(0);
  const [selectedRecords, setSelectedRecords] = useState<number>(0);
  const [tableWidth, setTableWidth] = useState<number>(0);
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
          <TableStatusContext.Provider
            value={{
              tableWidth,
              setTableWidth,
              totalCount,
              setTotalCount,
              selectedRecords,
              setSelectedRecords,
            }}
          >
            {children}
          </TableStatusContext.Provider>
        </FilterContext.Provider>
      </Box>
    </Container>
  );
};

export default DataTable;
