import React, { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

interface Props {
  children: ReactNode;
}
const PageWrapper = ({ children }: Props) => {
  return (
    <Box px={{ base: '4', md: '6' }} pb="5">
      {children}
    </Box>
  );
};

export default PageWrapper;
