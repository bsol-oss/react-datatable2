import React, { ReactNode, useContext } from 'react';
import { Box, Container, HStack, useBreakpointValue } from '@chakra-ui/react';
import {
  FilterContext,
  TableStatusContext,
} from '../globalpartials/GlobalContext';
import { Pagination } from './Pagination';

interface Props {
  children: ReactNode;
}
const PaginationWrapper = ({ children }: Props) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { totalCount, isLoading } = useContext(TableStatusContext);
  const { filterTerm, setFilterTerm } = useContext(FilterContext);

  return (
    <Box bg="bg.surface">
      <Container py={{ base: '12', md: '16' }}>
        <HStack
          flexWrap="wrap"
          justifyContent="center"
          pointerEvents={isLoading ? 'none' : 'all'}
          opacity={isLoading ? 0.5 : 1}
        >
          <Pagination
            count={totalCount}
            pageSize={filterTerm.rows}
            siblingCount={2}
            page={filterTerm.offset}
            onChange={(e) => setFilterTerm({ ...filterTerm, offset: e.page })}
          />
          {!isMobile && children}
        </HStack>
      </Container>
    </Box>
  );
};

export default PaginationWrapper;
