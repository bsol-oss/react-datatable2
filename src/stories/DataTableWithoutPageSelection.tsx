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

const DataTableWithoutPageSelection = () => {
  return (
    <Box position="relative">
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <DataTable>
          <FunctionalWrapper>
            <TableTitle>DataTable without page selection</TableTitle>
          </FunctionalWrapper>
          <BodyWrapper columns={columns} />
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
