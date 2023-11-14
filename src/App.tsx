import React from 'react';
import { Box } from '@chakra-ui/react';

import DataTable from './components/DataTable';
import ThemeToggleButton from './components/globalpartials/ThemeToggleButton';
import Table from './components/Table';
import Header from './components/Header';
import TableTitle from './components/functionalcomponents/TableTitle';
import GlobalSearch from './components/functionalcomponents/GlobalSearch';
import Footer from './components/Footer';
import Pagination from './components/footercomponents/Pagination';
import SelectedNumber from './components/footercomponents/SelectedNumber';
import columns from './components/ProvideByConsumer/Columns';
import PageSizeControl from './components/footercomponents/PageSizeControl';
import TableHeader from './components/bodycomponents/TableHeader';
import TableBody from './components/bodycomponents/TableBody';

function App(): JSX.Element {
  return (
    <Box>
      <DataTable>
        <Header>
          <TableTitle>Member</TableTitle>
          <GlobalSearch />
        </Header>
        <Table columns={columns}>
          <TableHeader />
          <TableBody />
        </Table>
        <Footer>
          <Pagination>
            <SelectedNumber />
            <PageSizeControl pages={[5, 10, 25, 50, 100]} />
          </Pagination>
        </Footer>
      </DataTable>
      <ThemeToggleButton pos="fixed" bottom="2" right="2" />
    </Box>
  );
}

export default App;
