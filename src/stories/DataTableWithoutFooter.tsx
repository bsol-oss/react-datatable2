import React from 'react';
import { Box, ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import DataTable from '../components/DataTable';
import Table from '../components/Table';
import Header from '../components/Header';
import TableTitle from '../components/functionalcomponents/TableTitle';
import GlobalSearch from '../components/functionalcomponents/GlobalSearch';
import columns from '../components/ProvideByConsumer/Columns';
import theme from '../theme';
import TableBody from '../components/bodycomponents/TableBody';
import TableHeader from '../components/bodycomponents/TableHeader';

const DataTableWithoutFooter = () => {
  return (
    <Box position="relative">
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <DataTable>
          <Header>
            <TableTitle>DataTable without footer</TableTitle>
            <GlobalSearch />
          </Header>
          <Table columns={columns}>
            <TableHeader />
            <TableBody height = '400px'/>
          </Table>
        </DataTable>
      </ChakraProvider>
    </Box>
  );
};

export default DataTableWithoutFooter;
