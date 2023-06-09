import React from 'react';

import { Box } from '@chakra-ui/react';

import DataTable from './components/DataTable';
import ThemeToggleButton from './components/Partials/ThemeToggleButton';
import SearchWrapper from './components/SearchWrapper';
import BodyWrapper from './components/BodyWrapper';
import PageWrapper from './components/PageWrapper';

function App(): JSX.Element {
  return (
    <Box>
      <DataTable>
        <Box>
          <SearchWrapper />
          <BodyWrapper />
          <PageWrapper />
        </Box>
      </DataTable>
      <ThemeToggleButton pos="fixed" bottom="2" right="2" />
    </Box>
  );
}

export default App;
