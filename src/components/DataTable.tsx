import React, { ReactNode } from 'react';
import { Box, Container } from '@chakra-ui/react';

interface Props {
  children: ReactNode;
}
const DataTable = ({ children }: Props) => {
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
        {/* <Stack spacing="5">
          <SearchWrapper />
          <Box overflowX="auto">
            <MainTable />
          </Box>
          <PageWrapper />
        </Stack> */}

        {children}
      </Box>
    </Container>
  );
};

export default DataTable;
