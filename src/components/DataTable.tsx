import React, { ReactNode, useEffect, useState } from 'react';
import { Box, Container } from '@chakra-ui/react';
import {
  FilterContext,
  TableStatusContext,
} from './globalpartials/GlobalContext';
import { FilterInterface } from '../const/types';
import Footer from './Footer';

interface Props {
  children: ReactNode;
  request?: Request;
}

const DataTable = ({ children, request }: Props) => {
  const [selectedRows, setSelectedRows] = useState({});
  const [totalCount, setTotalCount] = useState<number>(0);
  const [tableWidth, setTableWidth] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filterTerm, setFilterTerm] = useState<FilterInterface>({
    offset: 1,
    rows: 10,
    field: '',
    sort: '',
    searchTerm: '',
    individualSearchTerm: {},
  });
  useEffect(() => {
    let hasFooter = false;

    React?.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === Footer) {
        hasFooter = true;
      }
    });

    if (!hasFooter) {
      setFilterTerm({ ...filterTerm, rows: 0 });
    }
  }, []);

  return (
    <Container
      maxW="100%"
      py={{ base: '4', md: '8' }}
      px={{ base: '0', md: 8 }}
    >
      <Box
        bg="bg.surface"
        boxShadow={{ base: 'none', md: 'sm' }}
        borderRadius={{ base: 'none', md: 'lg' }}
      >
        <FilterContext.Provider value={{ filterTerm, setFilterTerm }}>
          <TableStatusContext.Provider
            value={{
              tableWidth,
              setTableWidth,
              totalCount,
              setTotalCount,
              selectedRows,
              setSelectedRows,
              isLoading,
              setIsLoading,
              request,
            }}
          >
            {children}
          </TableStatusContext.Provider>
        </FilterContext.Provider>
      </Box>
    </Container>
  );
};

export default DataTable;
