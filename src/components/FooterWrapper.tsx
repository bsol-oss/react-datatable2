import React, { ReactNode } from 'react';
import { Box, HStack } from '@chakra-ui/react';

interface Props {
  children: ReactNode;
}
const PageWrapper = ({ children }: Props) => {
  return (
    <Box px={{ base: '4', md: '6' }} pb="5">
      <HStack spacing="3" justify="space-between">
        {children}
      </HStack>
    </Box>
  );
};

export default PageWrapper;
