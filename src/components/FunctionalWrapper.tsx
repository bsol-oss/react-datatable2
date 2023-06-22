import React, { ReactNode } from 'react';
import { Box, Stack } from '@chakra-ui/react';

interface Props {
  children: ReactNode;
}

const FunctionalWrapper = ({ children }: Props) => {
  return (
    <Box px={{ base: '4', md: '6' }} pt="5">
      <Stack direction={{ base: 'column', md: 'row' }} justify="space-between">
        {children}
      </Stack>
    </Box>
  );
};

export default FunctionalWrapper;
