import React, { ReactNode, useState } from 'react';
import { Box, Container } from '@chakra-ui/react';
import {
  SearchContext,
  PaginationContext,
  SelectedRecordsContext,
} from './globalpartials/GlobalContext';

interface Props {
  children: ReactNode;
}

const DataTable = ({ children }: Props) => {
  const [searchKey, setSearchKey] = useState<string>('');
  const [totalCount, setTotalCount] = useState<number>(0);
  const [selectedRecords, setSelectedRecords] = useState<number>(0);

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
        <PaginationContext.Provider value={{ totalCount, setTotalCount }}>
          <SearchContext.Provider value={{ searchKey, setSearchKey }}>
            <SelectedRecordsContext.Provider value={{selectedRecords, setSelectedRecords}}>
              {children}
            </SelectedRecordsContext.Provider>
          </SearchContext.Provider>
        </PaginationContext.Provider>
      </Box>
    </Container>
  );
};

export default DataTable;
