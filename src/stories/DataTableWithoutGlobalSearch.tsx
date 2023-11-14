import React from 'react';
import { Box, ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import DataTable from '../components/DataTable';
import Table from '../components/Table';
import Header from '../components/Header';
import TableTitle from '../components/functionalcomponents/TableTitle';
import Footer from '../components/Footer';
import Pagination from '../components/footercomponents/Pagination';
import SelectedNumber from '../components/footercomponents/SelectedNumber';
import columns from '../components/ProvideByConsumer/Columns';
import PageSizeControl from '../components/footercomponents/PageSizeControl';
import theme from '../theme';
import TableHeader from '../components/bodycomponents/TableHeader';
import TableBody from '../components/bodycomponents/TableBody';

const DataTableWithoutGlobalSearch = () => {
  return (
    <Box position="relative">
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <DataTable>
          <Header>
            <TableTitle>DataTable without Global search</TableTitle>
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
      </ChakraProvider>
    </Box>
  );
};

export default DataTableWithoutGlobalSearch;
