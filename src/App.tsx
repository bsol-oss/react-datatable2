import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';

import DataTable from './components/DataTable';
import ThemeToggleButton from './components/globalpartials/ThemeToggleButton';
import BodyWrapper from './components/BodyWrapper';
import { SubareaInterface } from './const/types';
import { getAllSubarea } from './Data/Api';
import FunctionalWrapper from './components/FunctionalWrapper';
import TableTitle from './components/functionalcomponents/TableTitle';
import GlobalSearch from './components/functionalcomponents/GlobalSearch';
import SearchButton from './components/functionalcomponents/SearchButton';
import FooterWrapper from './components/FooterWrapper';
import PaginationWrapper from './components/footercomponents/PaginationWrapper';
import PageButtons from './components/footercomponents/PageButtons';
import SelectedNumber from './components/footercomponents/SelectedNumber';

function App(): JSX.Element {
  const [tableData, setTableData] = useState<SubareaInterface>();

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
        <FunctionalWrapper>
          <TableTitle>Member</TableTitle>
          <GlobalSearch>
            <SearchButton>Search</SearchButton>
          </GlobalSearch>
        </FunctionalWrapper>
        <BodyWrapper tabledata={tableData} />
        <FooterWrapper>
          <PaginationWrapper>
            <SelectedNumber />
          </PaginationWrapper>
          <PageButtons />
        </FooterWrapper>
      </DataTable>
      <ThemeToggleButton pos="fixed" bottom="2" right="2" />
    </Box>
  );
}

export default App;
