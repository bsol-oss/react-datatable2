import React, { ReactNode, useContext } from 'react';
import { Box, Stack } from '@chakra-ui/react';
import { TableStatusContext } from './globalpartials/GlobalContext';

interface Props {
  children: ReactNode;
}

const FunctionalWrapper = ({ children }: Props) => {
  const { tableWidth } = useContext(TableStatusContext);
  return (
    <Box px={{ base: '4', md: '6' }} pt="5" width={tableWidth}>
      <Stack direction={{ base: 'column', md: 'row' }} justify="space-between">
        {children}
      </Stack>
    </Box>
  );
};

export default FunctionalWrapper;
