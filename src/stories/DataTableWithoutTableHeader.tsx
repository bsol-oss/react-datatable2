import React, { Box, ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import DataTable from '../components/DataTable';
import ThemeToggleButton from '../components/globalpartials/ThemeToggleButton';
import BodyWrapper from '../components/BodyWrapper';
import FunctionalWrapper from '../components/FunctionalWrapper';
import TableTitle from '../components/functionalcomponents/TableTitle';
import GlobalSearch from '../components/functionalcomponents/GlobalSearch';
import FooterWrapper from '../components/FooterWrapper';
import PaginationWrapper from '../components/footercomponents/PaginationWrapper';
import SelectedNumber from '../components/footercomponents/SelectedNumber';
import columns from '../components/ProvideByConsumer/Columns';
import PageSizeControl from '../components/footercomponents/PageSizeControl';
import theme from '../theme';
import TableBody from '../components/bodycomponents/TableBody';

const DataTableWithoutTableHeader = () => {
  return (
    <Box position="relative">
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <DataTable>
          <FunctionalWrapper>
            <TableTitle>DataTable without tableheader</TableTitle>
            <GlobalSearch />
          </FunctionalWrapper>
          <BodyWrapper columns={columns}>
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
      </ChakraProvider>
    </Box>
  );
};

export default DataTableWithoutTableHeader;
