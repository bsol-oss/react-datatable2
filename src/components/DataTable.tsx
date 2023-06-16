import React, { ReactNode, useState } from 'react';
import { Box, Container } from '@chakra-ui/react';
import { SearchContext } from './partials/SearchContext';

interface Props {
  children: ReactNode;
}

const DataTable = ({ children }: Props) => {
  const [searchKey, setSearchKey] = useState('');
  
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
        <SearchContext.Provider value={{ searchKey, setSearchKey }}>
          {children}
        </SearchContext.Provider>
      </Box>
    </Container>
  );
};

export default DataTable;
