import React from 'react';

import { Box } from '@chakra-ui/react';

import DataTable from './components/DataTable';
import ThemeToggleButton from './components/ThemeToggleButton';

function App(): JSX.Element {
  return (
    <Box>
      <DataTable />
      <ThemeToggleButton pos="fixed" bottom="2" right="2" />
    </Box>
  );
}

export default App;
