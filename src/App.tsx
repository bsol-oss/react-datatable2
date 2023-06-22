import React from 'react';
import { Box } from '@chakra-ui/react';

import DataTable from './components/DataTable';
import ThemeToggleButton from './components/globalpartials/ThemeToggleButton';
import BodyWrapper from './components/BodyWrapper';
import FunctionalWrapper from './components/FunctionalWrapper';
import TableTitle from './components/functionalcomponents/TableTitle';
import GlobalSearch from './components/functionalcomponents/GlobalSearch';
import SearchButton from './components/functionalcomponents/SearchButton';
import FooterWrapper from './components/FooterWrapper';
import PaginationWrapper from './components/footercomponents/PaginationWrapper';
import PageButtons from './components/footercomponents/PageButtons';
import SelectedNumber from './components/footercomponents/SelectedNumber';

import columns from './components/ProvideByConsumer/Columns.jsx';

function App(): JSX.Element {
  return (
    <Box>
      <DataTable>
        <FunctionalWrapper>
          <TableTitle>Member</TableTitle>
          <GlobalSearch>
            <SearchButton>Search</SearchButton>
          </GlobalSearch>
        </FunctionalWrapper>
        <BodyWrapper columns={columns}/>
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
