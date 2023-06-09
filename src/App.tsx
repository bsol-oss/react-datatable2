import React from 'react';

import { Box } from '@chakra-ui/react';

import DataTable from './components/DataTable';
import ThemeToggleButton from './components/Partials/ThemeToggleButton';
import SearchWrapper from './components/SearchWrapper';
import MainTable from './components/MainTable';
import PageWrapper from './components/PageWrapper';

function App(): JSX.Element {
  return (
    <Box>
      <DataTable>
        <Box>
          <SearchWrapper />
          <MainTable />
          <PageWrapper />
        </Box>
      </DataTable>
      <ThemeToggleButton pos="fixed" bottom="2" right="2" />
    </Box>
  );
}

export default App;
