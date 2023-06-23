import React, { ReactNode, useContext } from 'react';
import { Box, Container, HStack, useBreakpointValue } from '@chakra-ui/react';
import {
  FilterContext,
  PaginationContext,
} from '../globalpartials/GlobalContext';
import { Pagination } from './Pagination';

interface Props {
  children: ReactNode;
}
const PaginationWrapper = ({ children }: Props) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { totalCount } = useContext(PaginationContext);
  const { filterTerm, setFilterTerm } = useContext(FilterContext);

  return (
    <Box bg="bg.surface">
      <Container py={{ base: '12', md: '16' }}>
        <HStack flexWrap="wrap" justifyContent="center">
          <Pagination
            count={totalCount}
            pageSize={10}
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
