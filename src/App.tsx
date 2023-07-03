import React, { Box } from '@chakra-ui/react';

import DataTable from './components/DataTable';
import ThemeToggleButton from './components/globalpartials/ThemeToggleButton';
import BodyWrapper from './components/BodyWrapper';
import FunctionalWrapper from './components/FunctionalWrapper';
import TableTitle from './components/functionalcomponents/TableTitle';
import GlobalSearch from './components/functionalcomponents/GlobalSearch';
import FooterWrapper from './components/FooterWrapper';
import PaginationWrapper from './components/footercomponents/PaginationWrapper';
import SelectedNumber from './components/footercomponents/SelectedNumber';
import columns from './components/ProvideByConsumer/Columns';
import PageSizeControl from './components/footercomponents/PageSizeControl';
import TableHeader from './components/bodycomponents/TableHeader';
import TableBody from './components/bodycomponents/TableBody';

function App(): JSX.Element {
  return (
    <Box>
      <DataTable>
        <FunctionalWrapper>
          <TableTitle>Member</TableTitle>
          <GlobalSearch />
        </FunctionalWrapper>
        <BodyWrapper columns={columns}>
          <TableHeader />
          <TableBody />
        </BodyWrapper>
        <FooterWrapper>
          <PaginationWrapper>
            <SelectedNumber />
            <PageSizeControl pages={[5, 10, 25, 50, 100]} />
          </PaginationWrapper>
        </FooterWrapper>
      </DataTable>
      <ThemeToggleButton pos="fixed" bottom="2" right="2" />
    </Box>
  );
}

export default App;
