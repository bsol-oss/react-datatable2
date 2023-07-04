import React, { Box, ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import DataTable from '../components/DataTable';
import BodyWrapper from '../components/BodyWrapper';
import FunctionalWrapper from '../components/FunctionalWrapper';
import TableTitle from '../components/functionalcomponents/TableTitle';
import FooterWrapper from '../components/FooterWrapper';
import PaginationWrapper from '../components/footercomponents/PaginationWrapper';
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
          <FunctionalWrapper>
            <TableTitle>DataTable without Global search</TableTitle>
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
      </ChakraProvider>
    </Box>
  );
};

export default DataTableWithoutGlobalSearch;
