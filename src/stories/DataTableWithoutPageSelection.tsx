import React, { Box, ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import DataTable from '../components/DataTable';
import ThemeToggleButton from '../components/globalpartials/ThemeToggleButton';
import BodyWrapper from '../components/BodyWrapper';
import FunctionalWrapper from '../components/FunctionalWrapper';
import TableTitle from '../components/functionalcomponents/TableTitle';
import FooterWrapper from '../components/FooterWrapper';
import PaginationWrapper from '../components/footercomponents/PaginationWrapper';
import SelectedNumber from '../components/footercomponents/SelectedNumber';
import columns from '../components/ProvideByConsumer/Columns';
import theme from '../theme';
import TableHeader from '../components/bodycomponents/TableHeader';
import TableBody from '../components/bodycomponents/TableBody';

const DataTableWithoutPageSelection = () => {
  return (
    <Box position="relative">
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <DataTable>
          <FunctionalWrapper>
            <TableTitle>DataTable without page selection</TableTitle>
          </FunctionalWrapper>
          <BodyWrapper columns={columns}>
            <TableHeader />
            <TableBody />
          </BodyWrapper>
          <FooterWrapper>
            <PaginationWrapper>
              <SelectedNumber />
            </PaginationWrapper>
          </FooterWrapper>
        </DataTable>
        <ThemeToggleButton pos="fixed" bottom="2" right="2" />
      </ChakraProvider>
    </Box>
  );
};

export default DataTableWithoutPageSelection;
