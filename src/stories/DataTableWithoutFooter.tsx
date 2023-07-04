import React, { Box, ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import DataTable from '../components/DataTable';
import BodyWrapper from '../components/BodyWrapper';
import FunctionalWrapper from '../components/FunctionalWrapper';
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
          <FunctionalWrapper>
            <TableTitle>DataTable without footer</TableTitle>
            <GlobalSearch />
          </FunctionalWrapper>
          <BodyWrapper columns={columns}>
            <TableHeader />
            <TableBody />
          </BodyWrapper>
        </DataTable>
      </ChakraProvider>
    </Box>
  );
};

export default DataTableWithoutFooter;
