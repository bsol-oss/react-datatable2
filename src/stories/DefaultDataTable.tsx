// @ts-nocheck

import React from 'react';
import { Box, ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import DataTable from '../components/DataTable';
import ThemeToggleButton from '../components/globalpartials/ThemeToggleButton';
import Table from '../components/Table';
import Header from '../components/Header';
import TableTitle from '../components/functionalcomponents/TableTitle';
import GlobalSearch from '../components/functionalcomponents/GlobalSearch';
import Footer from '../components/Footer';
import Pagination from '../components/footercomponents/Pagination';
import SelectedNumber from '../components/footercomponents/SelectedNumber';
import columns from '../components/ProvideByConsumer/Columns';
import PageSizeControl from '../components/footercomponents/PageSizeControl';
import theme from '../theme';
import TableHeader from '../components/bodycomponents/TableHeader';
import TableBody from '../components/bodycomponents/TableBody';

const DefaultDataTable = () => {
  return (
    <Box position="relative">
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <DataTable>
          <Header>
            <TableTitle>Default DataTable</TableTitle>
            <GlobalSearch />
          </Header>
          <Table columns={columns}>
            <TableHeader />
            <TableBody height="400px" />
          </Table>
          <Footer>
            <Pagination>
              <SelectedNumber />
              <PageSizeControl pages={[5, 10, 25, 50, 100]} />
            </Pagination>
          </Footer>
        </DataTable>
        <ThemeToggleButton pos="fixed" bottom="2" right="2" />
      </ChakraProvider>
    </Box>
  );
};

export default DefaultDataTable;
