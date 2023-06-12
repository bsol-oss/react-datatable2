import React, { useEffect, useState } from 'react';

import { Box } from '@chakra-ui/react';

import DataTable from './components/DataTable';
import ThemeToggleButton from './components/Partials/ThemeToggleButton';
import SearchWrapper from './components/SearchWrapper';
import BodyWrapper from './components/BodyWrapper';
import PageWrapper from './components/PageWrapper';
import { ColumnType, SubareaType } from './types';
import { getAllSubarea } from './Data/Api';

function App(): JSX.Element {
  const [tableData, setTableData] = useState<SubareaType>();

  useEffect(() => {
    const fetchSubareas = async () => {
      const data = await getAllSubarea();
      setTableData(data);
    };
    fetchSubareas();
  }, [getAllSubarea]);

  return (
    <Box>
      <DataTable>
        <Box>
          <SearchWrapper />
          <BodyWrapper tabledata={tableData} />
          <PageWrapper />
        </Box>
      </DataTable>
      <ThemeToggleButton pos="fixed" bottom="2" right="2" />
    </Box>
  );
}

export default App;
