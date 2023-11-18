import React, { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

import DataTable from './components/DataTable';
import Table from './components/Table';
import Header from './components/Header';
import TableTitle from './components/functionalcomponents/TableTitle';
import GlobalSearch from './components/functionalcomponents/GlobalSearch';
import Footer from './components/Footer';
import Pagination from './components/footercomponents/Pagination';
import SelectedNumber from './components/footercomponents/SelectedNumber';
import PageSizeControl from './components/footercomponents/PageSizeControl';
import TableHeader from './components/bodycomponents/TableHeader';
import TableBody from './components/bodycomponents/TableBody';

const DataTableServer = ({
  size = '400px',
  tableTitle = 'Member',
  columns = [],
  globalSearchBarComponent = null,
  paginationComponent = null,
  apiUrl = '',
  pageSizes = [5, 10, 15, 20, 25, 30],
  axios = null,
}: {
  size: string;
  tableTitle: string;
  columns: Array<any>;
  globalSearchBarComponent: ReactNode;
  paginationComponent: ReactNode;
  apiUrl: string;
  pageSizes: Array<number>;
  axios: any;
}) => {
  return (
    <Box>
      <DataTable>
        <Header>
          {tableTitle ? <TableTitle>{tableTitle}</TableTitle> : null}
          {globalSearchBarComponent ? (
            globalSearchBarComponent
          ) : (
            <GlobalSearch />
          )}
        </Header>
        <Table columns={columns} apiUrl={apiUrl} axios={axios}>
          <TableHeader />
          <TableBody size={size} />
        </Table>
        {paginationComponent ? (
          paginationComponent
        ) : (
          <Footer>
            <Pagination>
              <SelectedNumber />
              <PageSizeControl pages={pageSizes} />
            </Pagination>
          </Footer>
        )}
      </DataTable>
    </Box>
  );
};

export default DataTableServer;
